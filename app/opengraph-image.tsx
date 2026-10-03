import { ImageResponse } from "next/og";
export const alt = "pixpassvisa.com — Passport photos. Ready for what’s next.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#f7f7f0", color: "#20372c", padding: "65px 80px", justifyContent: "space-between" }}>
    <div style={{ display: "flex", fontSize: 30 }}>pixpassvisa.com</div>
    <div style={{ display: "flex", flexDirection: "column", fontSize: 79, fontWeight: 600, letterSpacing: -4, lineHeight: 1.06 }}><span>Passport photos.</span><span>Ready for what’s next.</span></div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 23 }}><span>Photo preparation · Free automated checker</span><span style={{ background: "#d6f483", padding: "17px 25px", borderRadius: 9 }}>Start your next chapter →</span></div>
  </div>, size);
}
