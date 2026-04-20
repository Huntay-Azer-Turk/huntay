import { notFound } from "next/navigation";

/** Bilinmeyen alt yolları yakalar; `app/[locale]/not-found.tsx` gösterilir. */
export default function CatchAllLocalePaths() {
  notFound();
}
