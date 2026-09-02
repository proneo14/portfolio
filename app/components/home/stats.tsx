import { Band } from "~/components/band";
import { profile } from "~/data/profile";

/**
 * Layout family: asymmetric fractional grid.
 *
 * Deliberately not three equal columns, which is a banned pattern. The first
 * figure takes twice the width and steps up a size, so the row has a clear
 * primary rather than three things competing.
 *
 * Every value here carries a `source` field in the data layer, so any number on
 * this page can be traced before shipping.
 */
export function Stats() {
  const [lead, ...rest] = profile.stats;

  if (!lead) return null;

  return (
    <Band surface="soft" aria-labelledby="numbers-heading">
      <h2 id="numbers-heading" className="sr-only">
        Selected results
      </h2>

      <dl className="grid gap-10 md:grid-cols-[2fr_1fr_1fr] md:gap-8">
        <div className="border-t border-accent pt-6">
          <dt className="font-mono text-label text-muted uppercase">
            {lead.label}
          </dt>
          <dd className="mt-4 font-display text-display-lg text-ink tabular-nums md:text-stat">
            {lead.value}
          </dd>
        </div>

        {rest.map((stat) => (
          <div key={stat.label} className="border-t border-hairline pt-6">
            <dt className="font-mono text-label text-muted uppercase">
              {stat.label}
            </dt>
            <dd className="mt-4 font-display text-display-md text-ink tabular-nums">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </Band>
  );
}
