import { ImageResponse } from "next/og";

export const alt = "Archiloom Studio — Global Architecture & Design Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1D1D1D",
          color: "#FFFFFF",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ width: 18, height: 18, background: "#7ED957", marginTop: 28 }} />
          <div style={{ width: 18, height: 18, background: "#FFC857", marginTop: 14 }} />
          <div style={{ width: 18, height: 18, background: "#FFFFFF" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, letterSpacing: 6 }}>ARCHILOOM STUDIO</div>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -1.5, marginTop: 18, lineHeight: 1.05 }}>
            Designing exceptional spaces worldwide
          </div>
        </div>
        <div style={{ width: 40, height: 3, background: "#7ED957" }} />
      </div>
    ),
    { ...size },
  );
}
