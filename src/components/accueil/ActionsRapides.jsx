import ActionCard from "../ActionCard";
import { ACTIONS_RAPIDES } from "../../data/siteContent";

// Grille d'accès rapide (liens externes unc.fr). Encart à bordure bleue, même
// convention que le reste du site. Le positionnement (marges, largeur) est géré
// par l'accueil qui l'insère dans sa colonne centrale.
export default function ActionsRapides() {
  return (
    <div className="border border-unc-border/30 rounded-xl px-4 py-6 sm:px-8 sm:py-8">
      <h2 className="text-xs font-bold uppercase tracking-wide text-unc-navy/70 mb-5 text-center sm:text-left">
        Accès rapide
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        {ACTIONS_RAPIDES.map((action) => (
          <ActionCard key={action.label} {...action} />
        ))}
      </div>
    </div>
  );
}
