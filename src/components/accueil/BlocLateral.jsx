import PlaceholderImage from "../PlaceholderImage";

// Bloc latéral illustré de l'accueil ("La jeunesse" / "Nos unités partenaires").
// Chaque photo est affichée dans une tuile de ratio FIXE (4/3) recadrée en
// object-cover : peu importe le ratio d'origine (portrait/paysage), toutes les
// vignettes sont identiques et alignées. Les légendes ont une hauteur mini pour
// que les lignes de la grille restent régulières.
export default function BlocLateral({ titre, items }) {
  return (
    <section className="border border-unc-border/40 rounded-lg p-4">
      <h2 className="text-center text-sm font-bold text-unc-navy mb-4">{titre}</h2>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <figure key={item.legende} className="flex flex-col">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-md border border-unc-border/20 bg-unc-bg-soft">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.legende}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              ) : (
                <PlaceholderImage label="photo" className="w-full h-full" />
              )}
            </div>
            <figcaption className="mt-1.5 min-h-[2.75rem] text-[11px] leading-tight text-center text-unc-gray">
              {item.legende}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
