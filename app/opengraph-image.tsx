import { ImageResponse } from "next/og";
import { SITE_NAME, TAGLINE } from "@/lib/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE_NAME} — ${TAGLINE}`;

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F4EEE2",
          color: "#161311",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div style={{ fontSize: 36, letterSpacing: -0.5, fontWeight: 500, display: "flex" }}>
          {SITE_NAME}
        </div>
        <div
          style={{
            fontSize: 76,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            fontWeight: 500,
            maxWidth: 980,
            display: "flex",
          }}
        >
          {TAGLINE}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            color: "#4A433D",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#D94A2B",
            }}
          />
          Two exercises. One duel. You decide.
        </div>
      </div>
    ),
    { ...size }
  );
}
