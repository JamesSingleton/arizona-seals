import { NextResponse } from "next/server";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

import { isSanityConfigured } from "@/lib/sanity/api";
import { client } from "@/lib/sanity/client";
import { token } from "@/lib/sanity/token";

const hasRealToken =
  Boolean(process.env.SANITY_API_READ_TOKEN) &&
  token !== "development-placeholder";

const draftMode = hasRealToken
  ? defineEnableDraftMode({
      client: client.withConfig({ token }),
    })
  : null;

export async function GET(request: Request) {
  if (!isSanityConfigured || !draftMode) {
    return NextResponse.json(
      { message: "Sanity draft mode is not configured" },
      { status: 503 },
    );
  }
  return draftMode.GET(request);
}
