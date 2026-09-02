import type { Photo } from "./types";

/**
 * Photo manifest.
 *
 * Every entry is currently `pending`, which means components render an
 * explicitly labeled placeholder slot at the correct aspect ratio rather than a
 * broken image. Reserving the dimensions now also means dropping the real files
 * in later causes no layout shift.
 *
 * To activate a photo:
 *   1. Export it to `public/photos/<file>.avif` and `public/photos/<file>.webp`
 *      at the widths listed in `PHOTO_WIDTHS` below.
 *   2. Set `status: "ready"`.
 *   3. Correct `width` and `height` to the real intrinsic dimensions.
 *   4. Optionally add an `lqip` data URI.
 *
 * Source album: https://www.flickr.com/photos/202613784@N08/
 */

/** Widths generated for every photo. Keep in sync with the export script. */
export const PHOTO_WIDTHS = [480, 800, 1200, 1600, 2400] as const;

/**
 * The car most of these photos are of. Captions name the car only when it is
 * something else, because repeating the same model under every frame on a page
 * that already says "mostly a 2014 CLS63 S" is noise, not information.
 */
export const DEFAULT_CAR = "2014 Mercedes-Benz CLS63 S AMG";

export const photos: Photo[] = [
  {
    id: "cls-rear-night",
    file: "cls63-rear-night",
    alt: "Rear view of a black Mercedes CLS63 S at dusk with both tail light bars lit",
    width: 2400,
    height: 1600,
    status: "pending",
    tags: ["cls63", "rear", "static"],
    car: "2014 Mercedes-Benz CLS63 S AMG",
  },
  {
    id: "cls-rear-reservoir",
    file: "cls63-rear-reservoir",
    alt: "Rear three quarter view of a black Mercedes CLS63 S parked above a reservoir",
    width: 2400,
    height: 1600,
    status: "pending",
    tags: ["cls63", "rear", "static", "landscape"],
    car: "2014 Mercedes-Benz CLS63 S AMG",
    location: "Uvas Reservoir",
  },
  {
    id: "cls-front-sunset",
    file: "cls63-front-sunset",
    alt: "Head on view of a black Mercedes CLS63 S at sunset with LED daytime running lights on",
    width: 2400,
    height: 1600,
    status: "pending",
    tags: ["cls63", "front", "static"],
    car: "2014 Mercedes-Benz CLS63 S AMG",
  },
  {
    id: "cls-taillight-detail",
    file: "cls63-taillight-detail",
    alt: "Close detail of the twin LED bars inside a Mercedes CLS63 S tail light",
    width: 2400,
    height: 1600,
    status: "pending",
    tags: ["cls63", "detail"],
    car: "2014 Mercedes-Benz CLS63 S AMG",
  },
  {
    id: "cls-quad-exhaust",
    file: "cls63-quad-exhaust",
    alt: "Close detail of the quad exhaust tips and rear diffuser on a Mercedes CLS63 S",
    width: 2400,
    height: 1600,
    status: "pending",
    tags: ["cls63", "detail"],
    car: "2014 Mercedes-Benz CLS63 S AMG",
  },
  {
    id: "cls-roll",
    file: "cls63-roll",
    alt: "Panning shot of a black Mercedes CLS63 S moving along a highway",
    width: 2400,
    height: 1350,
    status: "pending",
    tags: ["cls63", "roll"],
    car: "2014 Mercedes-Benz CLS63 S AMG",
  },
];

/** The hero photo. Kept as a named export so the hero never guesses an id. */
export const HERO_PHOTO_ID = "cls-rear-night";

/** The still used when the drift sequence is disabled by reduced motion. */
export const DRIFT_STILL_PHOTO_ID = "cls-roll";

export function findPhoto(id: string): Photo | undefined {
  return photos.find((photo) => photo.id === id);
}

export const readyPhotos = photos.filter((photo) => photo.status === "ready");
