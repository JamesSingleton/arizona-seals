import { PageHero } from "@/components/page-hero";

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        title="Privacy Policy"
        subtitle="How we handle your information"
      />
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="leading-relaxed text-seal-gray">
            This privacy policy page is a placeholder. Full privacy terms for
            Arizona Seals Swimming will be published here.
          </p>
        </div>
      </section>
    </main>
  );
}
