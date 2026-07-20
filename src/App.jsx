import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import Accueil from "./pages/Accueil";
import NotreOrganisation from "./pages/presentation/NotreOrganisation";
import NotreStructure from "./pages/presentation/NotreStructure";
import NotreGouvernance from "./pages/presentation/NotreGouvernance";
import MotDuPresident from "./pages/MotDuPresident";
import Agenda from "./pages/Agenda";
import Partenaires from "./pages/Partenaires";
import Actualites from "./pages/Actualites";
import NotreRegion from "./pages/NotreRegion";
import Adherer from "./pages/Adherer";
import Contact from "./pages/Contact";
import Login from "./pages/admin/Login";
import Overview from "./pages/admin/Overview";
import MotDuPresidentAdmin from "./pages/admin/MotDuPresidentAdmin";
import AgendaAdmin from "./pages/admin/AgendaAdmin";
import ActualitesAdmin from "./pages/admin/ActualitesAdmin";
import ActualitesLocalesAdmin from "./pages/admin/ActualitesLocalesAdmin";
import NotreRegionAdmin from "./pages/admin/NotreRegionAdmin";
import DocumentsAdmin from "./pages/admin/DocumentsAdmin";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
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
            <Route path="/adherer" element={<Adherer />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Connexion admin : pas de nav/footer publics */}
          <Route path="/admin" element={<Login />} />

          {/* Espace admin protégé : redirige vers /admin si non connecté */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminLayout />}>
              <Route index element={<Overview />} />
              <Route path="mot-du-president" element={<MotDuPresidentAdmin />} />
              <Route path="agenda" element={<AgendaAdmin />} />
              <Route path="actualites" element={<ActualitesAdmin />} />
              <Route path="actualites-locales" element={<ActualitesLocalesAdmin />} />
              <Route path="notre-region" element={<NotreRegionAdmin />} />
              <Route path="documents" element={<DocumentsAdmin />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
