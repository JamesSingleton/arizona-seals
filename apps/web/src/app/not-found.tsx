import { buttonVariants } from "@workspace/ui/components/button";
import Link from "next/link";

const helpfulLinks = [
  { label: "How tryouts work", href: "/tryouts" },
  { label: "Practice schedule & dues", href: "/schedule" },
  { label: "Training groups", href: "/programs" },
  { label: "Contact the club", href: "/contact" },
];

export default function NotFound() {
  return (
    <section data-hero className="on-dark bg-navy">
      <div className="mx-auto max-w-7xl px-6 pt-40 pb-20 sm:px-10 md:pb-28 lg:px-16">
        <h1
          className="display text-white"
          style={{ fontSize: "clamp(3.25rem, 9vw, 7.5rem)" }}
        >
          Wrong lane
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
          We couldn't find that page. It may have moved when the site was
          updated.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/" className={buttonVariants({ size: "xl" })}>
            Go to the home page
          </Link>
        </div>
        <nav aria-label="Popular pages" className="mt-14">
          <h2 className="mb-4 text-2xl text-white">Popular pages</h2>
          <ul className="flex flex-col gap-3">
            {helpfulLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-lg text-pool underline decoration-2 underline-offset-4 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
