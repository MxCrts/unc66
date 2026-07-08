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
- **firebase** (Auth + Firestore + Storage) — **branché et actif** (voir section dédiée plus bas)
- **lucide-react** — bibliothèque d'icônes

## État d'avancement

**Phase 1 (faite)** : squelette complet, navigation fonctionnelle, design
fidèle à la charte.

**Phase 2 (faite)** : logo et photos hero réels intégrés, déploiement GitHub
Pages opérationnel, Firebase branché — Auth (login admin), Firestore
(actualités, agenda, mot du Président) et Storage (documents) avec CRUD complet
côté admin et lecture publique côté site. Voir section « Firebase » plus bas.

**Reste à faire** :
- Remplacer les URLs externes placeholder vers unc.fr par les vraies (voir plus bas)
- Renseigner les infos des 9 associations locales (`Notre région`) — toujours
  en dur dans `src/data/siteContent.js`, pas encore en Firestore
- Remplacer les logos `PlaceholderImage` des partenaires par les vrais visuels
- Déployer `firestore.rules` / `storage.rules` / `firestore.indexes.json` sur
  le vrai projet Firebase (le client doit lancer `firebase login` lui-même —
  commandes exactes dans la section Firebase)
- Éventuellement : gérer les partenaires et les associations locales depuis
  l'admin (actuellement seuls actualités / agenda / mot du Président / documents
  sont dynamiques, par périmètre explicite de la demande client)

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

**Logo / blason** : le vrai fichier client est intégré (`src/assets/logo.png`,
recadré automatiquement pour retirer les marges blanches/transparentes autour
du blason). `src/components/Logo.jsx` affiche directement cette image.

**Bandeau hero (accueil)** : les deux vraies photos client sont intégrées
(`src/assets/hero-actuelle.jpg` et `hero-archive.jpg`), affichées en fond sur
toute la largeur avec un voile bleu marine semi-transparent (`bg-unc-navy/70`)
par-dessus pour garantir la lisibilité du texte blanc (logo, « Aujourd'hui...
comme hier », titre) qui est superposé au centre — pas en dessous des photos.

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
/admin                               Connexion espace privé (Firebase Auth)
/admin/dashboard                     Vue d'ensemble (protégée)
/admin/dashboard/mot-du-president    Édition du mot du Président (protégée)
/admin/dashboard/agenda              CRUD agenda (protégée)
/admin/dashboard/actualites          CRUD actualités (protégée)
/admin/dashboard/documents           Upload/suppression documents Storage (protégée)
*                                    404
```

Les routes `/admin/dashboard/*` sont enveloppées par `<ProtectedRoute>`
(`src/components/ProtectedRoute.jsx`) : redirige vers `/admin` si personne
n'est connecté (état lu via `AuthContext`, basé sur `onAuthStateChanged`).

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

## Firebase — architecture backend

Projet Firebase : **`site-unc66`** (voir `.firebaserc`). Trois produits
utilisés : **Auth** (email/mot de passe, un seul compte admin existant),
**Firestore** (contenu dynamique), **Storage** (fichiers uploadés). Pas
d'Analytics (`getAnalytics` volontairement absent, inutile pour l'instant).

### Modèle Firestore

| Collection | Champs | Notes |
|---|---|---|
| `actualites/{id}` | `titre, contenu, date, imageUrl?, imageStoragePath?, archive, createdAt` | `date` = string `"YYYY-MM-DD"` (pas un Timestamp, plus simple avec un `<input type="date">`). `archive` (bool) : ajouté par rapport à la demande initiale pour permettre un contrôle manuel de ce qui sort de la liste "en avant" — sans ce champ, impossible de distinguer proprement actualités actives / archivées. `imageUrl` peut venir d'une URL externe collée par l'admin OU d'un fichier uploadé (dossier Storage `actualites/`) ; `imageStoragePath` n'est renseigné que dans ce second cas (`null` sinon), pour savoir quel fichier Storage supprimer/remplacer sans jamais toucher à une URL externe. |
| `agenda/{id}` | `titre, date, description, type, archive, createdAt` | Mêmes conventions. `type` = texte libre (ex: "Cérémonie", "Repas"), pas d'enum fixe. |
| `motDuPresident/current` | `texte, imageUrl?, imageStoragePath?, updatedAt` | "Document unique" = id fixe `current` dans la collection `motDuPresident` (Firestore n'a pas de vrai singleton). `imageUrl`/`imageStoragePath` : photo du Président uploadée depuis l'admin (dossier Storage `president/`), même logique que `documents.storagePath` — remplacement/retrait d'une photo supprime l'ancien fichier Storage. |
| `documents/{id}` | `nom, url, storagePath, uploadedAt` | `storagePath` ajouté par rapport à la demande initiale : nécessaire pour supprimer le bon fichier dans Storage (sans ça, `url` seule ne permet pas de retrouver la référence Storage à supprimer). |

Toute la logique d'accès est dans **`src/services/`** (un fichier par
collection : `actualites.js`, `agenda.js`, `motDuPresident.js`,
`documents.js`) — aucun composant n'appelle Firestore/Storage directement,
toujours en passant par ces services. `listActualites({archive})` et les
équivalents agenda font le tri actif/archivé côté Firestore (`where`), pas
côté client.

### Authentification

`src/context/AuthContext.jsx` expose `useAuth()` → `{ user, loading }` via
`onAuthStateChanged`. `src/components/ProtectedRoute.jsx` protège les routes
admin. `src/pages/admin/Login.jsx` utilise `signInWithEmailAndPassword` ; les
codes d'erreur Firebase sont traduits en français par
`src/lib/firebaseErrors.js` (`messageErreurFirebase(error)`). Un seul compte
admin existe : "authentifié" équivaut à "admin" dans les règles de sécurité —
pas de rôles/claims différenciés pour l'instant.

Les uploads d'image (photo du Président, images d'actualités) partagent la
même validation client via `src/lib/imageValidation.js` (`validerImage(file)`) :
formats acceptés `jpg/png/webp`, poids max 5 Mo, sinon message d'erreur en
français. Trois dossiers Storage sont utilisés au total : `documents/`
(pièces jointes), `president/` (photo du Mot du Président), `actualites/`
(images d'actualités uploadées) — tous avec le même pattern (`storagePath`
enregistré côté Firestore pour permettre la suppression, remplacement propre
= upload de la nouvelle image puis suppression de l'ancienne une fois
l'enregistrement réussi).

### Règles de sécurité

`firestore.rules` et `storage.rules` (à la racine) : **lecture publique**
sur toutes les collections/fichiers listés ci-dessus (Storage : `documents/`,
`president/`, `actualites/`), **écriture réservée aux utilisateurs
authentifiés**. Tout le reste est fermé par défaut.

**Déploiement des règles** (à faire une fois par le client, qui a les accès
Firebase) :

```bash
firebase login
firebase deploy --only firestore:rules,firestore:indexes,storage:rules
```

`firebase.json` et `.firebaserc` (déjà présents, pointent vers le projet
`site-unc66`) permettent à cette commande de fonctionner sans configuration
supplémentaire. `firestore.indexes.json` déclare les index composites
nécessaires aux requêtes `where(archive) + orderBy(date)` utilisées par
`actualites` et `agenda` — sans ce fichier déployé, Firestore refuse ces
requêtes tant que l'index n'est pas créé (manuellement ou via ce fichier).

### Limite connue

Je n'ai pas les identifiants du compte admin réel : je n'ai donc pas pu
tester moi-même la connexion ni un CRUD de bout en bout dans un vrai
navigateur. Tout le code a été vérifié structurellement (compilation, build,
absence d'erreur au chargement des modules) — le test fonctionnel complet
(login → créer/modifier/supprimer une actualité → upload d'un document) reste
à faire par quelqu'un qui a les accès.

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

Le `.env` réel existe déjà en local (non versionné, voir `.gitignore`) et
contient la config du projet Firebase `site-unc66`. Pour un nouveau poste de
travail : copier `.env.example` en `.env` et remplir avec la config Firebase
(console Firebase > Paramètres du projet > Vos applications > Config SDK).
