import { ImageResponse } from "next/og";

// PUBLIC_INTERFACE
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

/**
 * Generate a simple accent-colored favicon using Next.js OG image API.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "#10b981",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-0.02em",
          fontWeight: 700,
        }}
      >
        ✔
      </div>
    ),
    {
      ...size,
    }
  );
}
