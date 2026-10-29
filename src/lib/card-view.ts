import { formatDateForDisplay } from "@/lib/dates";
import { getProblemUrl } from "@/lib/neetcode-problems";
import { getTopicId, listTopicChoices, TopicChoice } from "@/lib/neetcode-topics";
import { Card } from "@/lib/repositories/card-repository";
import { CardStatus, getCardStatus } from "@/lib/spaced-repetition";

export interface CardView extends Card {
  status: CardStatus;
  problemUrl: string;
}

export interface GroupedCards {
  overdue: CardView[];
  dueToday: CardView[];
  upcoming: CardView[];
}

export interface TopicOption extends TopicChoice {
  cardCount: number;
}

// Only the cards whose problem is under this topic.
export function filterCardsByTopic(cards: Card[], topicId: string): Card[] {
  const matchingCards: Card[] = [];
  for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
    if (getTopicId(cards[cardIndex].problemNumber) === topicId) {
      matchingCards.push(cards[cardIndex]);
    }
  }
  return matchingCards;
}

// Every topic for the dropdown, each with how many of the user's cards (due or done) it holds.
export function buildTopicOptions(cards: Card[]): TopicOption[] {
  const topicChoices = listTopicChoices();
  const topicOptions: TopicOption[] = [];
  for (let topicIndex = 0; topicIndex < topicChoices.length; topicIndex++) {
    const topicChoice = topicChoices[topicIndex];
    topicOptions.push({ ...topicChoice, cardCount: filterCardsByTopic(cards, topicChoice.id).length });
  }
  return topicOptions;
}

// Most urgent first: the most overdue cards, then the soonest due, then by problem number.
function compareByUrgency(firstCard: CardView, secondCard: CardView): number {
  if (firstCard.status.daysUntilDue !== secondCard.status.daysUntilDue) {
    return firstCard.status.daysUntilDue - secondCard.status.daysUntilDue;
  }
  return firstCard.problemNumber - secondCard.problemNumber;
}

export function groupCards(cards: Card[], today: string): GroupedCards {
  const groupedCards: GroupedCards = { overdue: [], dueToday: [], upcoming: [] };
  for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
    const card = cards[cardIndex];
    const cardView: CardView = {
      ...card,
      status: getCardStatus(card, today),
      problemUrl: getProblemUrl(card.problemNumber, card.slug),
    };
    groupedCards[cardView.status.group].push(cardView);
  }
  groupedCards.overdue.sort(compareByUrgency);
  groupedCards.dueToday.sort(compareByUrgency);
  groupedCards.upcoming.sort(compareByUrgency);
  return groupedCards;
}

export function pluralizeDays(dayCount: number): string {
  if (dayCount === 1) {
    return "1 day";
  }
  return `${dayCount} days`;
}

export function describeDueDate(status: CardStatus): string {
  if (status.group === "overdue") {
    return `Overdue by ${pluralizeDays(status.overdueDays)}`;
  }
  if (status.group === "dueToday") {
    return "Due today";
  }
  if (status.isSolvedToday) {
    return `Solved today · next on ${formatDateForDisplay(status.dueOn)}`;
  }
  return `Due in ${pluralizeDays(status.daysUntilDue)} · ${formatDateForDisplay(status.dueOn)}`;
}

export function describeInterval(status: CardStatus): string {
  if (status.hasDroppedLevel) {
    return `Dropped from every ${pluralizeDays(status.currentIntervalDays)} to every ${pluralizeDays(status.effectiveIntervalDays)}`;
  }
  return `Every ${pluralizeDays(status.currentIntervalDays)}`;
}
