import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET() {
  // Make sure the font exists in the specified path:
  const fontData = await fetch(
    new URL("../../../assets/font/Pretendard-ExtraBold.otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const imageData = (await fetch(
    new URL("../../../assets/logo/logo-outlined.png", import.meta.url)
  ).then((res) => res.arrayBuffer())) as string;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-.02em",
          background: "#c455f7",
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: "absolute",
            display: "flex",
            alignItems: "center",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <img width="256" height="256" src={imageData} alt="logo" />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "20px 40px",
              margin: "0 42px",
              fontSize: 40,
              width: "auto",
              maxWidth: 550,
              textAlign: "center",
              color: "white",
              lineHeight: 1.3,
              fontWeight: 800,
              fontFamily: "Pretendard-Bold",
              marginTop: "-28px",
            }}
          >
            전국의 모든 전기차 충전소
            <br /> 가장 빠르게 찾아보세요
          </div>
          <span
            style={{
              fontSize: 28,
              color: "white",
            }}
          >
            plug finder
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Pretendard-Bold",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
