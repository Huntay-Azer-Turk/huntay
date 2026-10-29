import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";

export const metadata: Metadata = {
  title: "Yönetim",
  robots: { index: false, follow: false },
};

/** /admin kendi <html>'ini taşır (site düzeni [locale] altında). Arama motorlarına kapalı. */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">{children}</body>
    </html>
  );
}
