import { useEffect, useState } from "react";
import { MapPin, Check } from "lucide-react";
import { VILLES_ASSOCIATIONS } from "../../data/siteContent";
import {
  listAssociationsLocales,
  upsertAssociationLocale,
  slugVille,
} from "../../services/associationsLocales";
import { messageErreurFirebase } from "../../lib/firebaseErrors";
import Field, { inputClass } from "../../components/admin/Field";
import StatusMessage from "../../components/admin/StatusMessage";

const FICHE_VIDE = { nom: "", adresse: "", telephone: "", email: "" };

export default function NotreRegionAdmin() {
  // fiches : { [slug]: { nom, adresse, telephone, email } } pour les 9 communes.
  const [fiches, setFiches] = useState(() =>
    Object.fromEntries(VILLES_ASSOCIATIONS.map((v) => [slugVille(v), { ...FICHE_VIDE }]))
  );
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [savingSlug, setSavingSlug] = useState("");
  const [savedSlug, setSavedSlug] = useState("");
  const [errorSlug, setErrorSlug] = useState({ slug: "", message: "" });

  async function loadFiches() {
    setLoading(true);
    setLoadError("");
    try {
      const existantes = await listAssociationsLocales();
      const parSlug = Object.fromEntries(existantes.map((f) => [f.id, f]));
      setFiches(
        Object.fromEntries(
          VILLES_ASSOCIATIONS.map((v) => {
            const slug = slugVille(v);
            const f = parSlug[slug];
            return [
              slug,
              {
                nom: f?.nom || "",
                adresse: f?.adresse || "",
                telephone: f?.telephone || "",
                email: f?.email || "",
              },
            ];
          })
        )
      );
    } catch (err) {
      setLoadError(messageErreurFirebase(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFiches();
  }, []);

  function updateChamp(slug, champ, valeur) {
    setFiches((f) => ({ ...f, [slug]: { ...f[slug], [champ]: valeur } }));
    if (savedSlug === slug) setSavedSlug("");
  }

  async function handleSave(ville) {
    const slug = slugVille(ville);
    setSavingSlug(slug);
    setSavedSlug("");
    setErrorSlug({ slug: "", message: "" });
    try {
      await upsertAssociationLocale(ville, fiches[slug]);
      setSavedSlug(slug);
    } catch (err) {
      setErrorSlug({ slug, message: messageErreurFirebase(err) });
    } finally {
      setSavingSlug("");
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-unc-navy mb-2">Notre région</h1>
      <p className="text-sm text-unc-gray/70 mb-6">
        Renseignez les coordonnées de chacune des 9 associations locales. Les champs laissés vides
        s'affichent en « À remplir » sur la page publique.
      </p>

      <StatusMessage type="error">{loadError}</StatusMessage>

      {loading ? (
        <p className="text-sm text-unc-gray/60">Chargement…</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {VILLES_ASSOCIATIONS.map((ville) => {
            const slug = slugVille(ville);
            const fiche = fiches[slug];
            return (
              <form
                key={slug}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(ville);
                }}
                className="bg-white border border-unc-border/30 rounded-lg p-5 space-y-3"
              >
                <h2 className="flex items-center gap-2 font-bold text-unc-navy">
                  <MapPin className="w-4 h-4 shrink-0" />
                  {ville}
                </h2>

                <Field label="Nom / responsable de l'association">
                  <input
                    type="text"
                    className={inputClass}
                    value={fiche.nom}
                    onChange={(e) => updateChamp(slug, "nom", e.target.value)}
                  />
                </Field>

                <Field label="Adresse">
                  <input
                    type="text"
                    className={inputClass}
                    value={fiche.adresse}
                    onChange={(e) => updateChamp(slug, "adresse", e.target.value)}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Téléphone">
                    <input
                      type="tel"
                      className={inputClass}
                      value={fiche.telephone}
                      onChange={(e) => updateChamp(slug, "telephone", e.target.value)}
                    />
                  </Field>
                  <Field label="E-mail">
                    <input
                      type="email"
                      className={inputClass}
                      value={fiche.email}
                      onChange={(e) => updateChamp(slug, "email", e.target.value)}
                    />
                  </Field>
                </div>

                {errorSlug.slug === slug && (
                  <StatusMessage type="error">{errorSlug.message}</StatusMessage>
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={savingSlug === slug}
                    className="bg-unc-navy hover:bg-unc-navy-dark text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors disabled:opacity-60"
                  >
                    {savingSlug === slug ? "Enregistrement…" : "Enregistrer"}
                  </button>
                  {savedSlug === slug && (
                    <span className="inline-flex items-center gap-1 text-sm text-green-700">
                      <Check className="w-4 h-4" />
                      Enregistré
                    </span>
                  )}
                </div>
              </form>
            );
          })}
        </div>
      )}
    </div>
  );
}
