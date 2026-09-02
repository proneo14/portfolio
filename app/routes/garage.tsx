import { Band } from "~/components/band";
import { hobbies } from "~/data/hobbies";
import { profile } from "~/data/profile";

import type { Route } from "./+types/garage";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Garage, Neo Prohnitchi" },
    {
      name: "description",
      content: "Cars, skiing, mountains, fishing, and things built at 2 am.",
    },
  ];
}

/**
 * The hobby layer. Reachable from a quiet footer link rather than the main nav,
 * so it rewards looking without adding friction for anyone scanning the site.
 * Build step 7 adds the rest of the easter egg layer around it.
 */
export default function Garage() {
  return (
    <>
      <Band surface="canvas" className="pt-16 md:pt-24">
        <h1 className="max-w-[20ch] text-display-md uppercase md:text-display-lg">
          Garage
        </h1>
        <p className="mt-6 max-w-[60ch] text-lg text-body">
          Everything that is not on the resume.
        </p>

        <dl className="mt-16">
          {hobbies.map((hobby) => (
            <div
              key={hobby.id}
              className="grid gap-2 border-b border-hairline py-6 md:grid-cols-[1fr_2fr] md:gap-12 md:py-8"
            >
              <dt className="font-display text-title-lg uppercase text-ink">
                {hobby.name}
              </dt>
              <dd className="max-w-[62ch] text-body">{hobby.note}</dd>
            </div>
          ))}
        </dl>
      </Band>

      <Band surface="soft" aria-labelledby="bench-heading">
        <h2
          id="bench-heading"
          className="text-display-sm uppercase md:text-display-md"
        >
          The bench
        </h2>
        <p className="mt-6 max-w-[60ch] text-body">
          What I build and train things on. The NPU is there because running
          models locally is cheaper than renting them.
        </p>

        <dl className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
          {profile.bench.map((item) => (
            <div key={item.label} className="bg-surface-soft p-6 md:p-8">
              <dt className="font-mono text-label text-muted uppercase">
                {item.label}
              </dt>
              <dd className="mt-3 font-mono text-body-strong">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Band>
    </>
  );
}
