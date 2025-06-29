import Image from "next/image";
import Link from "next/link";
import { stegaClean } from "next-sanity";

import type { Maybe, SanityImageProps } from "@/types";

import { SanityImage } from "./sanity-image";

// Arizona Seals Swimming Academy logo URL
const LOGO_URL =
  "https://cdn.sanity.io/images/nck2qq2n/production/91fe08287752bbb11f7155a6fc991309ce34edf1-2000x2000.png";

interface LogoProps {
  src?: Maybe<string>;
  image?: Maybe<SanityImageProps>;
  alt?: Maybe<string>;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function Logo({
  src,
  alt = "Arizona Seals Swimming Academy",
  image,
  width = 200,
  height = 50,
  priority = true,
}: LogoProps) {
  return (
    <Link href="/" className="flex items-center">
      {image ? (
        <SanityImage
          asset={image}
          alt={stegaClean(alt) ?? "Arizona Seals Swimming Academy"}
          className="w-[200px] h-auto"
          priority={priority}
          loading="eager"
          decoding="sync"
          quality={100}
        />
      ) : (
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-white"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-blue-900 dark:text-blue-100">
              Arizona Seals
            </span>
            <span className="text-sm text-blue-700 dark:text-blue-300 -mt-1">
              Swimming Academy
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}