import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext(undefined);

// Fournit l'utilisateur Firebase Auth courant (ou null) à toute l'app.
// "loading" reste true tant que Firebase n'a pas confirmé l'état de connexion
// (évite un flash "non connecté" au premier rendu / rechargement de page).
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error("useAuth() doit être utilisé dans un <AuthProvider>");
  return ctx;
}
