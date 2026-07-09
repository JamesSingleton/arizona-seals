import { AboutPreview } from "@/components/sections/about-preview";
import { CtaFullBleed } from "@/components/sections/cta-full-bleed";
import { HeroFullBleed } from "@/components/sections/hero-full-bleed";
import { LatestNews } from "@/components/sections/latest-news";
import { ProgramsPreview } from "@/components/sections/programs-preview";
import { SponsorsMarquee } from "@/components/sections/sponsors-marquee";
import { StatsSection } from "@/components/sections/stats-section";

export default function HomePage() {
  return (
    <main>
      <HeroFullBleed />
      <AboutPreview />
      <ProgramsPreview />
      <StatsSection />
      <LatestNews />
      <SponsorsMarquee />
      <CtaFullBleed />
    </main>
  );
}
