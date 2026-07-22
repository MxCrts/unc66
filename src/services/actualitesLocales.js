// Accès Firestore à la collection "actualitesLocales" : les actualités publiées
// au nom d'une association locale (par commune), distinctes des actualités
// fédérales "actualites". Champs : ville, titre, contenu, date ("YYYY-MM-DD"),
// imageUrl (optionnel, URL externe OU fichier uploadé), imageStoragePath
// (renseigné uniquement si imageUrl vient d'un upload — même convention que les
// actualités fédérales), createdAt. On récupère tout et on regroupe par commune
// côté client (volume faible) — pas de where(ville) + orderBy(date) pour éviter
// un index composite.
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

const COLLECTION = "actualitesLocales";

export async function listActualitesLocales() {
  const q = query(collection(db, COLLECTION), orderBy("date", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function createActualiteLocale({ ville, titre, contenu, date, imageUrl, imageStoragePath }) {
  return addDoc(collection(db, COLLECTION), {
    ville,
    titre,
    contenu,
    date,
    imageUrl: imageUrl || null,
    imageStoragePath: imageStoragePath || null,
    createdAt: serverTimestamp(),
  });
}

export async function updateActualiteLocale(id, { ville, titre, contenu, date, imageUrl, imageStoragePath }) {
  return updateDoc(doc(db, COLLECTION, id), {
    ville,
    titre,
    contenu,
    date,
    imageUrl: imageUrl || null,
    imageStoragePath: imageStoragePath || null,
  });
}

// Prend l'actualité entière (pas juste l'id) pour pouvoir nettoyer son image
// Storage si elle vient d'un upload — même logique que deleteActualite().
export async function deleteActualiteLocale(actualite) {
  if (actualite.imageStoragePath) {
    await deleteObject(ref(storage, actualite.imageStoragePath));
  }
  return deleteDoc(doc(db, COLLECTION, actualite.id));
}

export async function uploadActualiteLocaleImage(file) {
  validerImage(file);
  const storagePath = `actualitesLocales/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { url, storagePath };
}

export async function deleteActualiteLocaleImage(storagePath) {
  if (storagePath) {
    await deleteObject(ref(storage, storagePath));
  }
}
