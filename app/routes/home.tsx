import { Drift } from "~/components/home/drift";
import { Experience } from "~/components/home/experience";
import { FeaturedWork } from "~/components/home/featured-work";
import { GalleryTeaser } from "~/components/home/gallery-teaser";
import { Hero } from "~/components/home/hero";
import { Stats } from "~/components/home/stats";
import { profile } from "~/data/profile";

import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: `${profile.name}, ${profile.role}` },
    { name: "description", content: profile.subtext },
  ];
}

/**
 * Six sections, six distinct layout families, alternating surface modes so no
 * two consecutive bands look alike:
 *
 *   Hero          full-bleed photo with overlaid type    photo
 *   Stats         asymmetric fractional grid             soft
 *   Drift         sticky visual against stacked beats    canvas
 *   Experience    hairline-divided rows                  canvas, but rows not prose
 *   FeaturedWork  bento grid, mixed cell sizes           card
 *   GalleryTeaser horizontal scroll-snap band            canvas
 *
 * Eyebrow budget for six sections is two. Only the hero uses one, plus the beat
 * labels inside Drift, which name real phases rather than enumerating sections.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Drift />
      <Experience />
      <FeaturedWork />
      <GalleryTeaser />
    </>
  );
}
