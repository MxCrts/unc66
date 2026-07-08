import PageHeader from "../components/PageHeader";
import PlaceholderBlock from "../components/PlaceholderBlock";
import PlaceholderImage from "../components/PlaceholderImage";

// Le texte affiché ici sera éditable depuis l'espace admin (phase 2, Firestore).
export default function MotDuPresident() {
  return (
    <div>
      <PageHeader title="Le mot du Président" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-8">
        <PlaceholderImage label="photo du Président" className="w-full aspect-square rounded-lg" />
        <div className="space-y-4">
          <PlaceholderBlock>
            texte du mot du Président de l'UNC 66 (éditable depuis l'espace admin).
          </PlaceholderBlock>
          <p className="text-sm text-unc-gray/60 italic">— Le Président de l'UNC 66</p>
        </div>
      </div>
    </div>
  );
}
