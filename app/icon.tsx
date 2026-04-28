import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Favicon — extends the site wordmark "fitbash." into a 64×64 mark.
 * Ink rounded square, bold lowercase "f" in white, coral signature dot
 * bottom-right. Renders via next/og Satori so no font asset is shipped.
 */
export default function Icon() {
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
          borderRadius: 14,
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: 52,
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
            bottom: 12,
            right: 12,
            width: 10,
            height: 10,
            borderRadius: 5,
            background: "#D94A2B",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
