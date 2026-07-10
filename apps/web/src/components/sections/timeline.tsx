"use client";

import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent, CardTitle } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useRef, useState } from "react";

export type TimelineItem = {
  _key?: string;
  year?: string | null;
  title?: string | null;
  description?: string | null;
  event?: string | null;
};

export type TimelineProps = {
  eyebrow?: string | null;
  title?: string | null;
  items?: TimelineItem[] | null;
};

function normalizeItem(item: TimelineItem) {
  return {
    key: item._key ?? `${item.year}-${item.title}`,
    year: item.year ?? "",
    title: item.title ?? item.year ?? "",
    description: item.description ?? item.event ?? "",
  };
}

export function Timeline({
  eyebrow = "Where We've Been",
  title = "Club History",
  items,
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [progressHeight, setProgressHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const normalized = items?.map(normalizeItem) ?? [];

  useEffect(() => {
    const container = containerRef.current;
    if (!container || normalized.length === 0) return;

    const dots = Array.from(
      container.querySelectorAll<HTMLElement>("[data-timeline-dot]"),
    );

    const update = () => {
      const first = dots[0];
      const last = dots[dots.length - 1];
      if (!first || !last) return;

      const firstCenter =
        first.getBoundingClientRect().top +
        window.scrollY +
        first.offsetHeight / 2;
      const lastCenter =
        last.getBoundingClientRect().top +
        window.scrollY +
        last.offsetHeight / 2;

      const total = Math.max(lastCenter - firstCenter, 0);
      setLineHeight(total);

      const anchor = window.scrollY + window.innerHeight * 0.4;
      const filled = Math.min(Math.max(anchor - firstCenter, 0), total);
      setProgressHeight(filled);

      let nextActive = 0;
      dots.forEach((dot, index) => {
        const center =
          dot.getBoundingClientRect().top +
          window.scrollY +
          dot.offsetHeight / 2;
        if (center <= anchor + 8) nextActive = index;
      });
      setActiveIndex(nextActive);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [normalized.length]);

  if (!normalized.length) return null;

  return (
    <section className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
            {eyebrow}
          </p>
          <h2 className="font-display text-4xl font-bold text-balance text-foreground uppercase md:text-5xl">
            {title}
          </h2>
        </div>

        <div
          ref={containerRef}
          className="relative mx-auto max-w-7xl space-y-4"
        >
          {normalized.map((item, index) => {
            const isLeft = index % 2 === 0;
            const isActive = index <= activeIndex;

            return (
              <div
                key={item.key}
                data-timeline-item="true"
                className={cn(
                  "flex items-start",
                  isLeft ? "md:flex-row" : "md:flex-row-reverse",
                )}
              >
                <div
                  className={cn(
                    "hidden w-full md:flex md:flex-1 md:items-start",
                    isLeft ? "md:justify-end" : "md:justify-start",
                  )}
                >
                  <Badge
                    className={cn(
                      "h-6.5 transform rounded-sm text-sm font-medium transition-colors duration-300",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    {item.year}
                  </Badge>
                </div>

                <div className="relative flex flex-col items-center pr-4 md:px-4">
                  <div
                    data-timeline-dot="true"
                    className="sticky top-40 z-40 flex items-center justify-center"
                  >
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                        isActive ? "bg-primary/10" : "bg-muted",
                      )}
                    >
                      <span
                        className={cn(
                          "size-3 rounded-full transition-colors duration-300",
                          isActive ? "bg-primary" : "bg-muted-foreground",
                        )}
                      />
                    </span>
                  </div>
                </div>

                <div
                  className={cn(
                    "w-full md:flex md:flex-1",
                    isLeft ? "md:justify-start" : "md:justify-end",
                  )}
                >
                  <Badge
                    className={cn(
                      "mb-4 h-6.5 rounded-sm text-sm font-medium transition-colors duration-300 md:hidden",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    {item.year}
                  </Badge>

                  <Card className="mb-8 overflow-hidden md:max-w-136">
                    <CardContent className="space-y-2">
                      <CardTitle className="font-display text-lg font-medium md:text-xl lg:text-2xl">
                        {item.title}
                      </CardTitle>
                      <p className="text-base text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}

          <div
            className="absolute top-3 left-3 w-0.5 overflow-hidden bg-border md:left-1/2 md:-translate-x-1/2"
            style={{ height: lineHeight }}
          >
            <div
              className="absolute inset-x-0 top-0 w-0.5 rounded-full bg-primary transition-[height] duration-150 ease-out"
              style={{ height: progressHeight }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
