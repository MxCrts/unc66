// Accès Firestore à la collection "agenda".
// Champs : titre, date ("YYYY-MM-DD"), description, type (texte libre, ex:
// "Cérémonie", "Repas"...), archive (bool, contrôle manuel admin), createdAt (auto).
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
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION = "agenda";

// Événements à venir : les plus proches en premier.
export async function listEvenementsAVenir() {
  const q = query(collection(db, COLLECTION), where("archive", "==", false), orderBy("date", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Archives : les plus récemment passés en premier.
export async function listEvenementsArchives() {
  const q = query(collection(db, COLLECTION), where("archive", "==", true), orderBy("date", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Tous les événements confondus, pour l'admin.
export async function listAllEvenements() {
  const q = query(collection(db, COLLECTION), orderBy("date", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function createEvenement({ titre, date, description, type }) {
  return addDoc(collection(db, COLLECTION), {
    titre,
    date,
    description,
    type,
    archive: false,
    createdAt: serverTimestamp(),
  });
}

export async function updateEvenement(id, { titre, date, description, type, archive }) {
  return updateDoc(doc(db, COLLECTION, id), { titre, date, description, type, archive });
}

export async function deleteEvenement(id) {
  return deleteDoc(doc(db, COLLECTION, id));
}
