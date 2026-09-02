# Portfolio Build Plan

Neo Prohnitchi. Personal portfolio, second attempt.
Last updated: 2026-09-01.

This document is the working spec for the project. It records the brief, the
research behind each technical decision, and the build order. It is written to
be read by both a human and a coding agent.

---

## 1. Brief

### Goal

Present work experience and host engineering projects credibly, while showing
personality. Cars are the spine of the visual identity. Hobbies form an
easter-egg layer underneath.

### Design read

Reading this as: developer portfolio for co-op recruiters and engineers, with an
automotive editorial and kinetic language, leaning toward native CSS plus
Tailwind, GSAP scroll-driven motion, and adapted BMW M tokens on true black.

### Dials

Overriding the taste-skill "Portfolio (Developer)" preset of 6 / 5 / 4 because
the brief is explicitly experimental and art-directed.

| Dial | Value | Reasoning |
| --- | --- | --- |
| `DESIGN_VARIANCE` | 9 | Brief is explicitly experimental. Asymmetric grids, fractional columns, large empty zones. Collapses to strict single column below 768px. |
| `MOTION_INTENSITY` | 8 | Scroll-driven drift sequence is a core requirement, not decoration. |
| `VISUAL_DENSITY` | 4 | Not 3. The resume content is genuinely dense and recruiters need to scan it. |

### Hard constraints, derived from what failed last time

The previous attempt was a Windows 95 desktop simulation. Four things went
wrong, and each becomes a rule here.

1. **Too much friction.** Recruiters had to click around to find anything.
   Rule: experience and projects are reachable without any interaction beyond
   scrolling. No content lives behind a discovery mechanic.
2. **The gimmick overshadowed the work.** Rule: the car theme is the frame, not
   the content. Every animated section must also carry information.
3. **It did not work on mobile.** Rule: mobile is a first-class target. No
   pinned scroll on touch. Every hover interaction has a tap and keyboard
   equivalent. Explicit collapse rules per section.
4. **It felt unfinished.** Rule: the typed content layer is built before any
   section is styled. No placeholder copy ships.

### Audience

Dual. Waterloo co-op recruiters scanning quickly, and engineers who will read
the technical depth. Recruiter-scannable above, technical detail below.

---

## 2. Skills and references in use

Three external resources drive the design. None require Claude Code; they are
markdown files that Cursor reads from `.cursor/skills/`.

| Resource | Location | Role |
| --- | --- | --- |
| taste-skill v2 (`design-taste-frontend`) | `.cursor/skills/design-taste-frontend/SKILL.md` | Anti-slop frontend rules. Dials, bans, pre-flight checklist. |
| Vercel Web Interface Guidelines | `.cursor/skills/web-design-guidelines/SKILL.md` | Accessibility, forms, animation, performance review rules. |
| awesome-design-md | Adapted into `DESIGN.md` | BMW M design tokens as the visual base. |

### Resolving the conflict between them

taste-skill bans most of what usually reads as "experimental portfolio" in AI
output. Specifically banned and therefore **not** used here: vertically rotated
index text, section-number eyebrows (`001 / Capabilities`), scroll cues
("Scroll to explore"), hero-bottom decoration strips (`BUILD. DRIVE. SHIP.`),
locale and weather strips, photo-credit captions as decoration, pills overlaid
on images, decorative status dots, decorative hairline grids, and em-dashes
anywhere in visible copy.

The permitted route to "experimental" is real motion and real asymmetry: kinetic
type, scroll-driven path animation, masonry and fractional grid columns, large
empty zones, and horizontal scroll. That constraint is a feature here, because
it directly serves the "gimmick overshadowed the work" complaint.

### Standing rules pulled from the skills

- Zero em-dashes and zero en-dash separators in any visible string. Hyphens only.
- One accent color, locked across the whole page.
- One corner-radius system. Here: 0px everywhere, `full` only for circular icon buttons.
- One theme for the whole page. Dark. No section inverts to light mid-scroll.
- Max one eyebrow per three sections. Hero counts as one.
- No layout family repeats across sections. At least four distinct families.
- No three-column equal feature cards.
- `min-h-[100dvh]`, never `h-screen`.
- CSS Grid over flexbox percentage math.
- Animate only `transform` and `opacity`.
- Never `window.addEventListener('scroll')`. Never `useState` for continuous values.
- Icons from Phosphor only. Never hand-rolled SVG icons. One family for the project.
- Real images only. No div-based fake screenshots.
- Navigation on one line at desktop, height at most 80px.

---

## 3. Visual identity

### Base

BMW M's `DESIGN.md` from awesome-design-md, chosen over Ferrari, Lamborghini,
Bugatti, Tesla, BMW corporate, and Renault for four reasons:

1. True black `#000000` canvas. Emissive light sources read as genuinely
   luminous against pure black and merely bright against dark grey. Since the
   hero is built from tail lights, this matters more than anything else.
   Ferrari's warmer `#181818` would cost us the effect.
2. It is the only candidate whose component inventory already covers a
   portfolio: `spec-cell` is a project metric, `category-tab` is a project
   filter, `motorsport-photo-card` is a gallery tile.
3. Its band-rhythm rule is the single most useful line in any of the source
   documents for a scroll-driven page: never repeat the same surface mode in two
   consecutive bands.
4. The 700 display against 300 body weight contrast is distinctive, reproducible
   with open-licensed fonts, and reads as engineered rather than loud.

### Deliberate changes from the base

1. **Fonts.** BMW Type Next Latin is proprietary. Replaced with Archivo 700 for
   uppercase display, Inter 300/400 for body, JetBrains Mono for labels and spec
   values. All three are open-licensed and self-hosted as woff2 via Fontsource.
   The mono layer is an addition borrowed from Bugatti and Vercel; it is the
   cheapest way to make a car site read as built by an engineer rather than
   merely about cars.
2. **Accent.** The BMW M tricolor is BMW's registered trademark and using it
   would read as cosplay. Removed entirely. Replaced with a palette sampled from
   reference photos of the 2014 Mercedes CLS63 S (C218). The governing rule is
   kept word for word: scarce, identity-only, never a CTA fill, never a
   background.
3. **Added** a mono label token set and an `experience-row` component pattern
   borrowed from Bugatti's `career-listing-row`.
4. **Added** a `stat-hero` token at 80px / 700 borrowed from Ferrari, for the two
   or three numbers worth landing hard.
5. **Added** a `## Motion` section written from scratch. The base document
   explicitly declares animation out of scope, and none of the seven automotive
   documents mentions reduced motion at all.

### Accent palette, sampled from the CLS63 S reference photos

| Token | Hex | Role |
| --- | --- | --- |
| `accent` | `#e02b1d` | The tail-light bar. Primary identity accent. Marks, underlines, active states, large text only. |
| `accent-bright` | `#ff5c47` | The LED core. Rare small-text and link use, hero bloom core. |
| `signal` | `#f2a13c` | The lower turn-signal corners. Reserved exclusively for the turn-signal easter egg. |

Contrast note: `#e02b1d` on `#000000` measures about 4.44:1, which passes the
3:1 large-text threshold but sits just under the 4.5:1 body-text threshold.
Therefore the accent is never used for body copy. Body text is white or
`#bbbbbb`; the accent carries marks, rules, and large display figures.
`#ff5c47` measures about 6.9:1 and is the safe choice wherever accent-colored
small text is genuinely needed.

### Documented override of the base document

BMW M's rules say "do not put gradient backdrops behind hero type" and "the
system never adds atmospheric backdrops or gradients." The tail-light bloom hero
requires exactly that. This override is intentional and recorded in `DESIGN.md`
rather than left as an unexplained inconsistency.

---

## 4. Stack

| Concern | Choice | Version |
| --- | --- | --- |
| UI | React | 19.2 |
| Routing | React Router, framework mode | 8.3 |
| Build | Vite | 8.2 |
| Styles | Tailwind CSS via `@tailwindcss/vite` | 4.3 |
| Scroll motion | GSAP, ScrollTrigger, MotionPathPlugin | 3.15 |
| Icons | `@phosphor-icons/react` | 2.1 |
| Fonts | Fontsource woff2, self-hosted | Archivo, Inter, JetBrains Mono |
| Hosting | Cloudflare Workers static assets | wrangler 4.128 |

### Why React Router 8 in framework mode with `ssr: false` and `prerender`

This is the decision that resolves the "recruiters should not have friction"
requirement at the infrastructure level.

A pure client-rendered SPA ships an empty `<div id="root">`. Google will
generally execute the JavaScript, but on a second pass with an indexing delay,
and the social preview crawlers that generate link cards when someone shares the
site largely do not execute JavaScript at all. For a portfolio, which is a
document you want shared, that is a real cost.

`ssr: false` disables runtime server rendering but React Router still renders at
build time. Adding an explicit `prerender` list emits fully formed static HTML
per route, with correct titles, meta tags, and content in the markup, then
hydrates into a normal SPA for client navigation. Static-site SEO with SPA
interactivity, no server and no runtime cost.

One constraint this imposes: every route must be SSR-safe. No `window` access
during initial render. All animation code is guarded behind `useEffect` or a
mounted check.

Hard floors from React Router 8: Node 22.22+, React 19.2.7+, Vite 7+. The
package is ESM-only and `react-router-dom` no longer exists; imports come from
`react-router`.

### Why Cloudflare Workers rather than Pages

Cloudflare's own guidance is now "start with Workers." Pages is not deprecated
and existing projects keep working, but it is accurately described as
maintenance mode: every new capability lands on Workers only, including the Vite
plugin, Cron Triggers, Workers Logs, and Queue consumers. Starting on Workers
means a future contact form, view counter, or signed gallery URL is a `fetch`
handler and a binding rather than a re-platform.

Deviation from the original plan, recorded honestly: the initial scaffold does
**not** include `@cloudflare/vite-plugin`. That plugin exists to run Worker code
inside `workerd` during development, and this build currently has no Worker
code, only prerendered static assets. Adding it now would mean maintaining a
Worker entry point that does nothing. The migration path when server code is
actually needed is to add `main` and `"binding": "ASSETS"` to `wrangler.jsonc`,
install the plugin, and add it to `vite.config.ts`.

### Why not the alternatives

- **Three.js / React Three Fiber for a 3D car.** Rejected. Roughly 200-250 KB of
  JavaScript before any model loads, and file size is not memory size: WebP,
  AVIF, JPEG and PNG all decompress to 4 bytes per pixel in VRAM. A documented
  case has a 6.4 MB Draco-compressed GLB silently crashing iOS Safari. A drifting
  car viewed from a fixed camera is a 2D problem.
- **Scroll-scrubbed `<video>`.** Rejected. Standard H.264 places keyframes every
  2-10 seconds and seeking only lands cheaply on keyframes, so scrubbing lurches
  in chunks. The all-intra fix balloons file size. On iPhone specifically, videos
  often will not seek until played once. Apple's own product pages use frame
  sequences, not scrubbed video.
- **Scrubbed image sequence.** Held in reserve. Best visual ceiling, worst byte
  cost at roughly 2-5 MB for 90-150 frames. Use only if the 2D sprite cannot
  sell the effect.
- **Smooth-scroll libraries (Lenis, ScrollSmoother).** Rejected outright. They
  hijack native scroll, break iOS touch momentum, and fight reduced motion.
- **Astro.** Genuinely better for a content site, but the hero, drift sequence,
  lightbox and easter eggs are all interactive, so nearly every component becomes
  a hydrated island. Astro's constraints without Astro's payoff.
- **Next.js via OpenNext.** An adapter layer and RSC overhead to deploy four
  static pages.
- **TanStack Start.** Strong framework, but its advantages are type-safe server
  functions and data-heavy dashboards. There is no server data here.

### GSAP licensing

Webflow acquired GreenSock in October 2024 and made the entire library free
including all former Club plugins, effective April 2025. ScrollTrigger and
MotionPathPlugin are both free for commercial use. Budget is roughly 45-50 KB
gzipped for core plus both plugins, which is an estimate derived from minified
sizes and should be measured with a bundle visualizer before being treated as
firm.

---

## 5. Page architecture

Four prerendered routes plus project detail pages.

```
/                    home
/projects            project index
/projects/:slug      project detail
/gallery             car photo gallery
/about               longer bio, full resume
/garage              hidden, hobby layer (easter egg, not in nav)
```

### Home section sequence

Ordered to obey the band-rhythm rule. No two consecutive sections share a
surface mode or a layout family.

| # | Section | Layout family | Surface |
| --- | --- | --- | --- |
| 1 | Tail-light hero | Full-bleed photo with left-aligned display type | Photo |
| 2 | Three headline figures | Asymmetric trio, fractional columns | Soft `#0d0d0d` |
| 3 | Drift sequence | Pinned scroll path with narrative beats | Photo and canvas |
| 4 | Experience | Hairline-divided rows | Black |
| 5 | Featured projects | Bento grid, exact cell count, mixed sizes | Card `#1a1a1a` |
| 6 | Gallery teaser | Horizontal scroll band | Photo |
| 7 | Footer | Column list | Black |

Seven sections, six distinct layout families, at most two eyebrows total.

Hero discipline: at most four text elements. Headline at most two lines, subtext
at most 20 words and 4 lines, one primary CTA plus at most one secondary, all
visible without scrolling. Top padding capped at `pt-24`. No trust strip, no
tagline under the CTAs, no scroll cue.

CTA labels are locked to avoid duplicate intent: the portfolio CTA is "View
work" everywhere it appears, in nav, hero, and footer.

---

## 6. The drift sequence

### Technique

A 2D car asset follows an SVG path using GSAP MotionPathPlugin with
`autoRotate: true`, scrubbed against scroll inside a pinned section. A small
counter-rotation offset makes the car's angle diverge from its direction of
travel. That divergence is what reads as a drift rather than a car driving along
a curve.

Tire smoke is two or three blurred radial-gradient layers whose opacity is
driven by the same progress value. Never animate the blur radius; pre-render the
blur and animate opacity only.

Three narrative beats attach to path progress, so the animation carries content
rather than being decoration. This satisfies the taste-skill requirement that
every animation be justifiable in one sentence.

### Gating, via `gsap.matchMedia()`

`matchMedia` rather than a bare `window.matchMedia` check, because it ties the
animation lifecycle to the query: if the user toggles the OS setting mid-session,
GSAP reverts and re-runs setup with no manual cleanup.

| Condition | Behavior |
| --- | --- |
| Desktop, motion allowed | Pinned, scrubbed, full path with `autoRotate`. |
| Below 768px | Not pinned. Pinning fights iOS momentum scroll. Shorter unpinned path, narrative beats stack as normal blocks. |
| `prefers-reduced-motion: reduce` | Early return. Single static shot of the car at peak drift angle. Section unpins so the scroll runway collapses rather than leaving dead space. |

### The failure mode to avoid

`opacity: 1` and `transform: none` are the CSS defaults, and GSAP *sets* the
starting state. The common bug is elements left at `opacity: 0` waiting for an
animation that never runs under reduced motion, producing an invisible page.

Also avoided: the blanket `* { transition-duration: 0.01ms !important }` reduced
motion reset. It creates invisible timing conflicts when CSS and GSAP both touch
an element. Reduced motion is handled per component. One animation system owns
each element.

---

## 7. Hero bloom

Layered `radial-gradient` divs with `mix-blend-mode: screen` over the
photograph, animating opacity only. The switch-on is a staggered two-step: a
fast flicker to about 0.6, a brief dip, then a ramp to full, which reads as a
filament or projector warming up.

Not used: `backdrop-filter` anywhere near the hero. It forces the browser to
retain a separate GPU buffer of everything behind the element and re-run the
filter at composite time, so anything moving behind it re-renders every frame. A
12px blur on a full-viewport element costs 15-25 fps on a mid-range Android, and
it is not gated by reduced motion.

Not used: animated `blur()` radius or `box-shadow` spread. Both force
re-rasterization per frame. `box-shadow` also produces a flat uniform glow that
does not read as light.

SVG filters would give genuine per-channel bloom but are software-rasterized in
many cases. If used at all, they go on a small element, never the full hero.

---

## 8. Images

### Current phase: committed assets

Few photos exist yet, so pre-optimized AVIF with WebP fallback is committed to
the repo and routed through a single `photoSrc()` helper plus a typed photo
manifest.

### Later phase: R2 and edge transformations

When a custom domain exists and the photo count grows, switch to R2 originals
transformed through `/cdn-cgi/image/...,format=auto`. Cloudflare's free tier
covers 5,000 unique transformations per month, and a unique transformation is
billed once per calendar month regardless of how many times it is served.
Critically, `format=auto` counts as one transformation even when served as AVIF
to some visitors and WebP to others, so 60 photos at 5 widths is 300
transformations. R2 has no egress fees. Because `photoSrc()` is the only place
URLs are constructed, this is a one-function change.

Note: `/cdn-cgi/image/` requires a zone, so it does not work on a `workers.dev`
subdomain. The custom domain is a prerequisite.

### Rules

- Explicit `width` and `height` on every image, to prevent layout shift.
- Hero gets `fetchpriority="high"` and no lazy loading.
- Everything below the fold gets `loading="lazy"` and `decoding="async"`.
- Real descriptive alt text. The photos are content, not decoration, so `alt=""`
  is wrong here.
- Gallery uses `content-visibility: auto` with `contain-intrinsic-size` rather
  than a virtualizer, so browser find-in-page still works.
- LQIP: a roughly 20px blurred placeholder inlined as a base64 data URI on the
  wrapper, kept under 1 KB each.

### Lightbox

Native `<dialog>` with `showModal()`. This gives focus trapping, Escape to
close, an inert background, and top-layer stacking for free, all of which
hand-rolled lightboxes routinely get wrong. Additional requirements:

- `overscroll-behavior: contain`, or scroll chains to the page behind it.
- The open photo is reflected in the URL, so it is shareable and the Back button
  works.
- Swipe navigation needs visible previous and next buttons plus arrow key
  support, because gesture-only actions need a tap and keyboard alternative.
- Those icon-only buttons need `aria-label`.
- No `autoFocus` on mobile.
- Full-resolution image loads only on open.

---

## 9. Easter eggs

Placed so they cost recruiters nothing. Every one has a keyboard-reachable and
touch-reachable path, because hover-only interactions are invisible on phones
and unreachable by keyboard.

| Egg | Trigger | Accessible equivalent |
| --- | --- | --- |
| High-beam flash | Konami code | Also fires from a focusable control in the footer |
| `/garage` hobby page | Direct URL, plus a discoverable link | It is a real route, so it is linkable and crawlable |
| Re-run the drift | Typing `drift` | Also a visible replay button on the section |
| CLS silhouette ASCII | Browser console | Console only, purely additive |
| Turn-signal sweep | Long-press the tail light | Also fires on keyboard focus |
| Win95 desktop boot | Route stub reserved, not built yet | Deferred by request |

The `/garage` page carries the hobby layer: anime, mountains, hiking, fishing,
skiing, video games, hobby engineering builds.

---

## 10. Build order

Deliberately content-first and animation-last, because the static page is also
the reduced-motion baseline. Building motion before content produces exactly the
"unfinished" feeling that killed the last attempt.

1. **Scaffold.** Vite, React Router 8, Tailwind 4, TypeScript, Cloudflare
   config, self-hosted fonts, `DESIGN.md`, and the Tailwind token layer derived
   from it.
2. **Content layer.** Typed data modules for profile, experience, projects,
   photos, and hobbies, so no section ever ships with placeholder copy.
3. **Static structure.** All routes, complete and readable, zero animation. This
   is simultaneously the reduced-motion fallback, which is why it comes first.
4. **Hero and bloom.**
5. **Drift sequence** with `matchMedia` gating.
6. **Gallery and lightbox.**
7. **Easter egg layer.**
8. **Audit.** Run the `web-design-guidelines` skill across every file, then the
   taste-skill pre-flight checklist, then Lighthouse on throttled mobile.

Steps 1 through 4 are complete as of this document's last update.

Step 3 also pulled the guidelines audit forward for the static layer rather than
leaving all of it to step 8, because three of the findings were in the token
layer and fixing tokens after the animation work would mean re-checking the
animation. What that pass changed:

- `canvas` moved from `#000000` to `#050505`. Pure black is a generated-design
  tell and smears on OLED during scroll. At tail-light brightness the difference
  is not visible.
- `hairline` and `hairline-strong` were inverted, so structural boundaries drew
  fainter than row dividers. Swapped to `#2e2e2e` and `#4a4a4a`.
- The hero eyebrow was the city name, which is the banned atmospheric locale
  strip. Removed. The hero is now headline, subtext, CTAs, and the location
  survives once in the footer where it is contact information.

Step 4 added two things the plan did not anticipate.

`scripts/shoot.mjs` captures every route at desktop and mobile plus a
reduced-motion pass, and reports console errors and horizontal overflow. Design
review against rendered pixels rather than against JSX is what caught the first
bloom being a red blob, and it is the only reliable way to see the
reduced-motion rendering, which nobody looks at by accident.

`scripts/import-photos.mjs` plus `photos-source/` is the photo pipeline. It
resolves the open question in section 8 about who generates the widths: sharp
does, locally, and only the derived files are committed.

Two things worth recording from building the bloom itself:

- Thin cores are the whole trick. The first attempt used bars around 6% of
  viewport height with large halos, and it read as a generic neon glow. Dropping
  the cores to roughly 1% and cutting halo opacity is what made them read as
  light sources.
- Keyframes must not hardcode a final `opacity: 1`. Doing so overrides each
  layer's own opacity and animates every layer to full, so the resting state
  after the animation did not match the reduced-motion state. Every step is now
  scaled by a per-layer `--bloom-peak`.

Mobile gets a different bloom composition rather than a scaled-down desktop one.
At 390px there is no room beside the headline, so the lights move above the copy
and the scrim flips from left-to-right to bottom-up.

---

## 11. Pre-ship checklist

Condensed from the taste-skill pre-flight matrix and the Vercel guidelines.
Every box must pass honestly before the site is considered done.

### Design

- [ ] Zero em-dashes and zero en-dash separators in any visible string.
- [ ] One accent color used identically across all sections.
- [ ] One corner-radius system.
- [ ] One theme for the whole page. No section inverts.
- [ ] Hero fits the viewport: headline at most 2 lines, subtext at most 20 words.
- [ ] Hero has at most 4 text elements and top padding at most `pt-24`.
- [ ] Eyebrow count is at most `ceil(sectionCount / 3)`.
- [ ] No two sections share a layout family. At least four families used.
- [ ] No three consecutive image-and-text split sections.
- [ ] No duplicate CTA intent. "View work" is the only portfolio CTA label.
- [ ] Bento grid cell count exactly equals item count. No empty cells.
- [ ] At least two bento cells carry real visual variation, not white-on-white text.
- [ ] Real images throughout. No div-based fake screenshots, no hand-rolled decorative SVG.
- [ ] No scroll cues, no version labels, no section-number eyebrows, no locale strips.
- [ ] No pills overlaid on images, no decorative photo-credit captions.
- [ ] Copy self-audit: every visible string re-read for AI-sounding phrasing.

### Motion

- [ ] Every animation justifiable in one sentence.
- [ ] At most one marquee on the page.
- [ ] No `window.addEventListener('scroll')` anywhere.
- [ ] No `useState` tracking continuous values.
- [ ] Only `transform` and `opacity` animated.
- [ ] Reduced motion collapses everything to a complete static page.
- [ ] Nothing left at `opacity: 0` when animation does not run.
- [ ] Every `useEffect` animation has cleanup. GSAP contexts reverted.
- [ ] No pinned scroll below 768px.

### Accessibility

- [ ] Every icon-only button has `aria-label`.
- [ ] Every interactive element is a `<button>` or `<a>`, never a `<div>` with onClick.
- [ ] Visible `focus-visible` styles. No `outline: none` without replacement.
- [ ] Headings hierarchical, chosen semantically and sized with utilities.
- [ ] Skip link to main content.
- [ ] Every hover-only interaction has tap and keyboard equivalents.
- [ ] Body text passes WCAG AA. Hero copy targets AAA.
- [ ] Viewport meta does not disable zoom.
- [ ] `color-scheme: dark` on `<html>` and a matching `theme-color`.

### Performance

- [ ] LCP under 2.5s, INP under 200ms, CLS under 0.1.
- [ ] Every image has explicit dimensions.
- [ ] Hero image preloaded with high fetch priority.
- [ ] Below-fold images lazy loaded.
- [ ] No `transition: all` anywhere. Properties listed explicitly.
- [ ] `touch-action: manipulation` set.
- [ ] Bundle measured, not estimated.
- [ ] Lighthouse run on throttled mobile before shipping.

---

## 12. Open items

- Real car photos. Source is the Flickr album at
  `https://www.flickr.com/photos/202613784@N08/`. Placeholders are in place with
  explicit TODO slots until they land in `public/photos/`.
- Confirm the accent red against a real photo rather than the values read off the
  reference screenshots.
- Headline copy voice.
- Custom domain, which gates the R2 and edge-transformation migration.
- Whether to revive the Windows 95 desktop as a deep easter egg later.
