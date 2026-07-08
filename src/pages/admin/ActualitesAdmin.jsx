import { useEffect, useState } from "react";
import { Pencil, Trash2, Upload, X } from "lucide-react";
import {
  listAllActualites,
  createActualite,
  updateActualite,
  deleteActualite,
  uploadActualiteImage,
  deleteActualiteImage,
} from "../../services/actualites";
import { validerImage } from "../../lib/imageValidation";
import { messageErreurFirebase } from "../../lib/firebaseErrors";
import Field, { inputClass } from "../../components/admin/Field";
import StatusMessage from "../../components/admin/StatusMessage";

const FORM_VIDE = { titre: "", contenu: "", date: "", archive: false };

export default function ActualitesAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [form, setForm] = useState(FORM_VIDE);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  // Image : soit une URL collée, soit un fichier importé depuis le PC.
  const [imageMode, setImageMode] = useState("url"); // "url" | "file"
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  // Image déjà enregistrée (venant d'un upload précédent) tant qu'elle n'est pas remplacée/retirée.
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [currentImageStoragePath, setCurrentImageStoragePath] = useState("");
  // Chemin Storage à supprimer une fois l'enregistrement réussi.
  const [pendingDeletePath, setPendingDeletePath] = useState("");
  const [imageError, setImageError] = useState("");

  async function loadItems() {
    setLoading(true);
    setLoadError("");
    try {
      setItems(await listAllActualites());
    } catch (err) {
      setLoadError(messageErreurFirebase(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  // Révoque l'URL d'aperçu locale précédente à chaque changement / démontage.
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  function resetForm() {
    setForm(FORM_VIDE);
    setEditingId(null);
    setFormError("");
    setImageMode("url");
    setImageUrlInput("");
    setImageFile(null);
    setImagePreview("");
    setCurrentImageUrl("");
    setCurrentImageStoragePath("");
    setPendingDeletePath("");
    setImageError("");
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm({
      titre: item.titre || "",
      contenu: item.contenu || "",
      date: item.date || "",
      archive: !!item.archive,
    });
    if (item.imageStoragePath) {
      setImageMode("file");
      setCurrentImageUrl(item.imageUrl || "");
      setCurrentImageStoragePath(item.imageStoragePath);
      setImageUrlInput("");
    } else {
      setImageMode("url");
      setImageUrlInput(item.imageUrl || "");
      setCurrentImageUrl("");
      setCurrentImageStoragePath("");
    }
    setImageFile(null);
    setImagePreview("");
    setPendingDeletePath("");
    setImageError("");
    setSuccess("");
    setFormError("");
  }

  async function handleDelete(item) {
    if (!window.confirm("Supprimer définitivement cette actualité ?")) return;
    try {
      await deleteActualite(item);
      if (editingId === item.id) resetForm();
      await loadItems();
    } catch (err) {
      setLoadError(messageErreurFirebase(err));
    }
  }

  function handleImageModeChange(mode) {
    if (mode === imageMode) return;
    if (mode === "url" && currentImageStoragePath) {
      setPendingDeletePath(currentImageStoragePath);
      setCurrentImageUrl("");
      setCurrentImageStoragePath("");
    }
    setImageFile(null);
    setImagePreview("");
    setImageUrlInput("");
    setImageError("");
    setImageMode(mode);
  }

  function handleImageFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageError("");
    try {
      validerImage(file);
    } catch (err) {
      setImageError(err.message);
      e.target.value = "";
      return;
    }
    if (currentImageStoragePath) {
      setPendingDeletePath(currentImageStoragePath);
      setCurrentImageUrl("");
      setCurrentImageStoragePath("");
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    e.target.value = "";
  }

  function handleRemoveImage() {
    if (currentImageStoragePath) {
      setPendingDeletePath(currentImageStoragePath);
    }
    setImageFile(null);
    setImagePreview("");
    setCurrentImageUrl("");
    setCurrentImageStoragePath("");
    setImageUrlInput("");
    setImageError("");
  }

  const previewSrc = imageMode === "file" ? imagePreview || currentImageUrl : imageUrlInput;

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    setSuccess("");
    setSubmitting(true);
    try {
      let finalImageUrl = null;
      let finalImageStoragePath = null;

      if (imageMode === "file") {
        if (imageFile) {
          setUploadingImage(true);
          const uploaded = await uploadActualiteImage(imageFile);
          finalImageUrl = uploaded.url;
          finalImageStoragePath = uploaded.storagePath;
          setUploadingImage(false);
        } else {
          finalImageUrl = currentImageUrl || null;
          finalImageStoragePath = currentImageStoragePath || null;
        }
      } else {
        finalImageUrl = imageUrlInput.trim() || null;
        finalImageStoragePath = null;
      }

      const payload = { ...form, imageUrl: finalImageUrl, imageStoragePath: finalImageStoragePath };

      if (editingId) {
        await updateActualite(editingId, payload);
        setSuccess("Actualité mise à jour.");
      } else {
        await createActualite(payload);
        setSuccess("Actualité publiée.");
      }

      if (pendingDeletePath) {
        try {
          await deleteActualiteImage(pendingDeletePath);
        } catch {
          // Best-effort : l'actualité est déjà enregistrée avec sa nouvelle image,
          // on ne bloque pas l'utilisateur pour un fichier orphelin.
        }
      }

      resetForm();
      await loadItems();
    } catch (err) {
      setFormError(messageErreurFirebase(err));
    } finally {
      setUploadingImage(false);
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-unc-navy mb-6">Actualités</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-unc-border/30 rounded-lg p-5 space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-unc-navy">
            {editingId ? "Modifier l'actualité" : "Nouvelle actualité"}
          </h2>
          {editingId && (
            <button type="button" onClick={resetForm} className="text-xs text-unc-gray hover:text-unc-navy flex items-center gap-1">
              <X className="w-3.5 h-3.5" />
              Annuler la modification
            </button>
          )}
        </div>

        <Field label="Titre">
          <input
            type="text"
            required
            className={inputClass}
            value={form.titre}
            onChange={(e) => setForm({ ...form, titre: e.target.value })}
          />
        </Field>

        <Field label="Date">
          <input
            type="date"
            required
            className={inputClass}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </Field>

        <Field label="Contenu">
          <textarea
            required
            rows={5}
            className={inputClass}
            value={form.contenu}
            onChange={(e) => setForm({ ...form, contenu: e.target.value })}
          />
        </Field>

        <Field label="Image (optionnel)">
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              onClick={() => handleImageModeChange("url")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
                imageMode === "url"
                  ? "bg-unc-navy text-white border-unc-navy"
                  : "bg-white text-unc-gray border-unc-border/40 hover:border-unc-navy/40"
              }`}
            >
              Coller une URL
            </button>
            <button
              type="button"
              onClick={() => handleImageModeChange("file")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
                imageMode === "file"
                  ? "bg-unc-navy text-white border-unc-navy"
                  : "bg-white text-unc-gray border-unc-border/40 hover:border-unc-navy/40"
              }`}
            >
              Importer depuis mon ordinateur
            </button>
          </div>

          {imageMode === "url" ? (
            <input
              type="url"
              className={inputClass}
              placeholder="https://..."
              value={imageUrlInput}
              onChange={(e) => setImageUrlInput(e.target.value)}
            />
          ) : (
            <label
              className={`flex items-center justify-center gap-2 border-2 border-dashed border-unc-border/40 rounded-md py-6 text-sm text-unc-gray cursor-pointer hover:border-unc-navy/40 transition-colors ${
                uploadingImage ? "opacity-60 pointer-events-none" : ""
              }`}
            >
              <Upload className="w-4 h-4" />
              {uploadingImage
                ? "Envoi en cours…"
                : previewSrc
                ? "Changer l'image"
                : "Cliquez pour choisir une image (JPG, PNG, WebP, 5 Mo max)"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                hidden
                onChange={handleImageFileChange}
                disabled={uploadingImage || submitting}
              />
            </label>
          )}

          {previewSrc && (
            <div className="mt-3 relative inline-block">
              <img
                src={previewSrc}
                alt="Aperçu"
                className="h-32 w-auto max-w-full object-cover rounded-md border border-unc-border/30"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-white border border-unc-border/40 rounded-full p-1 text-unc-gray hover:text-red-600 transition-colors"
                aria-label="Retirer l'image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="mt-2">
            <StatusMessage type="error">{imageError}</StatusMessage>
          </div>
        </Field>

        <label className="flex items-center gap-2 text-sm text-unc-gray">
          <input
            type="checkbox"
            checked={form.archive}
            onChange={(e) => setForm({ ...form, archive: e.target.checked })}
          />
          Archiver (ne s'affiche plus dans les actualités en avant sur le site)
        </label>

        <StatusMessage type="error">{formError}</StatusMessage>
        <StatusMessage type="success">{success}</StatusMessage>

        <button
          type="submit"
          disabled={submitting}
          className="bg-unc-navy hover:bg-unc-navy-dark text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors disabled:opacity-60"
        >
          {uploadingImage
            ? "Envoi de l'image…"
            : submitting
            ? "Enregistrement…"
            : editingId
            ? "Enregistrer les modifications"
            : "Publier l'actualité"}
        </button>
      </form>

      <h2 className="text-sm font-bold uppercase tracking-wide text-unc-navy mb-3">
        Actualités existantes ({items.length})
      </h2>

      <StatusMessage type="error">{loadError}</StatusMessage>

      {loading ? (
        <p className="text-sm text-unc-gray/60">Chargement…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-unc-gray/60">Aucune actualité pour l'instant.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-unc-border/30 rounded-lg p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-unc-navy truncate">
                  {item.titre}
                  {item.archive && (
                    <span className="ml-2 text-[10px] uppercase tracking-wide bg-unc-bg-soft text-unc-gray px-2 py-0.5 rounded-full">
                      Archivée
                    </span>
                  )}
                </p>
                <p className="text-xs text-unc-gray/60">{item.date}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
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
