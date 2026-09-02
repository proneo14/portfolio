import { DEFAULT_CAR, PHOTO_WIDTHS } from "~/data/photos";
import type { Photo } from "~/data/types";

/**
 * Image URL construction. This is the only place in the app that builds a photo
 * URL, so migrating from committed files to Cloudflare edge transformations is a
 * change to this file and nothing else.
 *
 * Phase 1, "committed": pre-optimized files live in /public/photos at each width
 * in PHOTO_WIDTHS. Correct while the photo count is small.
 *
 * Phase 2, "cloudflare": originals live in R2 and are transformed on the fly.
 * `format=auto` negotiates AVIF or WebP per visitor and still counts as a single
 * unique transformation, so 6 photos at 5 widths is 30 transformations against a
 * free tier of 5000 per month.
 *
 * Phase 2 requires a custom domain. The /cdn-cgi/image/ path needs a zone and
 * does not work on a workers.dev subdomain.
 */
type ImageStrategy = "committed" | "cloudflare";

const STRATEGY: ImageStrategy = "committed";

/** Only used when STRATEGY is "cloudflare". */
const R2_PUBLIC_PREFIX = "/photos-original";

export type ImageFormat = "avif" | "webp";

export function photoSrc(
  photo: Photo,
  width: number,
  format: ImageFormat = "avif",
): string {
  if (STRATEGY === "cloudflare") {
    const options = `width=${width},quality=80,format=auto`;
    return `/cdn-cgi/image/${options}${R2_PUBLIC_PREFIX}/${photo.file}.jpg`;
  }

  return `/photos/${photo.file}-${width}.${format}`;
}

/** Widths that are not larger than the source, so we never upscale. */
function usableWidths(photo: Photo): number[] {
  const widths = PHOTO_WIDTHS.filter((width) => width <= photo.width);
  return widths.length > 0 ? [...widths] : [photo.width];
}

export function photoSrcSet(photo: Photo, format: ImageFormat = "avif"): string {
  return usableWidths(photo)
    .map((width) => `${photoSrc(photo, width, format)} ${width}w`)
    .join(", ");
}

/** The fallback `src`. Mid-range width so older browsers do not pull the largest. */
export function photoFallbackSrc(
  photo: Photo,
  format: ImageFormat = "webp",
): string {
  const widths = usableWidths(photo);
  const middle = widths[Math.floor(widths.length / 2)] ?? photo.width;
  return photoSrc(photo, middle, format);
}

export function aspectRatio(photo: Photo): string {
  return `${photo.width} / ${photo.height}`;
}

/**
 * What to print under a photo, if anything.
 *
 * Returns null when there is nothing worth saying, in which case the image runs
 * without a caption rather than carrying a decorative one. The car is named only
 * when it is not the usual car, so captions stay informative on a page full of
 * the same model.
 */
export function photoCaption(
  photo: Photo,
): { primary: string; secondary?: string } | null {
  const otherCar = photo.car && photo.car !== DEFAULT_CAR ? photo.car : null;

  if (otherCar) {
    return { primary: otherCar, secondary: photo.location };
  }
  if (photo.location) {
    return { primary: photo.location };
  }
  return null;
}

/**
 * `sizes` values for the layouts we actually use. Named rather than inlined so
 * the same layout always declares the same sizes.
 */
export const PHOTO_SIZES = {
  fullBleed: "100vw",
  halfSplit: "(max-width: 767px) 100vw, 50vw",
  galleryGrid: "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw",
  card: "(max-width: 767px) 100vw, 33vw",
} as const;
