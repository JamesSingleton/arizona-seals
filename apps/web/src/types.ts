import type {
  QueryBlogSlugPageDataResult,
  QueryHomePageDataResult,
  QueryImageTypeResult,
} from "./lib/sanity/sanity.types";

/** Legacy generated block types + Seals CMS-ready blocks (TypeGen pending) */
export type SealsPageBuilderBlockTypes =
  | "splitContent"
  | "stats"
  | "programsPreview"
  | "latestNews"
  | "sponsorsMarquee"
  | "pageHero"
  | "timeline"
  | "contactInfo";

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
