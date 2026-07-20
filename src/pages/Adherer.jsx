import { Download, Mail } from "lucide-react";
import Logo from "../components/Logo";
import { BULLETIN_ADHESION_URL, COORDONNEES } from "../data/siteContent";

// Bouton "Adhérer" : télécharge le bulletin d'adhésion PDF (fourni par le client,
// servi depuis /public). Le visiteur le remplit puis le renvoie par mail — flux
// validé côté client. `download` force le téléchargement plutôt qu'un affichage.
function BoutonAdherer({ className = "" }) {
  return (
    <a
      href={BULLETIN_ADHESION_URL}
      download
      className={`inline-flex items-center gap-2 bg-unc-navy hover:bg-unc-navy-dark text-white text-sm font-semibold px-6 py-2.5 rounded-md transition-colors ${className}`}
    >
      <Download className="w-4 h-4" />
      Adhérer
    </a>
  );
}

// Puces "Qui peut adhérer" — texte fourni par le client (MODIF12).
const CONDITIONS = [
  "Titulaires de la carte du combattant ou seulement du TRN ;",
  "Tout militaire et tout ancien militaire de carrière, engagé, appelé ou réserviste contribuant ou ayant contribué à la défense de la France, ou s'y étant préparée, sans avoir pour autant été engagé dans une opération militaire. En particulier, tous les anciens militaires qui ont contribué à la Guerre froide depuis 1955 jusqu'à la chute du mur de Berlin en 1989 et au démantèlement du Pacte de Varsovie en juillet 1991 ;",
  "Toute personne participant ou ayant participé à la défense ou à la protection de vies et/ou des biens des Français (policiers nationaux et municipaux, pompiers, douaniers, agents pénitentiaires) ;",
  "Toutes les veuves de guerre et d'anciens combattants, les orphelins de guerre et les pupilles de la Nation ;",
  "Toute personne « citoyen combattant » qui, ne satisfaisant pas aux conditions décrites ci-dessus, partage les valeurs de l'UNC et qui, en raison de ses attaches familiales ou amicales, ou de ses compétences, souhaite contribuer à la réalisation des buts de l'UNC.",
];

export default function Adherer() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* En-tête : label + titre + logo, fidèle à la maquette */}
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-unc-blue-flag mb-2">
          Nous rejoindre
        </p>
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-unc-navy">Adhérer à l'UNC 66</h1>
          <div className="bg-white rounded-lg px-2 py-1 shadow-sm shrink-0">
            <Logo size={48} />
          </div>
        </div>
        <div className="mt-6">
          <BoutonAdherer />
        </div>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-unc-gray/70">
          <Mail className="w-3.5 h-3.5" />
          Remplissez le bulletin puis renvoyez-le à{" "}
          <a href={`mailto:${COORDONNEES.email}`} className="text-unc-navy font-medium hover:underline">
            {COORDONNEES.email}
          </a>
        </p>
      </div>

      {/* Introduction */}
      <div className="mt-10 space-y-4 text-unc-gray">
        <p className="text-center font-semibold text-unc-navy">Vous souhaitez rejoindre l'UNC ?</p>
        <p className="text-sm leading-relaxed text-center">
          L'Union nationale des combattants est coordonnée par le siège national à Paris et par des
          fédérations au niveau de chaque département. Néanmoins, l'adhésion doit se faire au niveau des
          associations locales qui sont près de 3 000 en métropole, 9 dans les Pyrénées-Orientales. Pour
          adhérer, commencez par nous contacter, ensuite nous vous orienterons vers l'association la plus
          proche de votre domicile.
        </p>
      </div>

      {/* Qui peut adhérer */}
      <section className="mt-10 border border-unc-border/30 rounded-lg p-6 sm:p-8">
        <h2 className="text-lg font-bold text-unc-navy text-center mb-4">Qui peut adhérer à l'UNC ?</h2>
        <p className="text-sm font-semibold text-unc-gray mb-4">
          Vous êtes une personne physique, cherchez si vous figurez dans la liste ci-dessous :
        </p>
        <ul className="space-y-3">
          {CONDITIONS.map((condition, i) => (
            <li key={i} className="flex gap-3 text-sm text-unc-gray leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-unc-navy shrink-0" />
              <span>{condition}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-unc-gray leading-relaxed">
          Quelle que soit la catégorie à laquelle vous appartenez, vous bénéficiez des mêmes droits et
          des mêmes prérogatives que les autres catégories, dont celle de pouvoir siéger dans les
          instances locales, départementales et nationales.
        </p>
      </section>

      {/* Associations affiliées */}
      <section className="mt-8">
        <h2 className="text-sm font-bold text-unc-navy mb-2">Si vous représentez une association :</h2>
        <p className="text-sm text-unc-gray leading-relaxed">
          Associations du monde combattant, associations patriotiques partageant les valeurs de l'UNC,
          vous pouvez devenir une <strong>association affiliée</strong> :{" "}
          <a href={`mailto:${COORDONNEES.email}`} className="text-unc-navy font-medium hover:underline">
            nous contacter
          </a>
          .
        </p>
      </section>

      <div className="mt-10 text-center">
        <BoutonAdherer />
      </div>
    </div>
  );
}
