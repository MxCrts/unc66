import { useEffect, useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { VILLES_ASSOCIATIONS } from "../data/siteContent";
import { listAssociationsLocales, slugVille } from "../services/associationsLocales";

export default function NotreRegion() {
  // Squelette : les 9 communes de référence, enrichies par les fiches Firestore.
  const [fiches, setFiches] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const existantes = await listAssociationsLocales();
        setFiches(Object.fromEntries(existantes.map((f) => [f.id, f])));
      } catch {
        setFiches({});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <PageHeader title="Notre région" subtitle="Les associations locales UNC dans les Pyrénées-Orientales" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VILLES_ASSOCIATIONS.map((ville) => {
            const fiche = fiches[slugVille(ville)];
            const nom = fiche?.nom?.trim();
            const adresse = fiche?.adresse?.trim();
            const telephone = fiche?.telephone?.trim();
            const email = fiche?.email?.trim();
            const vide = !nom && !adresse && !telephone && !email;

            return (
              <div key={ville} className="border border-unc-border/30 rounded-lg p-4">
                <h2 className="flex items-center gap-2 font-bold text-unc-navy mb-1">
                  <MapPin className="w-4 h-4 shrink-0" />
                  {ville}
                </h2>

                {loading ? (
                  <p className="text-sm text-unc-gray/50">Chargement…</p>
                ) : vide ? (
                  <p className="text-sm italic text-unc-gray/50">[À REMPLIR]</p>
                ) : (
                  <div className="space-y-1 text-sm text-unc-gray">
                    {nom && <p className="font-medium text-unc-navy/90">{nom}</p>}
                    {adresse && <p className="text-unc-gray/80">{adresse}</p>}
                    {telephone && (
                      <p className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 shrink-0 text-unc-gray/60" />
                        {telephone}
                      </p>
                    )}
                    {email && (
                      <p className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 shrink-0 text-unc-gray/60" />
                        <a href={`mailto:${email}`} className="hover:text-unc-navy hover:underline">
                          {email}
                        </a>
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
