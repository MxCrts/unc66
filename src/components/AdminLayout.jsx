import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {
  LayoutDashboard,
  FileText,
  CalendarDays,
  Newspaper,
  Megaphone,
  MapPin,
  Handshake,
  FolderOpen,
  LogOut,
} from "lucide-react";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

const SECTIONS = [
  { to: "/admin/dashboard", label: "Vue d'ensemble", icon: LayoutDashboard, end: true },
  { to: "/admin/dashboard/mot-du-president", label: "Mot du Président", icon: FileText },
  { to: "/admin/dashboard/agenda", label: "Agenda", icon: CalendarDays },
  { to: "/admin/dashboard/actualites", label: "Actualités", icon: Newspaper },
  { to: "/admin/dashboard/actualites-locales", label: "Actualités locales", icon: Megaphone },
  { to: "/admin/dashboard/notre-region", label: "Notre région", icon: MapPin },
  { to: "/admin/dashboard/partenaires", label: "Partenaires", icon: Handshake },
  { to: "/admin/dashboard/documents", label: "Documents", icon: FolderOpen },
];

export default function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    navigate("/admin");
  }

  return (
    <div className="min-h-screen flex bg-unc-bg-soft">
      <aside className="w-64 bg-unc-navy text-white flex flex-col shrink-0">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <Logo size={36} />
          <div className="min-w-0">
            <p className="text-sm font-bold">UNC 66</p>
            <p className="text-[11px] text-white/60 truncate">{user?.email}</p>
          </div>
        </div>

        <nav className="flex-1 py-4">
          {SECTIONS.map((section) => (
            <NavLink
              key={section.to}
              to={section.to}
              end={section.end}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                  isActive ? "bg-white/10 font-semibold" : "text-white/80 hover:bg-white/5"
                }`
              }
            >
              <section.icon className="w-4 h-4 shrink-0" />
              {section.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 px-5 py-4 text-sm text-white/70 hover:text-white border-t border-white/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Se déconnecter
        </button>
      </aside>

      <main className="flex-1 p-8 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
