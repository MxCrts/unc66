import { useEffect, useState } from "react";
import { getMotDuPresident, setMotDuPresident } from "../../services/motDuPresident";
import { messageErreurFirebase } from "../../lib/firebaseErrors";
import { inputClass } from "../../components/admin/Field";
import StatusMessage from "../../components/admin/StatusMessage";

export default function MotDuPresidentAdmin() {
  const [texte, setTexte] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getMotDuPresident();
        setTexte(data?.texte || "");
      } catch (err) {
        setLoadError(messageErreurFirebase(err));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);
    try {
      await setMotDuPresident(texte);
      setSuccess("Mot du Président mis à jour.");
    } catch (err) {
      setError(messageErreurFirebase(err));
    } finally {
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
            {submitting ? "Enregistrement…" : "Enregistrer"}
          </button>
        </form>
      )}
    </div>
  );
}
