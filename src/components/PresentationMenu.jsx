import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ExternalLink } from "lucide-react";
import { PRESENTATION_MENU } from "../data/siteContent";

// Méga-menu déroulant "Présentation" (3 colonnes), affiché au clic.
// Se ferme au clic extérieur ou en appuyant sur Échap.
export default function PresentationMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function onEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-unc-navy hover:text-unc-navy-dark transition-colors"
      >
        Présentation
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[min(90vw,760px)] bg-white border border-unc-border/30 rounded-lg shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 z-50">
          {PRESENTATION_MENU.map((colonne) => (
            <div key={colonne.titre}>
              <h3 className="text-xs font-bold uppercase tracking-wide text-unc-navy mb-3">
                {colonne.titre}
              </h3>
              <ul className="space-y-2">
                {colonne.items.map((item) => (
                  <li key={item.label}>
                    {item.internal ? (
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className="text-sm text-unc-gray hover:text-unc-navy transition-colors"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-unc-gray hover:text-unc-navy transition-colors inline-flex items-center gap-1"
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
  );
}
