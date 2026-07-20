import { Link } from "react-router-dom";
import { FileText, CalendarDays, Newspaper, Megaphone, MapPin, FolderOpen } from "lucide-react";

const SECTIONS = [
  { to: "/admin/dashboard/mot-du-president", label: "Mot du Président", icon: FileText, desc: "Éditer le texte affiché sur la page publique." },
  { to: "/admin/dashboard/agenda", label: "Agenda", icon: CalendarDays, desc: "Créer, modifier, archiver les événements." },
  { to: "/admin/dashboard/actualites", label: "Actualités", icon: Newspaper, desc: "Publier et archiver les actualités du site." },
  { to: "/admin/dashboard/actualites-locales", label: "Actualités locales", icon: Megaphone, desc: "Publier les actualités des 9 associations locales." },
  { to: "/admin/dashboard/notre-region", label: "Notre région", icon: MapPin, desc: "Renseigner les coordonnées des associations locales." },
  { to: "/admin/dashboard/documents", label: "Documents", icon: FolderOpen, desc: "Uploader et gérer les fichiers (PDF, etc.)." },
];

export default function Overview() {
  return (
    <div>
      <h1 className="text-xl font-bold text-unc-navy mb-2">Vue d'ensemble</h1>
      <p className="text-sm text-unc-gray/70 mb-6">
        Choisissez une section à gérer. Les modifications sont visibles immédiatement sur le site public.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SECTIONS.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className="bg-white border border-unc-border/30 rounded-lg p-5 hover:border-unc-navy/40 hover:shadow-sm transition"
          >
            <section.icon className="w-5 h-5 text-unc-navy mb-2" />
            <p className="text-sm font-semibold text-unc-navy">{section.label}</p>
            <p className="text-xs text-unc-gray/60 mt-1">{section.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
