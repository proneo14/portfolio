// Photo import pipeline.
//
//   node scripts/import-photos.mjs                 process every file in photos-source
//   node scripts/import-photos.mjs cls63-roll      process one, by target id
//
// Drop full-resolution originals into photos-source/ named after the `file`
// field in app/data/photos.ts, for example photos-source/cls63-roll.jpg. The
// script writes AVIF and WebP at every width in PHOTO_WIDTHS that the source can
// support without upscaling, then prints the exact manifest fields to paste back
// into app/data/photos.ts.
//
// photos-source/ is gitignored. Only the derived, optimized files are committed,
// which keeps the repository small while leaving the originals reprocessable.

import { readdir, mkdir, writeFile, readFile, stat } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "photos-source";
const OUTPUT_DIR = "public/photos";
const MANIFEST = "app/data/photos.ts";

// Quality settings. AVIF is far more efficient per byte, so it can run lower.
const AVIF_QUALITY = 52;
const WEBP_QUALITY = 78;

// Width of the inline blur placeholder. Small enough to sit in a data URI
// without bloating the HTML.
const LQIP_WIDTH = 20;

/**
 * PHOTO_WIDTHS is duplicated here because the manifest is TypeScript and this
 * script is plain ESM. Rather than let the two drift silently, read the real
 * array out of the manifest and fail loudly on a mismatch.
 */
const PHOTO_WIDTHS = [480, 800, 1200, 1600, 2400];

async function assertWidthsInSync() {
  const source = await readFile(MANIFEST, "utf8");
  const match = source.match(/PHOTO_WIDTHS\s*=\s*\[([^\]]+)\]/);
  if (!match) {
    throw new Error(`Could not find PHOTO_WIDTHS in ${MANIFEST}`);
  }
  const declared = match[1]
    .split(",")
    .map((part) => Number(part.trim()))
    .filter((value) => Number.isFinite(value));

  const same =
    declared.length === PHOTO_WIDTHS.length &&
    declared.every((value, index) => value === PHOTO_WIDTHS[index]);

  if (!same) {
    throw new Error(
      `PHOTO_WIDTHS drifted.\n  ${MANIFEST}: [${declared.join(", ")}]\n  this script: [${PHOTO_WIDTHS.join(", ")}]`,
    );
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function buildLqip(pipeline) {
  const buffer = await pipeline
    .clone()
    .resize({ width: LQIP_WIDTH })
    .webp({ quality: 20 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

async function processOne(fileName) {
  const id = basename(fileName, extname(fileName));
  const inputPath = join(SOURCE_DIR, fileName);

  const pipeline = sharp(inputPath).rotate(); // honour EXIF orientation
  const meta = await pipeline.metadata();

  if (!meta.width || !meta.height) {
    throw new Error(`${fileName}: could not read dimensions`);
  }

  // EXIF rotation is applied above, so width and height here are already the
  // visual dimensions rather than the stored ones.
  const { width, height } = meta.autoOrient ?? meta;

  const targets = PHOTO_WIDTHS.filter((w) => w <= width);
  if (targets.length === 0) targets.push(width);

  let total = 0;
  for (const target of targets) {
    const resized = pipeline.clone().resize({ width: target });

    const avif = await resized
      .clone()
      .avif({ quality: AVIF_QUALITY, effort: 6 })
      .toBuffer();
    await writeFile(join(OUTPUT_DIR, `${id}-${target}.avif`), avif);

    const webp = await resized
      .clone()
      .webp({ quality: WEBP_QUALITY })
      .toBuffer();
    await writeFile(join(OUTPUT_DIR, `${id}-${target}.webp`), webp);

    total += avif.length + webp.length;
    process.stdout.write(
      `  ${target}w  avif ${formatBytes(avif.length).padStart(7)}   webp ${formatBytes(webp.length).padStart(7)}\n`,
    );
  }

  const lqip = await buildLqip(pipeline);
  const original = await stat(inputPath);

  console.log(
    `  source ${formatBytes(original.size)} -> ${formatBytes(total)} across ${targets.length * 2} files\n`,
  );

  return { id, width, height, lqip };
}

async function main() {
  await assertWidthsInSync();
  await mkdir(OUTPUT_DIR, { recursive: true });

  let entries;
  try {
    entries = await readdir(SOURCE_DIR);
  } catch {
    console.error(
      `No ${SOURCE_DIR}/ directory. Create it and drop full-resolution originals in,\nnamed after the "file" field in ${MANIFEST}, for example ${SOURCE_DIR}/cls63-roll.jpg`,
    );
    process.exitCode = 1;
    return;
  }

  const only = process.argv.slice(2);
  const images = entries
    .filter((name) => /\.(jpe?g|png|tiff?|webp|avif|heic)$/i.test(name))
    .filter(
      (name) => only.length === 0 || only.includes(basename(name, extname(name))),
    );

  if (images.length === 0) {
    console.error(
      only.length > 0
        ? `No source files matched: ${only.join(", ")}`
        : `No images found in ${SOURCE_DIR}/`,
    );
    process.exitCode = 1;
    return;
  }

  const results = [];
  for (const image of images) {
    console.log(image);
    results.push(await processOne(image));
  }

  console.log("\nPaste these fields into the matching entries in", MANIFEST);
  console.log("-".repeat(70));
  for (const { id, width, height, lqip } of results) {
    console.log(`// ${id}`);
    console.log(`status: "ready",`);
    console.log(`width: ${width},`);
    console.log(`height: ${height},`);
    console.log(`lqip: "${lqip}",`);
    console.log("");
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
