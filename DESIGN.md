---
version: 1
name: cls-portfolio-design-system
description: >
  A motorsport-engineering interface on true black, built around the tail-light
  signature of a 2014 Mercedes CLS63 S (C218). Brand energy comes from full-bleed
  automotive photography and a single tail-light red accent used scarcely. Heavy
  uppercase display type sits against light body copy, with a monospace layer
  carrying labels, metrics and metadata so the page reads as built by an engineer
  rather than merely about cars.
  Adapted from the BMW M design analysis in VoltAgent/awesome-design-md, with the
  BMW tricolor removed, open-licensed fonts substituted, a mono role added, and a
  Motion section written from scratch.

colors:
  # Text
  primary: "#ffffff"
  ink: "#ffffff"
  on-dark: "#ffffff"
  body: "#bbbbbb"
  body-strong: "#e6e6e6"
  muted: "#7e7e7e"
  on-primary: "#000000"

  # Hairlines. hairline-strong must be the more visible of the two.
  hairline: "#2e2e2e"
  hairline-strong: "#4a4a4a"

  # Surfaces
  canvas: "#050505"
  surface-soft: "#0f0f0f"
  surface-card: "#1a1a1a"
  surface-elevated: "#262626"
  carbon: "#2b2b2b"

  # Accent, sampled from the CLS63 S tail lights
  accent: "#e02b1d"
  accent-bright: "#ff5c47"
  accent-deep: "#8f1a11"
  signal: "#f2a13c"

  # Semantic
  warning: "#f4b400"
  success: "#0fa336"

typography:
  display-mega:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: 80px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: -0.5px
  display-xl:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: 64px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: -0.5px
  display-lg:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.5px
  display-md:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.25px
  display-sm:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: 0
  stat-hero:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: 80px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: -1.6px
  title-lg:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0
  title-md:
    fontFamily: "Inter Variable, sans-serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  title-sm:
    fontFamily: "Inter Variable, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  body-md:
    fontFamily: "Inter Variable, sans-serif"
    fontSize: 16px
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: "Inter Variable, sans-serif"
    fontSize: 14px
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: 0
  label-mono:
    fontFamily: "JetBrains Mono Variable, monospace"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 1.8px
    textTransform: uppercase
  meta-mono:
    fontFamily: "JetBrains Mono Variable, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.5px
  spec-value:
    fontFamily: "JetBrains Mono Variable, monospace"
    fontSize: 32px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.5px
  button:
    fontFamily: "Archivo Variable, sans-serif"
    fontSize: 14px
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: 1.5px
    textTransform: uppercase
  nav-link:
    fontFamily: "JetBrains Mono Variable, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 1.2px
    textTransform: uppercase

rounded:
  none: 0px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  section: 96px

motion:
  ease-out-expo: "cubic-bezier(0.16, 1, 0.3, 1)"
  ease-linear: "none"
  duration-fast: 150ms
  duration-base: 300ms
  duration-slow: 600ms

components:
  button-primary:
    backgroundColor: transparent
    textColor: "{colors.on-dark}"
    border: "1px solid {colors.on-dark}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: 16px 32px
    height: 48px
  button-secondary:
    backgroundColor: transparent
    textColor: "{colors.body}"
    border: "1px solid {colors.hairline}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: 16px 32px
    height: 48px
  button-icon:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.full}"
    size: 48px
  text-link:
    backgroundColor: transparent
    textColor: "{colors.on-dark}"
    typography: "{typography.label-mono}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    typography: "{typography.nav-link}"
    height: 64px
  hero-photo-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-xl}"
    padding: 64px
  spec-cell:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.on-dark}"
    typography: "{typography.spec-value}"
    rounded: "{rounded.none}"
    padding: 24px
  experience-row:
    backgroundColor: transparent
    textColor: "{colors.on-dark}"
    typography: "{typography.title-lg}"
    borderBottom: "1px solid {colors.hairline}"
    rounded: "{rounded.none}"
    padding: 24px 0
  project-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-dark}"
    typography: "{typography.title-lg}"
    rounded: "{rounded.none}"
    padding: 24px
  photo-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.none}"
  category-tab:
    backgroundColor: transparent
    textColor: "{colors.body}"
    typography: "{typography.label-mono}"
    padding: 12px 0
  category-tab-active:
    backgroundColor: transparent
    textColor: "{colors.on-dark}"
    borderBottom: "2px solid {colors.accent}"
    typography: "{typography.label-mono}"
    padding: 12px 0
  text-input:
    backgroundColor: transparent
    textColor: "{colors.on-dark}"
    borderBottom: "1px solid {colors.hairline}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: 12px 0
    height: 48px
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
    padding: 64px
---

## Overview

The page floor is true black. White Archivo headlines sit in confident uppercase
over full-bleed automotive photography. The system carries almost no decorative
voltage of its own: energy comes from the photographs and from a single
tail-light red used scarcely.

Type runs in three families with strictly separated roles.

- **Archivo** at weight 700 for display, buttons and card titles. The stamped voice.
- **Inter** at weight 300 for body copy. The engineered voice.
- **JetBrains Mono** at weight 400 for labels, dates, metrics and metadata. The technical voice.

The gap between heavy display and light body is the editorial signature. Never
blur it by setting display at 400 or body at 500.

### Why true black

The hero is built from tail lights and headlights. Emissive light sources read as
genuinely luminous against near-black and merely bright against a dark grey like
`#181818`. The canvas choice is driven by the photography, not by taste.

It stops at `#050505` rather than `#000000`. The difference is invisible next to
a glowing tail light, but pure black is both the most common generated-design
tell and a real problem on OLED, where black pixels switch at a different rate
than lit ones and smear during scroll.

## Colors

### Accent

One accent, sampled from reference photographs of the CLS63 S rear.

- **Accent** (`{colors.accent}`, #e02b1d): the tail-light bar. The primary identity
  color. Used for rules, marks, active-state underlines, and large display figures.
- **Accent Bright** (`{colors.accent-bright}`, #ff5c47): the LED core. Used for the
  hero bloom core and for the rare case where accent-colored small text is needed.
- **Accent Deep** (`{colors.accent-deep}`, #8f1a11): the unlit lens body. Used for
  gradient falloff in the bloom layers only.
- **Signal** (`{colors.signal}`, #f2a13c): the lower turn-signal corners. Reserved
  exclusively for the turn-signal easter egg. It appears nowhere in the base page.

### The accent contrast rule

`#e02b1d` on `#050505` measures roughly 4.4:1. That passes the 3:1 threshold for
large text (18px and above) but sits just below the 4.5:1 threshold for body
text. Therefore:

- The accent is **never** used for body copy or small text.
- Body text is `{colors.on-dark}` or `{colors.body}`.
- Where accent-colored small text is genuinely required, use
  `{colors.accent-bright}`, which measures roughly 6.9:1.

### Surfaces

Four steps, and no more. `{colors.canvas}` #050505 is the page floor.
`{colors.surface-soft}` #0f0f0f holds spec cells. `{colors.surface-card}` #1a1a1a
holds project cards. `{colors.surface-elevated}` #262626 holds nested content
inside cards.

### Text

`{colors.on-dark}` #ffffff for headlines. `{colors.body}` #bbbbbb for running
text. `{colors.body-strong}` #e6e6e6 for lead paragraphs. `{colors.muted}`
#7e7e7e for footer links and captions.

## Typography

### Hierarchy

| Token | Family | Size | Weight | Tracking | Use |
| --- | --- | --- | --- | --- | --- |
| `display-mega` | Archivo | 80px | 700 | -0.5px | Reserved. Rarely warranted. |
| `display-xl` | Archivo | 64px | 700 | -0.5px | Hero h1 |
| `display-lg` | Archivo | 56px | 700 | -0.5px | Section heads |
| `display-md` | Archivo | 40px | 700 | -0.25px | Sub-section heads |
| `display-sm` | Archivo | 32px | 700 | 0 | CTA band heads |
| `stat-hero` | Archivo | 80px | 700 | -1.6px | Single dramatic figures |
| `title-lg` | Archivo | 24px | 700 | 0 | Card and row titles |
| `title-md` | Inter | 20px | 400 | 0 | Lead paragraphs |
| `body-md` | Inter | 16px | 300 | 0 | Default body |
| `body-sm` | Inter | 14px | 300 | 0 | Footer, fine print |
| `label-mono` | JetBrains Mono | 12px | 400 | 1.8px | Uppercase labels |
| `meta-mono` | JetBrains Mono | 13px | 400 | 0.5px | Dates, locations, metadata |
| `spec-value` | JetBrains Mono | 32px | 400 | -0.5px | Metric values in spec cells |
| `button` | Archivo | 14px | 700 | 1.5px | Button labels, uppercase |
| `nav-link` | JetBrains Mono | 13px | 400 | 1.2px | Nav items, uppercase |

### Principles

Uppercase display is the default voice for h1 and h2. Letter-spacing carries
meaning: button and label tracking at 1.5px and above is what makes them feel
machined rather than typed. Display headlines take slightly negative tracking,
because Archivo spaces a little loose at large sizes.

Numbers split by role, and the split is deliberate. A single dramatic figure is
display type: `stat-hero` in Archivo 700, because at that size it is a headline
that happens to be a number. Everything else numeric is mono: spec cell values,
dates, dimensions, counts, metadata. Mono is what separates the technical layer
from the narrative layer.

Font sourcing: all three families are self-hosted woff2 via Fontsource with
`font-display: swap`. Never a Google Fonts link tag in production.

## Layout

### Spacing

Base unit 4px. Tokens run `xxs` 4, `xs` 8, `sm` 12, `md` 16, `lg` 24, `xl` 40,
`xxl` 64, `section` 96.

Section rhythm is 96px between major bands at desktop. Card padding is 24px.
Grid gutters are 24px. Hero band internal padding is 64px.

### Grid

Max content width 1400px, centered. Photo bands bleed full width with no max.
CSS Grid throughout. Never flexbox percentage math like `w-[calc(33%-1rem)]`.

Full-height sections use `min-h-[100dvh]`, never `h-screen`, because of the iOS
Safari address bar.

### Asymmetry

At `DESIGN_VARIANCE: 9`, layouts are deliberately asymmetric above the `md`
breakpoint: fractional grid columns like `2fr 1fr 1fr`, offset overlaps, and
large intentional empty zones.

Below 768px, every asymmetric layout collapses to a strict single column with
`w-full` and `px-4`. This collapse is declared explicitly in each component, not
assumed.

### Band rhythm

Inherited from the base document and the most important layout rule here: **never
repeat the same surface mode in two consecutive bands.** Two text-only bands in a
row read as a corporate site.

Home page rhythm: photo band, spec band, photo and canvas band, hairline rows,
card grid, photo band, footer.

## Shapes

`{rounded.none}` 0px everywhere. `{rounded.full}` for circular icon buttons only.
Nothing in between. Sharp rectangles read as engineered precision; circles read
as functional controls.

## Elevation

No drop shadows anywhere. Depth comes from three sources only: the photography
itself, the step from `{colors.canvas}` to `{colors.surface-card}`, and 1px
hairlines at `{colors.hairline}`.

## Motion

This section is written from scratch. The source document declares animation out
of scope, and none of the automotive design documents mentions reduced motion.

### Dials

`MOTION_INTENSITY: 8`. The page must actually move: the hero lights switch on,
the drift sequence scrubs against scroll, sections reveal on entry, and controls
respond to hover and press.

### Ownership

One animation system owns each element. If GSAP animates it, no CSS transition
touches the same properties.

- **GSAP with ScrollTrigger and MotionPathPlugin**: the drift sequence only.
  Isolated in a leaf component with a reverted context on cleanup.
- **CSS transitions and keyframes**: hero bloom, hover and press states, entry reveals.

### Rules

- Animate only `transform` and `opacity`. Never `top`, `left`, `width`, `height`,
  `blur()` radius, or `box-shadow` spread.
- Never `transition: all`. List properties explicitly.
- Never `window.addEventListener('scroll')`. Use ScrollTrigger or IntersectionObserver.
- Never `useState` for continuous values such as scroll progress or pointer position.
- `will-change` sparingly, and prefer `backface-visibility: hidden` on WebKit.
- No `backdrop-filter` in or near animated regions. It keeps the compositor busy
  every frame and is not gated by reduced motion.
- Grain and noise overlays live on fixed, `pointer-events-none` layers only. Never
  on a scrolling container.
- At most one marquee on the page.
- Every animation must be justifiable in one sentence. If it cannot be, remove it.

### Timing

Interface transitions use `{motion.duration-base}` 300ms with
`{motion.ease-out-expo}`. Press feedback uses `{motion.duration-fast}` 150ms.
Entry reveals use `{motion.duration-slow}` 600ms with a stagger of 60ms per item.
Scroll-scrubbed animation uses linear easing, because scroll position is the
timeline.

### Reduced motion

Non-negotiable. Under `prefers-reduced-motion: reduce`:

- The hero lights render in the on state at first paint. No flicker, no ramp.
- The drift sequence collapses to a single static frame at peak drift angle, and
  the section unpins so the scroll runway disappears rather than becoming dead space.
- Entry reveals are removed, not shortened.
- The lightbox still functions, with an instant swap instead of a crossfade.
- Easter eggs still fire and still show their payload, at their end state.

Implementation: `opacity: 1` and `transform: none` are the CSS defaults, and the
animation *sets* the starting state. Never leave an element at `opacity: 0`
waiting for an animation that may never run.

Do not use the blanket `* { transition-duration: 0.01ms !important }` reset. It
creates invisible timing conflicts when CSS and GSAP both touch an element.
Handle reduced motion per component.

### Mobile

No pinned scroll below 768px. Pinning fights iOS momentum scrolling. The drift
sequence runs unpinned and shorter, or falls back to static frames.

## Do's and Don'ts

### Do

- Anchor every page with full-bleed automotive photography. The cars are the voltage.
- Use uppercase display in Archivo 700 for h1 and h2.
- Pair heavy display at 700 with light body at 300.
- Set every number, date and metric in JetBrains Mono.
- Keep the accent scarce. Rules, marks, active states, large figures.
- Use `{rounded.none}` by default.
- Track all-caps labels at 1.5px or more.
- Keep 96px between major bands at desktop.

### Don't

- Don't introduce a second accent color. One accent, locked page-wide.
- Don't use the accent for body text. It fails AA at small sizes.
- Don't use `{colors.signal}` outside the turn-signal easter egg.
- Don't bold body type. Body stays at 300.
- Don't round buttons. The rectangular silhouette is the identity.
- Don't repeat a surface mode in two consecutive bands.
- Don't use em-dashes or en-dash separators in any visible string. Hyphens only.
- Don't add section-number eyebrows, scroll cues, locale strips, rotated index
  text, hero decoration strips, or decorative photo credits. These are portfolio
  cliches and are banned regardless of how experimental the page is.
- Don't overlay pills or tags on photographs. Caption below the image or not at all.
- Don't use more than one eyebrow per three sections.

### Documented override of the base document

BMW M's rules state "don't put gradient backdrops behind hero type" and "the
system never adds atmospheric backdrops, gradients, or decoration." This project
overrides that for the hero and the drift sequence only, because a tail-light
bloom is the central visual idea. The override is bounded: gradients appear only
as light emission over photography, never as a decorative background behind type
on an empty section.

## Responsive Behavior

| Name | Width | Key changes |
| --- | --- | --- |
| Mobile | < 768px | Single column. Hero display scales 64px to 40px. Nav collapses to a sheet. No pinned scroll. |
| Tablet | 768px to 1024px | Two-column grids. Nav stays horizontal but tightens. |
| Desktop | 1024px to 1400px | Full asymmetric grids. Nav on one line. |
| Wide | > 1400px | Content capped at 1400px. Photography still full-bleed. |

Touch targets are at least 48px. Photography stays full-bleed at every
breakpoint and never collapses into a margined container. Grids reduce column
count rather than scaling cards down.

## Accessibility

- Body text passes WCAG AA. Hero copy targets AAA.
- Every interactive element is a `button` or an `a`. Never a `div` with a click handler.
- Visible `focus-visible` rings. Never `outline: none` without a replacement.
- Icon-only controls carry `aria-label`.
- Every hover interaction has a tap and a keyboard equivalent.
- Heading levels are chosen semantically and sized with utilities.
- `color-scheme: dark` on the root element, with a matching `theme-color`.
- The viewport meta never disables zoom.

## Iteration Guide

1. Work on one component at a time. Reference its key, for example `{components.spec-cell}`.
2. New components default to `{rounded.none}`.
3. Use token references everywhere. Never inline a hex value.
4. Variants live as separate entries under `components`.
5. Display stays uppercase 700. Body stays sentence case 300. Never blur the contrast.
6. When in doubt about emphasis: larger photography before larger type.
