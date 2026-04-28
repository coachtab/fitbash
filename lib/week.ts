/**
 * Editorial schedule for this week. Hard-coded for the pre-launch landing page —
 * once the app ships, this gets replaced by a real CMS / DB-driven feed.
 *
 * Format: a king-of-the-hill gauntlet over 5 days.
 *  - Monday: two fresh exercises duel; one wins.
 *  - Tue→Fri: yesterday's winner returns and faces a fresh challenger.
 *  - Friday's winner = Champion of the week.
 *
 * The "today" duel here MUST stay aligned with the matchup hard-coded in
 * components/DuelDemo.tsx (currently Bulgarian split squat vs Goblet squat).
 * In the gauntlet narrative, the left slot on Tuesday is Monday's winner —
 * so Monday's winner needs to be one of those two names.
 */

export type DuelStatus = "past" | "today" | "upcoming";

export type WeekDuel = {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
  date: string;
  status: DuelStatus;
  /** Mon: a fresh exercise. Tue→Fri: the running champion (carried over from the previous day's winner). */
  left: string;
  /** Mon: a fresh exercise. Tue→Fri: today's challenger (always a brand-new name). */
  right: string;
  /** True when `left` is a name carried over from yesterday's vote, not a fresh entrant. */
  leftIsChampion: boolean;
  /** Past days only — which side won. Friday's winner is the Champion of the week. */
  winner?: "left" | "right";
};

export type WeekContent = {
  themeName: string;
  dateRange: string;
  todayLabel: string;
  duels: WeekDuel[];
};

export const CURRENT_WEEK: WeekContent = {
  themeName: "Leg Week",
  dateRange: "Apr 27 – May 1",
  todayLabel: "Tue · Day 2 of 5",
  duels: [
    {
      day: "Mon",
      date: "Apr 27",
      status: "past",
      left: "Front squat",
      right: "Goblet squat",
      leftIsChampion: false,
      winner: "right",
    },
    // Today: yesterday's winner (Goblet squat) vs today's challenger (Bulgarian split squat).
    {
      day: "Tue",
      date: "Apr 28",
      status: "today",
      left: "Goblet squat",
      right: "Bulgarian split squat",
      leftIsChampion: true,
    },
    {
      day: "Wed",
      date: "Apr 29",
      status: "upcoming",
      left: "Tue's winner",
      right: "Romanian deadlift",
      leftIsChampion: true,
    },
    {
      day: "Thu",
      date: "Apr 30",
      status: "upcoming",
      left: "Wed's winner",
      right: "Hip thrust",
      leftIsChampion: true,
    },
    {
      day: "Fri",
      date: "May 1",
      status: "upcoming",
      left: "Thu's winner",
      right: "Walking lunge",
      leftIsChampion: true,
    },
  ],
};
