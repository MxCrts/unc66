import { ImageOff } from "lucide-react";

// Emplacement réservé pour une image que le client doit fournir.
// À remplacer par une vraie <img> une fois l'asset livré (voir CLAUDE.md).
export default function PlaceholderImage({ label, className = "" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-unc-bg-soft border border-dashed border-unc-border/50 text-unc-gray/60 ${className}`}
    >
      <ImageOff className="w-6 h-6" strokeWidth={1.5} />
      <span className="text-xs font-medium text-center px-2">[À REMPLIR : {label}]</span>
    </div>
  );
}
