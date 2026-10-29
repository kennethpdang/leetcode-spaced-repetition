"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { TopicOption } from "@/lib/card-view";

interface TopicFilterProps {
  topicOptions: TopicOption[];
  selectedTopicId: string | null;
  totalCardCount: number;
}

// Picking a topic puts it in the address (/?topic=trees), so the page reloads with only that topic's problems.
export default function TopicFilter({ topicOptions, selectedTopicId, totalCardCount }: TopicFilterProps) {
  const router = useRouter();
  const [isLoading, startLoading] = useTransition();

  function showTopic(topicId: string) {
    startLoading(() => {
      if (topicId === "") {
        router.push("/");
      } else {
        router.push(`/?topic=${encodeURIComponent(topicId)}`);
      }
    });
  }

  return (
    <label className="topic-filter">
      <span className="visually-hidden">Filter by topic</span>
      <select
        className="topic-select"
        value={selectedTopicId ?? ""}
        disabled={isLoading}
        onChange={(changeEvent) => {
          showTopic(changeEvent.target.value);
        }}
      >
        <option value="">All topics ({totalCardCount})</option>
        {topicOptions.map((topicOption) => {
          return (
            <option key={topicOption.id} value={topicOption.id}>
              {topicOption.name} ({topicOption.cardCount})
            </option>
          );
        })}
      </select>
    </label>
  );
}
