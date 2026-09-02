// Screenshot harness for design review.
//
//   node scripts/shoot.mjs [baseUrl]
//
// Serves as the "look at it in a browser" step. Captures every route at desktop
// and mobile, plus a reduced-motion pass, into screenshots/. Not part of the
// build; this exists so design review happens against rendered pixels rather
// than against JSX.

import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const args = process.argv.slice(2);
const BASE = args.find((a) => a.startsWith("http")) ?? "http://localhost:5173";
const OUT = "screenshots";

// --only=home,gallery keeps the iteration loop short while tuning one section.
const only = args
  .find((a) => a.startsWith("--only="))
  ?.slice("--only=".length)
  .split(",");

const allRoutes = [
  ["home", "/"],
  ["projects", "/projects"],
  ["project-detail", "/projects/neopass"],
  ["gallery", "/gallery"],
  ["about", "/about"],
  ["garage", "/garage"],
];

const routes = only
  ? allRoutes.filter(([label]) => only.includes(label))
  : allRoutes;

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

async function shoot(browser, { name, width, height }, reducedMotion) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: reducedMotion ? "reduce" : "no-preference",
  });
  const page = await context.newPage();

  const problems = [];
  page.on("console", (message) => {
    if (message.type() === "error") problems.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));

  const suffix = reducedMotion ? `${name}-reduced` : name;

  for (const [label, path] of routes) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    // Let the bloom sequence finish so the capture shows the settled state.
    await page.waitForTimeout(2200);

    await page.screenshot({ path: `${OUT}/${label}-${suffix}.png` });

    if (!reducedMotion) {
      await page.screenshot({
        path: `${OUT}/${label}-${suffix}-full.png`,
        fullPage: true,
      });
    }

    // Horizontal overflow is the single most common mobile defect, and it is
    // invisible in a viewport-sized screenshot.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (overflow > 0) {
      problems.push(`${path} [${suffix}] horizontal overflow: ${overflow}px`);
    }
  }

  await context.close();
  return problems;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();

  const problems = [];
  for (const viewport of viewports) {
    problems.push(...(await shoot(browser, viewport, false)));
  }
  problems.push(...(await shoot(browser, viewports[0], true)));

  await browser.close();

  if (problems.length > 0) {
    console.log("Problems:");
    for (const problem of problems) console.log(`  ${problem}`);
  } else {
    console.log("No console errors and no horizontal overflow.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
