// Contenu structurel du site (menus, coordonnées, listes) centralisé ici pour
// éviter de le disperser dans les composants. Les valeurs marquées [À REMPLIR]
// ou pointant vers PLACEHOLDER_UNC_FR sont provisoires — voir CLAUDE.md.

// URL de base du site national, en attendant les vraies URLs profondes que le
// client doit fournir pour chaque lien externe (Historique, Fondateurs, etc.)
export const PLACEHOLDER_UNC_FR = "https://www.unc.fr";

export const COORDONNEES = {
  nom: "UNC 66 — Maison du combattant",
  adresse: "Caserne Galliéni — 2, rue de l'Académie",
  codePostal: "66000",
  ville: "Perpignan",
  telephone: "04 68 35 39 94",
  email: "u.n.c.pyreneesorientales@gmail.com",
  horaires: [
    { jours: "Mardi", plage: "9h00 – 11h00" },
    { jours: "Vendredi (après-midi)", plage: "14h00 – 16h00, sur rendez-vous" },
  ],
};

// Méga-menu "Présentation", structure fidèle à la maquette (3 colonnes).
// internal: true -> route interne du site. Sinon lien externe (le plus souvent unc.fr).
export const PRESENTATION_MENU = [
  {
    titre: "Qui sommes-nous ?",
    items: [
      { label: "L'UNC", href: PLACEHOLDER_UNC_FR },
      { label: "Buts et objectifs", href: PLACEHOLDER_UNC_FR },
      { label: "Historique", href: PLACEHOLDER_UNC_FR },
      { label: "Fondateurs", href: PLACEHOLDER_UNC_FR },
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
      { label: "Les comités consultatifs", href: PLACEHOLDER_UNC_FR },
      { label: "Action civique et mémoire", href: PLACEHOLDER_UNC_FR },
      { label: "Action sociale et solidarité", href: PLACEHOLDER_UNC_FR },
      { label: "Aide aux blessés", href: PLACEHOLDER_UNC_FR },
      { label: "Aide et entraide des veuves et orphelins de guerre", href: PLACEHOLDER_UNC_FR },
      { label: "Associations affiliées", href: PLACEHOLDER_UNC_FR },
      { label: "Législation", href: PLACEHOLDER_UNC_FR },
      { label: "Reconversion", href: PLACEHOLDER_UNC_FR },
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
  { label: "Contact", to: "/contact" },
];

// Icônes d'actions rapides de la page d'accueil. Toutes en lien externe sauf
// "Partenaires", qui pointe vers la page interne du site (voir CLAUDE.md).
export const ACTIONS_RAPIDES = [
  { label: "Magazine", icon: "BookOpen", href: PLACEHOLDER_UNC_FR },
  { label: "Adhérer", icon: "UserPlus", href: PLACEHOLDER_UNC_FR },
  { label: "Blessés", icon: "HeartHandshake", href: PLACEHOLDER_UNC_FR },
  { label: "Reconversion", icon: "Briefcase", href: PLACEHOLDER_UNC_FR },
  { label: "Partenaires", icon: "Handshake", to: "/partenaires", internal: true },
  { label: "Assistance", icon: "LifeBuoy", href: PLACEHOLDER_UNC_FR },
];

// Partenaires (grille logos + noms), regroupés par catégorie comme sur la maquette.
export const PARTENAIRES = [
  {
    categorie: "Institutions",
    items: [
      { nom: "Délégation militaire départementale (DMD66)" },
      { nom: "Office national des anciens combattants et victimes de guerre (ONaCVG66)" },
      { nom: "Actions sociales des armées (ASA)" },
    ],
  },
  {
    categorie: "Reconversion",
    items: [
      { nom: "Implic'Action" },
      { nom: "Défense Mobilité" },
      { nom: "ANOCR" },
    ],
  },
  {
    categorie: "Blessés",
    items: [{ nom: "Gueules Cassées — Union des blessés de la face et de la tête" }],
  },
  {
    categorie: "Retraite mutualiste du combattant",
    items: [{ nom: "La France Mutualiste" }],
  },
];

// Associations locales (Notre région). Adresses/contacts à compléter par le client.
export const ASSOCIATIONS_LOCALES = [
  "Canet",
  "Céret",
  "Ille-sur-Têt",
  "Perpignan",
  "Prades",
  "Saint-Cyprien",
  "Saint-Laurent-de-la-Salanque",
  "Saint-Féliu",
  "Thuir",
].map((ville) => ({ ville, nom: "[À REMPLIR]", adresse: "[À REMPLIR]" }));
