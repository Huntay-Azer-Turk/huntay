import { ImageResponse } from "next/og";
import { ogPhotoDataUri } from "./og-photo";

/**
 * Paylaşım görselleri (1200×630) için ortak çizici — ana sayfa, /services, hizmet sayfaları ve /book.
 * Font: next/og içindeki Geist (Türkçe karakterleri kapsar). Renkler: "Bare Metal" teması (app/globals.css).
 * Fotoğraf koda gömülü (lib/og-photo.ts): Cloudflare Workers’ta dosya sisteminden okuma yapılamıyor.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const colors = {
  bg: "#070a0f",
  card: "#0d1219",
  fg: "#e8edf5",
  muted: "#8b98ab",
  accent: "#22d3ee",
  border: "rgba(148, 163, 184, 0.22)",
};

type OgCard = {
  kicker: string;
  title: string;
  /** Vurgulu ikinci satır (accent rengi) */
  subtitle: string;
  /** Soluk üçüncü satır */
  tagline?: string;
  chips?: readonly string[];
};

export async function renderOgCard({ kicker, title, subtitle, tagline, chips = [] }: OgCard) {
  const photoSrc = ogPhotoDataUri;
  // Uzun hizmet başlıkları iki satıra sığsın diye font boyutu başlık uzunluğuna göre küçülür.
  const titleSize = title.length <= 18 ? 80 : title.length <= 34 ? 60 : 50;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "64px 72px",
          background: colors.bg,
          backgroundImage:
            "radial-gradient(circle at 18% 30%, rgba(34, 211, 238, 0.16), transparent 45%)",
          color: colors.fg,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og (Satori) yalnızca <img> destekler */}
        <img
          src={photoSrc}
          width={300}
          height={300}
          alt=""
          style={{ borderRadius: 9999, border: `4px solid ${colors.accent}`, objectFit: "cover" }}
        />
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 64, flex: 1 }}>
          <div style={{ fontSize: 24, letterSpacing: 4, color: colors.muted }}>{kicker}</div>
          <div style={{ fontSize: titleSize, lineHeight: 1.08, marginTop: 18 }}>{title}</div>
          <div style={{ fontSize: 34, marginTop: 22, color: colors.accent }}>{subtitle}</div>
          {tagline ? (
            <div style={{ fontSize: 28, marginTop: 10, color: colors.muted }}>{tagline}</div>
          ) : null}
          {chips.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 40 }}>
              {chips.map((chip) => (
                <div
                  key={chip}
                  style={{
                    display: "flex",
                    fontSize: 21,
                    padding: "9px 16px",
                    borderRadius: 12,
                    border: `1px solid ${colors.border}`,
                    background: colors.card,
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    ),
    ogSize,
  );
}
