import { PageHero } from "@/components/page-hero";

export default function TermsPage() {
  return (
    <main>
      <PageHero title="Terms of Use" subtitle="Website terms and conditions" />
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="leading-relaxed text-seal-gray">
            This terms of use page is a placeholder. Full terms for Arizona
            Seals Swimming will be published here.
          </p>
        </div>
      </section>
    </main>
  );
}
