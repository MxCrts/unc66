import Logo from "../Logo";
import heroActuelle from "../../assets/hero-actuelle.jpg";
import heroArchive from "../../assets/hero-archive.jpg";

// Bandeau hero de l'accueil : les deux photos client (aujourd'hui / archive)
// en fond côte à côte, voile marine dégradé pour la lisibilité, logo + titre
// en surimpression centrée.
export default function Hero() {
  return (
    <section className="relative h-[26rem] sm:h-[30rem] lg:h-[34rem] overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-2">
        <img
          src={heroActuelle}
          alt="Militaires français en opération, aujourd'hui"
          className="h-full w-full object-cover"
        />
        <img
          src={heroArchive}
          alt="Soldats français, photo d'archive"
          className="h-full w-full object-cover"
        />
      </div>
      {/* Séparateur discret entre les deux photos */}
      <div className="absolute inset-y-0 left-1/2 w-px bg-white/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-unc-navy/75 via-unc-navy/65 to-unc-navy/85" />

      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white rounded-xl px-5 py-3.5 shadow-lg">
          <Logo size={72} />
        </div>
        <p className="mt-5 text-sm sm:text-base italic tracking-wide text-white/85">
          Aujourd'hui... comme hier
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white max-w-3xl leading-tight drop-shadow-sm">
          L'UNC défend les droits des combattants et des blessés
        </h1>
        <p className="mt-4 text-white/85 max-w-xl text-sm sm:text-base">
          La Fédération UNC des Pyrénées-Orientales « UNC 66 »
        </p>
      </div>
    </section>
  );
}
