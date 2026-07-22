import { useEffect } from "react";
import { Upload, X } from "lucide-react";
import { validerImage } from "../../lib/imageValidation";
import { inputClass } from "./Field";
import StatusMessage from "./StatusMessage";

// Champ image réutilisable des formulaires admin (actualités, actualités
// locales, partenaires) : soit une URL collée, soit un fichier importé depuis
// le PC. Le parent détient l'état (un seul objet, créé par imageFieldVide() /
// imageFieldDepuisItem()) et le résout au submit via resolveImageField().
//
// Convention identique partout : `url` peut être une URL externe OU l'URL d'un
// fichier uploadé ; `storagePath` n'est renseigné que dans le second cas, pour
// savoir quel fichier Storage supprimer/remplacer.

export function imageFieldVide() {
  return {
    mode: "url", // "url" | "file"
    urlInput: "",
    file: null, // fichier choisi, pas encore uploadé (upload différé au submit)
    preview: "",
    currentUrl: "", // image déjà enregistrée (upload précédent), tant que non remplacée
    currentStoragePath: "",
    pendingDeletePath: "", // fichier Storage à supprimer une fois l'enregistrement réussi
    error: "",
  };
}

export function imageFieldDepuisItem({ url, storagePath }) {
  const state = imageFieldVide();
  if (storagePath) {
    return { ...state, mode: "file", currentUrl: url || "", currentStoragePath: storagePath };
  }
  return { ...state, mode: "url", urlInput: url || "" };
}

// À appeler au submit : uploade le fichier en attente s'il y en a un (via
// uploadFn(file) -> { url, storagePath }) et renvoie les valeurs à enregistrer.
export async function resolveImageField(state, uploadFn) {
  if (state.mode === "file") {
    if (state.file) {
      const uploaded = await uploadFn(state.file);
      return { url: uploaded.url, storagePath: uploaded.storagePath };
    }
    return { url: state.currentUrl || null, storagePath: state.currentStoragePath || null };
  }
  return { url: state.urlInput.trim() || null, storagePath: null };
}

export default function ImageField({ state, onChange, uploading = false, disabled = false }) {
  // Révoque l'URL d'aperçu locale précédente à chaque changement / démontage.
  useEffect(() => {
    const preview = state.preview;
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [state.preview]);

  function handleModeChange(mode) {
    if (mode === state.mode) return;
    const next = {
      ...state,
      mode,
      file: null,
      preview: "",
      urlInput: "",
      error: "",
    };
    // Passer en mode URL abandonne l'éventuel upload précédent : à supprimer au submit.
    if (mode === "url" && state.currentStoragePath) {
      next.pendingDeletePath = state.currentStoragePath;
      next.currentUrl = "";
      next.currentStoragePath = "";
    }
    onChange(next);
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      validerImage(file);
    } catch (err) {
      onChange({ ...state, error: err.message });
      e.target.value = "";
      return;
    }
    const next = { ...state, file, preview: URL.createObjectURL(file), error: "" };
    if (state.currentStoragePath) {
      next.pendingDeletePath = state.currentStoragePath;
      next.currentUrl = "";
      next.currentStoragePath = "";
    }
    onChange(next);
    e.target.value = "";
  }

  function handleRemove() {
    onChange({
      ...state,
      file: null,
      preview: "",
      currentUrl: "",
      currentStoragePath: "",
      urlInput: "",
      error: "",
      pendingDeletePath: state.currentStoragePath || state.pendingDeletePath,
    });
  }

  const previewSrc =
    state.mode === "file" ? state.preview || state.currentUrl : state.urlInput;

  const modeButtonClass = (active) =>
    `px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
      active
        ? "bg-unc-navy text-white border-unc-navy"
        : "bg-white text-unc-gray border-unc-border/40 hover:border-unc-navy/40"
    }`;

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button type="button" onClick={() => handleModeChange("url")} className={modeButtonClass(state.mode === "url")}>
          Coller une URL
        </button>
        <button type="button" onClick={() => handleModeChange("file")} className={modeButtonClass(state.mode === "file")}>
          Importer depuis mon ordinateur
        </button>
      </div>

      {state.mode === "url" ? (
        <input
          type="url"
          className={inputClass}
          placeholder="https://..."
          value={state.urlInput}
          onChange={(e) => onChange({ ...state, urlInput: e.target.value })}
        />
      ) : (
        <label
          className={`flex items-center justify-center gap-2 border-2 border-dashed border-unc-border/40 rounded-md py-6 text-sm text-unc-gray cursor-pointer hover:border-unc-navy/40 transition-colors ${
            uploading ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          <Upload className="w-4 h-4" />
          {uploading
            ? "Envoi en cours…"
            : previewSrc
            ? "Changer l'image"
            : "Cliquez pour choisir une image (JPG, PNG, WebP, 5 Mo max)"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            hidden
            onChange={handleFileChange}
            disabled={uploading || disabled}
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
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-white border border-unc-border/40 rounded-full p-1 text-unc-gray hover:text-red-600 transition-colors"
            aria-label="Retirer l'image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="mt-2">
        <StatusMessage type="error">{state.error}</StatusMessage>
      </div>
    </div>
  );
}
