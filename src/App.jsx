import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Accueil from "./pages/Accueil";
import NotreOrganisation from "./pages/presentation/NotreOrganisation";
import NotreStructure from "./pages/presentation/NotreStructure";
import NotreGouvernance from "./pages/presentation/NotreGouvernance";
import MotDuPresident from "./pages/MotDuPresident";
import Agenda from "./pages/Agenda";
import Partenaires from "./pages/Partenaires";
import Actualites from "./pages/Actualites";
import NotreRegion from "./pages/NotreRegion";
import Contact from "./pages/Contact";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Pages publiques, avec nav + footer communs */}
        <Route element={<Layout />}>
          <Route path="/" element={<Accueil />} />
          <Route path="/presentation/notre-organisation" element={<NotreOrganisation />} />
          <Route path="/presentation/notre-structure" element={<NotreStructure />} />
          <Route path="/presentation/notre-gouvernance" element={<NotreGouvernance />} />
          <Route path="/mot-du-president" element={<MotDuPresident />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/partenaires" element={<Partenaires />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/notre-region" element={<NotreRegion />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Espace admin : layout propre, sans nav/footer publics */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
