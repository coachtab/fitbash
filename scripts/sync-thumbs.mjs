#!/usr/bin/env node
/**
 * Pull the highest-quality YouTube thumbnail available for every exercise in
 * lib/exercises.ts and stash it at public/thumbs/<videoId>.jpg.
 *
 * Why this exists:
 *   - YouTube Shorts often return a tiny gray placeholder for hqdefault.jpg,
 *     so the in-page <img> would render as broken until someone manually
 *     grabs maxresdefault.jpg.
 *   - We don't want to load thumbnails from img.youtube.com at runtime —
 *     that broke before in the Instagram in-app browser.
 *
 * Behaviour:
 *   - Tried-in-order: maxresdefault → sddefault → hqdefault.
 *   - A response body smaller than PLACEHOLDER_BYTES is treated as YouTube's
 *     "no thumbnail" stub and rejected.
 *   - If a thumbnail already exists locally and is non-trivial, the fetch is
 *     skipped — keeps incremental builds fast.
 *   - Network or fetch failures never break the build; the per-card fallback
 *     in DuelDemo will render a designed placeholder for any missing image.
 *
 * Run manually with `npm run thumbs:sync`. Wired as `prebuild` in package.json
 * so `npm run build` always refreshes thumbs.
 */

import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST = resolve(ROOT, "lib/exercises.ts");
const THUMBS_DIR = resolve(ROOT, "public/thumbs");

const VARIANTS = ["maxresdefault", "sddefault", "hqdefault"];
const PLACEHOLDER_BYTES = 5_000;

async function getVideoIds() {
  const src = await readFile(MANIFEST, "utf8");
  // YouTube video IDs are 11 chars from [A-Za-z0-9_-]. Tightening the regex
  // also avoids matching the `videoId: "..."` literal in this file's docstring.
  const matches = [...src.matchAll(/videoId:\s*["']([A-Za-z0-9_-]{11})["']/g)].map(
    (m) => m[1],
  );
  return [...new Set(matches)];
}

async function fetchBestThumbnail(videoId) {
  for (const variant of VARIANTS) {
    const url = `https://img.youtube.com/vi/${videoId}/${variant}.jpg`;
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length >= PLACEHOLDER_BYTES) return { variant, buf };
    } catch {
      // network error, try next variant
    }
  }
  return null;
}

async function main() {
  await mkdir(THUMBS_DIR, { recursive: true });
  const ids = await getVideoIds();
  if (ids.length === 0) {
    console.log("[thumbs] manifest had no videoIds; nothing to sync.");
    return;
  }
  console.log(`[thumbs] syncing ${ids.length} video${ids.length === 1 ? "" : "s"}…`);

  let downloaded = 0;
  let cached = 0;
  let fellBack = 0;

  for (const id of ids) {
    const dest = resolve(THUMBS_DIR, `${id}.jpg`);
    try {
      const s = await stat(dest);
      if (s.size >= PLACEHOLDER_BYTES) {
        cached++;
        console.log(`  ✓ ${id} (cached, ${s.size} bytes)`);
        continue;
      }
    } catch {
      /* not present, we'll fetch */
    }

    const result = await fetchBestThumbnail(id);
    if (!result) {
      fellBack++;
      console.warn(`  ✗ ${id}  no real frame available; per-card fallback will render`);
      continue;
    }
    await writeFile(dest, result.buf);
    downloaded++;
    console.log(`  ↓ ${id} (${result.variant}, ${result.buf.length} bytes)`);
  }

  console.log(
    `[thumbs] done. downloaded=${downloaded} cached=${cached} fellBack=${fellBack}`,
  );
}

main().catch((err) => {
  console.error("[thumbs] sync failed:", err);
  // Never fail the build — the per-card fallback handles missing thumbs.
  process.exit(0);
});
