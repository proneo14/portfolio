import type { Photo } from "~/data/types";
import {
  aspectRatio,
  photoFallbackSrc,
  photoSrcSet,
  PHOTO_SIZES,
} from "~/lib/photos";

type Sizes = (typeof PHOTO_SIZES)[keyof typeof PHOTO_SIZES];

/**
 * Renders a photo, or an explicitly labeled slot when the file does not exist
 * yet.
 *
 * The slot reserves the real aspect ratio, so dropping the file in later causes
 * no layout shift. It never renders a broken `img`, which is worse than an
 * honest placeholder.
 *
 * `priority` marks the LCP image. Exactly one photo per page should set it, and
 * that photo must not be lazy loaded.
 *
 * `fill` makes the photo cover its positioned parent instead of reserving its
 * own aspect ratio. Used by the hero, where the parent already defines height.
 */
export function PhotoFrame({
  photo,
  sizes,
  priority = false,
  fill = false,
  className = "",
  imageClassName = "",
}: {
  photo: Photo;
  sizes: Sizes;
  priority?: boolean;
  fill?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  if (photo.status === "pending") {
    return (
      <div
        className={`flex items-center justify-center border border-hairline bg-surface-soft ${fill ? "h-full w-full" : ""} ${className}`}
        style={fill ? undefined : { aspectRatio: aspectRatio(photo) }}
      >
        <div className="px-6 py-4 text-center">
          <p className="font-mono text-label text-muted uppercase">
            Photo pending
          </p>
          <p className="mt-2 max-w-[36ch] font-mono text-meta text-muted/70">
            {photo.alt}
          </p>
        </div>
      </div>
    );
  }

  return (
    <picture className={`${fill ? "block h-full w-full" : ""} ${className}`}>
      <source
        type="image/avif"
        srcSet={photoSrcSet(photo, "avif")}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={photoSrcSet(photo, "webp")}
        sizes={sizes}
      />
      <img
        src={photoFallbackSrc(photo)}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={`h-full w-full object-cover ${imageClassName}`}
        style={photo.lqip ? { backgroundImage: `url(${photo.lqip})` } : undefined}
      />
    </picture>
  );
}
