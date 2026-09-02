/**
 * The tail light bloom behind the hero copy.
 *
 * Layered radial gradients under `mix-blend-mode: screen`, which is what makes
 * these read as emitted light rather than as coloured shapes painted on top. On
 * a near-black canvas, screen leaves the black untouched and only adds where the
 * gradient is bright.
 *
 * Only opacity animates, so the whole sequence stays on the compositor and never
 * triggers layout or paint. Deliberately avoided, per the plan:
 *
 *   - `backdrop-filter`, which forces a separate GPU buffer of everything behind
 *     it and re-runs at composite time. Costs 15 to 25 fps on mid-range Android
 *     and is not gated by reduced motion.
 *   - animated `filter: blur()` radius or `box-shadow` spread, both of which
 *     re-rasterize every frame. `box-shadow` also produces a flat uniform glow
 *     that does not look like light.
 *
 * The CLS63 S signature is twin horizontal LED bars per side, so that is what
 * the geometry describes: four bars, two clusters, plus a broad ambient wash
 * that grounds them in the scene.
 */

type Bar = {
  id: string;
  /** Tailwind positioning for the bar itself. */
  position: string;
  /** Horizontal and vertical spread of this bar's halo. */
  halo: string;
  /** Stagger, in ms. Inner bars strike slightly before outer ones. */
  delay: number;
};

/**
 * Bars are thin. That is the whole trick.
 *
 * The failure mode here is a large soft blob, which reads as a generic neon
 * glow rather than as a light source. A real LED bar is a hard, narrow, very
 * bright line with a comparatively dim halo around it, so the core elements are
 * roughly 1% of viewport height and the halos stay low opacity.
 */
/**
 * Two compositions, not one scaled composition.
 *
 * At desktop the copy is bottom left and the lights sit right of centre, so they
 * share the frame without competing. At mobile there is no room beside the
 * headline, so the lights move above it into the empty top half. Scaling the
 * desktop arrangement down instead would park the glow directly behind the
 * headline and cost legibility, which is the trade this layout refuses to make.
 */
const bars: Bar[] = [
  {
    id: "left-upper",
    position:
      "left-[15%] top-[25%] h-[0.9%] w-[27%] md:left-[55%] md:top-[47%] md:h-[1.4%] md:w-[13%]",
    halo: "-inset-x-[45%] -inset-y-[520%]",
    delay: 140,
  },
  {
    id: "left-lower",
    position:
      "left-[18%] top-[30%] h-[0.7%] w-[21%] md:left-[56.5%] md:top-[52%] md:h-[1%] md:w-[10.5%]",
    halo: "-inset-x-[40%] -inset-y-[560%]",
    delay: 260,
  },
  {
    id: "right-upper",
    position:
      "left-[56%] top-[25%] h-[0.9%] w-[27%] md:left-[77%] md:top-[47%] md:h-[1.4%] md:w-[13%]",
    halo: "-inset-x-[45%] -inset-y-[520%]",
    delay: 60,
  },
  {
    id: "right-lower",
    position:
      "left-[59%] top-[30%] h-[0.7%] w-[21%] md:left-[78.5%] md:top-[52%] md:h-[1%] md:w-[10.5%]",
    halo: "-inset-x-[40%] -inset-y-[560%]",
    delay: 200,
  },
];

/**
 * Sets a layer's resting opacity in both directions at once: as the animation's
 * target via --bloom-peak, and as the static value used when the animation is
 * disabled by prefers-reduced-motion. Keeping them in one place is what stops
 * the animated and reduced-motion renderings from drifting apart.
 */
function bloomLayer(peak: number, delayMs: number): React.CSSProperties {
  return {
    opacity: peak,
    animationDelay: `${delayMs}ms`,
    "--bloom-peak": peak,
  } as React.CSSProperties;
}

export function HeroBloom() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-20 overflow-hidden mix-blend-screen"
    >
      {/* Ambient spill: light bouncing off road and bodywork, not the source.
          Kept dim, because this is the layer that turns the whole composition
          into a red cloud if it is allowed to dominate. */}
      <div
        className="absolute top-[12%] left-[6%] h-[30%] w-[88%] animate-bloom-in bg-[radial-gradient(closest-side,var(--color-accent-deep)_0%,transparent_100%)] motion-reduce:animate-none md:top-[34%] md:left-[52%] md:h-[40%] md:w-[52%]"
        style={bloomLayer(0.25, 0)}
      />

      {bars.map((bar) => (
        <div key={bar.id} className={`absolute ${bar.position}`}>
          <div
            className={`absolute ${bar.halo} animate-bloom-in bg-[radial-gradient(closest-side,var(--color-accent)_0%,transparent_100%)] motion-reduce:animate-none`}
            style={bloomLayer(0.4, bar.delay)}
          />
          {/* Core. Hot centre grading out to the base accent at the ends, which
              is how an LED strip actually falls off along its length. */}
          <div
            className="absolute inset-0 animate-bloom-in rounded-full bg-[radial-gradient(closest-side,#ffd9d2_0%,var(--color-accent-bright)_35%,var(--color-accent)_70%,transparent_100%)] motion-reduce:animate-none"
            style={bloomLayer(1, bar.delay)}
          />
        </div>
      ))}
    </div>
  );
}
