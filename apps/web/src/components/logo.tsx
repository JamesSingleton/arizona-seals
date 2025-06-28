import Image from "next/image";
import Link from "next/link";
import { stegaClean } from "next-sanity";

import type { Maybe, SanityImageProps } from "@/types";

import { SanityImage } from "./sanity-image";

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
  alt = "logo",
  image,
  width = 170,
  height = 40,
  priority = true,
}: LogoProps) {
  return (
    <Link href="/" className="">
      {image ? (
        <SanityImage
          asset={image}
          alt={stegaClean(alt) ?? "logo"}
          // width={width}
          // height={height}
          className="w-[170px]"
          priority={priority}
          loading="eager"
          decoding="sync"
          quality={100}
        />
      ) : (
        <Image
          src={src ?? LOGO_URL}
          alt={stegaClean(alt) ?? "logo"}
          width={width}
          className="w-[170px]"
          height={height}
          loading="eager"
          priority={priority}
          decoding="sync"
        />
      )}
    </Link>
  );
}
