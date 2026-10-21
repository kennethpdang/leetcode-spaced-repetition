import { describe, expect, it } from "vitest";
import { groupCards } from "@/lib/card-view";
import { addDays } from "@/lib/dates";
import { Card } from "@/lib/repositories/card-repository";
import { getCardStatus, getLevelAfterSolve, INTERVAL_DAYS } from "@/lib/spaced-repetition";

const TODAY = "2026-10-21";

function solvedDaysAgo(level: number, dayCount: number) {
  return { level: level, lastSolvedOn: addDays(TODAY, -dayCount) };
}

describe("schedule", () => {
  it("makes a newly added problem due tomorrow", () => {
    const status = getCardStatus({ level: 0, lastSolvedOn: TODAY }, TODAY);
    expect(status.dueOn).toBe("2026-10-22");
    expect(status.isSolvedToday).toBe(true);
    expect(status.group).toBe("upcoming");
  });

  it("climbs 1, 2, 4, 8, 16 when solved on time", () => {
    const expectedIntervals = [2, 4, 8, 16];
    let level = 0;
    for (let stepIndex = 0; stepIndex < expectedIntervals.length; stepIndex++) {
      const newLevel = getLevelAfterSolve(solvedDaysAgo(level, INTERVAL_DAYS[level]), TODAY);
      expect(newLevel).not.toBeNull();
      level = newLevel as number;
      expect(INTERVAL_DAYS[level]).toBe(expectedIntervals[stepIndex]);
    }
  });

  it("still moves up when solved before the due date", () => {
    expect(getLevelAfterSolve(solvedDaysAgo(1, 1), TODAY)).toBe(2);
  });

  it("refuses a second solve on the same day", () => {
    expect(getLevelAfterSolve({ level: 3, lastSolvedOn: TODAY }, TODAY)).toBeNull();
  });

  it("stays at 1068 days forever after the end of the list", () => {
    const lastLevel = INTERVAL_DAYS.length - 1;
    expect(INTERVAL_DAYS[lastLevel]).toBe(1068);
    expect(getLevelAfterSolve(solvedDaysAgo(lastLevel, 1068), TODAY)).toBe(lastLevel);
  });

  it("reports due today and overdue days", () => {
    expect(getCardStatus(solvedDaysAgo(2, 4), TODAY).group).toBe("dueToday");
    const overdueStatus = getCardStatus(solvedDaysAgo(2, 7), TODAY);
    expect(overdueStatus.group).toBe("overdue");
    expect(overdueStatus.overdueDays).toBe(3);
  });
});

describe("dropping a level when very overdue", () => {
  const sixteenDayLevel = 4;

  it("keeps the level at exactly 24 days overdue on a 16 day interval", () => {
    const schedule = solvedDaysAgo(sixteenDayLevel, 16 + 24);
    expect(getCardStatus(schedule, TODAY).hasDroppedLevel).toBe(false);
    expect(INTERVAL_DAYS[getLevelAfterSolve(schedule, TODAY) as number]).toBe(32);
  });

  it("drops to 8 days past 24 days overdue, so solving returns to 16 not 32", () => {
    const schedule = solvedDaysAgo(sixteenDayLevel, 16 + 25);
    const status = getCardStatus(schedule, TODAY);
    expect(status.group).toBe("overdue");
    expect(status.overdueDays).toBe(25);
    expect(status.hasDroppedLevel).toBe(true);
    expect(status.effectiveIntervalDays).toBe(8);
    expect(status.nextIntervalDays).toBe(16);
    expect(INTERVAL_DAYS[getLevelAfterSolve(schedule, TODAY) as number]).toBe(16);
  });

  it("never drops below the first level", () => {
    const schedule = solvedDaysAgo(0, 100);
    expect(getCardStatus(schedule, TODAY).hasDroppedLevel).toBe(false);
    expect(getLevelAfterSolve(schedule, TODAY)).toBe(1);
  });
});

describe("ordering", () => {
  function makeCard(problemNumber: number, level: number, dayCount: number): Card {
    return {
      id: problemNumber,
      problemNumber: problemNumber,
      title: `Problem ${problemNumber}`,
      slug: `problem-${problemNumber}`,
      difficulty: "Easy",
      createdAt: "2026-01-01T00:00:00.000Z",
      ...solvedDaysAgo(level, dayCount),
    };
  }

  it("puts the most overdue problems first", () => {
    const cards = [makeCard(1, 3, 1), makeCard(2, 0, 3), makeCard(3, 0, 10), makeCard(4, 1, 2)];
    const groupedCards = groupCards(cards, TODAY);
    expect(groupedCards.overdue.map((card) => {
      return card.problemNumber;
    })).toEqual([3, 2]);
    expect(groupedCards.dueToday.length).toBe(1);
    expect(groupedCards.upcoming.length).toBe(1);
  });
});
