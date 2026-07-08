import PageHeader from "../../components/PageHeader";
import PlaceholderBlock from "../../components/PlaceholderBlock";

export default function NotreOrganisation() {
  return (
    <div>
      <PageHeader title="Notre organisation" subtitle="Présentation" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <PlaceholderBlock>texte de présentation de l'organisation de l'UNC 66.</PlaceholderBlock>
      </div>
    </div>
  );
}
