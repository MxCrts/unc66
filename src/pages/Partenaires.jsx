import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import PageHeader from "../components/PageHeader";
import PlaceholderImage from "../components/PlaceholderImage";
import { PARTENAIRES } from "../data/siteContent";
import { listPartenaires, grouperParCategorie } from "../services/partenaires";

export default function Partenaires() {
  // Repli = liste statique historique : affichée tant que la collection
  // Firestore "partenaires" est vide (import initial pas encore fait depuis
  // l'admin) ou en cas d'erreur de chargement — le site reste utilisable.
  const [groupes, setGroupes] = useState(PARTENAIRES);

  useEffect(() => {
    (async () => {
      try {
        const partenaires = await listPartenaires();
        if (partenaires.length > 0) {
          setGroupes(grouperParCategorie(partenaires));
        }
      } catch {
        // Repli statique silencieux.
      }
    })();
  }, []);

  return (
    <div>
      <PageHeader title="Nos partenaires" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {groupes.map((groupe) => (
          <section key={groupe.categorie}>
            <h2 className="text-sm font-bold uppercase tracking-wide text-unc-navy mb-4">
              {groupe.categorie}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {groupe.items.map((partenaire) => {
                const contenu = (
                  <>
                    {partenaire.logo ? (
                      <div className="w-full h-20 flex items-center justify-center">
                        <img
                          src={partenaire.logo}
                          alt={`Logo ${partenaire.nom}`}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <PlaceholderImage label="logo" className="w-full h-20 rounded" />
                    )}
                    <span className="text-sm text-unc-gray group-hover:text-unc-navy transition-colors inline-flex items-center gap-1.5">
                      {partenaire.nom}
                      {partenaire.url && <ExternalLink className="w-3 h-3 opacity-40 shrink-0" />}
                    </span>
                  </>
                );
                const cardClass =
                  "group border border-unc-border/30 hover:border-unc-border/60 rounded-lg p-4 flex flex-col items-center gap-3 text-center transition-colors hover:shadow-sm";
                // Un partenaire saisi sans site web reste affiché, simplement non cliquable.
                return partenaire.url ? (
                  <a
                    key={partenaire.nom}
                    href={partenaire.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {contenu}
                  </a>
                ) : (
                  <div key={partenaire.nom} className={cardClass}>
                    {contenu}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
