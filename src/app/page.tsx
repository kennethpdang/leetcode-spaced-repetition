import { redirect } from "next/navigation";
import { signOutAction } from "@/app/actions/auth-actions";
import AddProblemForm from "@/components/AddProblemForm";
import CardSection from "@/components/CardSection";
import TopicFilter from "@/components/TopicFilter";
import { buildTopicOptions, filterCardsByTopic, groupCards } from "@/lib/card-view";
import { getCurrentUser } from "@/lib/current-user";
import { getTodayInTimeZone } from "@/lib/dates";
import { findTopicChoice } from "@/lib/neetcode-topics";
import { listCards } from "@/lib/repositories/card-repository";

export const dynamic = "force-dynamic";

interface DashboardPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  // ?topic=trees shows only that topic. No topic, or one we don't know, shows everything.
  const topicParameter = (await searchParams).topic;
  const selectedTopic = typeof topicParameter === "string" ? findTopicChoice(topicParameter) : null;

  const today = getTodayInTimeZone(user.timeZone);
  const cards = await listCards(user.id);
  const shownCards = selectedTopic ? filterCardsByTopic(cards, selectedTopic.id) : cards;
  const groupedCards = groupCards(shownCards, today);
  const dueNowCount = groupedCards.overdue.length + groupedCards.dueToday.length;

  return (
    <main className="page">
      <header className="dashboard-header">
        <div>
          <h1 className="greeting">Hi, {user.firstName}</h1>
          <p className="user-name">
            {user.firstName} {user.lastName}
          </p>
        </div>
        <form action={signOutAction}>
          <button type="submit" className="button button-secondary">
            Sign out
          </button>
        </form>
      </header>

      <AddProblemForm />

      {cards.length > 0 && (
        <div className="summary-bar">
          <div className="summary">
            <span className={groupedCards.overdue.length > 0 ? "summary-pill summary-pill-alert" : "summary-pill"}>
              {groupedCards.overdue.length} overdue
            </span>
            <span className="summary-pill">{dueNowCount} to do today</span>
            <span className="summary-pill">{shownCards.length} total</span>
          </div>
          <TopicFilter
            topicOptions={buildTopicOptions(cards)}
            selectedTopicId={selectedTopic ? selectedTopic.id : null}
            totalCardCount={cards.length}
          />
        </div>
      )}

      {cards.length === 0 && (
        <p className="empty-state">No problems yet. Type a LeetCode number above to add your first one.</p>
      )}

      {cards.length > 0 && shownCards.length === 0 && selectedTopic && (
        <p className="empty-state">No {selectedTopic.name} problems on your list yet.</p>
      )}

      <CardSection title="Overdue" cards={groupedCards.overdue} isAlert={true} />
      <CardSection title="Due today" cards={groupedCards.dueToday} />
      <CardSection title="Upcoming" cards={groupedCards.upcoming} />
    </main>
  );
}
