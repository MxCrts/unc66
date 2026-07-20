// Accès Firestore à la collection "associationsLocales" (annuaire Notre région).
// Une commune = un document, id déterministe = slug de la ville (ex: "perpignan",
// "saint-laurent-de-la-salanque") pour pouvoir faire un upsert idempotent sans
// jamais créer de doublon. Champs : ville, nom, adresse, telephone?, email?,
// updatedAt. Les 9 communes de référence viennent de VILLES_ASSOCIATIONS
// (siteContent.js) ; ce service ne fait que porter les détails saisis en admin.
import { collection, doc, getDocs, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION = "associationsLocales";

// Slug stable et lisible pour l'id du document (sert de clé par commune).
export function slugVille(ville) {
  return ville
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // retire les accents combinés
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Toutes les fiches saisies, indexées par slug de ville pour un merge facile.
export async function listAssociationsLocales() {
  const snap = await getDocs(collection(db, COLLECTION));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Crée ou met à jour la fiche d'une commune (merge : ne touche pas createdAt).
export async function upsertAssociationLocale(ville, { nom, adresse, telephone, email }) {
  const id = slugVille(ville);
  await setDoc(
    doc(db, COLLECTION, id),
    {
      ville,
      nom: nom?.trim() || "",
      adresse: adresse?.trim() || "",
      telephone: telephone?.trim() || "",
      email: email?.trim() || "",
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
  return id;
}

// Efface les détails d'une commune (elle réapparaît alors en « À remplir »).
export async function deleteAssociationLocale(ville) {
  return deleteDoc(doc(db, COLLECTION, slugVille(ville)));
}
