"use client";

import { useOptimistic } from "@sanity/visual-editing/react";
import { dataset, projectId, studioUrl } from "@workspace/sanity/api";
import type { QueryHomePageDataResult } from "@workspace/sanity/types";
import { cn } from "@workspace/ui/lib/utils";
import dynamic from "next/dynamic";
import { createDataAttribute } from "next-sanity";
import { useCallback, useMemo } from "react";

import type { PageBuilderBlockTypes, PagebuilderType } from "@/types";

/** Heavy blocks — code-split so published pages don't load every section upfront. */
const AboutPreview = dynamic(() =>
  import("./sections/about-preview").then((m) => m.AboutPreview),
);
const ChecklistSplit = dynamic(() =>
  import("./sections/checklist-split").then((m) => m.ChecklistSplit),
);
const ContactInfoBlock = dynamic(() =>
  import("./sections/contact-info").then((m) => m.ContactInfoBlock),
);
const CTABlock = dynamic(() =>
  import("./sections/cta").then((m) => m.CTABlock),
);
const FacilitiesList = dynamic(() =>
  import("./sections/facilities-list").then((m) => m.FacilitiesList),
);
const FaqAccordion = dynamic(() =>
  import("./sections/faq-accordion").then((m) => m.FaqAccordion),
);
const FeatureCardsWithIcon = dynamic(() =>
  import("./sections/feature-cards-with-icon").then(
    (m) => m.FeatureCardsWithIcon,
  ),
);
const HeroBlock = dynamic(() =>
  import("./sections/hero").then((m) => m.HeroBlock),
);
const ImageLinkCards = dynamic(() =>
  import("./sections/image-link-cards").then((m) => m.ImageLinkCards),
);
const LatestNews = dynamic(() =>
  import("./sections/latest-news").then((m) => m.LatestNews),
);
const PageHeroBlock = dynamic(() =>
  import("./sections/page-hero-block").then((m) => m.PageHeroBlock),
);
const ProgramsList = dynamic(() =>
  import("./sections/programs-list").then((m) => m.ProgramsList),
);
const ProgramsPreview = dynamic(() =>
  import("./sections/programs-preview").then((m) => m.ProgramsPreview),
);
const ResourcesBlock = dynamic(() =>
  import("./sections/resources").then((m) => m.ResourcesBlock),
);
const SponsorTiers = dynamic(() =>
  import("./sections/sponsor-tiers").then((m) => m.SponsorTiers),
);
const SponsorsGrid = dynamic(() =>
  import("./sections/sponsors-grid").then((m) => m.SponsorsGrid),
);
const SponsorsHero = dynamic(() =>
  import("./sections/sponsors-hero").then((m) => m.SponsorsHero),
);
const SponsorsMarquee = dynamic(() =>
  import("./sections/sponsors-marquee").then((m) => m.SponsorsMarquee),
);
const StatsSection = dynamic(() =>
  import("./sections/stats-section").then((m) => m.StatsSection),
);
const SubscribeNewsletter = dynamic(() =>
  import("./sections/subscribe-newsletter").then((m) => m.SubscribeNewsletter),
);
const TeamBlock = dynamic(() =>
  import("./sections/team").then((m) => m.TeamBlock),
);
const Timeline = dynamic(() =>
  import("./sections/timeline").then((m) => m.Timeline),
);

type PageBuilderBlock = NonNullable<
  NonNullable<QueryHomePageDataResult>["pageBuilder"]
>[number] & {
  _type: PageBuilderBlockTypes;
  layout?: string;
  variant?: string;
};

export interface PageBuilderProps {
  readonly pageBuilder?: PageBuilderBlock[];
  readonly id: string;
  readonly type: string;
}

interface SanityDataAttributeConfig {
  readonly id: string;
  readonly type: string;
  readonly path: string;
}

/** Blocks that must span the full viewport width (no max-w-7xl wrapper). */
const FULL_BLEED_TYPES = new Set<string>([
  "hero",
  "cta",
  "pageHero",
  "sponsorsMarquee",
  "sponsorsHero",
  "sponsorTiers",
  "sponsorsGrid",
  "checklistSplit",
  "stats",
  "latestNews",
  "programsPreview",
  "programsList",
  "splitContent",
  "timeline",
  "contactInfo",
  "facilitiesList",
  "team",
  "featureCardsIcon",
]);

const BLOCK_COMPONENTS = {
  cta: CTABlock as React.ComponentType<PagebuilderType<"cta">>,
  faqAccordion: FaqAccordion as React.ComponentType<
    PagebuilderType<"faqAccordion">
  >,
  hero: HeroBlock as React.ComponentType<PagebuilderType<"hero">>,
  featureCardsIcon: FeatureCardsWithIcon as React.ComponentType<
    PagebuilderType<"featureCardsIcon">
  >,
  subscribeNewsletter: SubscribeNewsletter as React.ComponentType<
    PagebuilderType<"subscribeNewsletter">
  >,
  imageLinkCards: ImageLinkCards as React.ComponentType<
    PagebuilderType<"imageLinkCards">
  >,
  team: TeamBlock as React.ComponentType<any>,
  resources: ResourcesBlock as React.ComponentType<
    PagebuilderType<"resources">
  >,
  splitContent: AboutPreview as React.ComponentType<any>,
  stats: StatsSection as React.ComponentType<any>,
  programsPreview: ProgramsPreview as React.ComponentType<any>,
  programsList: ProgramsList as React.ComponentType<any>,
  latestNews: LatestNews as React.ComponentType<any>,
  sponsorsMarquee: SponsorsMarquee as React.ComponentType<any>,
  sponsorsHero: SponsorsHero as React.ComponentType<any>,
  sponsorTiers: SponsorTiers as React.ComponentType<any>,
  sponsorsGrid: SponsorsGrid as React.ComponentType<any>,
  checklistSplit: ChecklistSplit as React.ComponentType<any>,
  pageHero: PageHeroBlock as React.ComponentType<any>,
  timeline: Timeline as React.ComponentType<any>,
  contactInfo: ContactInfoBlock as React.ComponentType<any>,
  facilitiesList: FacilitiesList as React.ComponentType<any>,
} as const;

function createSanityDataAttribute(config: SanityDataAttributeConfig): string {
  return createDataAttribute({
    id: config.id,
    baseUrl: studioUrl,
    projectId,
    dataset,
    type: config.type,
    path: config.path,
  }).toString();
}

function UnknownBlockError({
  blockType,
  blockKey,
}: {
  blockType: string;
  blockKey: string;
}) {
  return (
    <div
      key={`${blockType}-${blockKey}`}
      className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted p-8 text-center text-muted-foreground"
      role="alert"
      aria-label={`Unknown block type: ${blockType}`}
    >
      <div className="space-y-2">
        <p>Component not found for block type:</p>
        <code className="rounded bg-background px-2 py-1 font-mono text-sm">
          {blockType}
        </code>
      </div>
    </div>
  );
}

function useOptimisticPageBuilder(
  initialBlocks: PageBuilderBlock[],
  documentId: string,
) {
  return useOptimistic<PageBuilderBlock[], any>(
    initialBlocks,
    (currentBlocks, action) => {
      if (action.id === documentId && action.document?.pageBuilder) {
        return action.document.pageBuilder;
      }
      return currentBlocks;
    },
  );
}

function isFullBleedBlock(block: PageBuilderBlock): boolean {
  if (FULL_BLEED_TYPES.has(block._type)) return true;
  const variant = "variant" in block ? String(block.variant ?? "") : "";
  const layout = "layout" in block ? String(block.layout ?? "") : "";
  if (
    block._type === "hero" &&
    (variant === "immersive" ||
      variant === "fullBleed" ||
      layout === "fullBleed")
  ) {
    return true;
  }
  if (block._type === "cta" && layout === "fullBleed") return true;
  return false;
}

function useBlockRenderer(id: string, type: string) {
  const createBlockDataAttribute = useCallback(
    (blockKey: string) =>
      createSanityDataAttribute({
        id,
        type,
        path: `pageBuilder[_key=="${blockKey}"]`,
      }),
    [id, type],
  );

  const renderBlock = useCallback(
    (block: PageBuilderBlock) => {
      const Component =
        BLOCK_COMPONENTS[block._type as keyof typeof BLOCK_COMPONENTS];

      if (!Component) {
        return (
          <UnknownBlockError
            key={`${block._type}-${block._key}`}
            blockType={block._type}
            blockKey={block._key}
          />
        );
      }

      const fullBleed = isFullBleedBlock(block);

      return (
        <div
          key={`${block._type}-${block._key}`}
          data-sanity={createBlockDataAttribute(block._key)}
          className={cn(!fullBleed && "mx-auto w-full max-w-7xl")}
        >
          <Component {...(block as any)} />
        </div>
      );
    },
    [createBlockDataAttribute],
  );

  return { renderBlock };
}

export function PageBuilder({
  pageBuilder: initialBlocks = [],
  id,
  type,
}: PageBuilderProps) {
  const blocks = useOptimisticPageBuilder(initialBlocks, id);
  const { renderBlock } = useBlockRenderer(id, type);

  const containerDataAttribute = useMemo(
    () => createSanityDataAttribute({ id, type, path: "pageBuilder" }),
    [id, type],
  );

  if (!blocks.length) {
    return null;
  }

  return (
    <div
      className="flex flex-col"
      data-sanity={containerDataAttribute}
      aria-label="Page content"
    >
      {blocks.map(renderBlock)}
    </div>
  );
}
