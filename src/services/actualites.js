// Accès Firestore à la collection "actualites".
// Champs : titre, contenu, date ("YYYY-MM-DD", saisie via <input type="date">),
// imageUrl (optionnel, URL externe OU URL d'un fichier uploadé), imageStoragePath
// (renseigné uniquement si imageUrl vient d'un upload, pour pouvoir supprimer le
// bon fichier Storage — null si c'est une simple URL externe), archive (bool,
// contrôle manuel admin), createdAt (auto).
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
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";
import { validerImage } from "../lib/imageValidation";

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

export async function createActualite({ titre, contenu, date, imageUrl, imageStoragePath }) {
  return addDoc(collection(db, COLLECTION), {
    titre,
    contenu,
    date,
    imageUrl: imageUrl || null,
    imageStoragePath: imageStoragePath || null,
    archive: false,
    createdAt: serverTimestamp(),
  });
}

export async function updateActualite(id, { titre, contenu, date, imageUrl, imageStoragePath, archive }) {
  return updateDoc(doc(db, COLLECTION, id), {
    titre,
    contenu,
    date,
    imageUrl: imageUrl || null,
    imageStoragePath: imageStoragePath || null,
    archive,
  });
}

// Prend l'actualité entière (pas juste l'id) pour pouvoir nettoyer son image
// Storage si elle vient d'un upload — même logique que deleteDocument().
export async function deleteActualite(actualite) {
  if (actualite.imageStoragePath) {
    await deleteObject(ref(storage, actualite.imageStoragePath));
  }
  return deleteDoc(doc(db, COLLECTION, actualite.id));
}

export async function uploadActualiteImage(file) {
  validerImage(file);
  const storagePath = `actualites/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { url, storagePath };
}

export async function deleteActualiteImage(storagePath) {
  if (storagePath) {
    await deleteObject(ref(storage, storagePath));
  }
}
