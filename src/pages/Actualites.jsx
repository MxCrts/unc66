import { useEffect, useState } from "react";
import { Newspaper, Archive } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { ASSOCIATIONS_LOCALES } from "../data/siteContent";
import { listActualites } from "../services/actualites";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [actives, archivees] = await Promise.all([
          listActualites({ archive: false }),
          listActualites({ archive: true }),
        ]);
        setActualites(actives);
        setArchives(archivees);
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
          <ul className="text-sm text-unc-gray space-y-1.5">
            {ASSOCIATIONS_LOCALES.map((a) => (
              <li key={a.ville} className="flex justify-between border-b border-unc-border/10 pb-1.5">
                <span className="font-medium text-unc-navy">{a.ville}</span>
                <span className="text-unc-gray/50 italic text-xs">aucune actualité pour l'instant</span>
              </li>
            ))}
          </ul>
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
