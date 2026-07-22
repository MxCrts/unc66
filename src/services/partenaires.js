// Accès Firestore à la collection "partenaires" (gérée depuis l'admin).
// Champs : nom, categorie (texte libre, sert au regroupement sur la page
// publique), url (site officiel, optionnel), logoUrl (URL externe OU fichier
// uploadé), logoStoragePath (renseigné uniquement si le logo vient d'un upload,
// null sinon — même convention que les images d'actualités), ordre (nombre,
// pas de 10 en 10 pour intercaler facilement ; pilote l'ordre d'affichage ET
// l'ordre des catégories, qui apparaissent à la position de leur premier
// partenaire), createdAt (auto).
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";
import { validerImage } from "../lib/imageValidation";
import { PARTENAIRES } from "../data/siteContent";

const COLLECTION = "partenaires";

export async function listPartenaires() {
  const q = query(collection(db, COLLECTION), orderBy("ordre", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Regroupe une liste (déjà triée par ordre) par catégorie, dans l'ordre
// d'apparition — même forme que la constante statique PARTENAIRES pour que la
// page publique consomme indifféremment l'une ou l'autre source.
export function grouperParCategorie(partenaires) {
  const groupes = [];
  for (const p of partenaires) {
    let groupe = groupes.find((g) => g.categorie === p.categorie);
    if (!groupe) {
      groupe = { categorie: p.categorie, items: [] };
      groupes.push(groupe);
    }
    groupe.items.push({ nom: p.nom, url: p.url, logo: p.logoUrl });
  }
  return groupes;
}

export async function createPartenaire({ nom, categorie, url, logoUrl, logoStoragePath, ordre }) {
  return addDoc(collection(db, COLLECTION), {
    nom,
    categorie,
    url: url || null,
    logoUrl: logoUrl || null,
    logoStoragePath: logoStoragePath || null,
    ordre,
    createdAt: serverTimestamp(),
  });
}

export async function updatePartenaire(id, { nom, categorie, url, logoUrl, logoStoragePath }) {
  return updateDoc(doc(db, COLLECTION, id), {
    nom,
    categorie,
    url: url || null,
    logoUrl: logoUrl || null,
    logoStoragePath: logoStoragePath || null,
  });
}

// Réordonnancement (flèches haut/bas de l'admin) : ne touche qu'au champ ordre.
export async function updatePartenaireOrdre(id, ordre) {
  return updateDoc(doc(db, COLLECTION, id), { ordre });
}

// Prend le partenaire entier (pas juste l'id) pour pouvoir nettoyer son logo
// Storage s'il vient d'un upload — même logique que deleteActualite().
export async function deletePartenaire(partenaire) {
  if (partenaire.logoStoragePath) {
    await deleteObject(ref(storage, partenaire.logoStoragePath));
  }
  return deleteDoc(doc(db, COLLECTION, partenaire.id));
}

export async function uploadPartenaireLogo(file) {
  validerImage(file);
  const storagePath = `partenaires/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { url, storagePath };
}

export async function deletePartenaireLogo(storagePath) {
  if (storagePath) {
    await deleteObject(ref(storage, storagePath));
  }
}

// Seed initial : importe dans Firestore les partenaires historiques du site
// (constante statique PARTENAIRES). Les logos sont des assets bundlés par Vite :
// leur URL change à chaque build, donc on les re-uploade dans Storage pour que
// les documents Firestore pointent vers des URLs stables. À lancer une seule
// fois depuis l'admin, quand la collection est vide.
export async function seedPartenairesDepuisSite() {
  let ordre = 10;
  for (const groupe of PARTENAIRES) {
    for (const item of groupe.items) {
      let logoUrl = null;
      let logoStoragePath = null;
      if (item.logo) {
        const blob = await (await fetch(item.logo)).blob();
        const extension = (blob.type.split("/")[1] || "png").replace("jpeg", "jpg");
        // Slug ASCII du nom (accents décomposés par NFD puis retirés).
        const nomFichier = `${item.nom
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
          .slice(0, 60)}.${extension}`;
        const uploaded = await uploadPartenaireLogo(new File([blob], nomFichier, { type: blob.type }));
        logoUrl = uploaded.url;
        logoStoragePath = uploaded.storagePath;
      }
      await createPartenaire({
        nom: item.nom,
        categorie: groupe.categorie,
        url: item.url,
        logoUrl,
        logoStoragePath,
        ordre,
      });
      ordre += 10;
    }
  }
}
