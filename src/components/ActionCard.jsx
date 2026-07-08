import { Link } from "react-router-dom";
import { BookOpen, UserPlus, HeartHandshake, Briefcase, Handshake, LifeBuoy, ExternalLink } from "lucide-react";

// Icônes disponibles pour les actions rapides (voir data/siteContent.js).
const ICONS = { BookOpen, UserPlus, HeartHandshake, Briefcase, Handshake, LifeBuoy };

export default function ActionCard({ label, icon, to, href, internal }) {
  const Icon = ICONS[icon] ?? BookOpen;

  const content = (
    <>
      <div className="w-14 h-14 rounded-full bg-unc-bg-soft group-hover:bg-unc-navy flex items-center justify-center transition-colors">
        <Icon className="w-6 h-6 text-unc-navy group-hover:text-white transition-colors" strokeWidth={1.75} />
      </div>
      <span className="text-sm font-medium text-unc-gray text-center">{label}</span>
      {!internal && <ExternalLink className="w-3 h-3 text-unc-gray/40 -mt-1" />}
    </>
  );

  const className = "group flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-unc-bg-soft transition-colors";

  return internal ? (
    <Link to={to} className={className}>
      {content}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  );
}
