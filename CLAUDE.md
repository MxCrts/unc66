# UNC 66 — Site vitrine

## Le projet

Site vitrine de l'**UNC 66** (Union Nationale des Combattants — Fédération des
Pyrénées-Orientales), association d'anciens combattants. Objectifs : présenter
l'association, ses missions et son actualité, et donner accès à un espace
d'administration (phase 2) permettant au bureau de mettre à jour le contenu
sans toucher au code (mot du Président, agenda, actualités, partenaires...).

**Client** : UNC 66, association basée à la Maison du combattant, Caserne
Galliéni, 2 rue de l'Académie, 66000 Perpignan.

**Ton** : institutionnel, sobre, sérieux (public d'anciens combattants et de
leurs familles) mais un rendu web propre et moderne, pas austère.

## Stack

- **React 19 + Vite** (JavaScript, pas de TypeScript)
- **Tailwind CSS v4** — configuré via `@tailwindcss/vite` (plugin Vite officiel,
  pas de `tailwind.config.js` : tout le thème est déclaré en CSS dans
  `src/index.css` via `@theme`)
- **react-router-dom** — routing SPA classique (`BrowserRouter`)
- **firebase** — installé, mais **non branché** en phase 1 (voir plus bas)
- **lucide-react** — bibliothèque d'icônes

## État d'avancement

**Phase 1 (faite)** : squelette complet, toutes les pages en placeholder,
navigation fonctionnelle, design fidèle à la charte, aucune logique Firebase.

**Phase 2 (à faire)** :
- Authentification Firebase (`onAuthStateChanged`) pour protéger `/admin/dashboard`
- Firestore pour stocker et éditer : mot du Président, agenda, actualités,
  partenaires, associations locales, coordonnées
- Remplacer tous les marqueurs `[À REMPLIR]` par du vrai contenu client
- Remplacer le blason placeholder (`src/components/Logo.jsx`) par le vrai
  fichier logo du client (déposer l'asset dans `src/assets/` puis basculer sur
  une balise `<img>`)
- Remplacer les `PlaceholderImage` (photos hero, photos partenaires) par les
  vrais visuels une fois fournis par le client
- Renseigner les vraies URLs externes vers unc.fr (voir section dédiée plus bas)
- Renseigner les infos des 9 associations locales (`Notre région`)

## Charte graphique (extraite des maquettes client)

Toutes les valeurs sont déclarées dans `src/index.css` (bloc `@theme`), donc
disponibles comme classes Tailwind (`bg-unc-navy`, `text-unc-navy`, etc.). Ne
pas dupliquer ces couleurs en dur ailleurs — toujours passer par ces tokens.

| Token | Valeur | Usage |
|---|---|---|
| `--color-unc-navy` | `#1B2A6B` | Couleur institutionnelle principale : nav, titres de section (`PageHeader`), boutons, footer |
| `--color-unc-navy-dark` | `#121F52` | État hover des éléments `unc-navy` |
| `--color-unc-blue-flag` | `#0055A4` | Bleu du drapeau français, utilisé uniquement dans le blason (`Logo.jsx`) |
| `--color-unc-red-flag` | `#EF4135` | Rouge du drapeau français, idem, usage très parcimonieux |
| `--color-unc-border` | `#3B5BA9` | Bordures des encarts (permanences, actualités, cards) — toujours à faible opacité (`border-unc-border/30` ou `/40`) |
| `--color-unc-gray` | `#374151` | Texte courant |
| `--color-unc-bg-soft` | `#F4F6FB` | Fonds de section doux (alternance avec le blanc) |

**Typographie** : Inter (Google Fonts, chargée dans `index.html`), poids
400/500/600/700/800. Une seule famille pour tout le site (titres et texte
courant) — cohérent avec le ton institutionnel sobre. Pas de police serif.

**Logo / blason** : la maquette montre un blason tricolore (bandes bleu-blanc-
rouge verticales) avec gerbe de laurier, casque, flamme et bonnet phrygien,
surmonté de « Fédération des » et suivi de « Pyrénées Orientales » en bleu
marine gras. Je n'ai pas le fichier source de ce blason (seulement des
captures d'écran) : `src/components/Logo.jsx` est donc un **placeholder**
(badge tricolore rond avec « UNC ») à remplacer par le vrai fichier client.

**Bandeau hero (accueil)** : deux photos côte à côte (une photo récente de
militaires en opération à gauche, une photo d'archive noir et blanc à droite),
logo centré par-dessus en chevauchement, puis accroche « Aujourd'hui... comme
hier » (italique, petite taille) suivie du titre fort « L'UNC défend les
droits des combattants et des blessés ». Les deux photos n'ont pas été
fournies en fichiers exploitables → `PlaceholderImage` en attendant.

**Encarts à bordure bleue** : la maquette utilise beaucoup de blocs à bordure
bleu moyen (permanences, actualités, notre région...) plutôt que des cards à
fond coloré. Convention reprise partout via `border border-unc-border/30` ou
`/40` + `rounded-lg`.

## Arborescence des pages / routes

```
/                                    Accueil
/presentation/notre-organisation     Présentation > Notre organisation (interne)
/presentation/notre-structure        Présentation > Notre structure (interne)
/presentation/notre-gouvernance      Présentation > Notre gouvernance (interne)
/mot-du-president                    Mot du Président (lien en footer)
/agenda                              Agenda (événements + archives)
/partenaires                         Partenaires (grille logos)
/actualites                          Actualités (UNC66 + associations locales + archives)
/notre-region                        Notre région (annuaire des associations locales)
/contact                             Contact (coordonnées, horaires, carte)
/admin                               Connexion espace privé (UI seule, pas branchée)
/admin/dashboard                     Shell tableau de bord (UI seule, pas protégée)
*                                    404
```

Le menu **Présentation** est un méga-menu à 3 colonnes (`PresentationMenu.jsx`),
fidèle à la maquette :
1. **Qui sommes-nous ?** — L'UNC, Buts et objectifs, Historique, Fondateurs → tous liens **externes** vers unc.fr
2. **Notre organisation** — Notre organisation / Notre structure / Notre gouvernance → pages **internes**
3. **L'UNC en actions** — comités consultatifs, action civique et mémoire, action sociale, aide aux blessés, aide aux veuves/orphelins, associations affiliées, législation, reconversion → tous liens **externes** vers unc.fr

**Onglets volontairement exclus** de la nav principale (barrés d'une croix
rouge sur la maquette client) : Magazine, Boutique, Cadets. Ne pas les
réintroduire sans consigne explicite du client.

**Liens externes non résolus** : toute la structure `PRESENTATION_MENU` et
`ACTIONS_RAPIDES` dans `src/data/siteContent.js` pointe vers
`PLACEHOLDER_UNC_FR` (`https://www.unc.fr`) faute d'URLs profondes précises
fournies par le client. À remplacer une par une avec les vraies URLs.

**Icônes rapides accueil** (`ActionCard`) : Magazine, Adhérer, Blessés,
Reconversion, Partenaires, Assistance. Toutes en lien externe **sauf
Partenaires**, qui pointe vers la page interne `/partenaires` (elle est aussi
une page à part entière du site, contrairement aux autres qui ne sont que des
raccourcis vers unc.fr) — c'est une exception volontaire, pas un oubli.

## Contenu structurel centralisé

Tout le contenu « structurel » (coordonnées, menus, listes de partenaires,
liste des associations locales) est dans **`src/data/siteContent.js`**, pas
dispersé dans les composants. En phase 2, ce fichier sera progressivement
remplacé par des lectures Firestore (mêmes formes de données autant que possible,
pour limiter la casse dans les composants qui les consomment).

Coordonnées actuelles (`COORDONNEES`) : adresse Maison du combattant / Caserne
Galliéni, tél. 04 68 35 39 94, email `u.n.c.pyreneesorientales@gmail.com`
(l'autre email vu sur une maquette, `contact@unc66.com`, était marqué « à
créer » — à confirmer avec le client avant de l'utiliser).

## Conventions de code

- Composants en `PascalCase`, un composant par fichier, dans `src/components/`
- Pages dans `src/pages/` (sous-dossiers `presentation/` et `admin/` pour
  regrouper par section)
- Commentaires en français, uniquement quand la raison d'être du code n'est
  pas évidente (pas de commentaire qui répète ce que le code dit déjà)
- Placeholders textuels : composant `<PlaceholderBlock>` (texte italique gris
  avec préfixe `[À REMPLIR]`)
- Placeholders visuels : composant `<PlaceholderImage label="..." />` (zone
  grisée avec icône + légende du contenu attendu)
- Pas de `tailwind.config.js` — toute variable de thème passe par le bloc
  `@theme` de `src/index.css`
- Aucune clé/secret en dur : `src/firebase.js` lit uniquement
  `import.meta.env.VITE_*`, vraies valeurs dans `.env` (non versionné, voir
  `.env.example`)

## Lancer le projet

```bash
npm install
npm run dev
```

Le `.env` réel n'existe pas encore (seulement `.env.example`) : Firebase
n'étant pas encore utilisé activement en phase 1, l'app tourne sans erreur
même sans `.env` rempli.
