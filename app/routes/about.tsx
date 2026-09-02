import { Band } from "~/components/band";
import { experience } from "~/data/experience";
import { profile } from "~/data/profile";

import type { Route } from "./+types/about";

export function meta(_: Route.MetaArgs) {
  return [
    { title: `About, ${profile.name}` },
    { name: "description", content: profile.bio[0] ?? profile.subtext },
  ];
}

const skillGroupLabel: Record<string, string> = {
  languages: "Languages",
  frameworks: "Frameworks",
  tools: "Tools",
};

export default function About() {
  return (
    <>
      <Band surface="canvas" className="pt-16 md:pt-24">
        <h1 className="max-w-[20ch] text-display-md uppercase md:text-display-lg">
          About
        </h1>

        <div className="mt-12 grid gap-12 md:grid-cols-[2fr_1fr] md:gap-16">
          <div className="space-y-6">
            {profile.bio.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="max-w-[65ch] text-lg text-body"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="border-t border-accent pt-6">
            <h2 className="font-mono text-label text-muted uppercase">
              Education
            </h2>
            <p className="mt-4 font-display text-title-lg uppercase text-ink">
              {profile.education.school}
            </p>
            <p className="mt-3 text-body">{profile.education.degree}</p>
            <p className="mt-1 text-body">{profile.education.specialization}</p>
            <p className="mt-3 font-mono text-meta text-muted">
              <time>{profile.education.dates.start}</time> to{" "}
              <time>{profile.education.dates.end}</time>
            </p>
            <p className="font-mono text-meta text-muted">
              GPA {profile.education.gpa}
            </p>
            <ul className="mt-4 space-y-1">
              {profile.education.coursework.map((course) => (
                <li key={course} className="font-mono text-meta text-muted">
                  {course}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Band>

      <Band surface="soft" aria-labelledby="about-experience-heading">
        <h2
          id="about-experience-heading"
          className="text-display-sm uppercase md:text-display-md"
        >
          Where I have worked
        </h2>

        <ul className="mt-12 space-y-12">
          {experience.map((role) => (
            <li key={role.id}>
              <h3 className="font-display text-title-lg uppercase text-ink">
                {role.title}
              </h3>
              <p className="mt-2 text-body-strong">{role.organization}</p>
              <p className="mt-1 font-mono text-meta text-muted">
                <time>{role.dates.start}</time> to <time>{role.dates.end}</time>{" "}
                / {role.location}
              </p>
              <ul className="mt-5 space-y-3">
                {role.highlights.map((highlight) => (
                  <li key={highlight} className="max-w-[62ch] text-body">
                    {highlight}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Band>

      <Band surface="canvas" aria-labelledby="skills-heading">
        <h2
          id="skills-heading"
          className="text-display-sm uppercase md:text-display-md"
        >
          Tools I reach for
        </h2>

        <dl className="mt-12 grid gap-10 md:grid-cols-3">
          {Object.entries(profile.skills).map(([group, items]) => (
            <div key={group} className="border-t border-hairline pt-6">
              <dt className="font-mono text-label text-muted uppercase">
                {skillGroupLabel[group] ?? group}
              </dt>
              <dd className="mt-4">
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="font-mono text-meta text-body">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Band>
    </>
  );
}
