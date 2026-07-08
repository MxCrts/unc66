import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "./Logo";
import { COORDONNEES } from "../data/siteContent";

export default function Footer() {
  return (
    <footer className="bg-unc-navy text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="flex items-start gap-3">
          <Logo size={40} />
          <div>
            <p className="font-bold">UNC 66</p>
            <p className="text-sm text-white/70">
              Fédération des Pyrénées-Orientales de l'Union Nationale des Combattants
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-white/80">
          <p className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
            {COORDONNEES.adresse}, {COORDONNEES.codePostal} {COORDONNEES.ville}
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 shrink-0" />
            {COORDONNEES.telephone}
          </p>
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 shrink-0" />
            <a href={`mailto:${COORDONNEES.email}`} className="hover:underline">
              {COORDONNEES.email}
            </a>
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-white/80">
          <Link to="/mot-du-president" className="hover:underline">
            Mot du Président
          </Link>
          <Link to="/agenda" className="hover:underline">
            Agenda
          </Link>
          <Link to="/actualites" className="hover:underline">
            Actualités
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} UNC 66 — Union Nationale des Combattants, Pyrénées-Orientales
      </div>
    </footer>
  );
}
