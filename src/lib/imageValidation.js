// Validation commune aux uploads d'image depuis l'admin (mot du Président,
// actualités) : mêmes contraintes partout (formats + poids), messages en
// français directement utilisables dans l'UI.
const TYPES_AUTORISES = ["image/jpeg", "image/png", "image/webp"];
const TAILLE_MAX_OCTETS = 5 * 1024 * 1024;

export function validerImage(file) {
  if (!TYPES_AUTORISES.includes(file.type)) {
    throw new Error("Format non supporté. Utilisez une image JPG, PNG ou WebP.");
  }
  if (file.size > TAILLE_MAX_OCTETS) {
    throw new Error("Image trop lourde (5 Mo maximum).");
  }
}
