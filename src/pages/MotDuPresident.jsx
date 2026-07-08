import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import PlaceholderImage from "../components/PlaceholderImage";
import { getMotDuPresident } from "../services/motDuPresident";

export default function MotDuPresident() {
  const [texte, setTexte] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getMotDuPresident();
        setTexte(data?.texte || "");
      } catch {
        setError("Impossible de charger le mot du Président pour le moment.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <PageHeader title="Le mot du Président" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-8">
        <PlaceholderImage label="photo du Président" className="w-full aspect-square rounded-lg" />
        <div className="space-y-4">
          {loading ? (
            <p className="text-sm text-unc-gray/60">Chargement…</p>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : texte ? (
            <p className="text-unc-gray whitespace-pre-line">{texte}</p>
          ) : (
            <p className="text-sm text-unc-gray/60 italic">
              Le mot du Président n'a pas encore été renseigné.
            </p>
          )}
          <p className="text-sm text-unc-gray/60 italic">— Le Président de l'UNC 66</p>
        </div>
      </div>
    </div>
  );
}
