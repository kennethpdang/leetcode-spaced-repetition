import CardRow from "@/components/CardRow";
import { CardView } from "@/lib/card-view";

interface CardSectionProps {
  title: string;
  cards: CardView[];
  isAlert?: boolean;
}

export default function CardSection({ title, cards, isAlert = false }: CardSectionProps) {
  if (cards.length === 0) {
    return null;
  }
  return (
    <section className="card-section">
      <h2 className={isAlert ? "section-title section-title-alert" : "section-title"}>
        {title} ({cards.length})
      </h2>
      <ul className="card-list">
        {cards.map((card) => {
          return <CardRow key={card.id} card={card} />;
        })}
      </ul>
    </section>
  );
}
