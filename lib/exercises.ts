/**
 * Single source of truth for exercise video metadata.
 *
 * The build-time sync script (scripts/sync-thumbs.mjs) reads videoIds from
 * this file via regex, so keep the literal shape `videoId: "..."` consistent.
 * Adding a new exercise: drop a new entry below, then `npm run build` (or
 * `npm run thumbs:sync`) and a high-res thumbnail is pulled automatically.
 */

export type ExerciseEntry = {
  /** Stable slug used as the key. Lowercase kebab-case. */
  slug: string;
  /** Display name shown in the duel cards and schedule strip. */
  name: string;
  /** YouTube video id (the part after youtube.com/shorts/...). */
  videoId: string;
  /** Card meta line shown under the name, e.g. "Legs · barbell · 0:08". */
  meta: string;
};

export const EXERCISES = {
  "bulgarian-split-squat": {
    slug: "bulgarian-split-squat",
    name: "Bulgarian split squat",
    videoId: "uBSoEWZu07k",
    meta: "Legs · dumbbell · 0:08",
  },
  "romanian-deadlift": {
    slug: "romanian-deadlift",
    name: "Romanian deadlift",
    videoId: "_TchJLlBO-4",
    meta: "Legs · barbell · 0:08",
  },
} as const satisfies Record<string, ExerciseEntry>;

export const ALL_EXERCISES: ExerciseEntry[] = Object.values(EXERCISES);
