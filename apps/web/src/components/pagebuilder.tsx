"use client";

import { useOptimistic } from "@sanity/visual-editing/react";
import { dataset, projectId, studioUrl } from "@workspace/sanity/api";
import type { QueryHomePageDataResult } from "@workspace/sanity/types";
import { cn } from "@workspace/ui/lib/utils";
import { createDataAttribute } from "next-sanity";
import { useCallback, useMemo } from "react";

import type { PageBuilderBlockTypes, PagebuilderType } from "@/types";
import { AboutPreview } from "./sections/about-preview";
import { ChecklistSplit } from "./sections/checklist-split";
import { ContactInfoBlock } from "./sections/contact-info";
import { CTABlock } from "./sections/cta";
import { FacilitiesList } from "./sections/facilities-list";
import { FaqAccordion } from "./sections/faq-accordion";
import { FeatureCardsWithIcon } from "./sections/feature-cards-with-icon";
import { HeroBlock } from "./sections/hero";
import { ImageLinkCards } from "./sections/image-link-cards";
import { LatestNews } from "./sections/latest-news";
import { PageHeroBlock } from "./sections/page-hero-block";
import { ProgramsList } from "./sections/programs-list";
import { ProgramsPreview } from "./sections/programs-preview";
import { SponsorTiers } from "./sections/sponsor-tiers";
import { SponsorsGrid } from "./sections/sponsors-grid";
import { SponsorsHero } from "./sections/sponsors-hero";
import { SponsorsMarquee } from "./sections/sponsors-marquee";
import { StatsSection } from "./sections/stats-section";
import { SubscribeNewsletter } from "./sections/subscribe-newsletter";
import { TeamBlock } from "./sections/team";
import { Timeline } from "./sections/timeline";

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
