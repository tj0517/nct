"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";

const TRACK_URL = "https://soundcloud.com/anthony-goltz/brits-abroad-230715";
const SEEK_MS = 277100;

interface SCWidget {
  bind: (event: string, cb: () => void) => void;
  seekTo: (ms: number) => void;
}

declare global {
  interface Window {
    SC?: {
      Widget: {
        (iframe: HTMLIFrameElement): SCWidget;
        Events: { READY: string };
      };
    };
  }
}

export default function SoundCloudEmbed({ ctaLabel }: { ctaLabel: string }) {
  const [open, setOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!open) return;

    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.onload = () => {
      if (iframeRef.current && window.SC) {
        const widget = window.SC.Widget(iframeRef.current);
        widget.bind(window.SC.Widget.Events.READY, () => {
          widget.seekTo(SEEK_MS);
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [open]);

  if (!open) {
    return (
      <Button variant="filled" size="small" onClick={() => setOpen(true)}>
        {ctaLabel}
      </Button>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      title="Anthony on BBC Radio 4 — Brits Abroad"
      width="100%"
      height="166"
      allow="autoplay"
      src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(TRACK_URL)}&auto_play=true&color=%23c8102e&show_teaser=false`}
      className="rounded-lg"
    />
  );
}
