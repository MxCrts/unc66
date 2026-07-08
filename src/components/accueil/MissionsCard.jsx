import { ShieldCheck } from "lucide-react";

const MISSIONS = [
  "Aide à la reconversion des anciens militaires et de leur conjoint",
  "Aide aux démarches et au soutien des blessés",
  "Transmet la mémoire aux jeunes générations",
  "Recueille les témoignages de vétérans",
];

export default function MissionsCard() {
  return (
    <div className="border border-unc-border/40 rounded-lg p-5 sm:p-6">
      <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-unc-navy mb-4">
        <ShieldCheck className="w-4 h-4" />
        La Fédération UNC 66
      </h2>
      <ul className="space-y-2.5 text-sm text-unc-gray">
        {MISSIONS.map((mission) => (
          <li key={mission} className="flex gap-2.5">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-unc-navy shrink-0" />
            <span>{mission}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
