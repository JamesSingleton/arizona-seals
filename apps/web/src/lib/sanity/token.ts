import "server-only";

/**
 * Optional until Sanity is connected. A placeholder keeps next-sanity's
 * defineLive generics intact so marketing routes typecheck without CMS env.
 */
export const token =
  process.env.SANITY_API_READ_TOKEN || "development-placeholder";
