import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen icon — same mark as the favicon, scaled to 180×180.
 * Apple icons get rounded by iOS automatically, so we keep the corners
 * gentle rather than hard squircle.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#0F1A24",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 138,
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: "-0.05em",
          position: "relative",
        }}
      >
        f
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 32,
            right: 34,
            width: 26,
            height: 26,
            borderRadius: 13,
            background: "#D94A2B",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
