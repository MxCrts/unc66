// Accès Firestore à la collection "actualitesLocales" : les actualités publiées
// au nom d'une association locale (par commune), distinctes des actualités
// fédérales "actualites". Champs : ville, titre, contenu, date ("YYYY-MM-DD"),
// createdAt. On récupère tout et on regroupe par commune côté client (volume
// faible) — pas de where(ville) + orderBy(date) pour éviter un index composite.
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
import { db } from "../firebase";

const COLLECTION = "actualitesLocales";

export async function listActualitesLocales() {
  const q = query(collection(db, COLLECTION), orderBy("date", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function createActualiteLocale({ ville, titre, contenu, date }) {
  return addDoc(collection(db, COLLECTION), {
    ville,
    titre,
    contenu,
    date,
    createdAt: serverTimestamp(),
  });
}

export async function updateActualiteLocale(id, { ville, titre, contenu, date }) {
  return updateDoc(doc(db, COLLECTION, id), { ville, titre, contenu, date });
}

export async function deleteActualiteLocale(id) {
  return deleteDoc(doc(db, COLLECTION, id));
}
