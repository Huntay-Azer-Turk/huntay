"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 px-4 py-24 font-sans text-zinc-100 antialiased">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            Error
          </p>
          <h1 className="mt-3 text-2xl font-semibold">Something went wrong</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Bir şeyler ters gitti. Sayfayı yenileyin veya tekrar deneyin.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-8 rounded-xl bg-teal-500 px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-teal-400"
          >
            Try again / Tekrar dene
          </button>
        </div>
      </body>
    </html>
  );
}
