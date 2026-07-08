import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import Logo from "../components/Logo";
import ActionCard from "../components/ActionCard";
import { ACTIONS_RAPIDES, COORDONNEES } from "../data/siteContent";
import { getDerniereActualite } from "../services/actualites";
import heroActuelle from "../assets/hero-actuelle.jpg";
import heroArchive from "../assets/hero-archive.jpg";

export default function Accueil() {
  const [derniereActu, setDerniereActu] = useState(null);
  const [loadingActu, setLoadingActu] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setDerniereActu(await getDerniereActualite());
      } catch {
        setDerniereActu(null);
      } finally {
        setLoadingActu(false);
      }
    })();
  }, []);

  return (
    <div>
      {/* Bandeau hero : 2 photos en fond + logo/titre en surimpression (dégradé pour la lisibilité) */}
      <section className="relative h-72 sm:h-80 lg:h-96 overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2">
          <img
            src={heroActuelle}
            alt="Militaires français en opération, aujourd'hui"
            className="h-full w-full object-cover"
          />
          <img
            src={heroArchive}
            alt="Soldats français, photo d'archive"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-unc-navy/70" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <div className="bg-white rounded-xl px-4 py-3 shadow-md">
            <Logo size={64} />
          </div>
          <p className="mt-4 text-sm italic text-white/85">Aujourd'hui... comme hier</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white max-w-2xl drop-shadow">
            L'UNC défend les droits des combattants et des blessés
          </h1>
          <p className="mt-3 text-white/85 max-w-xl">
            La Fédération UNC des Pyrénées-Orientales « UNC 66 »
          </p>
        </div>
      </section>

      {/* Actions rapides */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-10">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {ACTIONS_RAPIDES.map((action) => (
            <ActionCard key={action.label} {...action} />
          ))}
        </div>
      </section>

      {/* Missions + permanences / dernière actualité */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="border border-unc-border/40 rounded-lg p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-unc-navy mb-3">
              La Fédération UNC 66
            </h2>
            <ul className="space-y-2 text-sm text-unc-gray list-disc list-inside">
              <li>Aide à la reconversion des anciens militaires et de leur conjoint</li>
              <li>Aide aux démarches et au soutien des blessés</li>
              <li>Transmet la mémoire aux jeunes générations</li>
              <li>Recueille les témoignages de vétérans</li>
            </ul>
          </div>

          <div className="border border-unc-border/40 rounded-lg p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-unc-navy mb-3">
              <Clock className="w-4 h-4" />
              Permanences
            </h2>
            <p className="text-sm text-unc-gray mb-2">{COORDONNEES.nom}</p>
            <ul className="text-sm text-unc-gray space-y-1">
              {COORDONNEES.horaires.map((h) => (
                <li key={h.jours}>
                  <span className="font-semibold">{h.jours} :</span> {h.plage}
                </li>
              ))}
            </ul>
            <p className="text-sm text-unc-gray mt-2">
              Tél. {COORDONNEES.telephone} —{" "}
              <a href={`mailto:${COORDONNEES.email}`} className="text-unc-navy hover:underline">
                {COORDONNEES.email}
              </a>
            </p>
          </div>
        </div>

        <div className="border border-unc-border/40 rounded-lg p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide text-unc-navy mb-3">
            Dernière actualité
          </h2>
          {loadingActu ? (
            <p className="text-sm text-unc-gray/60">Chargement…</p>
          ) : derniereActu ? (
            <div>
              <p className="text-xs text-unc-gray/60 mb-1">{derniereActu.date}</p>
              <h3 className="font-bold text-unc-navy mb-1">{derniereActu.titre}</h3>
              <p className="text-sm text-unc-gray line-clamp-4 whitespace-pre-line">{derniereActu.contenu}</p>
              <Link to="/actualites" className="inline-block mt-3 text-sm text-unc-navy font-semibold hover:underline">
                Voir toutes les actualités →
              </Link>
            </div>
          ) : (
            <p className="text-sm text-unc-gray/60 italic">Aucune actualité pour le moment.</p>
          )}
        </div>
      </section>
    </div>
  );
}
