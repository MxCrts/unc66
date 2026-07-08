import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Enveloppe les routes /admin/dashboard/* : redirige vers /admin (login) si
// l'utilisateur n'est pas connecté. Affiche un état de chargement le temps
// que Firebase confirme la session (sinon flash de redirection au reload).
export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-unc-gray">
        Chargement…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
