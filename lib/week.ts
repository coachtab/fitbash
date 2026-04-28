/**
 * Editorial schedule for this week. Hard-coded for the pre-launch landing page —
 * once the app ships, this gets replaced by a real CMS / DB-driven feed.
 *
 * The "today" duel here MUST stay aligned with the matchup hard-coded in
 * components/DuelDemo.tsx (currently Bulgarian split squat vs Goblet squat),
 * since DuelDemo is what wires the YouTube videos + voting.
 */

export type DuelStatus = "past" | "today" | "upcoming";

export type WeekDuel = {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
  date: string;
  a: string;
  b: string;
  status: DuelStatus;
};

export type WeekContent = {
  themeName: string;
  dateRange: string;
  todayLabel: string;
  duels: WeekDuel[];
  nutrition: {
    headline: string;
    body: string;
  };
};

export const CURRENT_WEEK: WeekContent = {
  themeName: "Leg Week",
  dateRange: "Apr 27 – May 1",
  todayLabel: "Tue · Day 2 of 5",
  duels: [
    { day: "Mon", date: "Apr 27", a: "Goblet squat", b: "Front squat", status: "past" },
    { day: "Tue", date: "Apr 28", a: "Bulgarian split squat", b: "Goblet squat", status: "today" },
    { day: "Wed", date: "Apr 29", a: "Romanian deadlift", b: "Hip thrust", status: "upcoming" },
    { day: "Thu", date: "Apr 30", a: "Walking lunge", b: "Step-up", status: "upcoming" },
    { day: "Fri", date: "May 1", a: "Standing calf raise", b: "Seated calf raise", status: "upcoming" },
  ],
  nutrition: {
    headline: "Protein, four ways.",
    body: "Hit 1.8 g/kg of body weight in protein, split across four meals — every 4 hours. Legs grow on rest days; spreading protein this way keeps muscle protein synthesis high through the week's volume.",
  },
};
