// Bandeau de titre institutionnel, utilisé en haut de chaque page intérieure
// (toutes les pages sauf l'accueil, qui a son propre grand bandeau photo).
export default function PageHeader({ title, subtitle }) {
  return (
    <div className="bg-unc-navy">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{title}</h1>
        {subtitle && <p className="mt-2 text-white/70 max-w-2xl">{subtitle}</p>}
      </div>
    </div>
  );
}
