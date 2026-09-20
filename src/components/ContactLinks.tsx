/* Messenger / Instagram / phone / email icon row used beside the contact form. */
export default function ContactLinks({ className = "" }: { className?: string }) {
  const link = "text-main/50 hover:text-accent-text transition-colors";
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <a href="https://m.me/anicecupoftea" target="_blank" rel="noopener noreferrer" aria-label="Messenger" className={link}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.37 2 2 6.13 2 11.7c0 2.96 1.2 5.5 3.16 7.3.16.15.26.36.27.58l.05 1.82c.02.56.6.93 1.11.7l2.04-.9c.17-.08.37-.1.55-.06.9.25 1.85.38 2.82.38 5.63 0 10-4.13 10-9.7S17.63 2 12 2zm5.95 7.57l-2.9 4.6c-.46.73-1.44.92-2.13.4l-2.3-1.73a.6.6 0 00-.72 0l-3.11 2.36c-.42.31-.96-.17-.7-.62l2.9-4.6c.46-.73 1.44-.92 2.13-.4l2.3 1.73a.6.6 0 00.72 0l3.11-2.36c.42-.31.96.17.7.62z"/>
        </svg>
      </a>
      <a href="https://instagram.com/anicecupoftea.pl" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={link}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="5"/>
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
        </svg>
      </a>
      <a href="tel:+48453374984" aria-label="Phone" className={link}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      </a>
      <a href="mailto:hello@anicecupoftea.pl" aria-label="Email" className={link}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </a>
    </div>
  );
}
