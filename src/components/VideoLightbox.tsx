"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import { useReducedMotion } from "./GsapProvider";

/** How a given URL should be played, or `null` if it can only be linked to. */
export type VideoSource =
  | { kind: "iframe"; src: string }
  | { kind: "file"; src: string };

/**
 * Works out how to play a URL.
 *
 * - YouTube and Vimeo page links become privacy-friendly embeds.
 * - A direct media file — an MP4 uploaded to Sanity, or any other link ending
 *   in a video extension — plays in a native `<video>`, no third party at all.
 * - Anything else returns `null`: the caller links to it instead of opening an
 *   empty black box. Google Drive share links land here on purpose. Drive is
 *   not a video host: `/preview` embeds are rate-limited, carry Drive's own
 *   chrome and break when sharing changes, so the files belong in Sanity.
 */
export function toVideoSource(url: string): VideoSource | null {
  const youtube =
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/.exec(
      url
    );
  if (youtube) {
    return {
      kind: "iframe",
      src: `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1&rel=0&modestbranding=1`,
    };
  }

  const vimeo = /vimeo\.com\/(?:video\/)?(\d+)/.exec(url);
  if (vimeo) {
    return { kind: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1` };
  }

  if (/\.(mp4|webm|ogv|m4v)(\?|#|$)/i.test(url)) return { kind: "file", src: url };

  return null;
}

interface VideoLightboxProps {
  /** Page URL of the film, as pasted into Sanity. */
  url: string;
  /** Accessible name for the dialog and the iframe. */
  title: string;
  /** Trigger contents — the teacher card's play pill, or the About CTA label. */
  children: React.ReactNode;
  /** "cta" renders the site Button; "button" a bare button the caller styles. */
  as?: "button" | "cta";
  className?: string;
}

/**
 * Click-to-load video overlay. Nothing is requested from YouTube or Vimeo
 * until the trigger is pressed — the same bargain as `SoundCloudEmbed`, so a
 * page full of teacher cards costs no third-party requests on first paint.
 */
export default function VideoLightbox({
  url,
  title,
  children,
  as = "button",
  className = "",
}: VideoLightboxProps) {
  // The hero and section wrappers are GSAP-animated, so an ancestor nearly
  // always carries a transform — which would make a `fixed` overlay position
  // against that element instead of the viewport. The dialog is therefore
  // portalled to <body>. No mount guard is needed: `open` can only be set by a
  // click, so `createPortal` is never reached during the server render.
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  // Guards the backdrop's click-to-close. The overlay mounts under the cursor
  // mid-click, so the opening click's release can land on the backdrop and
  // shut it again straight away. Only a press that *started* on the backdrop
  // counts — and at the moment of the opening press it does not yet exist.
  const pressedBackdrop = useRef(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const labelId = useId();

  const source = toVideoSource(url);

  const close = useCallback(() => {
    setOpen(false);
    // Send focus back where it came from, or the keyboard user is dropped at
    // the top of the document.
    triggerRef.current?.querySelector("button")?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    // Freeze the page behind the overlay.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  // An unrecognised host can't be played in place, so the trigger becomes a
  // plain link to the film rather than a button that opens an empty black box.
  if (!source) {
    return (
      <div ref={triggerRef} className="contents">
        <a href={url} target="_blank" rel="noopener noreferrer" className={as === "cta" ? "" : className}>
          {as === "cta" ? <Button variant="outline">{children}</Button> : children}
        </a>
      </div>
    );
  }

  return (
    <div ref={triggerRef} className="contents">
      {as === "cta" ? (
        <Button variant="outline" onClick={() => setOpen(true)}>
          {children}
        </Button>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className={className}>
          {children}
        </button>
      )}

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            onMouseDown={(e) => {
              pressedBackdrop.current = e.target === e.currentTarget;
            }}
            onClick={(e) => {
              if (pressedBackdrop.current && e.target === e.currentTarget) close();
              pressedBackdrop.current = false;
            }}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-8 ${
              reduced ? "" : "animate-[fadeIn_200ms_ease-out]"
            }`}
          >
            <span id={labelId} className="sr-only">
              {title}
            </span>

            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close video"
              className="absolute top-4 right-4 md:top-6 md:right-6 size-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* An embed is locked to 16:9; a file we host sizes itself, so a
                portrait intro filmed on a phone isn't letterboxed to a sliver. */}
            <div
              className={`rounded-bl-[25px] rounded-tr-[25px] overflow-hidden bg-black ${
                source.kind === "iframe"
                  ? "w-full max-w-[min(1100px,92vw)] aspect-video"
                  : "max-w-[min(1100px,92vw)] max-h-[85vh]"
              }`}
            >
              {source.kind === "iframe" ? (
                <iframe
                  src={source.src}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                /* `preload="none"` is belt-and-braces — the element only exists
                   once the trigger is clicked, so nothing is fetched before. */
                <video
                  src={source.src}
                  title={title}
                  controls
                  autoPlay
                  playsInline
                  preload="none"
                  className="block max-w-full max-h-[85vh]"
                />
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
