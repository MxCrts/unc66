import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  CalendarDays,
  Newspaper,
  Handshake,
  MapPinned,
  Mail,
  LogOut,
} from "lucide-react";
import Logo from "../../components/Logo";

// Shell de tableau de bord (UI seule). Phase 2 : protéger cette route via
// Firebase Auth (onAuthStateChanged) et brancher chaque section sur Firestore.
const SECTIONS = [
  { label: "Vue d'ensemble", icon: LayoutDashboard },
  { label: "Mot du Président", icon: FileText },
  { label: "Agenda", icon: CalendarDays },
  { label: "Actualités", icon: Newspaper },
  { label: "Partenaires", icon: Handshake },
  { label: "Notre région", icon: MapPinned },
  { label: "Contact", icon: Mail },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-unc-bg-soft">
      <aside className="w-64 bg-unc-navy text-white flex flex-col shrink-0">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <Logo size={36} />
          <div>
            <p className="text-sm font-bold">UNC 66</p>
            <p className="text-[11px] text-white/60">Espace admin</p>
          </div>
        </div>

        <nav className="flex-1 py-4">
          {SECTIONS.map((section, i) => (
            <button
              key={section.label}
              type="button"
              className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm text-left transition-colors ${
                i === 0 ? "bg-white/10 font-semibold" : "text-white/80 hover:bg-white/5"
              }`}
            >
              <section.icon className="w-4 h-4 shrink-0" />
              {section.label}
            </button>
          ))}
        </nav>

        <Link
          to="/"
          className="flex items-center gap-3 px-5 py-4 text-sm text-white/70 hover:text-white border-t border-white/10"
        >
          <LogOut className="w-4 h-4" />
          Quitter l'espace admin
        </Link>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-xl font-bold text-unc-navy mb-2">Vue d'ensemble</h1>
        <p className="text-sm text-unc-gray/70 mb-6">
          Tableau de bord en construction — la gestion de contenu (Firestore) sera branchée en phase 2.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SECTIONS.slice(1).map((section) => (
            <div key={section.label} className="bg-white border border-unc-border/30 rounded-lg p-5">
              <section.icon className="w-5 h-5 text-unc-navy mb-2" />
              <p className="text-sm font-semibold text-unc-navy">{section.label}</p>
              <p className="text-xs text-unc-gray/60 mt-1">[À REMPLIR — module d'édition]</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
