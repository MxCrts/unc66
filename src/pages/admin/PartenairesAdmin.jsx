import { useEffect, useState } from "react";
import { Pencil, Trash2, X, ArrowUp, ArrowDown, DownloadCloud, ImageOff } from "lucide-react";
import {
  listPartenaires,
  createPartenaire,
  updatePartenaire,
  updatePartenaireOrdre,
  deletePartenaire,
  uploadPartenaireLogo,
  deletePartenaireLogo,
  seedPartenairesDepuisSite,
} from "../../services/partenaires";
import { messageErreurFirebase } from "../../lib/firebaseErrors";
import Field, { inputClass } from "../../components/admin/Field";
import StatusMessage from "../../components/admin/StatusMessage";
import ImageField, {
  imageFieldVide,
  imageFieldDepuisItem,
  resolveImageField,
} from "../../components/admin/ImageField";

const FORM_VIDE = { nom: "", categorie: "", url: "" };

export default function PartenairesAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [form, setForm] = useState(FORM_VIDE);
  const [logo, setLogo] = useState(imageFieldVide());
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");
  const [seeding, setSeeding] = useState(false);

  async function loadItems() {
    setLoading(true);
    setLoadError("");
    try {
      setItems(await listPartenaires());
    } catch (err) {
      setLoadError(messageErreurFirebase(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  // Catégories déjà utilisées, proposées en autocomplétion du champ catégorie.
  const categoriesExistantes = [...new Set(items.map((i) => i.categorie).filter(Boolean))];

  function resetForm() {
    setForm(FORM_VIDE);
    setLogo(imageFieldVide());
    setEditingId(null);
    setFormError("");
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm({
      nom: item.nom || "",
      categorie: item.categorie || "",
      url: item.url || "",
    });
    setLogo(imageFieldDepuisItem({ url: item.logoUrl, storagePath: item.logoStoragePath }));
    setSuccess("");
    setFormError("");
  }

  async function handleDelete(item) {
    if (!window.confirm(`Supprimer définitivement le partenaire « ${item.nom} » ?`)) return;
    try {
      await deletePartenaire(item);
      if (editingId === item.id) resetForm();
      await loadItems();
    } catch (err) {
      setLoadError(messageErreurFirebase(err));
    }
  }

  // Échange le champ ordre avec le voisin du dessus/dessous dans la liste triée.
  async function handleMove(index, direction) {
    const autreIndex = index + direction;
    if (autreIndex < 0 || autreIndex >= items.length) return;
    const a = items[index];
    const b = items[autreIndex];
    try {
      await Promise.all([
        updatePartenaireOrdre(a.id, b.ordre),
        updatePartenaireOrdre(b.id, a.ordre),
      ]);
      await loadItems();
    } catch (err) {
      setLoadError(messageErreurFirebase(err));
    }
  }

  async function handleSeed() {
    if (
      !window.confirm(
        "Importer les partenaires actuellement affichés sur le site dans l'espace admin ? (à faire une seule fois)"
      )
    )
      return;
    setSeeding(true);
    setLoadError("");
    try {
      await seedPartenairesDepuisSite();
      setSuccess("Partenaires du site importés. Vous pouvez maintenant les modifier ici.");
      await loadItems();
    } catch (err) {
      setLoadError(messageErreurFirebase(err));
    } finally {
      setSeeding(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    setSuccess("");
    setSubmitting(true);
    try {
      setUploadingLogo(!!logo.file);
      const resolved = await resolveImageField(logo, uploadPartenaireLogo);
      setUploadingLogo(false);

      const payload = {
        nom: form.nom.trim(),
        categorie: form.categorie.trim(),
        url: form.url.trim(),
        logoUrl: resolved.url,
        logoStoragePath: resolved.storagePath,
      };

      if (editingId) {
        await updatePartenaire(editingId, payload);
        setSuccess("Partenaire mis à jour.");
      } else {
        // Nouveau partenaire ajouté en fin de liste (ordre = max + 10).
        const maxOrdre = items.reduce((max, i) => Math.max(max, i.ordre || 0), 0);
        await createPartenaire({ ...payload, ordre: maxOrdre + 10 });
        setSuccess("Partenaire ajouté.");
      }

      if (logo.pendingDeletePath) {
        try {
          await deletePartenaireLogo(logo.pendingDeletePath);
        } catch {
          // Best-effort : le partenaire est déjà enregistré avec son nouveau logo.
        }
      }

      resetForm();
      await loadItems();
    } catch (err) {
      setFormError(messageErreurFirebase(err));
    } finally {
      setUploadingLogo(false);
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-unc-navy mb-2">Partenaires</h1>
      <p className="text-sm text-unc-gray/70 mb-6">
        Gérez les partenaires affichés sur la page publique « Partenaires » : nom, catégorie, logo,
        lien vers leur site. L'ordre de la liste ci-dessous est celui de la page publique.
      </p>

      {/* Import initial : proposé tant que la collection est vide (le site affiche
          alors sa liste historique en dur). Après import, tout se gère ici. */}
      {!loading && !loadError && items.length === 0 && (
        <div className="bg-white border border-unc-border/30 rounded-lg p-5 mb-8">
          <p className="text-sm text-unc-gray mb-3">
            Les partenaires historiques du site ne sont pas encore importés dans l'espace admin. Tant
            que rien n'est importé, le site continue d'afficher sa liste d'origine.
          </p>
          <button
            type="button"
            onClick={handleSeed}
            disabled={seeding}
            className="inline-flex items-center gap-2 bg-unc-navy hover:bg-unc-navy-dark text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors disabled:opacity-60"
          >
            <DownloadCloud className="w-4 h-4" />
            {seeding ? "Import en cours…" : "Importer les partenaires du site"}
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-unc-border/30 rounded-lg p-5 space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-unc-navy">
            {editingId ? "Modifier le partenaire" : "Nouveau partenaire"}
          </h2>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-xs text-unc-gray hover:text-unc-navy flex items-center gap-1">
              <X className="w-3.5 h-3.5" />
              Annuler la modification
            </button>
          )}
        </div>

        <Field label="Nom">
          <input
            type="text"
            required
            className={inputClass}
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
          />
        </Field>

        <Field label="Catégorie (regroupe les partenaires sur la page publique)">
          <input
            type="text"
            required
            list="categories-partenaires"
            placeholder="Ex : Institutions, Reconversion…"
            className={inputClass}
            value={form.categorie}
            onChange={(e) => setForm({ ...form, categorie: e.target.value })}
          />
          <datalist id="categories-partenaires">
            {categoriesExistantes.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>

        <Field label="Site du partenaire (optionnel)">
          <input
            type="url"
            placeholder="https://..."
            className={inputClass}
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </Field>

        <Field label="Logo">
          <ImageField state={logo} onChange={setLogo} uploading={uploadingLogo} disabled={submitting} />
        </Field>

        <StatusMessage type="error">{formError}</StatusMessage>
        <StatusMessage type="success">{success}</StatusMessage>

        <button
          type="submit"
          disabled={submitting}
          className="bg-unc-navy hover:bg-unc-navy-dark text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors disabled:opacity-60"
        >
          {uploadingLogo
            ? "Envoi du logo…"
            : submitting
            ? "Enregistrement…"
            : editingId
            ? "Enregistrer les modifications"
            : "Ajouter le partenaire"}
        </button>
      </form>

      <h2 className="text-sm font-bold uppercase tracking-wide text-unc-navy mb-3">
        Partenaires existants ({items.length})
      </h2>

      <StatusMessage type="error">{loadError}</StatusMessage>

      {loading ? (
        <p className="text-sm text-unc-gray/60">Chargement…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-unc-gray/60">Aucun partenaire dans l'espace admin pour l'instant.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="bg-white border border-unc-border/30 rounded-lg p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                {item.logoUrl ? (
                  <img
                    src={item.logoUrl}
                    alt={`Logo ${item.nom}`}
                    className="w-12 h-12 object-contain shrink-0 rounded border border-unc-border/20 bg-white"
                  />
                ) : (
                  <span className="w-12 h-12 flex items-center justify-center shrink-0 rounded border border-unc-border/20 bg-unc-bg-soft text-unc-gray/40">
                    <ImageOff className="w-5 h-5" />
                  </span>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-unc-navy truncate">
                    {item.nom}
                    <span className="ml-2 text-[10px] uppercase tracking-wide bg-unc-bg-soft text-unc-gray px-2 py-0.5 rounded-full">
                      {item.categorie}
                    </span>
                  </p>
                  {item.url && <p className="text-xs text-unc-gray/60 truncate">{item.url}</p>}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleMove(index, -1)}
                  disabled={index === 0}
                  className="p-2 text-unc-gray hover:text-unc-navy hover:bg-unc-bg-soft rounded-md transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Monter"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 1)}
                  disabled={index === items.length - 1}
                  className="p-2 text-unc-gray hover:text-unc-navy hover:bg-unc-bg-soft rounded-md transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Descendre"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="p-2 text-unc-gray hover:text-unc-navy hover:bg-unc-bg-soft rounded-md transition-colors"
                  aria-label="Modifier"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  className="p-2 text-unc-gray hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  aria-label="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
