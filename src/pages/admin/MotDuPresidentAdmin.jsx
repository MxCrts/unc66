import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import {
  getMotDuPresident,
  setMotDuPresident,
  uploadPhotoPresident,
  deletePhotoPresident,
} from "../../services/motDuPresident";
import { validerImage } from "../../lib/imageValidation";
import { messageErreurFirebase } from "../../lib/firebaseErrors";
import { inputClass } from "../../components/admin/Field";
import StatusMessage from "../../components/admin/StatusMessage";

export default function MotDuPresidentAdmin() {
  const [texte, setTexte] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Photo actuellement enregistrée (Firestore + Storage).
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [currentImageStoragePath, setCurrentImageStoragePath] = useState("");
  // Nouvelle photo choisie mais pas encore envoyée (aperçu local uniquement).
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  // Chemin Storage à supprimer une fois l'enregistrement réussi (remplacement/retrait propre).
  const [pendingDeletePath, setPendingDeletePath] = useState("");
  const [photoError, setPhotoError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getMotDuPresident();
        setTexte(data?.texte || "");
        setCurrentImageUrl(data?.imageUrl || "");
        setCurrentImageStoragePath(data?.imageStoragePath || "");
      } catch (err) {
        setLoadError(messageErreurFirebase(err));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Révoque l'URL d'aperçu locale précédente à chaque changement / démontage.
  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError("");
    try {
      validerImage(file);
    } catch (err) {
      setPhotoError(err.message);
      e.target.value = "";
      return;
    }
    if (currentImageStoragePath) {
      setPendingDeletePath(currentImageStoragePath);
      setCurrentImageUrl("");
      setCurrentImageStoragePath("");
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    e.target.value = "";
  }

  function handleRemovePhoto() {
    if (currentImageStoragePath) {
      setPendingDeletePath(currentImageStoragePath);
    }
    setPhotoFile(null);
    setPhotoPreview("");
    setCurrentImageUrl("");
    setCurrentImageStoragePath("");
    setPhotoError("");
  }

  const previewSrc = photoPreview || currentImageUrl;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      let finalImageUrl = currentImageUrl || null;
      let finalImageStoragePath = currentImageStoragePath || null;

      if (photoFile) {
        setUploadingPhoto(true);
        const uploaded = await uploadPhotoPresident(photoFile);
        finalImageUrl = uploaded.url;
        finalImageStoragePath = uploaded.storagePath;
        setUploadingPhoto(false);
      }

      await setMotDuPresident({ texte, imageUrl: finalImageUrl, imageStoragePath: finalImageStoragePath });

      if (pendingDeletePath) {
        try {
          await deletePhotoPresident(pendingDeletePath);
        } catch {
          // Best-effort : la nouvelle photo est déjà enregistrée, on ne bloque pas
          // l'utilisateur pour un fichier orphelin qui n'est plus référencé.
        }
      }

      setCurrentImageUrl(finalImageUrl || "");
      setCurrentImageStoragePath(finalImageStoragePath || "");
      setPhotoFile(null);
      setPhotoPreview("");
      setPendingDeletePath("");
      setSuccess("Mot du Président mis à jour.");
    } catch (err) {
      setError(messageErreurFirebase(err));
    } finally {
      setUploadingPhoto(false);
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-unc-navy mb-6">Mot du Président</h1>

      <StatusMessage type="error">{loadError}</StatusMessage>

      {loading ? (
        <p className="text-sm text-unc-gray/60">Chargement…</p>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-unc-border/30 rounded-lg p-5 space-y-4 max-w-2xl">
          <div>
            <label className="block text-xs font-semibold text-unc-gray mb-1">Photo du Président</label>

            {previewSrc && (
              <div className="mb-3 relative inline-block">
                <img
                  src={previewSrc}
                  alt="Aperçu de la photo du Président"
                  className="h-32 w-32 object-cover rounded-lg border border-unc-border/30"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute -top-2 -right-2 bg-white border border-unc-border/40 rounded-full p-1 text-unc-gray hover:text-red-600 transition-colors"
                  aria-label="Retirer la photo actuelle"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <label
              className={`flex items-center justify-center gap-2 border-2 border-dashed border-unc-border/40 rounded-md py-6 text-sm text-unc-gray cursor-pointer hover:border-unc-navy/40 transition-colors ${
                uploadingPhoto ? "opacity-60 pointer-events-none" : ""
              }`}
            >
              <Upload className="w-4 h-4" />
              {uploadingPhoto ? "Envoi de la photo…" : previewSrc ? "Changer la photo" : "Cliquez pour choisir une photo (JPG, PNG, WebP, 5 Mo max)"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                hidden
                onChange={handlePhotoChange}
                disabled={uploadingPhoto || submitting}
              />
            </label>

            <div className="mt-2">
              <StatusMessage type="error">{photoError}</StatusMessage>
            </div>
          </div>

          <textarea
            rows={12}
            className={inputClass}
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
            placeholder="Texte du mot du Président, affiché sur la page publique..."
          />

          <StatusMessage type="error">{error}</StatusMessage>
          <StatusMessage type="success">{success}</StatusMessage>

          <button
            type="submit"
            disabled={submitting}
            className="bg-unc-navy hover:bg-unc-navy-dark text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors disabled:opacity-60"
          >
            {uploadingPhoto ? "Envoi de la photo…" : submitting ? "Enregistrement…" : "Enregistrer"}
          </button>
        </form>
      )}
    </div>
  );
}
