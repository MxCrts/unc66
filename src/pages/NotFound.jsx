import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <p className="text-unc-navy font-extrabold text-5xl">404</p>
      <h1 className="mt-4 text-xl font-bold text-unc-navy">Page introuvable</h1>
      <p className="mt-2 text-unc-gray">Cette page n'existe pas ou a été déplacée.</p>
      <Link
        to="/"
        className="inline-block mt-6 bg-unc-navy hover:bg-unc-navy-dark text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
