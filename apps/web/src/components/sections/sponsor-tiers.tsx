import { Star } from "lucide-react";

export type SponsorTierItem = {
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
  eyebrow,
  title = "Annual Sponsorship Levels",
  tiers,
}: SponsorTiersProps) {
  if (!tiers?.length) return null;

  return (
    <section className="bg-navy py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mb-14 text-center">
          {eyebrow ? (
            <p className="mb-2 font-display text-sm font-bold tracking-[0.2em] text-cyan-brand uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2
            className="font-display font-black uppercase tracking-wide text-transparent"
            style={{
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              WebkitTextStroke: "1px rgba(255,255,255,0.35)",
            }}
          >
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier) => {
            const email = tier.ctaEmail || "info@azsealsswimming.com";
            const subject = encodeURIComponent(
              `Sponsorship Inquiry — ${tier.name ?? "Package"}`,
            );
            return (
              <div
                key={tier._key ?? tier.name}
                className="flex flex-col rounded-xl border border-white/15 bg-white/5 p-6"
              >
                <h3 className="font-display text-xl font-bold text-white uppercase">
                  {tier.name}
                </h3>
                {tier.price ? (
                  <p className="mt-2 font-display text-3xl font-black text-cyan-brand">
                    {tier.price}
                  </p>
                ) : null}
                {tier.availability ? (
                  <p className="mt-1 text-xs tracking-wide text-white/50 uppercase">
                    {tier.availability}
                  </p>
                ) : null}
                {tier.perks?.length ? (
                  <ul className="mt-5 flex-1 space-y-2">
                    {tier.perks.filter(Boolean).map((perk) => (
                      <li
                        key={perk!}
                        className="flex items-start gap-2 text-sm text-white/75"
                      >
                        <Star
                          size={12}
                          className="mt-1 shrink-0 fill-cyan-brand text-cyan-brand"
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <a
                  href={`mailto:${email}?subject=${subject}`}
                  className="mt-6 inline-flex items-center justify-center rounded-md bg-cyan-brand px-4 py-2.5 font-display text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-[#0095CC]"
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
