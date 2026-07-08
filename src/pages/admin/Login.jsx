import { Lock } from "lucide-react";
import Logo from "../../components/Logo";

// UI seule pour l'instant : aucune vérification, le bouton ne fait rien.
// Phase 2 : branchement sur Firebase Authentication (signInWithEmailAndPassword)
// puis redirection vers /admin/dashboard.
export default function Login() {
  return (
    <div className="min-h-screen bg-unc-bg-soft flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-unc-border/30 rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <Logo size={56} />
          <h1 className="mt-4 text-lg font-bold text-unc-navy">Espace privé UNC 66</h1>
          <p className="text-sm text-unc-gray/70">Connexion réservée aux administrateurs</p>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-unc-gray mb-1">
              Adresse e-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="prenom.nom@unc66.com"
              className="w-full px-3 py-2 border border-unc-border/40 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-unc-navy/30"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-unc-gray mb-1">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-unc-border/40 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-unc-navy/30"
            />
          </div>
          <button
            type="button"
            disabled
            className="w-full flex items-center justify-center gap-2 bg-unc-navy text-white text-sm font-semibold px-4 py-2.5 rounded-md opacity-60 cursor-not-allowed"
            title="Connexion Firebase pas encore branchée (phase 2)"
          >
            <Lock className="w-4 h-4" />
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
