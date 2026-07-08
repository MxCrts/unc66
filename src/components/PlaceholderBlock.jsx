// Bloc de contenu textuel à compléter plus tard (via l'admin, phase 2).
export default function PlaceholderBlock({ children, className = "" }) {
  return (
    <p className={`text-sm italic text-unc-gray/60 ${className}`}>
      [À REMPLIR] {children}
    </p>
  );
}
