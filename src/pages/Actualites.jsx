import { Newspaper, Archive } from "lucide-react";
import PageHeader from "../components/PageHeader";
import PlaceholderBlock from "../components/PlaceholderBlock";
import { ASSOCIATIONS_LOCALES } from "../data/siteContent";

export default function Actualites() {
  return (
    <div>
      <PageHeader title="Actualités" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
        <section>
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-unc-navy mb-4">
            <Newspaper className="w-4 h-4" />
            Actualités UNC 66
          </h2>
          <PlaceholderBlock>
            actualités fédérales (dates de repas UNC 66, cérémonies départementales).
          </PlaceholderBlock>
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-unc-navy mb-4">
            Actualités des associations locales
          </h2>
          <ul className="text-sm text-unc-gray space-y-1.5">
            {ASSOCIATIONS_LOCALES.map((a) => (
              <li key={a.ville} className="flex justify-between border-b border-unc-border/10 pb-1.5">
                <span className="font-medium text-unc-navy">{a.ville}</span>
                <span className="text-unc-gray/50 italic text-xs">aucune actualité pour l'instant</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="sm:col-span-2">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-unc-navy mb-4">
            <Archive className="w-4 h-4" />
            Archives
          </h2>
          <PlaceholderBlock>actualités passées archivées.</PlaceholderBlock>
        </section>
      </div>
    </div>
  );
}
