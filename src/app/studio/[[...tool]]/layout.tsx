import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NCT Studio",
  robots: { index: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
