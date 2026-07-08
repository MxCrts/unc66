import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import Logo from "./Logo";
import PresentationMenu from "./PresentationMenu";
import { NAV_LINKS, PRESENTATION_MENU } from "../data/siteContent";

const linkClasses = ({ isActive }) =>
  `px-3 py-2 text-sm font-medium transition-colors ${
    isActive ? "text-unc-navy border-b-2 border-unc-navy" : "text-unc-gray hover:text-unc-navy"
  }`;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [presentationOpenMobile, setPresentationOpenMobile] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-unc-border/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo + nom */}
          <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setMobileOpen(false)}>
            <Logo size={44} />
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-bold text-unc-navy">UNC 66</p>
              <p className="text-[11px] text-unc-gray">Pyrénées-Orientales</p>
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.megaMenu ? (
                <PresentationMenu key={link.label} />
              ) : (
                <NavLink key={link.label} to={link.to} end={link.to === "/"} className={linkClasses}>
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 bg-unc-navy hover:bg-unc-navy-dark text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
            >
              Espace privé →
            </Link>

            {/* Bouton menu mobile */}
            <button
              type="button"
              className="lg:hidden p-2 text-unc-navy"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile (accordéon) */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-unc-border/20 bg-white">
          <nav className="flex flex-col px-4 py-2">
            {NAV_LINKS.map((link) =>
              link.megaMenu ? (
                <div key={link.label} className="border-b border-unc-border/10">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between py-3 text-sm font-medium text-unc-navy"
                    onClick={() => setPresentationOpenMobile((o) => !o)}
                  >
                    Présentation
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${presentationOpenMobile ? "rotate-180" : ""}`}
                    />
                  </button>
                  {presentationOpenMobile && (
                    <div className="pb-3 space-y-4">
                      {PRESENTATION_MENU.map((colonne) => (
                        <div key={colonne.titre}>
                          <p className="text-xs font-bold uppercase tracking-wide text-unc-navy/70 mb-1.5">
                            {colonne.titre}
                          </p>
                          <ul className="space-y-1.5 pl-2">
                            {colonne.items.map((item) => (
                              <li key={item.label}>
                                {item.internal ? (
                                  <Link
                                    to={item.to}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-sm text-unc-gray"
                                  >
                                    {item.label}
                                  </Link>
                                ) : (
                                  <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-unc-gray inline-flex items-center gap-1"
                                  >
                                    {item.label}
                                    <ExternalLink className="w-3 h-3 opacity-50" />
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm font-medium text-unc-gray border-b border-unc-border/10"
                >
                  {link.label}
                </NavLink>
              )
            )}
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="mt-3 mb-2 text-center bg-unc-navy text-white text-sm font-semibold px-4 py-2.5 rounded-md"
            >
              Espace privé →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
