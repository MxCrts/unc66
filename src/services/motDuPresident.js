// Accès Firestore au document unique "motDuPresident/current".
// Un "document unique" en Firestore s'implémente avec un id fixe dans sa
// collection plutôt qu'un vrai singleton (Firestore n'a pas cette notion).
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const DOC_REF = () => doc(db, "motDuPresident", "current");

export async function getMotDuPresident() {
  const snap = await getDoc(DOC_REF());
  return snap.exists() ? snap.data() : null;
}

export async function setMotDuPresident(texte) {
  return setDoc(DOC_REF(), { texte, updatedAt: serverTimestamp() });
}
