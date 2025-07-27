import { Badge } from '@workspace/ui/components/badge'

import CustomCarousel from '@/components/custom-carousel'

// import type { PagebuilderType } from "@/types";

type ImageGalleryCarouselProps = {
  eyebrow: string
  title: string
  subtitle: string
  images: any[]
}

export function ImageGalleryCarousel({
  eyebrow,
  title,
  subtitle,
  images,
}: ImageGalleryCarouselProps) {
  return (
    <section id="image-carousel" className="my-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:text-center">
            {eyebrow && <Badge variant="secondary">{eyebrow}</Badge>}
            <h2 className="text-3xl font-semibold md:text-5xl">{title}</h2>
            <h3 className="text-lg font-normal text-[#374151] text-balance">{subtitle}</h3>
          </div>
        </div>
        <CustomCarousel images={images} />
      </div>
    </section>
  )
}
