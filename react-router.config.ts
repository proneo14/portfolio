import type { Config } from "@react-router/dev/config";

import { projects } from "./app/data/projects";

/**
 * No runtime server. `ssr: false` disables server rendering, and `prerender`
 * emits real static HTML per route at build time, so titles, meta tags and
 * content exist in the markup for search engines and for the social preview
 * crawlers that do not execute JavaScript.
 *
 * Consequence: every route must be SSR-safe. No `window` access during the
 * initial render. All animation is guarded behind an effect or a mounted check.
 */
export default {
  ssr: false,
  prerender: [
    "/",
    "/projects",
    "/gallery",
    "/about",
    "/garage",
    ...projects.map((project) => `/projects/${project.slug}`),
  ],
} satisfies Config;
