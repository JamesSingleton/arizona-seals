/* eslint-disable @next/next/no-img-element */
import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "@workspace/sanity/api";
import { client } from "@workspace/sanity/client";
import { queryOgData } from "@workspace/sanity/query";
import type { QueryOgDataResult } from "@workspace/sanity/types";
import { ImageResponse } from "next/og";

import { categoryLabel, formatEventWhen } from "@/lib/events";
import { getOgMetaData } from "./og-config";

/**
 * Share image (Open Graph / Twitter card) in the site's "Race Day" style:
 * a full-bleed club photo, the white logo, a heavy italic headline and a navy
 * scoreboard bar along the bottom. Events show their dates and venue there.
 */

const COLORS = {
  navy: "#0d2849",
  deep: "#061428",
  pool: "#5ec9f2",
  white: "#ffffff",
} as const;

const SITE = "arizonaseals.com";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Club photos used when a page has none of its own (Satori needs JPEG/PNG). */
const FALLBACK_PHOTOS = [
  "image-4853ac4449a8f1d89aa4d48bb5bc8338b243be1d-6000x4000-avif",
  "image-5eab7ec38166ec7e22db4124e92ff6db561278dc-6000x4000-avif",
  "image-809df70e47b9c4fa715daf212c690723f8eb4b78-2048x1365-avif",
  "image-916535f31cba5e8265d5731e23dcd027523653a5-2048x1323-avif",
];

const DEFAULT_LOGO =
  "https://cdn.sanity.io/images/nck2qq2n/production/e370d00c09aa0f969ea5dfd8eace06a8362141b8-2000x2000.webp";

function photoUrl(
  data: QueryOgDataResult,
  id: string,
  width: number,
  height: number,
) {
  const source = data?.image?.asset
    ? data.image
    : {
        asset: {
          _ref: FALLBACK_PHOTOS[
            [...id].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) %
              FALLBACK_PHOTOS.length
          ],
        },
      };
  return builder
    .image(source as Parameters<typeof builder.image>[0])
    .width(width)
    .height(height)
    .fit("crop")
    .format("jpg")
    .quality(82)
    .url();
}

/** Drop a trailing " | Arizona Seals…" so the headline is the page's own. */
function cleanTitle(title?: string | null) {
  const trimmed = (title ?? "").split(/\s+[|–—-]\s+Arizona Seals/i)[0]?.trim();
  return trimmed || "Arizona Seals Swimming";
}

/** Bigger type for shorter headlines, so one-word titles fill the frame. */
function headlineSize(text: string) {
  if (text.length <= 12) return 150;
  if (text.length <= 22) return 124;
  if (text.length <= 34) return 100;
  return 84;
}

function Card({
  data,
  photo,
  logo,
}: {
  data: QueryOgDataResult;
  photo: string;
  logo: string;
}) {
  const isHome = data?._type === "homePage";
  const isEvent = data?._type === "event";
  const title = cleanTitle(data?.title);
  const words = title.split(" ");
  // Home: "Arizona Seals" white, last word ("Swimming") in pool cyan.
  const lead =
    isHome && words.length > 1 ? words.slice(0, -1).join(" ") : title;
  const accent = isHome && words.length > 1 ? words.at(-1) : null;

  const barMain = isEvent
    ? formatEventWhen({
        _id: data._id,
        start: data.start,
        end: data.end,
        allDay: data.allDay,
      })
    : "Year-round competitive swim team";
  const barSub = isEvent
    ? [data.venue, data.city].filter(Boolean).join(" · ")
    : "Copper Sky · Maricopa, AZ";
  const tag = isEvent
    ? data.status === "cancelled"
      ? "Cancelled"
      : data.status === "postponed"
        ? "Postponed"
        : categoryLabel(data.category)
    : null;

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.deep,
        fontFamily: "Barlow",
      }}
    >
      <img
        src={photo}
        alt=""
        width={1200}
        height={630}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {/* Shade the left and bottom for the words; keep the photo bright on the right. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundImage: `linear-gradient(90deg, rgba(6,20,40,0.94) 0%, rgba(6,20,40,0.86) 42%, rgba(6,20,40,0.4) 72%, rgba(6,20,40,0.05) 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundImage: `linear-gradient(0deg, rgba(6,20,40,0.85) 0%, rgba(6,20,40,0) 50%)`,
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", padding: "44px 64px 0" }}>
          <img src={logo} alt="" width={116} height={116} />
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "flex-end",
            padding: "0 64px 40px",
            maxWidth: 1000,
          }}
        >
          {tag ? (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                marginBottom: 18,
                padding: "6px 14px",
                backgroundColor:
                  data?.status === "cancelled" || data?.status === "postponed"
                    ? "#b91c1c"
                    : COLORS.pool,
                color:
                  data?.status === "cancelled" || data?.status === "postponed"
                    ? COLORS.white
                    : COLORS.navy,
                fontFamily: "Barlow Condensed",
                fontWeight: 800,
                fontSize: 26,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              {tag}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              color: COLORS.white,
              fontFamily: "Barlow Condensed",
              fontStyle: "italic",
              fontWeight: 900,
              fontSize: headlineSize(title),
              lineHeight: 0.88,
              textTransform: "uppercase",
              letterSpacing: -1,
            }}
          >
            {lead}
            {accent ? (
              <span style={{ color: COLORS.pool, marginLeft: 24 }}>
                {accent}
              </span>
            ) : null}
          </div>
        </div>

        {/* Scoreboard bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 112,
            padding: "0 64px",
            backgroundColor: COLORS.navy,
            borderTop: `6px solid ${COLORS.pool}`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                color: COLORS.white,
                fontFamily: "Barlow Condensed",
                fontWeight: 800,
                fontSize: 36,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {barMain}
            </div>
            {barSub ? (
              <div
                style={{
                  display: "flex",
                  marginTop: 2,
                  color: "rgba(255,255,255,0.82)",
                  fontSize: 24,
                  fontWeight: 500,
                }}
              >
                {barSub}
              </div>
            ) : null}
          </div>
          <div
            style={{
              display: "flex",
              color: COLORS.pool,
              fontFamily: "Barlow Condensed",
              fontWeight: 800,
              fontSize: 30,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {SITE}
          </div>
        </div>
      </div>
    </div>
  );
}

async function googleFont(query: string): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${query}&display=swap`,
    // An old user agent makes Google serve TTF, which Satori can read.
    { headers: { "User-Agent": "Mozilla/5.0 Firefox/1.0" } },
  ).then((res) => res.text());
  const url = css.match(/url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error(`Font not found: ${query}`);
  return fetch(url).then((res) => res.arrayBuffer());
}

async function fonts() {
  const [display, displayBold, body, bodyStrong] = await Promise.all([
    googleFont("Barlow+Condensed:ital,wght@1,900"),
    googleFont("Barlow+Condensed:wght@800"),
    googleFont("Barlow:wght@500"),
    googleFont("Barlow:wght@600"),
  ]);
  return [
    {
      name: "Barlow Condensed",
      data: display,
      weight: 900 as const,
      style: "italic" as const,
    },
    {
      name: "Barlow Condensed",
      data: displayBold,
      weight: 800 as const,
      style: "normal" as const,
    },
    {
      name: "Barlow",
      data: body,
      weight: 500 as const,
      style: "normal" as const,
    },
    {
      name: "Barlow",
      data: bodyStrong,
      weight: 600 as const,
      style: "normal" as const,
    },
  ];
}

export async function GET({ url }: Request): Promise<ImageResponse> {
  const { searchParams } = new URL(url);
  const id = searchParams.get("id") ?? "homePage";
  const { width, height } = getOgMetaData(searchParams);
  const fontList = await fonts();

  let data: QueryOgDataResult = null;
  try {
    data = await client.fetch(queryOgData, { id });
  } catch (error) {
    console.error("[og] Sanity fetch failed", error);
  }

  const logo = `${data?.logo ?? DEFAULT_LOGO}?w=240&h=240&fit=max&fm=png`;
  const photo = photoUrl(data, id, width, height);

  return new ImageResponse(<Card data={data} photo={photo} logo={logo} />, {
    width,
    height,
    fonts: fontList,
  });
}
