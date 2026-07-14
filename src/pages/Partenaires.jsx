import { ExternalLink } from "lucide-react";
import PageHeader from "../components/PageHeader";
import PlaceholderImage from "../components/PlaceholderImage";
import { PARTENAIRES } from "../data/siteContent";

export default function Partenaires() {
  return (
    <div>
      <PageHeader title="Nos partenaires" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {PARTENAIRES.map((groupe) => (
          <section key={groupe.categorie}>
            <h2 className="text-sm font-bold uppercase tracking-wide text-unc-navy mb-4">
              {groupe.categorie}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {groupe.items.map((partenaire) => (
                <a
                  key={partenaire.nom}
                  href={partenaire.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-unc-border/30 hover:border-unc-border/60 rounded-lg p-4 flex flex-col items-center gap-3 text-center transition-colors hover:shadow-sm"
                >
                  <PlaceholderImage label="logo" className="w-full h-16 rounded" />
                  <span className="text-sm text-unc-gray group-hover:text-unc-navy transition-colors inline-flex items-center gap-1.5">
                    {partenaire.nom}
                    <ExternalLink className="w-3 h-3 opacity-40 shrink-0" />
                  </span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
