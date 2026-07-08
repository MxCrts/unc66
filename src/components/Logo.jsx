// Blason UNC 66 — PLACEHOLDER.
// Le vrai blason (tricolore, gerbe de laurier, casque, flamme, bonnet
// phrygien) est une image fournie par le client à déposer dans
// src/assets/logo.png puis à brancher ici. En attendant, badge tricolore
// simplifié qui respecte les proportions et la charte de couleurs.
export default function Logo({ size = 56 }) {
  return (
    <div
      className="relative rounded-full border-2 border-unc-navy overflow-hidden shrink-0 grid grid-cols-3"
      style={{ width: size, height: size }}
      role="img"
      aria-label="Blason UNC — Union Nationale des Combattants"
    >
      <div className="bg-unc-blue-flag" />
      <div className="bg-white flex items-center justify-center">
        <span className="text-unc-navy font-extrabold leading-none" style={{ fontSize: size * 0.22 }}>
          UNC
        </span>
      </div>
      <div className="bg-unc-red-flag" />
    </div>
  );
}
