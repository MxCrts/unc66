import PlaceholderImage from "../PlaceholderImage";

// Bloc latéral illustré de l'accueil ("La jeunesse" / "Nos unités partenaires").
// Tant que les vraies photos ne sont pas fournies, chaque entrée affiche un
// PlaceholderImage + sa légende. Dès qu'une entrée a un `image`, on l'affiche.
export default function BlocLateral({ titre, items }) {
  return (
    <section className="border border-unc-border/40 rounded-lg p-4">
      <h2 className="text-center text-sm font-bold text-unc-navy mb-4">{titre}</h2>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <figure key={item.legende} className="flex flex-col gap-1.5">
            {item.image ? (
              <img
                src={item.image}
                alt={item.legende}
                loading="lazy"
                className="w-full h-24 object-cover rounded"
              />
            ) : (
              <PlaceholderImage label="photo" className="w-full h-24 rounded" />
            )}
            <figcaption className="text-[11px] leading-tight text-center text-unc-gray">
              {item.legende}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
