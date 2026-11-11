import { trackClick } from "@workspace/analytics";
import { buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { Check } from "lucide-react";

export type SponsorTierItem = {
  _id?: string;
  _key?: string;
  name?: string | null;
  price?: string | null;
  availability?: string | null;
  perks?: (string | null)[] | null;
  ctaLabel?: string | null;
  ctaEmail?: string | null;
};

export type SponsorTiersProps = {
  eyebrow?: string | null;
  title?: string | null;
  tiers?: SponsorTierItem[] | null;
};

export function SponsorTiers({
  title = "Annual Sponsorship Levels",
  tiers,
}: SponsorTiersProps) {
  if (!tiers?.length) return null;

  return (
    <section className="on-dark bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mb-14 text-center">
          <h2 className="section-title text-white">{title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => {
            const email = tier.ctaEmail || "info@arizonaseals.com";
            const subject = encodeURIComponent(
              `Sponsorship Inquiry — ${tier.name ?? "Package"}`,
            );
            return (
              <div
                key={tier._id ?? tier._key ?? tier.name}
                className="flex flex-col border-t-[6px] border-pool bg-white/5 p-7"
              >
                <h3 className="text-3xl text-white">{tier.name}</h3>
                {tier.price ? (
                  <p className="display mt-3 text-5xl text-pool">
                    {tier.price}
                  </p>
                ) : null}
                {tier.availability ? (
                  <p className="mt-1 text-sm text-white/75">
                    {tier.availability}
                  </p>
                ) : null}
                {tier.perks?.length ? (
                  <ul className="mt-5 flex-1 space-y-2">
                    {tier.perks.filter(Boolean).map((perk) => (
                      <li
                        key={perk!}
                        className="flex items-start gap-2 text-base text-white/80"
                      >
                        <Check
                          aria-hidden
                          className="mt-1 size-4 shrink-0 text-pool"
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <a
                  href={`mailto:${email}?subject=${subject}`}
                  {...trackClick("sponsor_tier_selected", {
                    tier: tier.name ?? "",
                  })}
                  className={cn(buttonVariants({ size: "lg" }), "mt-7 w-full")}
                >
                  {tier.ctaLabel || `Choose ${tier.name}`}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
