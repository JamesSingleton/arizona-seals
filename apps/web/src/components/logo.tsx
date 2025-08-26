import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@workspace/ui/lib/utils'

import type { Maybe, SanityImageProps } from '@/types'

import { SanityImage } from './elements/sanity-image'

const LOGO_URL =
  'https://cdn.sanity.io/images/nck2qq2n/production/91fe08287752bbb11f7155a6fc991309ce34edf1-2000x2000.png'

interface LogoProps {
  src?: Maybe<string>
  image?: Maybe<SanityImageProps>
  alt?: Maybe<string>
  width?: number
  height?: number
  priority?: boolean
  className?: string
}

export function Logo({
  src,
  alt = 'logo',
  image,
  width = 170,
  height = 40,
  priority = true,
  className,
}: LogoProps) {
  return (
    <Link href="/" className="">
      {image ? (
        <SanityImage
          image={image}
          alt={alt ?? 'logo'}
          // width={width}
          // height={height}
          className={cn('w-[170px]', className)}
          loading="eager"
          decoding="sync"
        />
      ) : (
        <Image
          src={src ?? LOGO_URL}
          alt={alt ?? 'logo'}
          width={width}
          className={cn('w-[170px] h-[40px]', className)}
          height={height}
          loading="eager"
          priority={priority}
          decoding="sync"
        />
      )}
    </Link>
  )
}
