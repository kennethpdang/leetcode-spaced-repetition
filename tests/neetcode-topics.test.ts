import { describe, expect, it } from "vitest";
import { buildTopicOptions, filterCardsByTopic } from "@/lib/card-view";
import { LEETCODE_NUMBER_BY_NEETCODE_SLUG, LEETCODE_NUMBERS_WITH_SAME_NEETCODE_SLUG } from "@/lib/neetcode-problems";
import { findTopicChoice, getTopicId, NEETCODE_TOPICS, OTHER_TOPIC_ID } from "@/lib/neetcode-topics";
import { Card } from "@/lib/repositories/card-repository";

function makeCard(problemNumber: number): Card {
  return {
    id: problemNumber,
    problemNumber: problemNumber,
    title: `Problem ${problemNumber}`,
    slug: `problem-${problemNumber}`,
    difficulty: "Easy",
    level: 0,
    lastSolvedOn: "2026-01-01",
    createdAt: "2026-01-01T00:00:00.000Z",
  };
}

describe("NeetCode topics", () => {
  it("has the 18 roadmap topics", () => {
    expect(NEETCODE_TOPICS.length).toBe(18);
    expect(NEETCODE_TOPICS[0].name).toBe("Arrays & Hashing");
    expect(NEETCODE_TOPICS[17].name).toBe("Math & Geometry");
  });

  it("puts well known problems under the right topic", () => {
    expect(getTopicId(217)).toBe("arrays-and-hashing"); // Contains Duplicate
    expect(getTopicId(20)).toBe("stack"); // Valid Parentheses
    expect(getTopicId(226)).toBe("trees"); // Invert Binary Tree
    expect(getTopicId(70)).toBe("1-d-dynamic-programming"); // Climbing Stairs
  });

  it("puts problems NeetCode doesn't have under Other", () => {
    expect(getTopicId(3000)).toBe(OTHER_TOPIC_ID);
  });

  it("lists each problem under only one topic", () => {
    const seenNumbers = new Set<number>();
    for (let topicIndex = 0; topicIndex < NEETCODE_TOPICS.length; topicIndex++) {
      const problemNumbers = NEETCODE_TOPICS[topicIndex].problemNumbers;
      for (let numberIndex = 0; numberIndex < problemNumbers.length; numberIndex++) {
        expect(seenNumbers.has(problemNumbers[numberIndex])).toBe(false);
        seenNumbers.add(problemNumbers[numberIndex]);
      }
    }
  });

  it("gives every NeetCode problem a real topic", () => {
    const neetcodeNumbers = [...Object.values(LEETCODE_NUMBER_BY_NEETCODE_SLUG), ...LEETCODE_NUMBERS_WITH_SAME_NEETCODE_SLUG];
    for (let numberIndex = 0; numberIndex < neetcodeNumbers.length; numberIndex++) {
      expect(getTopicId(neetcodeNumbers[numberIndex])).not.toBe(OTHER_TOPIC_ID);
    }
  });

  it("finds topics by id and ignores unknown ids", () => {
    expect(findTopicChoice("trees")?.name).toBe("Trees");
    expect(findTopicChoice("other")?.name).toBe("Other");
    expect(findTopicChoice("not-a-topic")).toBeNull();
  });
});

describe("topic filter", () => {
  const cards = [makeCard(217), makeCard(1), makeCard(226), makeCard(3000)];

  it("keeps only the cards in the chosen topic", () => {
    const arrayCards = filterCardsByTopic(cards, "arrays-and-hashing");
    expect(arrayCards.map((card) => card.problemNumber)).toEqual([217, 1]);
    expect(filterCardsByTopic(cards, OTHER_TOPIC_ID).map((card) => card.problemNumber)).toEqual([3000]);
  });

  it("counts cards for every topic, with Other last", () => {
    const topicOptions = buildTopicOptions(cards);
    expect(topicOptions.length).toBe(19);
    expect(topicOptions[0]).toEqual({ id: "arrays-and-hashing", name: "Arrays & Hashing", cardCount: 2 });
    expect(topicOptions[18]).toEqual({ id: OTHER_TOPIC_ID, name: "Other", cardCount: 1 });
  });
});
