import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router";

import { Band } from "~/components/band";
import { findProject } from "~/data/projects";

import type { Route } from "./+types/project-detail";

export function meta({ params }: Route.MetaArgs) {
  const project = findProject(params.slug);
  if (!project) {
    return [{ title: "Project not found, Neo Prohnitchi" }];
  }
  return [
    { title: `${project.name}, Neo Prohnitchi` },
    { name: "description", content: project.summary },
  ];
}

const statusLabel: Record<string, string> = {
  shipped: "Shipped",
  active: "In progress",
  archived: "Archived",
};

export default function ProjectDetail({ params }: Route.ComponentProps) {
  const project = findProject(params.slug);

  if (!project) {
    throw new Response("Not found", { status: 404 });
  }

  return (
    <>
      <Band surface="canvas" className="pt-16 md:pt-24">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-mono text-label text-muted uppercase transition-colors duration-150 hover:text-ink"
        >
          <ArrowLeft size={12} aria-hidden="true" />
          All projects
        </Link>

        <h1 className="mt-8 max-w-[24ch] text-display-md uppercase md:text-display-lg">
          {project.name}
        </h1>

        <p className="mt-6 font-mono text-meta text-muted">
          <time>{project.year}</time> /{" "}
          {statusLabel[project.status] ?? project.status}
        </p>

        {project.award ? (
          <p className="mt-2 font-mono text-label text-accent-bright uppercase">
            {project.award}
          </p>
        ) : null}

        <div className="mt-12 grid gap-12 md:grid-cols-[2fr_1fr] md:gap-16">
          <div className="space-y-6">
            {project.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="max-w-[65ch] text-lg text-body"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <aside>
            <h2 className="font-mono text-label text-muted uppercase">Built with</h2>
            <ul className="mt-4 space-y-2">
              {project.stack.map((item) => (
                <li key={item} className="font-mono text-meta text-body">
                  {item}
                </li>
              ))}
            </ul>

            {project.links.length > 0 ? (
              <>
                <h2 className="mt-10 font-mono text-label text-muted uppercase">
                  Links
                </h2>
                <ul className="mt-4 space-y-2">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : {})}
                        className="inline-flex items-center gap-1 font-mono text-meta text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-150 hover:text-accent-bright"
                      >
                        {link.label}
                        {link.external ? (
                          <ArrowUpRight size={12} aria-hidden="true" />
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </aside>
        </div>
      </Band>

      {project.metrics.length > 0 ? (
        <Band surface="soft" aria-labelledby="results-heading">
          <h2
            id="results-heading"
            className="text-display-sm uppercase md:text-display-md"
          >
            Results
          </h2>
          {/* Cell count matches metric count exactly. Values are mono, because
              in a spec cell a number is data rather than a headline. */}
          <dl className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="bg-surface-soft p-6 md:p-8">
                <dd className="font-mono text-spec text-ink">{metric.value}</dd>
                <dt className="mt-3 font-mono text-label text-muted uppercase">
                  {metric.label}
                </dt>
                <p className="mt-4 max-w-[40ch] text-sm text-muted">
                  {metric.source}
                </p>
              </div>
            ))}
          </dl>
        </Band>
      ) : null}
    </>
  );
}
