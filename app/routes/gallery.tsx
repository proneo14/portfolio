import { Band } from "~/components/band";
import { PhotoFrame } from "~/components/photo-frame";
import { photos } from "~/data/photos";
import type { Photo } from "~/data/types";
import { photoCaption, PHOTO_SIZES } from "~/lib/photos";

import type { Route } from "./+types/gallery";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Gallery, Neo Prohnitchi" },
    {
      name: "description",
      content:
        "Car photography, mostly a 2014 Mercedes CLS63 S AMG. Shot around Ontario and California.",
    },
  ];
}

/**
 * Build step 6 adds the native dialog lightbox with URL-reflected open state,
 * arrow key navigation and visible previous and next controls.
 *
 * `content-visibility: auto` rather than a virtualizer, so browser find-in-page
 * and Ctrl+F still work over the captions. `contain-intrinsic-size` gives the
 * skipped rows an estimated height so the scrollbar does not jump.
 */
export default function Gallery() {
  return (
    <Band surface="canvas" className="pt-16 md:pt-24">
      <h1 className="max-w-[24ch] text-display-md uppercase md:text-display-lg">
        Gallery
      </h1>
      <p className="mt-6 max-w-[60ch] text-lg text-body">
        Mostly a 2014 CLS63 S. Occasionally something else worth pulling over
        for.
      </p>

      <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <li
            key={photo.id}
            className="[content-visibility:auto] [contain-intrinsic-size:auto_420px]"
          >
            <PhotoFrame photo={photo} sizes={PHOTO_SIZES.galleryGrid} />
            <Caption photo={photo} />
          </li>
        ))}
      </ul>
    </Band>
  );
}

function Caption({ photo }: { photo: Photo }) {
  const caption = photoCaption(photo);
  if (!caption) return null;

  return (
    <div className="mt-4">
      <p className="text-body">{caption.primary}</p>
      {caption.secondary ? (
        <p className="mt-1 font-mono text-meta text-muted">
          {caption.secondary}
        </p>
      ) : null}
    </div>
  );
}
