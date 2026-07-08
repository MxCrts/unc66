import { AlertCircle, CheckCircle2 } from "lucide-react";

// Bandeau de retour utilisateur (erreur ou succès) pour les formulaires admin.
export default function StatusMessage({ type = "error", children }) {
  if (!children) return null;
  const isError = type === "error";
  const Icon = isError ? AlertCircle : CheckCircle2;
  return (
    <p
      className={`flex items-start gap-2 text-sm rounded-md px-3 py-2 border ${
        isError ? "text-red-600 bg-red-50 border-red-200" : "text-emerald-700 bg-emerald-50 border-emerald-200"
      }`}
    >
      <Icon className="w-4 h-4 shrink-0 mt-0.5" />
      {children}
    </p>
  );
}
