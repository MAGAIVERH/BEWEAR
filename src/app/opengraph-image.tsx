import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt = "BEWEAR — Premium Streetwear & Sneakers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Personalized social preview: the hero photo with the BEWEAR wordmark and
// tagline (matches what visitors see on the site). Used for OG and Twitter.
export default async function Image() {
  const [hero, logoRaw] = await Promise.all([
    readFile(join(process.cwd(), "public", "hero-poster.jpg")),
    readFile(join(process.cwd(), "public", "logo.svg"), "utf-8"),
  ]);
  const heroSrc = `data:image/jpeg;base64,${hero.toString("base64")}`;
  const whiteLogo = logoRaw.replaceAll('fill="black"', 'fill="white"');
  const logoSrc = `data:image/svg+xml;base64,${Buffer.from(whiteLogo).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          alt=""
          width={size.width}
          height={size.height}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.05) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 70,
            display: "flex",
            flexDirection: "column",
            color: "white",
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#ff7a1a",
              fontWeight: 700,
            }}
          >
            New collection
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="BEWEAR"
            width={500}
            height={130}
            style={{ marginTop: 18, marginBottom: 10 }}
          />
          <div style={{ fontSize: 38, opacity: 0.92 }}>
            Built to move. Premium streetwear &amp; sneakers.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
