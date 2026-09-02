import { ActionLink } from "~/components/action-link";
import { HeroBloom } from "~/components/home/hero-bloom";
import { PhotoFrame } from "~/components/photo-frame";
import { findPhoto, HERO_PHOTO_ID } from "~/data/photos";
import { profile, WORK_CTA } from "~/data/profile";
import { PHOTO_SIZES } from "~/lib/photos";

/**
 * Layout family: full-bleed photograph with left-aligned display type over it.
 *
 * Hero discipline, all enforced here:
 *   - three text elements: headline, subtext, CTAs
 *   - headline at most two lines, subtext at most twenty words
 *   - everything visible without scrolling
 *   - top padding capped so content never floats mid-viewport
 *
 * `min-h-[100dvh]` rather than `h-screen`, because the iOS Safari address bar
 * makes `100vh` taller than the visible viewport.
 */
export function Hero() {
  const photo = findPhoto(HERO_PHOTO_ID);

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-canvas">
      {/* Until the real photograph exists, the bloom is the hero visual on its
          own. A full-bleed "photo pending" slot would be honest but ugly, and
          the bloom is real design rather than a stand-in for it. */}
      {photo?.status === "ready" ? (
        <div className="absolute inset-0 -z-30">
          <PhotoFrame
            photo={photo}
            sizes={PHOTO_SIZES.fullBleed}
            priority
            fill
          />
        </div>
      ) : null}

      {/* Order matters: photograph, then bloom adding light onto it, then scrim
          on top of both. The scrim is what stops the bloom from washing across
          the headline, while its transparent right end leaves the lights hot. */}
      <HeroBloom />

      {/* The scrim follows the copy, so its direction changes with the layout:
          bottom-up at mobile where the text sits under the lights, left-to-right
          at desktop where it sits beside them. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-canvas via-canvas/85 to-transparent md:bg-linear-to-r"
      />

      <div className="mx-auto flex min-h-[100dvh] max-w-page flex-col justify-end px-4 pt-24 pb-16 md:px-8 md:pb-24">
        <div className="pb-[env(safe-area-inset-bottom)]">
          {/* No eyebrow. A city name above the headline is the atmospheric
              locale strip that reads as agency-portfolio decoration, and the
              location already appears once in the footer where it is useful. */}
          <h1 className="text-display-md uppercase md:text-display-xl">
            {profile.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-[46ch] text-lg text-body-strong md:text-xl">
            {profile.subtext}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ActionLink to="/projects">{WORK_CTA}</ActionLink>
            <ActionLink to="/about" variant="secondary">
              About me
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
