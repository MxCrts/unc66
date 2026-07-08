// Accès Storage + Firestore pour les documents uploadés (ex: bulletin
// d'adhésion, PDF divers). Champs Firestore : nom, url, uploadedAt, + storagePath
// (ajout par rapport à la spec initiale : nécessaire pour pouvoir supprimer le
// bon fichier dans Storage lors d'une suppression).
import { collection, addDoc, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";

const COLLECTION = "documents";

export async function listDocuments() {
  const q = query(collection(db, COLLECTION), orderBy("uploadedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function uploadDocument(file) {
  const storagePath = `documents/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return addDoc(collection(db, COLLECTION), {
    nom: file.name,
    url,
    storagePath,
    uploadedAt: serverTimestamp(),
  });
}

export async function deleteDocument(documentItem) {
  if (documentItem.storagePath) {
    await deleteObject(ref(storage, documentItem.storagePath));
  }
  return deleteDoc(doc(db, COLLECTION, documentItem.id));
}
