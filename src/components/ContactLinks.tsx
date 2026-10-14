import { telHref, type SiteDict } from "@/lib/site";

/* Facebook / Messenger / Instagram / phone / email icon row used beside the
   contact form. Every destination comes from `site`, so the footer, this row
   and the JSON-LD can never drift apart. */
export default function ContactLinks({
  site,
  className = "",
}: {
  site: SiteDict;
  className?: string;
}) {
  const link = "text-main/50 hover:text-accent-text transition-colors";
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={link}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z"/>
        </svg>
      </a>
      <a href={site.messenger} target="_blank" rel="noopener noreferrer" aria-label="Messenger" className={link}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.37 2 2 6.13 2 11.7c0 2.96 1.2 5.5 3.16 7.3.16.15.26.36.27.58l.05 1.82c.02.56.6.93 1.11.7l2.04-.9c.17-.08.37-.1.55-.06.9.25 1.85.38 2.82.38 5.63 0 10-4.13 10-9.7S17.63 2 12 2zm5.95 7.57l-2.9 4.6c-.46.73-1.44.92-2.13.4l-2.3-1.73a.6.6 0 00-.72 0l-3.11 2.36c-.42.31-.96-.17-.7-.62l2.9-4.6c.46-.73 1.44-.92 2.13-.4l2.3 1.73a.6.6 0 00.72 0l3.11-2.36c.42-.31.96.17.7.62z"/>
        </svg>
      </a>
      <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={link}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="5"/>
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
        </svg>
      </a>
      <a href={telHref(site.phone)} aria-label="Phone" className={link}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      </a>
      <a href={`mailto:${site.email}`} aria-label="Email" className={link}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </a>
    </div>
  );
}
