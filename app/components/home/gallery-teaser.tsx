import { ArrowRight } from "@phosphor-icons/react";

import { QuietLink } from "~/components/action-link";
import { BandInset } from "~/components/band";
import { PhotoFrame } from "~/components/photo-frame";
import { photos } from "~/data/photos";
import { photoCaption, PHOTO_SIZES } from "~/lib/photos";

/**
 * Layout family: horizontal scroll-snap band.
 *
 * Native overflow scrolling rather than a carousel widget, so it works with a
 * trackpad, a touch swipe, keyboard arrow keys and browser find-in-page with no
 * JavaScript at all. `tabIndex` makes the region focusable so keyboard users can
 * actually scroll it, which a plain overflow container does not give you.
 */
export function GalleryTeaser() {
  const preview = photos.slice(0, 4);

  if (preview.length === 0) return null;

  return (
    <section
      aria-labelledby="gallery-heading"
      className="bg-canvas py-band-sm md:py-band"
    >
      <BandInset className="flex flex-wrap items-baseline justify-between gap-6">
        <h2
          id="gallery-heading"
          className="text-display-md uppercase md:text-display-lg"
        >
          The car
        </h2>
        <QuietLink to="/gallery">
          Full gallery
          <ArrowRight size={12} aria-hidden="true" />
        </QuietLink>
      </BandInset>

      {/* The focusable scroll container is a region rather than the list
          itself, so screen readers announce a named scrollable area instead of
          a list that mysteriously takes focus. */}
      <div
        role="region"
        aria-label="Car photographs"
        tabIndex={0}
        className="mt-10 snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-4"
      >
        <ul className="flex gap-4 px-4 md:px-8">
          {preview.map((photo) => {
            const caption = photoCaption(photo);
            return (
              <li
                key={photo.id}
                className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw]"
              >
                <PhotoFrame photo={photo} sizes={PHOTO_SIZES.card} />
                {caption ? (
                  <p className="mt-3 text-sm text-body">{caption.primary}</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
