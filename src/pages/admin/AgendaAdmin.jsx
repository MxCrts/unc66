import { useEffect, useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import {
  listAllEvenements,
  createEvenement,
  updateEvenement,
  deleteEvenement,
} from "../../services/agenda";
import { messageErreurFirebase } from "../../lib/firebaseErrors";
import Field, { inputClass } from "../../components/admin/Field";
import StatusMessage from "../../components/admin/StatusMessage";

const FORM_VIDE = { titre: "", date: "", description: "", type: "", archive: false };

export default function AgendaAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [form, setForm] = useState(FORM_VIDE);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadItems() {
    setLoading(true);
    setLoadError("");
    try {
      setItems(await listAllEvenements());
    } catch (err) {
      setLoadError(messageErreurFirebase(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  function resetForm() {
    setForm(FORM_VIDE);
    setEditingId(null);
    setFormError("");
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm({
      titre: item.titre || "",
      date: item.date || "",
      description: item.description || "",
      type: item.type || "",
      archive: !!item.archive,
    });
    setSuccess("");
    setFormError("");
  }

  async function handleDelete(id) {
    if (!window.confirm("Supprimer définitivement cet événement ?")) return;
    try {
      await deleteEvenement(id);
      if (editingId === id) resetForm();
      await loadItems();
    } catch (err) {
      setLoadError(messageErreurFirebase(err));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");
    setSuccess("");
    setSubmitting(true);
    try {
      if (editingId) {
        await updateEvenement(editingId, form);
        setSuccess("Événement mis à jour.");
      } else {
        await createEvenement(form);
        setSuccess("Événement créé.");
      }
      resetForm();
      await loadItems();
    } catch (err) {
      setFormError(messageErreurFirebase(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-unc-navy mb-6">Agenda</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-unc-border/30 rounded-lg p-5 space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-unc-navy">
            {editingId ? "Modifier l'événement" : "Nouvel événement"}
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

        <div className="grid grid-cols-2 gap-4">
          <Field label="Date">
            <input
              type="date"
              required
              className={inputClass}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </Field>
          <Field label="Type">
            <input
              type="text"
              placeholder="Cérémonie, repas..."
              className={inputClass}
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
          </Field>
        </div>

        <Field label="Description">
          <textarea
            rows={4}
            className={inputClass}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Field>

        <label className="flex items-center gap-2 text-sm text-unc-gray">
          <input
            type="checkbox"
            checked={form.archive}
            onChange={(e) => setForm({ ...form, archive: e.target.checked })}
          />
          Archiver (événement passé, affiché uniquement dans les archives)
        </label>

        <StatusMessage type="error">{formError}</StatusMessage>
        <StatusMessage type="success">{success}</StatusMessage>

        <button
          type="submit"
          disabled={submitting}
          className="bg-unc-navy hover:bg-unc-navy-dark text-white text-sm font-semibold px-4 py-2.5 rounded-md transition-colors disabled:opacity-60"
        >
          {submitting ? "Enregistrement…" : editingId ? "Enregistrer les modifications" : "Créer l'événement"}
        </button>
      </form>

      <h2 className="text-sm font-bold uppercase tracking-wide text-unc-navy mb-3">
        Événements existants ({items.length})
      </h2>

      <StatusMessage type="error">{loadError}</StatusMessage>

      {loading ? (
        <p className="text-sm text-unc-gray/60">Chargement…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-unc-gray/60">Aucun événement pour l'instant.</p>
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
                      Archivé
                    </span>
                  )}
                </p>
                <p className="text-xs text-unc-gray/60">
                  {item.date} {item.type && `— ${item.type}`}
                </p>
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
                  onClick={() => handleDelete(item.id)}
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
