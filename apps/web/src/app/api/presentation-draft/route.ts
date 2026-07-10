import { isSanityConfigured } from "@workspace/sanity/api";
import { client } from "@workspace/sanity/client";
import { NextResponse } from "next/server";
import { defineEnableDraftMode } from "next-sanity/draft-mode";

const token = process.env.SANITY_API_READ_TOKEN;
const hasRealToken = Boolean(token);

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
