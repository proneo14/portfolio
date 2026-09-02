import { PhotoFrame } from "~/components/photo-frame";
import { driftBeats } from "~/data/drift";
import { DRIFT_STILL_PHOTO_ID, findPhoto } from "~/data/photos";
import { PHOTO_SIZES } from "~/lib/photos";

/**
 * Layout family: split, with a sticky visual against a stacked narrative.
 * This is the only split section on the page, which keeps it under the cap of
 * two consecutive image-and-text splits.
 *
 * This is the static baseline. Build step 5 layers the scroll-scrubbed drift
 * path over the visual column using GSAP MotionPath, gated through
 * gsap.matchMedia() so it never pins below 768px and collapses to exactly what
 * you see here under prefers-reduced-motion.
 *
 * The section is built so that adding the animation changes nothing structural:
 * the beats are already real content in document order, and the still is already
 * the frame the animation resolves to.
 */
export function Drift() {
  const still = findPhoto(DRIFT_STILL_PHOTO_ID);

  return (
    <section
      aria-labelledby="drift-heading"
      className="border-y border-hairline-strong bg-canvas py-band-sm md:py-band"
    >
      <div className="mx-auto max-w-page px-4 md:px-8">
        <h2
          id="drift-heading"
          className="max-w-[24ch] text-display-md uppercase md:text-display-lg"
        >
          How I work, roughly
        </h2>

        <div className="mt-12 grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16">
          {/* Visual column. Sticky on desktop so it stays in frame while the
              beats scroll past. Static on mobile, where sticky plus a tall
              image wastes the viewport. */}
          <div className="md:sticky md:top-28 md:self-start">
            {still ? (
              <PhotoFrame photo={still} sizes={PHOTO_SIZES.halfSplit} />
            ) : null}
          </div>

          <ol className="space-y-12 md:space-y-20">
            {driftBeats.map((beat) => (
              <li key={beat.id}>
                <p className="font-mono text-label text-accent-bright uppercase">
                  {beat.label}
                </p>
                <h3 className="mt-4 max-w-[28ch] font-display text-2xl uppercase text-ink md:text-display-sm">
                  {beat.heading}
                </h3>
                <p className="mt-4 max-w-[60ch] text-body">{beat.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
