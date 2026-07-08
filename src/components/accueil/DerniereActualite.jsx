import { Link } from "react-router-dom";
import { Newspaper, ArrowRight } from "lucide-react";

// Met en avant la dernière actualité publiée (non archivée) sur l'accueil.
// Affiche imageUrl exactement comme la page Actualités (image edge-to-edge si
// présente, rien sinon — pas de cadre cassé ni d'espace vide). Toute la carte
// mène à la page Actualités, seul endroit où lire le contenu complet.
export default function DerniereActualite({ actu, loading }) {
  return (
    <div className="border border-unc-border/40 rounded-lg overflow-hidden h-full flex flex-col">
      <div className="px-5 sm:px-6 pt-5 sm:pt-6">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-unc-navy mb-4">
          <Newspaper className="w-4 h-4" />
          Dernière actualité
        </h2>
      </div>

      {loading ? (
        <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-unc-gray/60">Chargement…</p>
      ) : actu ? (
        <Link to="/actualites" className="group flex flex-col flex-1">
          {actu.imageUrl && (
            <img src={actu.imageUrl} alt={actu.titre} className="w-full h-44 sm:h-52 object-cover" />
          )}
          <div className="p-5 sm:p-6 flex flex-col flex-1">
            <p className="text-xs text-unc-gray/60 mb-1">{actu.date}</p>
            <h3 className="font-bold text-unc-navy mb-2 group-hover:underline">{actu.titre}</h3>
            <p className="text-sm text-unc-gray line-clamp-4 whitespace-pre-line flex-1">{actu.contenu}</p>
            <span className="inline-flex items-center gap-1.5 mt-4 text-sm text-unc-navy font-semibold">
              Voir toutes les actualités
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      ) : (
        <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-unc-gray/60 italic">
          Aucune actualité pour le moment.
        </p>
      )}
    </div>
  );
}
