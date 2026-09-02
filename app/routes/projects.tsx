import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router";

import { Band } from "~/components/band";
import { projects } from "~/data/projects";

import type { Route } from "./+types/projects";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Work, Neo Prohnitchi" },
    {
      name: "description",
      content:
        "Engineering projects: a post-quantum password manager, a cloud 3D print slicer, a fishing classifier and a chess engine.",
    },
  ];
}

const statusLabel: Record<string, string> = {
  shipped: "Shipped",
  active: "In progress",
  archived: "Archived",
};

export default function Projects() {
  return (
    <Band surface="canvas" className="pt-16 md:pt-24">
      <h1 className="max-w-[24ch] text-display-md uppercase md:text-display-lg">
        Work
      </h1>
      <p className="mt-6 max-w-[60ch] text-lg text-body">
        Four projects worth reading about. Each one had a constraint that made it
        interesting, and the write-ups say what that was.
      </p>

      <ul className="mt-16">
        {projects.map((project) => (
          <li key={project.slug} className="border-b border-hairline">
            <Link
              to={`/projects/${project.slug}`}
              className="group grid gap-4 py-8 transition-colors duration-200 ease-out md:grid-cols-[1fr_2fr_auto] md:items-baseline md:gap-12 md:py-10"
            >
              <div>
                <h2 className="font-display text-title-lg uppercase text-ink">
                  {project.name}
                </h2>
                <p className="mt-2 font-mono text-meta text-muted">
                  <time>{project.year}</time> /{" "}
                  {statusLabel[project.status] ?? project.status}
                </p>
              </div>

              <div>
                <p className="max-w-[62ch] text-body">{project.summary}</p>
                {project.award ? (
                  <p className="mt-3 font-mono text-label text-accent-bright uppercase">
                    {project.award}
                  </p>
                ) : null}
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                  {project.stack.slice(0, 4).map((item) => (
                    <li
                      key={item}
                      className="font-mono text-label text-muted uppercase"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <span
                aria-hidden="true"
                className="hidden text-muted transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:text-ink md:block"
              >
                <ArrowRight size={20} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Band>
  );
}
