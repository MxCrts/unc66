import { useEffect, useState } from "react";
import { CalendarDays, Archive } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { listEvenementsAVenir, listEvenementsArchives } from "../services/agenda";

function EvenementCard({ item }) {
  return (
    <article className="border border-unc-border/30 rounded-lg p-4">
      <div className="flex items-center justify-between gap-2 mb-1">
        <p className="text-xs font-semibold text-unc-navy">{item.date}</p>
        {item.type && (
          <span className="text-[10px] uppercase tracking-wide bg-unc-bg-soft text-unc-gray px-2 py-0.5 rounded-full">
            {item.type}
          </span>
        )}
      </div>
      <h3 className="font-bold text-unc-navy mb-1">{item.titre}</h3>
      {item.description && <p className="text-sm text-unc-gray whitespace-pre-line">{item.description}</p>}
    </article>
  );
}

export default function Agenda() {
  const [aVenir, setAVenir] = useState([]);
  const [archives, setArchives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [avenir, archivees] = await Promise.all([listEvenementsAVenir(), listEvenementsArchives()]);
        setAVenir(avenir);
        setArchives(archivees);
      } catch {
        setError("Impossible de charger l'agenda pour le moment.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <PageHeader title="Agenda" subtitle="Cérémonies, repas et événements de l'UNC 66" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <section>
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-unc-navy mb-4">
            <CalendarDays className="w-4 h-4" />
            Prochains événements
          </h2>
          {loading ? (
            <p className="text-sm text-unc-gray/60">Chargement…</p>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : aVenir.length === 0 ? (
            <p className="text-sm text-unc-gray/60 italic">Aucun événement à venir pour le moment.</p>
          ) : (
            <div className="space-y-3">
              {aVenir.map((item) => (
                <EvenementCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-unc-navy mb-4">
            <Archive className="w-4 h-4" />
            Archives
          </h2>
          {loading ? null : archives.length === 0 ? (
            <p className="text-sm text-unc-gray/60 italic">Aucun événement archivé.</p>
          ) : (
            <div className="space-y-3">
              {archives.map((item) => (
                <EvenementCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
