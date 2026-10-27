import { profileImagePath } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * LinkedIn / WhatsApp / X / Slack paylaşımlarında görünen 1200×630 kart.
 * Build sırasında her dil için statik üretilir; font: next/og’un içindeki Geist (Türkçe karakterleri kapsar).
 */
export const alt = "Huntay AzerTürk — Software Architect · Cloud, AI & IoT";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const copy = {
  en: {
    role: "Software Architect · Engineering Leader",
    tagline: "Cloud · AI · IoT · Istanbul",
    chips: ["13+ years", "10,000+ IoT devices", "Up to 75% cloud savings"],
  },
  tr: {
    role: "Yazılım Mimarı · Mühendislik Lideri",
    tagline: "Bulut · Yapay Zeka · IoT · İstanbul",
    chips: ["13+ yıl", "10.000+ IoT cihazı", "%75'e varan bulut tasarrufu"],
  },
} as const;

// "Bare Metal" tema renkleri (app/globals.css)
const colors = {
  bg: "#070a0f",
  card: "#0d1219",
  fg: "#e8edf5",
  muted: "#8b98ab",
  accent: "#22d3ee",
  border: "rgba(148, 163, 184, 0.22)",
};

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const text = locale === "tr" ? copy.tr : copy.en;

  const photo = await readFile(join(process.cwd(), "public", profileImagePath), "base64");
  const photoSrc = `data:image/jpeg;base64,${photo}`;

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
        <img
          src={photoSrc}
          width={300}
          height={300}
          alt=""
          style={{
            borderRadius: 9999,
            border: `4px solid ${colors.accent}`,
            objectFit: "cover",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 64,
            flex: 1,
          }}
        >
          <div style={{ fontSize: 24, letterSpacing: 4, color: colors.muted }}>
            HUNTAYAZERTURK.COM
          </div>
          <div style={{ fontSize: 80, lineHeight: 1.05, marginTop: 18 }}>{siteConfig.name}</div>
          <div style={{ fontSize: 34, marginTop: 22, color: colors.accent }}>{text.role}</div>
          <div style={{ fontSize: 28, marginTop: 10, color: colors.muted }}>{text.tagline}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 40 }}>
            {text.chips.map((chip) => (
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
        </div>
      </div>
    ),
    size,
  );
}
