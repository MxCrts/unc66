import { MapPin } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { ASSOCIATIONS_LOCALES } from "../data/siteContent";

export default function NotreRegion() {
  return (
    <div>
      <PageHeader title="Notre région" subtitle="Les associations locales UNC dans les Pyrénées-Orientales" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ASSOCIATIONS_LOCALES.map((a) => (
            <div key={a.ville} className="border border-unc-border/30 rounded-lg p-4">
              <h2 className="flex items-center gap-2 font-bold text-unc-navy mb-1">
                <MapPin className="w-4 h-4 shrink-0" />
                {a.ville}
              </h2>
              <p className="text-sm text-unc-gray">{a.nom}</p>
              <p className="text-sm text-unc-gray/70">{a.adresse}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
