# Photos

This directory holds only generated, optimized output. Do not put originals
here.

Source album: https://www.flickr.com/photos/202613784@N08/

## The short version

1. Put full-resolution originals in `photos-source/` (gitignored), naming each
   one after the `file` field in `app/data/photos.ts`. For example
   `photos-source/cls63-rear-night.jpg`.
2. Run `npm run photos:import`, or `npm run photos:import -- cls63-rear-night`
   for a single photo.
3. Paste the printed `status`, `width`, `height` and `lqip` fields into the
   matching entry in `app/data/photos.ts`.

The script reads EXIF orientation, skips widths larger than the source so
nothing is upscaled, writes AVIF and WebP at every remaining width, and
generates the blur placeholder. It refuses to run if its width list has drifted
from `PHOTO_WIDTHS`.

## Naming

Each photo needs one file per width, per format:

```
<file>-<width>.avif
<file>-<width>.webp
```

Widths come from `PHOTO_WIDTHS` in `app/data/photos.ts`: 480, 800, 1200, 1600, 2400.

So `cls63-rear-night` needs:

```
cls63-rear-night-480.avif    cls63-rear-night-480.webp
cls63-rear-night-800.avif    cls63-rear-night-800.webp
cls63-rear-night-1200.avif   cls63-rear-night-1200.webp
cls63-rear-night-1600.avif   cls63-rear-night-1600.webp
cls63-rear-night-2400.avif   cls63-rear-night-2400.webp
```

Only generate widths that are not larger than the source. `photoSrcSet` filters
the list against each photo's intrinsic width, so it never upscales.

## Activating a photo

`npm run photos:import` prints these for you, but for the record, in
`app/data/photos.ts`:

1. Set `status: "ready"`.
2. Correct `width` and `height` to the real intrinsic dimensions of the original.
3. Optionally add an `lqip` base64 data URI, kept under 1 KB.

Until then the entry renders an explicitly labeled placeholder slot at the
correct aspect ratio. Nothing renders broken, and adding the real file causes no
layout shift.

Also update `alt`. The placeholder text you see on the page is the `alt` string,
so if it does not describe the photo you actually shot, fix it. It is the only
description a screen reader gets.

## Captions

`photoCaption` in `app/lib/photos.ts` decides what prints under a frame. It
names the car only when it is not `DEFAULT_CAR`, otherwise it falls back to the
location, otherwise it prints nothing. Repeating the same model under every
frame is noise, so give entries a real `location` if you want a caption.

## Migrating to Cloudflare

Once a custom domain is attached, flip `STRATEGY` in `app/lib/photos.ts` to
`"cloudflare"`, upload the originals to R2, and delete the generated widths.
Edge transformations replace them. The `/cdn-cgi/image/` path requires a zone and
does not work on a `workers.dev` subdomain.
