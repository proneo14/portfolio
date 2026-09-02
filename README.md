# Portfolio

Personal portfolio for Neo Prohnitchi. Built around the tail-light signature of a
2014 Mercedes CLS63 S, on true black, with a scroll-driven drift sequence.

The full spec, including the research behind each technical decision and the
build order, lives in [PLAN.md](PLAN.md). The visual system lives in
[DESIGN.md](DESIGN.md).

## Stack

| Concern | Choice |
| --- | --- |
| UI | React 19.2 |
| Routing | React Router 8.3, framework mode, `ssr: false` with prerendering |
| Build | Vite 8.2 with Rolldown |
| Styles | Tailwind CSS 4.3 via `@tailwindcss/vite` |
| Scroll motion | GSAP 3.15 with ScrollTrigger and MotionPathPlugin |
| Icons | `@phosphor-icons/react` |
| Fonts | Archivo, Inter, JetBrains Mono. Self-hosted woff2 via Fontsource |
| Hosting | Cloudflare Workers static assets |

Requires Node 22.22 or newer, which is a hard floor from React Router 8.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Production build, prerenders every route to static HTML |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Generate route types, then run `tsc` |
| `npm run deploy` | Build, then `wrangler deploy` |

## How rendering works

There is no runtime server. `ssr: false` disables server rendering, and the
`prerender` list in [react-router.config.ts](react-router.config.ts) emits real
static HTML for every route at build time, including one page per project.

That means titles, meta descriptions and page content exist in the markup, so
search engines and the social preview crawlers that do not execute JavaScript see
a complete document. The page then hydrates into a normal SPA for client
navigation.

The constraint this imposes: **every route must be SSR-safe.** No `window` access
during the initial render. All animation is guarded behind an effect or a mounted
check.

## Project layout

```
app/
  root.tsx           document shell, skip link, error boundary
  routes.ts          route table
  app.css            Tailwind theme tokens, mirrors DESIGN.md
  routes/            one module per route
  data/              typed content layer, the single source of copy
  lib/photos.ts      the only place photo URLs are constructed
public/photos/       exported car photos, see the README in that folder
```

### The content layer

Every visible string comes from `app/data`. Sections read data and never inline
copy. This is deliberate: the previous attempt at this site felt unfinished
because the structure was built before the content existed.

- `profile.ts` bio, education, skills, stats, links, and the locked `WORK_CTA` label
- `experience.ts` roles, most recent first
- `projects.ts` projects, with `featured` controlling the home page grid
- `photos.ts` photo manifest with intrinsic dimensions and status
- `hobbies.ts` the hobby layer rendered on `/garage`

## Photos

All photo entries currently have `status: "pending"`, which renders an explicitly
labeled placeholder at the correct aspect ratio rather than a broken image.
Dropping the real files in later causes no layout shift.

See [public/photos/README.md](public/photos/README.md) for naming and the
migration path to Cloudflare R2 with edge transformations.

## Deploying

```bash
npm run deploy
```

Wrangler serves `build/client` as static assets. There is currently no Worker
code. When server code is needed for a contact form or a view counter, add `main`
and an `ASSETS` binding to [wrangler.jsonc](wrangler.jsonc), then install
`@cloudflare/vite-plugin` and add it to the Vite config. The comments in
`wrangler.jsonc` spell this out.

## Design constraints

Three external resources drive the design, installed as Cursor skills in
`.cursor/skills`. They do not require Claude Code; they are markdown files with
YAML frontmatter that any compatible agent reads.

- `design-taste-frontend` from [taste-skill](https://www.tasteskill.dev/), the anti-slop frontend ruleset
- `web-design-guidelines` from [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills), accessibility and interface review rules
- `DESIGN.md` adapted from the BMW M analysis in [awesome-design-md](https://github.com/VoltAgent/awesome-design-md)

Standing rules that are easy to break by accident:

- Zero em-dashes and zero en-dash separators in any visible string. Hyphens only.
- One accent color, locked page-wide. Never used for body text, since it fails AA at small sizes on black.
- One corner radius: 0, with `rounded-full` for circular icon buttons only.
- Animate only `transform` and `opacity`. Never `transition: all`.
- Never `window.addEventListener('scroll')`. Never `useState` for continuous values.
- `min-h-[100dvh]`, never `h-screen`.
- No pinned scroll below 768px.
- Every hover interaction needs a tap and keyboard equivalent.

The full pre-ship checklist is in [PLAN.md](PLAN.md).

## Status

Steps 1 and 2 of the build order are complete: the scaffold and the typed content
layer. Route modules are intentionally minimal scaffolding at this point. Step 3
replaces them with the designed static structure, which also serves as the
reduced-motion baseline.
