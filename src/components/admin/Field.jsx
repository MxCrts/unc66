// Champ de formulaire admin standard (label + input/textarea passé en children).
export const inputClass =
  "w-full px-3 py-2 border border-unc-border/40 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-unc-navy/30";

export default function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-unc-gray mb-1">{label}</label>
      {children}
    </div>
  );
}
