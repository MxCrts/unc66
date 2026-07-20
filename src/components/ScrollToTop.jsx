import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Remet la fenêtre en haut à chaque changement de page. Sans ça, en navigation
// SPA on garde la position de scroll de la page précédente (demande client :
// arriver en haut de "Notre organisation" et des autres pages).
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
