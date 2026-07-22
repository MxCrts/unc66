import { useEffect, useState } from "react";
import { Newspaper, Archive } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { VILLES_ASSOCIATIONS } from "../data/siteContent";
import { listActualites } from "../services/actualites";
import { listActualitesLocales } from "../services/actualitesLocales";

function ActualiteCard({ item }) {
  return (
    <article className="border border-unc-border/30 rounded-lg overflow-hidden">
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.titre} className="w-full h-40 object-cover" />
      )}
      <div className="p-4">
        <p className="text-xs text-unc-gray/60 mb-1">{item.date}</p>
        <h3 className="font-bold text-unc-navy mb-1">{item.titre}</h3>
        <p className="text-sm text-unc-gray whitespace-pre-line">{item.contenu}</p>
      </div>
    </article>
  );
}

export default function Actualites() {
  const [actualites, setActualites] = useState([]);
  const [archives, setArchives] = useState([]);
  const [localesParVille, setLocalesParVille] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [actives, archivees, locales] = await Promise.all([
          listActualites({ archive: false }),
          listActualites({ archive: true }),
          listActualitesLocales(),
        ]);
        setActualites(actives);
        setArchives(archivees);
        // Regroupe les actualités locales par commune (déjà triées par date desc).
        setLocalesParVille(
          locales.reduce((acc, item) => {
            (acc[item.ville] = acc[item.ville] || []).push(item);
            return acc;
          }, {})
        );
      } catch {
        setError("Impossible de charger les actualités pour le moment.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <PageHeader title="Actualités" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        <section>
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-unc-navy mb-4">
            <Newspaper className="w-4 h-4" />
            Actualités UNC 66
          </h2>
          {loading ? (
            <p className="text-sm text-unc-gray/60">Chargement…</p>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : actualites.length === 0 ? (
            <p className="text-sm text-unc-gray/60 italic">Aucune actualité pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {actualites.map((item) => (
                <ActualiteCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-unc-navy mb-4">
            Actualités des associations locales
          </h2>
          <div className="space-y-4">
            {VILLES_ASSOCIATIONS.map((ville) => {
              const news = localesParVille[ville] || [];
              return (
                <div key={ville} className="border-b border-unc-border/10 pb-4 last:border-b-0">
                  <p className="font-semibold text-unc-navy mb-2">{ville}</p>
                  {loading ? (
                    <p className="text-xs text-unc-gray/50">Chargement…</p>
                  ) : news.length === 0 ? (
                    <p className="text-xs italic text-unc-gray/50">Aucune actualité pour l'instant.</p>
                  ) : (
                    <ul className="space-y-2 pl-1">
                      {news.map((item) => (
                        <li key={item.id} className="border-l-2 border-unc-border/40 pl-3">
                          <p className="text-xs text-unc-gray/60">{item.date}</p>
                          <p className="text-sm font-medium text-unc-navy">{item.titre}</p>
                          <p className="text-sm text-unc-gray whitespace-pre-line">{item.contenu}</p>
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.titre}
                              loading="lazy"
                              className="mt-2 max-h-48 w-auto max-w-full rounded-md border border-unc-border/20"
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-unc-navy mb-4">
            <Archive className="w-4 h-4" />
            Archives
          </h2>
          {loading ? null : archives.length === 0 ? (
            <p className="text-sm text-unc-gray/60 italic">Aucune actualité archivée.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {archives.map((item) => (
                <ActualiteCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
