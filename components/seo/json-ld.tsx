/** JSON-LD <script>; `<` kaçışı Next.js JSON-LD rehberindeki XSS önlemidir. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
