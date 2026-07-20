import { Download } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import PlaceholderBlock from "../../components/PlaceholderBlock";
import { BULLETIN_ADHESION_URL } from "../../data/siteContent";

// Bouton "Adhérer" qui renvoie sur le bulletin d'adhésion (demande client MODIF14).
function BoutonBulletin() {
  return (
    <a
      href={BULLETIN_ADHESION_URL}
      download
      className="inline-flex items-center gap-2 bg-unc-navy hover:bg-unc-navy-dark text-white text-sm font-semibold px-6 py-2.5 rounded-md transition-colors"
    >
      <Download className="w-4 h-4" />
      Adhérer
    </a>
  );
}

export default function NotreOrganisation() {
  return (
    <div>
      <PageHeader title="Notre organisation" subtitle="Présentation" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <PlaceholderBlock>texte de présentation de l'organisation de l'UNC 66.</PlaceholderBlock>

        <section>
          <h2 className="text-lg font-bold text-unc-navy mb-3">Notre structure</h2>
          <div className="space-y-3 text-sm text-unc-gray leading-relaxed">
            <p>
              L'UNC est une fédération nationale qui se compose des fédérations départementales
              métropolitaines et outre-mer, personnes morales constituées conformément à la loi du
              1<sup>er</sup> juillet 1901, elles-mêmes composées des associations locales de leur
              département, personnes morales loi 1901 également.
            </p>
            <p>
              L'adhésion à l'UNC se fait donc au niveau de l'association locale la plus proche de chez
              vous, personnes physiques loi 1901 également.
            </p>
          </div>
          <div className="mt-5">
            <BoutonBulletin />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-unc-navy mb-3">Notre gouvernance</h2>
          <div className="space-y-3 text-sm text-unc-gray leading-relaxed">
            <p>
              L'UNC 66 est administrée par un conseil d'administration départemental qui se compose de
              27 membres élus pour trois ans par les représentants des 9 associations locales. Les
              présidents de ces 9 associations locales en sont membres de droit.
            </p>
            <p>
              Les membres du bureau sont cooptés en cours d'année suivant les besoins et les
              volontariats. Ce conseil d'administration valide les membres du bureau départemental
              composé de dix personnes : un président national, trois vice-présidents, un secrétaire
              général, un secrétaire adjoint, un trésorier, un trésorier adjoint, un gestionnaire
              effectifs et un référent OPEX, chacun pouvant avoir plusieurs fonctions.
            </p>
            <p>
              Quelle que soit la catégorie à laquelle vous appartenez (39/45, Indochine, AFN, OPEX,
              Soldats de France, Veuves et orphelins, Associés), vous bénéficiez des mêmes droits et des
              mêmes prérogatives que les autres catégories, dont celle de pouvoir siéger dans les
              instances locales, départementales et nationales.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
