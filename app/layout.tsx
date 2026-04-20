import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070a0f" },
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Huntay AzerTürk",
    template: "%s | Huntay AzerTürk",
  },
};

/** Passthrough: `<html>` / `<body>` live in `app/[locale]/layout.tsx` for correct `lang`. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
