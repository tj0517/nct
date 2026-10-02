import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

/* Spam filters: a bot that fills the honeypot, or a submission that arrives
   faster than a human could plausibly fill the form, gets a normal-looking
   success response with nothing sent — see ContactForm.tsx for the paired
   hidden field and render timestamp. */
const HONEYPOT_FIELD = "company";
const MIN_FILL_MS = 1500;

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().max(254),
  phone: z.string().trim().max(30).optional().default(""),
  message: z.string().trim().min(1).max(5000),
  consent: z.literal(true),
});

/* Resend's shared sandbox sender — the school's own domain isn't verified in
   Resend yet (deferred, see docs/deferred-tasks.md). */
const FROM_ADDRESS = "A Nice Cup of Tea <onboarding@resend.dev>";
const SUBJECT = "New enquiry — anicecupoftea.pl contact form";

function buildBody(data: { name: string; email: string; phone: string; message: string }) {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "-"}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

export async function POST(request: Request) {
  const raw: unknown = await request.json().catch(() => null);
  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const body = raw as Record<string, unknown>;
  const honeypot = typeof body[HONEYPOT_FIELD] === "string" ? body[HONEYPOT_FIELD] : "";
  const startedAt = typeof body.startedAt === "number" ? body.startedAt : 0;
  const elapsedMs = startedAt ? Date.now() - startedAt : 0;
  const isSpam = honeypot.trim().length > 0 || !startedAt || elapsedMs < MIN_FILL_MS;

  if (isSpam) {
    console.log("contact form: spam suspected, send skipped", {
      honeypot: honeypot.trim().length > 0,
      tooFast: Boolean(startedAt) && elapsedMs < MIN_FILL_MS,
    });
    return NextResponse.json({ ok: true });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }
  const { name, email, phone, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const isProd = process.env.NODE_ENV === "production";

  if (!apiKey || !to) {
    if (isProd) {
      console.error("contact form: missing server configuration", {
        hasApiKey: Boolean(apiKey),
        hasRecipient: Boolean(to),
      });
      return NextResponse.json({ error: "config" }, { status: 500 });
    }
    console.log(`dry-run: would send to ${to ?? "(CONTACT_TO_EMAIL unset)"} subject="${SUBJECT}"`);
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      replyTo: email,
      subject: SUBJECT,
      text: buildBody({ name, email, phone, message }),
    });

    if (error) {
      console.error("contact form: resend error", error.message);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact form: unexpected send failure", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
