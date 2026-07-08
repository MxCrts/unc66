import PageHeader from "../../components/PageHeader";
import PlaceholderBlock from "../../components/PlaceholderBlock";

export default function NotreStructure() {
  return (
    <div>
      <PageHeader title="Notre structure" subtitle="Présentation" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <PlaceholderBlock>organigramme / structure interne de l'UNC 66.</PlaceholderBlock>
      </div>
    </div>
  );
}
