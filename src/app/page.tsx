import { redirect } from "next/navigation";
import { signOutAction } from "@/app/actions/auth-actions";
import AddProblemForm from "@/components/AddProblemForm";
import CardSection from "@/components/CardSection";
import { groupCards } from "@/lib/card-view";
import { getCurrentUser } from "@/lib/current-user";
import { getTodayInTimeZone } from "@/lib/dates";
import { listCards } from "@/lib/repositories/card-repository";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const today = getTodayInTimeZone(user.timeZone);
  const cards = await listCards(user.id);
  const groupedCards = groupCards(cards, today);
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
        <div className="summary">
          <span className={groupedCards.overdue.length > 0 ? "summary-pill summary-pill-alert" : "summary-pill"}>
            {groupedCards.overdue.length} overdue
          </span>
          <span className="summary-pill">{dueNowCount} to do today</span>
          <span className="summary-pill">{cards.length} total</span>
        </div>
      )}

      {cards.length === 0 && (
        <p className="empty-state">No problems yet. Type a LeetCode number above to add your first one.</p>
      )}

      <CardSection title="Overdue" cards={groupedCards.overdue} isAlert={true} />
      <CardSection title="Due today" cards={groupedCards.dueToday} />
      <CardSection title="Upcoming" cards={groupedCards.upcoming} />
    </main>
  );
}
