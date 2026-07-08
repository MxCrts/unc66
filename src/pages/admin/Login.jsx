import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Lock, AlertCircle } from "lucide-react";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { messageErreurFirebase } from "../../lib/firebaseErrors";
import Logo from "../../components/Logo";

export default function Login() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Déjà connecté : inutile de repasser par le login.
  if (!authLoading && user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(messageErreurFirebase(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-unc-bg-soft flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-unc-border/30 rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center mb-6">
          <Logo size={56} />
          <h1 className="mt-4 text-lg font-bold text-unc-navy">Espace privé UNC 66</h1>
          <p className="text-sm text-unc-gray/70">Connexion réservée aux administrateurs</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-unc-gray mb-1">
              Adresse e-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-unc-border/40 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-unc-navy/30"
            />
          </div>

          {error && (
            <p className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-unc-navy hover:bg-unc-navy-dark text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Lock className="w-4 h-4" />
            {submitting ? "Connexion en cours…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
