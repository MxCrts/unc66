import { useEffect, useState } from "react";
import Hero from "../components/accueil/Hero";
import ActionsRapides from "../components/accueil/ActionsRapides";
import MissionsCard from "../components/accueil/MissionsCard";
import PermanencesCard from "../components/accueil/PermanencesCard";
import DerniereActualite from "../components/accueil/DerniereActualite";
import { getDerniereActualite } from "../services/actualites";

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
      <ActionsRapides />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <div className="space-y-6 sm:space-y-8">
          <MissionsCard />
          <PermanencesCard />
        </div>

        <DerniereActualite actu={derniereActu} loading={loadingActu} />
      </section>
    </div>
  );
}
