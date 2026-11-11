"use client";

import { buttonVariants } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { cn } from "@workspace/ui/lib/utils";
import { CalendarPlus, Clock, ExternalLink, MapPin, Users } from "lucide-react";
import Link from "next/link";

import {
  type ClubEvent,
  categoryLabel,
  eventPath,
  formatAddress,
  formatEventWhenLong,
  mapsUrl,
} from "@/lib/events";
import { categoryStyle } from "./category";

export function EventDialog({
  event,
  onClose,
}: {
  event: ClubEvent | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={Boolean(event)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="border-t-[6px] border-cyan-brand">
        {event ? <EventDetails event={event} onClose={onClose} /> : null}
      </DialogContent>
    </Dialog>
  );
}

function EventDetails({
  event,
  onClose,
}: {
  event: ClubEvent;
  onClose: () => void;
}) {
  const when = formatEventWhenLong(event);
  const address = formatAddress(event.location);
  const directions = mapsUrl(event.location);
  const path = eventPath(event.slug);
  const cancelled = event.status === "cancelled";
  const postponed = event.status === "postponed";

  return (
    <div className="pr-8">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "label border-l-4 bg-water px-2.5 py-1 text-sm text-foreground",
            categoryStyle(event.category).bar,
          )}
        >
          {categoryLabel(event.category)}
        </span>
        {cancelled || postponed ? (
          <span className="label bg-destructive px-2.5 py-1 text-sm text-white">
            {cancelled ? "Cancelled" : "Postponed"}
          </span>
        ) : null}
      </div>

      <DialogTitle className={cn(cancelled && "line-through decoration-2")}>
        {event.title}
      </DialogTitle>
      {event.summary ? (
        <DialogDescription className="mt-2 text-lg text-seal-gray">
          {event.summary}
        </DialogDescription>
      ) : null}

      <dl className="mt-6 space-y-4 text-base">
        <div className="flex gap-3">
          <dt>
            <Clock aria-hidden className="mt-0.5 size-5 text-cyan-brand" />
            <span className="sr-only">When</span>
          </dt>
          <dd>
            <time
              dateTime={event.start ?? undefined}
              className="block font-semibold text-foreground"
            >
              {when.date}
            </time>
            {when.time ? (
              <span className="text-seal-gray">{when.time}</span>
            ) : null}
          </dd>
        </div>
        {event.location?.name || address ? (
          <div className="flex gap-3">
            <dt>
              <MapPin aria-hidden className="mt-0.5 size-5 text-cyan-brand" />
              <span className="sr-only">Where</span>
            </dt>
            <dd>
              {event.location?.name ? (
                <span className="block font-semibold text-foreground">
                  {event.location.name}
                </span>
              ) : null}
              {address ? (
                <span className="block text-seal-gray">{address}</span>
              ) : null}
              {directions ? (
                <a
                  href={directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-semibold text-cyan-brand underline underline-offset-4"
                >
                  Get directions
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </dd>
          </div>
        ) : null}
        {event.host ? (
          <div className="flex gap-3">
            <dt>
              <Users aria-hidden className="mt-0.5 size-5 text-cyan-brand" />
              <span className="sr-only">Hosted by</span>
            </dt>
            <dd className="text-foreground">Hosted by {event.host}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link
          href={path}
          onClick={onClose}
          className={buttonVariants({ size: "lg" })}
        >
          Event details
        </Link>
        {!cancelled ? (
          <a
            href={`${path}/calendar.ics`}
            download
            className={cn(buttonVariants({ variant: "secondary" }), "gap-2")}
          >
            <CalendarPlus aria-hidden className="size-4" />
            Add to calendar
          </a>
        ) : null}
        {event.link?.href ? (
          <a
            href={event.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "secondary" }), "gap-2")}
          >
            {event.linkLabel || "More information"}
            <ExternalLink aria-hidden className="size-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
