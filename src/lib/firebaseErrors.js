// Traduit les codes d'erreur Firebase (auth, firestore, storage) les plus
// courants en messages français compréhensibles pour un utilisateur non technique.
const MESSAGES = {
  "auth/invalid-email": "Adresse e-mail invalide.",
  "auth/user-disabled": "Ce compte a été désactivé.",
  "auth/user-not-found": "E-mail ou mot de passe incorrect.",
  "auth/wrong-password": "E-mail ou mot de passe incorrect.",
  "auth/invalid-credential": "E-mail ou mot de passe incorrect.",
  "auth/too-many-requests": "Trop de tentatives. Réessayez dans quelques minutes.",
  "auth/network-request-failed": "Problème de connexion réseau. Vérifiez votre connexion internet.",
  "storage/unauthorized": "Vous n'êtes pas autorisé à effectuer cette action.",
  "storage/canceled": "Envoi annulé.",
  "storage/retry-limit-exceeded": "Échec de l'envoi (problème réseau). Réessayez.",
  "storage/unknown": "Échec de l'envoi. Réessayez.",
  "permission-denied": "Vous n'êtes pas autorisé à effectuer cette action.",
};

export function messageErreurFirebase(error) {
  return MESSAGES[error?.code] || "Une erreur est survenue. Réessayez.";
}
