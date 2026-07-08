import { Clock } from "lucide-react";
import Logo from "../components/Logo";
import PlaceholderBlock from "../components/PlaceholderBlock";
import ActionCard from "../components/ActionCard";
import { ACTIONS_RAPIDES, COORDONNEES } from "../data/siteContent";
import heroActuelle from "../assets/hero-actuelle.jpg";
import heroArchive from "../assets/hero-archive.jpg";

export default function Accueil() {
  return (
    <div>
      {/* Bandeau hero : 2 photos + logo centré + titre */}
      <section>
        <div className="grid grid-cols-2 h-40 sm:h-56 lg:h-64">
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

        <div className="relative flex flex-col items-center text-center px-4 -mt-8 sm:-mt-10">
          <div className="bg-white rounded-xl px-4 py-3 shadow-md">
            <Logo size={80} />
          </div>
          <p className="mt-4 text-sm italic text-unc-gray">Aujourd'hui... comme hier</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-unc-navy max-w-2xl">
            L'UNC défend les droits des combattants et des blessés
          </h1>
          <p className="mt-3 text-unc-gray max-w-xl">
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
          <PlaceholderBlock>contenu de la dernière actualité (titre, extrait, lien).</PlaceholderBlock>
        </div>
      </section>
    </div>
  );
}
