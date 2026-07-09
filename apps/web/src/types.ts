import type {
  QueryBlogSlugPageDataResult,
  QueryHomePageDataResult,
  QueryImageTypeResult,
} from "@workspace/sanity/types";

/** Seals CMS blocks not yet present in generated QueryHomePageDataResult */
export type SealsPageBuilderBlockTypes =
  | "splitContent"
  | "stats"
  | "programsPreview"
  | "programsList"
  | "latestNews"
  | "sponsorsMarquee"
  | "sponsorsHero"
  | "sponsorTiers"
  | "sponsorsGrid"
  | "checklistSplit"
  | "pageHero"
  | "timeline"
  | "contactInfo"
  | "facilitiesList"
  | "team"
  | "featureCardsIcon"
  | "cta";

export type PageBuilderBlockTypes =
  | NonNullable<
      NonNullable<QueryHomePageDataResult>["pageBuilder"]
    >[number]["_type"]
  | SealsPageBuilderBlockTypes;

export type PagebuilderType<T extends PageBuilderBlockTypes> = Extract<
  NonNullable<NonNullable<QueryHomePageDataResult>["pageBuilder"]>[number],
  { _type: T }
>;

export type SanityButtonProps = NonNullable<
  NonNullable<PagebuilderType<"hero">>["buttons"]
>[number];

export type SanityImageProps = NonNullable<QueryImageTypeResult>;

export type SanityRichTextProps =
  NonNullable<QueryBlogSlugPageDataResult>["richText"];

export type SanityRichTextBlock = Extract<
  NonNullable<NonNullable<SanityRichTextProps>[number]>,
  { _type: "block" }
>;

export type Maybe<T> = T | null | undefined;
