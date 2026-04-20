"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

// Next.js 15+ (React 19) throws a warning about next-themes injecting a script tag.
// This is a known harmless issue in next-themes. We suppress it in development to keep the console clean.
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag while rendering React component")
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="bare-metal"
      enableSystem={false}
      themes={["bare-metal", "corporate"]}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
