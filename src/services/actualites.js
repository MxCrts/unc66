// Accès Firestore à la collection "actualites".
// Champs : titre, contenu, date ("YYYY-MM-DD", saisie via <input type="date">),
// imageUrl (optionnel), archive (bool, contrôle manuel admin), createdAt (auto).
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION = "actualites";

export async function listActualites({ archive = false } = {}) {
  const q = query(collection(db, COLLECTION), where("archive", "==", archive), orderBy("date", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Toutes les actualités confondues, pour l'admin (pas de filtre archive/non-archive).
export async function listAllActualites() {
  const q = query(collection(db, COLLECTION), orderBy("date", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getDerniereActualite() {
  const q = query(
    collection(db, COLLECTION),
    where("archive", "==", false),
    orderBy("date", "desc"),
    limit(1)
  );
  const snap = await getDocs(q);
  return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
}

export async function createActualite({ titre, contenu, date, imageUrl }) {
  return addDoc(collection(db, COLLECTION), {
    titre,
    contenu,
    date,
    imageUrl: imageUrl || null,
    archive: false,
    createdAt: serverTimestamp(),
  });
}

export async function updateActualite(id, { titre, contenu, date, imageUrl, archive }) {
  return updateDoc(doc(db, COLLECTION, id), { titre, contenu, date, imageUrl: imageUrl || null, archive });
}

export async function deleteActualite(id) {
  return deleteDoc(doc(db, COLLECTION, id));
}
