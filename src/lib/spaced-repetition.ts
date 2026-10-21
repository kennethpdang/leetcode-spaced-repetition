import { addDays, daysBetween } from "@/lib/dates";

// Days until a problem is due again, one entry per level.
// Edit this list to change the schedule. After the last entry, the last value repeats forever.
export const INTERVAL_DAYS: readonly number[] = [1, 2, 4, 8, 16, 32, 64, 128, 256, 365, 365, 365, 1068];

const LAST_LEVEL = INTERVAL_DAYS.length - 1;

export type CardGroup = "overdue" | "dueToday" | "upcoming";

export interface CardSchedule {
  level: number;
  lastSolvedOn: string;
}

export interface CardStatus {
  group: CardGroup;
  dueOn: string;
  daysUntilDue: number;
  overdueDays: number;
  currentIntervalDays: number;
  effectiveIntervalDays: number;
  isSolvedToday: boolean;
  hasDroppedLevel: boolean;
  levelAfterSolve: number;
  nextIntervalDays: number;
}

export function getIntervalDays(level: number): number {
  return INTERVAL_DAYS[Math.min(level, LAST_LEVEL)];
}

function getPreviousIntervalDays(level: number): number {
  if (level === 0) {
    return 0;
  }
  return getIntervalDays(level - 1);
}

// A card drops one level once it is overdue by more than its current interval plus the one before it.
// Example: at 16 days, being more than 16 + 8 = 24 days overdue drops it to 8 days.
function getEffectiveLevel(level: number, overdueDays: number): number {
  const allowedOverdueDays = getIntervalDays(level) + getPreviousIntervalDays(level);
  if (level > 0 && overdueDays > allowedOverdueDays) {
    return level - 1;
  }
  return level;
}

function getGroup(daysUntilDue: number): CardGroup {
  if (daysUntilDue < 0) {
    return "overdue";
  }
  if (daysUntilDue === 0) {
    return "dueToday";
  }
  return "upcoming";
}

export function getCardStatus(schedule: CardSchedule, today: string): CardStatus {
  const currentIntervalDays = getIntervalDays(schedule.level);
  const dueOn = addDays(schedule.lastSolvedOn, currentIntervalDays);
  const daysUntilDue = daysBetween(today, dueOn);
  const overdueDays = Math.max(0, -daysUntilDue);
  const effectiveLevel = getEffectiveLevel(schedule.level, overdueDays);
  const levelAfterSolve = Math.min(effectiveLevel + 1, LAST_LEVEL);

  return {
    group: getGroup(daysUntilDue),
    dueOn: dueOn,
    daysUntilDue: daysUntilDue,
    overdueDays: overdueDays,
    currentIntervalDays: currentIntervalDays,
    effectiveIntervalDays: getIntervalDays(effectiveLevel),
    isSolvedToday: schedule.lastSolvedOn === today,
    hasDroppedLevel: effectiveLevel < schedule.level,
    levelAfterSolve: levelAfterSolve,
    nextIntervalDays: getIntervalDays(levelAfterSolve),
  };
}

// Returns the new level after solving today, or null if it was already solved today.
export function getLevelAfterSolve(schedule: CardSchedule, today: string): number | null {
  const status = getCardStatus(schedule, today);
  if (status.isSolvedToday) {
    return null;
  }
  return status.levelAfterSolve;
}
