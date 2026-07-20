import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import Hero from "../components/accueil/Hero";
import ActionsRapides from "../components/accueil/ActionsRapides";
import MissionsCard from "../components/accueil/MissionsCard";
import PermanencesCard from "../components/accueil/PermanencesCard";
import DerniereActualite from "../components/accueil/DerniereActualite";
import BlocLateral from "../components/accueil/BlocLateral";
import { getDerniereActualite } from "../services/actualites";
import { BLOC_JEUNESSE, BLOC_UNITES_PARTENAIRES } from "../data/siteContent";

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
      <Hero />

      {/* Contenu central encadré par les deux blocs illustrés (demande client).
          Ordre mobile : contenu d'abord, puis les blocs ; sur très large écran
          les blocs passent de part et d'autre de la colonne centrale. */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 sm:pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[16rem_minmax(0,1fr)_16rem] gap-6 xl:gap-8 items-start">
          <div className="order-1 sm:col-span-2 xl:col-span-1 xl:order-2 space-y-8 sm:space-y-10">
            <ActionsRapides />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6 sm:space-y-8">
                <MissionsCard />
                <PermanencesCard />
              </div>
              <DerniereActualite actu={derniereActu} loading={loadingActu} />
            </div>
          </div>

          <div className="order-2 xl:order-1">
            <BlocLateral titre="La jeunesse" items={BLOC_JEUNESSE} />
          </div>
          <div className="order-3 xl:order-3">
            <BlocLateral titre="Nos unités partenaires" items={BLOC_UNITES_PARTENAIRES} />
          </div>
        </div>
      </section>

      {/* Appel à l'adhésion */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-unc-navy">
          Vous partagez nos valeurs, rejoignez-nous&nbsp;!
        </h2>
        <Link
          to="/adherer"
          className="mt-6 inline-flex items-center gap-2 bg-unc-navy hover:bg-unc-navy-dark text-white text-sm font-semibold px-8 py-3 rounded-md transition-colors"
        >
          <UserPlus className="w-4 h-4" />
          Adhérer
        </Link>
      </section>
    </div>
  );
}
