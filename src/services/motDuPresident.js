// Accès Firestore au document unique "motDuPresident/current".
// Un "document unique" en Firestore s'implémente avec un id fixe dans sa
// collection plutôt qu'un vrai singleton (Firestore n'a pas cette notion).
// Champs : texte, imageUrl?, imageStoragePath? (photo du Président, même
// pattern d'upload que les documents), updatedAt.
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";
import { validerImage } from "../lib/imageValidation";

const DOC_REF = () => doc(db, "motDuPresident", "current");

export async function getMotDuPresident() {
  const snap = await getDoc(DOC_REF());
  return snap.exists() ? snap.data() : null;
}

export async function setMotDuPresident({ texte, imageUrl, imageStoragePath }) {
  return setDoc(DOC_REF(), {
    texte,
    imageUrl: imageUrl || null,
    imageStoragePath: imageStoragePath || null,
    updatedAt: serverTimestamp(),
  });
}

export async function uploadPhotoPresident(file) {
  validerImage(file);
  const storagePath = `president/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, storagePath);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { url, storagePath };
}

export async function deletePhotoPresident(storagePath) {
  if (storagePath) {
    await deleteObject(ref(storage, storagePath));
  }
}
