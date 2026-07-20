// Contenu structurel du site (menus, coordonnées, listes) centralisé ici pour
// éviter de le disperser dans les composants. Les valeurs marquées [À REMPLIR]
// ou pointant vers PLACEHOLDER_UNC_FR sont provisoires — voir CLAUDE.md.

// Logos des partenaires (fournis par le client). Importés en tant qu'assets
// Vite pour bénéficier du hash/optimisation au build.
import logoDMD from "../assets/partenaires/dmd66.jpg";
import logoOnacvg from "../assets/partenaires/onacvg.jpg";
import logoASA from "../assets/partenaires/asa.jpg";
import logoImplicAction from "../assets/partenaires/implic-action.png";
import logoDefenseMobilite from "../assets/partenaires/defense-mobilite.png";
import logoAnocr from "../assets/partenaires/anocr.jpg";
import logoGueulesCassees from "../assets/partenaires/gueules-cassees.jpeg";
import logoMaisonNumerique from "../assets/partenaires/maison-numerique-blesses.png";
import logoFranceMutualiste from "../assets/partenaires/france-mutualiste.png";
import logoMutuelleMondeCombattant from "../assets/partenaires/mutuelle-monde-combattant.png";

// URL de base du site national, en attendant les vraies URLs profondes que le
// client doit fournir pour chaque lien externe (Historique, Fondateurs, etc.)
export const PLACEHOLDER_UNC_FR = "https://www.unc.fr";

// Bulletin d'adhésion (PDF remplissable fourni par le client). Servi comme asset
// statique depuis /public pour un lien de téléchargement stable ; tous les
// boutons "Adhérer" pointent dessus. BASE_URL gère le préfixe GitHub Pages.
export const BULLETIN_ADHESION_URL = `${import.meta.env.BASE_URL}bulletin-adhesion-unc66.pdf`;

export const COORDONNEES = {
  nom: "UNC 66 — Maison du combattant",
  adresse: "Caserne Galliéni — 2, rue de l'Académie",
  codePostal: "66000",
  ville: "Perpignan",
  telephone: "04 68 35 39 94",
  email: "contact@unc66.com",
  horaires: [
    { jours: "Mardi", plage: "9h00 – 11h00" },
    { jours: "Vendredi (après-midi)", plage: "14h00 – 16h00, sur rendez-vous" },
  ],
};

// Méga-menu "Présentation", structure fidèle à la maquette (3 colonnes).
// internal: true -> route interne du site. Sinon lien externe (le plus souvent unc.fr).
//
// Demande client (MODIF13) : dans "Qui sommes-nous ?", les 4 liens pointent tous
// vers la MÊME page unc.fr (qui-sommes-nous/lunc) ; idem "L'UNC en actions", les
// 8 liens pointent tous vers la même page (unc-en-actions/les-comites-consultatifs).
const URL_QUI_SOMMES_NOUS = "https://www.unc.fr/presentation/qui-sommes-nous/lunc";
const URL_UNC_EN_ACTIONS = "https://www.unc.fr/presentation/unc-en-actions/les-comites-consultatifs";

export const PRESENTATION_MENU = [
  {
    titre: "Qui sommes-nous ?",
    items: [
      { label: "L'UNC", href: URL_QUI_SOMMES_NOUS },
      { label: "Buts et objectifs", href: URL_QUI_SOMMES_NOUS },
      { label: "Historique", href: URL_QUI_SOMMES_NOUS },
      { label: "Fondateurs", href: URL_QUI_SOMMES_NOUS },
    ],
  },
  {
    titre: "Notre organisation",
    items: [
      { label: "Notre organisation", to: "/presentation/notre-organisation", internal: true },
      { label: "Notre structure", to: "/presentation/notre-structure", internal: true },
      { label: "Notre gouvernance", to: "/presentation/notre-gouvernance", internal: true },
    ],
  },
  {
    titre: "L'UNC en actions",
    items: [
      { label: "Les comités consultatifs", href: URL_UNC_EN_ACTIONS },
      { label: "Action civique et mémoire", href: URL_UNC_EN_ACTIONS },
      { label: "Action sociale et solidarité", href: URL_UNC_EN_ACTIONS },
      { label: "Aide aux blessés", href: URL_UNC_EN_ACTIONS },
      { label: "Aide et entraide des veuves et orphelins de guerre", href: URL_UNC_EN_ACTIONS },
      { label: "Associations affiliées", href: URL_UNC_EN_ACTIONS },
      { label: "Législation", href: URL_UNC_EN_ACTIONS },
      { label: "Reconversion", href: URL_UNC_EN_ACTIONS },
    ],
  },
];

// Barre de navigation principale (Magazine et Boutique volontairement exclus,
// barrés d'une croix rouge sur la maquette).
export const NAV_LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Présentation", megaMenu: true },
  { label: "Agenda", to: "/agenda" },
  { label: "Actualités", to: "/actualites" },
  { label: "Notre région", to: "/notre-region" },
  { label: "Partenaires", to: "/partenaires" },
  { label: "Adhérer", to: "/adherer" },
  { label: "Contact", to: "/contact" },
];

// Icônes d'actions rapides de la page d'accueil (liens externes unc.fr).
// "Adhérer" et "Partenaires" ont été retirés d'ici (demande client) : Adhérer
// est désormais un onglet + un grand bouton en bas d'accueil (vers la page
// interne /adherer), Partenaires est un onglet de nav dédié (page /partenaires).
export const ACTIONS_RAPIDES = [
  { label: "Magazine", icon: "BookOpen", href: "https://www.unc.fr/index.php#voix-combattant" },
  { label: "Blessés", icon: "HeartHandshake", href: "https://www.unc.fr/presentation/unc-en-actions/aide-et-suivi-des-blesses" },
  { label: "Reconversion", icon: "Briefcase", href: "https://www.unc.fr/reconversion" },
  { label: "Assistance", icon: "LifeBuoy", href: "https://www.unc.fr/assistance-juridique-et-sociale" },
];

// Partenaires (grille logos + noms + lien), regroupés par catégorie comme sur la
// maquette. `url` = site officiel du partenaire (ouvert dans un nouvel onglet).
// Les logos réels ne sont pas encore fournis par le client → PlaceholderImage
// en attendant les vrais visuels.
export const PARTENAIRES = [
  {
    categorie: "Institutions",
    items: [
      {
        nom: "Délégation militaire départementale (DMD66)",
        url: "https://www.defense.gouv.fr/defense-sud-est/nos-unites/nos-delegations-militaires-departementales",
        logo: logoDMD,
      },
      {
        nom: "Office national des anciens combattants et victimes de guerre (ONaCVG66)",
        url: "https://www.defense.gouv.fr/sga/au-service-agents/soutien-aux-blesses/guide-du-blesse/fiches-thematiques/loffice-national-combattants-victimes",
        logo: logoOnacvg,
      },
      {
        nom: "Actions sociales des armées (ASA)",
        url: "https://www.defense.gouv.fr/sga/au-service-agents/laction-sociale-au-profit-agents/offres-service-laction-sociale-armees",
        logo: logoASA,
      },
    ],
  },
  {
    categorie: "Reconversion",
    items: [
      { nom: "Implic'Action", url: "https://www.implicaction.eu", logo: logoImplicAction },
      { nom: "Défense Mobilité", url: "https://www.defense.gouv.fr/defense-mobilite", logo: logoDefenseMobilite },
      {
        nom: "Association nationale des officiers de carrière et sous contrat en retraite (ANOCR)",
        url: "https://www.anocr.org/",
        logo: logoAnocr,
      },
    ],
  },
  {
    categorie: "Blessés",
    items: [
      {
        nom: "Gueules Cassées — Union des blessés de la face et de la tête",
        url: "https://www.gueules-cassees.asso.fr/",
        logo: logoGueulesCassees,
      },
      {
        nom: "Maison numérique des blessés",
        url: "https://maison-des-blesses.defense.gouv.fr/",
        logo: logoMaisonNumerique,
      },
    ],
  },
  {
    categorie: "Retraite mutualiste du combattant",
    items: [
      {
        nom: "La France Mutualiste",
        url: "https://www.la-france-mutualiste.fr/retraite-mutualiste-du-combattant",
        logo: logoFranceMutualiste,
      },
    ],
  },
  {
    categorie: "Mutuelle",
    items: [
      {
        nom: "Mutuelle du Monde Combattant",
        url: "https://www.mutuelle-combattant.com/",
        logo: logoMutuelleMondeCombattant,
      },
    ],
  },
];

// Associations locales (Notre région). Liste des 9 communes = référence figée :
// c'est la source de vérité pour l'annuaire ET pour les actualités locales. Les
// détails (nom/adresse/contact) et les actualités par commune se remplissent
// désormais depuis l'espace admin (Firestore) ; ces villes servent de squelette
// et de repli quand aucune donnée n'a encore été saisie.
export const VILLES_ASSOCIATIONS = [
  "Canet",
  "Céret",
  "Ille-sur-Têt",
  "Perpignan",
  "Prades",
  "Saint-Cyprien",
  "Saint-Laurent-de-la-Salanque",
  "Saint-Féliu",
  "Thuir",
];

// Repli statique (conservé pour compatibilité) : chaque commune sans données.
export const ASSOCIATIONS_LOCALES = VILLES_ASSOCIATIONS.map((ville) => ({
  ville,
  nom: "[À REMPLIR]",
  adresse: "[À REMPLIR]",
}));

// Blocs latéraux de l'accueil (demande client). Les vraies photos n'ont pas
// encore été fournies séparément → `image` reste indéfini et on affiche un
// PlaceholderImage avec la légende. Pour livrer : importer la photo en asset et
// renseigner `image` sur l'entrée correspondante.
export const BLOC_JEUNESSE = [
  { legende: "Cadets Défense Perpignan" },
  { legende: "Escadrille Air Jeunesse Narbonne" },
  { legende: "Cadets Gendarmerie Perpignan" },
  { legende: "Préparation Militaire Marine CM Fort Perpignan" },
  { legende: "Centre départemental de la Mémoire Combattante Perpignan" },
  { legende: "Jeunes Quartier Perpignan" },
  { legende: "Classe défense St Louis de Gonzague Perpignan" },
];

export const BLOC_UNITES_PARTENAIRES = [
  { legende: "CNEC CIN Collioure" },
  { legende: "Gendarmerie GGD Perpignan" },
  { legende: "Police Nationale Perpignan" },
  { legende: "Police Municipale Perpignan" },
  { legende: "SDIS 66 Perpignan" },
  { legende: "Protection Civile Perpignan" },
];
