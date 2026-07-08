import { Clock, Phone, Mail } from "lucide-react";
import { COORDONNEES } from "../../data/siteContent";

export default function PermanencesCard() {
  return (
    <div className="border border-unc-border/40 rounded-lg p-5 sm:p-6">
      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-unc-navy mb-4">
        <Clock className="w-4 h-4" />
        Permanences
      </h2>
      <p className="text-sm font-medium text-unc-navy mb-3">{COORDONNEES.nom}</p>
      <ul className="text-sm text-unc-gray space-y-1.5 mb-4">
        {COORDONNEES.horaires.map((h) => (
          <li
            key={h.jours}
            className="flex justify-between gap-4 border-b border-unc-border/10 pb-1.5 last:border-0 last:pb-0"
          >
            <span className="font-semibold text-unc-navy">{h.jours}</span>
            <span>{h.plage}</span>
          </li>
        ))}
      </ul>
      <div className="space-y-1.5 text-sm text-unc-gray">
        <p className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-unc-navy/60 shrink-0" />
          {COORDONNEES.telephone}
        </p>
        <p className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-unc-navy/60 shrink-0" />
          <a href={`mailto:${COORDONNEES.email}`} className="text-unc-navy hover:underline break-all">
            {COORDONNEES.email}
          </a>
        </p>
      </div>
    </div>
  );
}
