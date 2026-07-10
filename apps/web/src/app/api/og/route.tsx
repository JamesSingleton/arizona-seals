/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import type { ImageResponseOptions } from "next/server";

import type { Maybe } from "@/types";
import { getOgMetaData } from "./og-config";
import {
  getBlogPageOGData,
  getGenericPageOGData,
  getHomePageOGData,
  getSlugPageOGData,
} from "./og-data";

const BRAND = {
  navy: "#1b3a6b",
  navyDeep: "#0f2447",
  cyan: "#5ec9f2",
  cyanDeep: "#00abe2",
  white: "#ffffff",
  muted: "rgba(255,255,255,0.72)",
} as const;

type SeoImageRenderProps = {
  seoImage: string;
};

type ContentProps = Record<string, string>;

type BrandOgRenderProps = {
  image?: Maybe<string>;
  title?: Maybe<string>;
  logo?: Maybe<string>;
  date?: Maybe<string>;
  _type?: Maybe<string>;
  description?: Maybe<string>;
};

const errorContent = (
  <div
    tw="flex h-full w-full flex-col items-center justify-center"
    style={{ backgroundColor: BRAND.navy }}
  >
    <div tw="flex flex-col items-center px-16 text-center">
      <div tw="mb-6 h-1 w-24" style={{ backgroundColor: BRAND.cyan }} />
      <h1
        tw="text-5xl font-bold uppercase tracking-wide text-white"
        style={{ fontFamily: "Barlow Condensed" }}
      >
        Arizona Seals Swimming
      </h1>
    </div>
  </div>
);

const seoImageRender = ({ seoImage }: SeoImageRenderProps) => (
  <div tw="flex h-full w-full items-center justify-center">
    <img src={seoImage} alt="" width={1200} height={630} />
  </div>
);

function formatDate(value?: Maybe<string>) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function eyebrowForType(_type?: Maybe<string>) {
  if (_type === "blog") return "News";
  if (_type === "homePage") return "Arizona Seals Swimming";
  return "Arizona Seals";
}

function Wordmark({ logo }: { logo?: Maybe<string> }) {
  if (logo) {
    return (
      <img
        src={logo}
        alt="Arizona Seals"
        height={52}
        style={{ objectFit: "contain" }}
      />
    );
  }

  return (
    <div tw="flex flex-col">
      <span
        tw="text-3xl font-extrabold uppercase leading-none tracking-[0.08em] text-white"
        style={{ fontFamily: "Barlow Condensed" }}
      >
        Arizona Seals
      </span>
      <span
        tw="mt-1 text-sm font-bold uppercase tracking-[0.28em]"
        style={{ color: BRAND.cyan, fontFamily: "Barlow Condensed" }}
      >
        Swimming
      </span>
    </div>
  );
}

const brandOgRender = ({
  image,
  title,
  logo,
  date,
  description,
  _type,
}: BrandOgRenderProps) => {
  const formattedDate = formatDate(date);
  const eyebrow = eyebrowForType(_type);
  const displayTitle =
    title?.trim() ||
    (_type === "homePage" ? "Arizona Seals Swimming" : "Arizona Seals");

  return (
    <div
      tw="relative flex h-full w-full overflow-hidden"
      style={{ backgroundColor: BRAND.navyDeep, fontFamily: "Inter" }}
    >
      {image ? (
        <img
          src={image}
          alt=""
          width={1200}
          height={630}
          tw="absolute left-0 top-0 h-full w-full"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      ) : null}

      <div
        tw="absolute left-0 top-0 h-full w-full"
        style={{
          background: image
            ? `linear-gradient(105deg, ${BRAND.navyDeep} 0%, ${BRAND.navyDeep}f2 40%, ${BRAND.navy}aa 70%, ${BRAND.navy}66 100%)`
            : `linear-gradient(135deg, ${BRAND.navyDeep} 0%, ${BRAND.navy} 55%, #163a6e 100%)`,
        }}
      />

      <div
        tw="absolute left-0 top-0 h-2 w-full"
        style={{ backgroundColor: BRAND.cyanDeep }}
      />

      {!image ? (
        <div
          tw="absolute left-0 top-0 h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse at 85% 15%, rgba(94,201,242,0.18) 0%, transparent 55%)",
          }}
        />
      ) : null}

      <div tw="relative flex h-full w-full flex-col justify-between px-16 py-14">
        <div tw="flex w-full items-center justify-between">
          <Wordmark logo={logo} />
          {formattedDate ? (
            <div
              tw="flex items-center text-lg tracking-wide"
              style={{ color: BRAND.muted, fontFamily: "Inter" }}
            >
              {formattedDate}
            </div>
          ) : null}
        </div>

        <div tw="flex max-w-[920px] flex-col">
          <div tw="mb-5 flex items-center">
            <div tw="mr-4 h-1 w-12" style={{ backgroundColor: BRAND.cyan }} />
            <span
              tw="text-xl font-bold uppercase tracking-[0.22em]"
              style={{ color: BRAND.cyan, fontFamily: "Barlow Condensed" }}
            >
              {eyebrow}
            </span>
          </div>

          <h1
            tw="text-[72px] font-extrabold uppercase leading-[0.95] tracking-wide text-white"
            style={{
              fontFamily: "Barlow Condensed",
              lineClamp: 3,
            }}
          >
            {displayTitle}
          </h1>

          {description ? (
            <p
              tw="mt-6 max-w-[780px] text-2xl leading-snug"
              style={{
                color: BRAND.muted,
                fontFamily: "Inter",
                lineClamp: 2,
              }}
            >
              {description}
            </p>
          ) : null}
        </div>

        <div tw="flex w-full items-end justify-between">
          <div
            tw="text-lg font-bold uppercase tracking-[0.18em]"
            style={{ color: BRAND.cyan, fontFamily: "Barlow Condensed" }}
          >
            Competitive Swimming · Maricopa, AZ
          </div>
          <div tw="h-1 w-24" style={{ backgroundColor: BRAND.cyanDeep }} />
        </div>
      </div>
    </div>
  );
};

async function getTtfFont(
  family: string,
  axes: string[],
  value: number[],
): Promise<ArrayBuffer> {
  const familyParam = `${axes.join(",")}@${value.join(",")}`;

  const cssCall = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:${familyParam}&display=swap`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 Firefox/1.0",
      },
    },
  );

  const css = await cssCall.text();
  const ttfUrl = css.match(/url\(([^)]+)\)/)?.[1];

  if (!ttfUrl) {
    throw new Error("Failed to extract font URL from CSS");
  }

  return await fetch(ttfUrl).then((res) => res.arrayBuffer());
}

const getOptions = async ({
  width,
  height,
}: {
  width: number;
  height: number;
}): Promise<ImageResponseOptions> => {
  const [interRegular, interSemiBold, barlowBold, barlowExtraBold] =
    await Promise.all([
      getTtfFont("Inter", ["wght"], [400]),
      getTtfFont("Inter", ["wght"], [600]),
      getTtfFont("Barlow%20Condensed", ["wght"], [700]),
      getTtfFont("Barlow%20Condensed", ["wght"], [800]),
    ]);

  return {
    width,
    height,
    fonts: [
      {
        name: "Inter",
        data: interRegular,
        style: "normal",
        weight: 400,
      },
      {
        name: "Inter",
        data: interSemiBold,
        style: "normal",
        weight: 600,
      },
      {
        name: "Barlow Condensed",
        data: barlowBold,
        style: "normal",
        weight: 700,
      },
      {
        name: "Barlow Condensed",
        data: barlowExtraBold,
        style: "normal",
        weight: 800,
      },
    ],
  };
};

const getHomePageContent = async ({ id }: ContentProps) => {
  if (!id) return undefined;
  const [result, err] = await getHomePageOGData(id);
  if (err || !result) return undefined;
  if (result?.seoImage) return seoImageRender({ seoImage: result.seoImage });
  return brandOgRender(result);
};

const getSlugPageContent = async ({ id }: ContentProps) => {
  if (!id) return undefined;
  const [result, err] = await getSlugPageOGData(id);
  if (err || !result) return undefined;
  if (result?.seoImage) return seoImageRender({ seoImage: result.seoImage });
  return brandOgRender(result);
};

const getBlogPageContent = async ({ id }: ContentProps) => {
  if (!id) return undefined;
  const [result, err] = await getBlogPageOGData(id);
  if (err || !result) return undefined;
  if (result?.seoImage) return seoImageRender({ seoImage: result.seoImage });
  return brandOgRender(result);
};

const getGenericPageContent = async ({ id }: ContentProps) => {
  if (!id) return undefined;
  const [result, err] = await getGenericPageOGData(id);
  if (err || !result) return undefined;
  if (result?.seoImage) return seoImageRender({ seoImage: result.seoImage });
  return brandOgRender(result);
};

const block = {
  homePage: getHomePageContent,
  page: getSlugPageContent,
  blog: getBlogPageContent,
} as const;

export async function GET({ url }: Request): Promise<ImageResponse> {
  const { searchParams } = new URL(url);
  const type = searchParams.get("type") as keyof typeof block;
  const { width, height } = getOgMetaData(searchParams);
  const para = Object.fromEntries(searchParams.entries());
  const options = await getOptions({ width, height });
  const image = block[type] ?? getGenericPageContent;
  try {
    const content = await image(para);
    return new ImageResponse(content ? content : errorContent, options);
  } catch (err) {
    console.log({ err });
    return new ImageResponse(errorContent, options);
  }
}
