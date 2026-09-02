import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router";

import { Band } from "~/components/band";
import { QuietLink } from "~/components/action-link";
import { featuredProjects } from "~/data/projects";

/**
 * Layout family: bento grid with mixed cell sizes.
 *
 * Cell count equals item count exactly. Three featured projects means three
 * cells, shaped as a lead cell spanning two columns plus two supporting cells.
 * Adding a fourth featured project means reshaping this grid, not pasting a
 * blank tile.
 *
 * Visual variation comes from surface and a bounded accent wash rather than from
 * six identical text cards. Real project imagery replaces the wash on the lead
 * cell once photography exists.
 */
export function FeaturedWork() {
  const [lead, ...supporting] = featuredProjects;

  if (!lead) return null;

  return (
    <Band surface="card" aria-labelledby="work-heading">
      <div className="flex flex-wrap items-baseline justify-between gap-6">
        <h2
          id="work-heading"
          className="text-display-md uppercase md:text-display-lg"
        >
          Selected work
        </h2>
        <QuietLink to="/projects">
          All projects
          <ArrowRight size={12} aria-hidden="true" />
        </QuietLink>
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        <li className="md:col-span-2">
          <ProjectTile project={lead} lead />
        </li>
        {supporting.map((project) => (
          <li key={project.slug}>
            <ProjectTile project={project} />
          </li>
        ))}
      </ul>
    </Band>
  );
}

function ProjectTile({
  project,
  lead = false,
}: {
  project: (typeof featuredProjects)[number];
  lead?: boolean;
}) {
  return (
    <article
      className={`group relative flex h-full flex-col justify-between border border-hairline-strong p-6 transition-colors duration-300 ease-out hover:border-accent md:p-8 ${
        lead ? "bg-surface-elevated" : "bg-canvas"
      }`}
    >
      {lead ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_100%_0%,var(--color-accent-deep)_0%,transparent_55%)] opacity-50"
        />
      ) : null}

      <div className="relative">
        <p className="font-mono text-label text-muted uppercase">
          <time>{project.year}</time>
          {project.award ? ` / ${project.award}` : ""}
        </p>

        <h3
          className={`mt-4 font-display uppercase text-ink ${
            lead ? "text-display-sm md:text-display-md" : "text-title-lg"
          }`}
        >
          {/* The whole tile is the target. The link carries the accessible name
              and the pseudo element extends the hit area to the card. */}
          <Link
            to={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {project.name}
          </Link>
        </h3>

        <p
          className={`mt-4 text-body ${lead ? "max-w-[48ch] text-lg" : "text-sm"}`}
        >
          {project.summary}
        </p>
      </div>

      <ul className="relative mt-8 flex flex-wrap gap-x-4 gap-y-2">
        {project.stack.slice(0, lead ? 6 : 3).map((item) => (
          <li key={item} className="font-mono text-label text-muted uppercase">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
