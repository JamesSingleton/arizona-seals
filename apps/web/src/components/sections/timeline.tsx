export type TimelineItem = {
  _key?: string;
  year?: string | null;
  title?: string | null;
  description?: string | null;
  event?: string | null;
};

export type TimelineProps = {
  eyebrow?: string | null;
  title?: string | null;
  items?: TimelineItem[] | null;
};

function normalizeItem(item: TimelineItem) {
  return {
    key: item._key ?? `${item.year}-${item.title}`,
    year: item.year ?? "",
    title: item.title ?? item.year ?? "",
    description: item.description ?? item.event ?? "",
  };
}

/**
 * Club history set like a season results sheet: the heading stays put on
 * wide screens while the years scroll past, one ruled row per milestone.
 */
export function Timeline({ title = "Club History", items }: TimelineProps) {
  const rows = items?.map(normalizeItem).filter((row) => row.title) ?? [];
  if (!rows.length) return null;

  const first = rows[0]?.year;
  const last = rows[rows.length - 1]?.year;

  return (
    <section className="bg-water py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 className="section-title text-foreground">{title}</h2>
            {first && last && first !== last ? (
              <p className="display mt-6 text-5xl text-cyan-brand tabular-nums">
                {first}
                <span aria-hidden> – </span>
                <span className="sr-only"> to </span>
                {last}
              </p>
            ) : null}
          </div>
        </div>

        <ol className="lg:col-span-8">
          {rows.map((row) => (
            <li
              key={row.key}
              className="grid grid-cols-[4.5rem_1fr] gap-x-5 border-t-2 border-foreground/15 py-6 first:border-foreground sm:grid-cols-[7rem_1fr] sm:gap-x-8 md:py-7"
            >
              <span className="display text-4xl text-cyan-brand tabular-nums sm:text-5xl">
                {row.year}
              </span>
              <div>
                <h3 className="text-2xl text-foreground md:text-3xl">
                  {row.title}
                </h3>
                {row.description ? (
                  <p className="mt-2 text-base leading-relaxed text-seal-gray md:text-lg">
                    {row.description}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
