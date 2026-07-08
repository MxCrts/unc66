import { CalendarDays, Archive } from "lucide-react";
import PageHeader from "../components/PageHeader";
import PlaceholderBlock from "../components/PlaceholderBlock";

export default function Agenda() {
  return (
    <div>
      <PageHeader title="Agenda" subtitle="Cérémonies, repas et événements de l'UNC 66" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section>
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-unc-navy mb-4">
            <CalendarDays className="w-4 h-4" />
            Prochains événements
          </h2>
          <PlaceholderBlock>liste des événements à venir (date, lieu, description).</PlaceholderBlock>
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-unc-navy mb-4">
            <Archive className="w-4 h-4" />
            Archives
          </h2>
          <PlaceholderBlock>événements passés archivés.</PlaceholderBlock>
        </section>
      </div>
    </div>
  );
}
