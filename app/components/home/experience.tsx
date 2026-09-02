import { Band } from "~/components/band";
import { experience } from "~/data/experience";

/**
 * Layout family: hairline-divided rows.
 *
 * A bottom border between rows only, never both top and bottom on every row,
 * which reads as the laziest possible table. Cards are omitted deliberately:
 * elevation would communicate a hierarchy that does not exist between roles.
 *
 * Dates sit in mono on the right at desktop and move under the title on mobile,
 * which is the explicit sub-768px collapse for this section.
 */
export function Experience() {
  return (
    <Band surface="canvas" aria-labelledby="experience-heading">
      <h2
        id="experience-heading"
        className="text-display-md uppercase md:text-display-lg"
      >
        Experience
      </h2>

      <ul className="mt-12">
        {experience.map((role) => (
          <li key={role.id} className="border-b border-hairline py-8 md:py-10">
            <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
              <div>
                <h3 className="font-display text-xl uppercase text-ink md:text-title-lg">
                  {role.title}
                </h3>
                <p className="mt-2 text-body-strong">{role.organization}</p>
                <p className="mt-2 font-mono text-meta text-muted">
                  <time>{role.dates.start}</time> to{" "}
                  <time>{role.dates.end}</time>
                </p>
                <p className="font-mono text-meta text-muted">
                  {role.location}
                </p>
              </div>

              <div>
                <ul className="space-y-3">
                  {role.highlights.map((highlight) => (
                    <li key={highlight} className="max-w-[62ch] text-body">
                      {highlight}
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                  {role.stack.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-label text-muted uppercase"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Band>
  );
}
