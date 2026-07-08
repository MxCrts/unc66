import { useEffect, useRef, useState } from "react";
import { Trash2, FileText, Upload } from "lucide-react";
import { listDocuments, uploadDocument, deleteDocument } from "../../services/documents";
import { messageErreurFirebase } from "../../lib/firebaseErrors";
import StatusMessage from "../../components/admin/StatusMessage";

export default function DocumentsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  async function loadItems() {
    setLoading(true);
    setLoadError("");
    try {
      setItems(await listDocuments());
    } catch (err) {
      setLoadError(messageErreurFirebase(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setSuccess("");
    setUploading(true);
    try {
      await uploadDocument(file);
      setSuccess(`« ${file.name} » envoyé.`);
      await loadItems();
    } catch (err) {
      setError(messageErreurFirebase(err));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Supprimer définitivement « ${item.nom} » ?`)) return;
    try {
      await deleteDocument(item);
      await loadItems();
    } catch (err) {
      setLoadError(messageErreurFirebase(err));
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-unc-navy mb-6">Documents</h1>

      <div className="bg-white border border-unc-border/30 rounded-lg p-5 mb-8 max-w-2xl">
        <h2 className="text-sm font-bold uppercase tracking-wide text-unc-navy mb-3">Envoyer un document</h2>
        <label
          className={`flex items-center justify-center gap-2 border-2 border-dashed border-unc-border/40 rounded-md py-6 text-sm text-unc-gray cursor-pointer hover:border-unc-navy/40 transition-colors ${
            uploading ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          <Upload className="w-4 h-4" />
          {uploading ? "Envoi en cours…" : "Cliquez pour choisir un fichier"}
          <input ref={fileInputRef} type="file" hidden onChange={handleFileChange} disabled={uploading} />
        </label>
        <div className="mt-3 space-y-2">
          <StatusMessage type="error">{error}</StatusMessage>
          <StatusMessage type="success">{success}</StatusMessage>
        </div>
      </div>

      <h2 className="text-sm font-bold uppercase tracking-wide text-unc-navy mb-3">
        Documents existants ({items.length})
      </h2>

      <StatusMessage type="error">{loadError}</StatusMessage>

      {loading ? (
        <p className="text-sm text-unc-gray/60">Chargement…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-unc-gray/60">Aucun document pour l'instant.</p>
      ) : (
        <div className="space-y-2 max-w-2xl">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-unc-border/30 rounded-lg p-4 flex items-center justify-between gap-4"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-unc-navy hover:underline min-w-0"
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.nom}</span>
              </a>
              <button
                type="button"
                onClick={() => handleDelete(item)}
                className="p-2 text-unc-gray hover:text-red-600 hover:bg-red-50 rounded-md transition-colors shrink-0"
                aria-label="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
