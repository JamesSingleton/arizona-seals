"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";

const CustomCarousel = ({
  images,
}: {
  images: { src?: string | null; alt?: string | null }[];
}) => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const slides = images.filter((image) => Boolean(image.src));

  if (!slides.length) return null;

  return (
    <Carousel
      plugins={[plugin.current]}
      className="mx-auto w-full max-w-5xl"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {slides.map((image, index) => (
          <CarouselItem key={image.src ?? index}>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
              <Image
                src={image.src!}
                alt={image.alt ?? ""}
                fill
                sizes="(min-width: 1024px) 1000px, 100vw"
                className="object-cover"
                priority={index === 0}
                unoptimized
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CustomCarousel;
