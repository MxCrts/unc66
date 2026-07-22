import { MapPin, Phone, Mail, Clock, Download } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { BULLETIN_ADHESION_URL, COORDONNEES } from "../data/siteContent";
import imgCaserne from "../assets/caserne-gallieni.png";

const adresseComplete = `${COORDONNEES.adresse}, ${COORDONNEES.codePostal} ${COORDONNEES.ville}`;
// Embed Google Maps sans clé API (mode "output=embed"), suffisant pour une carte simple.
const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(adresseComplete)}&output=embed`;

export default function Contact() {
  return (
    <div>
      <PageHeader title="Contact" subtitle="UNC 66 — Maison du combattant" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-3 text-unc-gray">
            <p className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-unc-navy mt-0.5 shrink-0" />
              {adresseComplete}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-unc-navy shrink-0" />
              {COORDONNEES.telephone}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-unc-navy shrink-0" />
              <a href={`mailto:${COORDONNEES.email}`} className="hover:underline">
                {COORDONNEES.email}
              </a>
            </p>
          </div>

          <div className="border border-unc-border/40 rounded-lg p-5">
            <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-unc-navy mb-3">
              <Clock className="w-4 h-4" />
              Permanences
            </h2>
            <ul className="text-sm text-unc-gray space-y-1">
              {COORDONNEES.horaires.map((h) => (
                <li key={h.jours}>
                  <span className="font-semibold">{h.jours} :</span> {h.plage}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-unc-border/40 rounded-lg p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-unc-navy mb-2">
              Envie de rejoindre l'UNC ?
            </h2>
            <p className="text-sm text-unc-gray mb-3">
              Devenez membre de l'Union Nationale des Combattants.
            </p>
            <a
              href={BULLETIN_ADHESION_URL}
              download
              className="inline-flex items-center gap-2 bg-unc-navy hover:bg-unc-navy-dark text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
            >
              <Download className="w-4 h-4" />
              Adhérer — bulletin d'adhésion UNC 66
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Photo de l'entrée de la caserne Galliéni (fournie par le client),
              affichée sur desktop uniquement — sur mobile la colonne resterait
              trop longue avant la carte. */}
          <figure className="hidden sm:block relative rounded-lg overflow-hidden border border-unc-border/40">
            <img
              src={imgCaserne}
              alt="Entrée de la caserne Galliéni à Perpignan"
              className="w-full h-56 object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-unc-navy/85 to-unc-navy/0 pt-8 pb-2.5 px-4 text-white text-xs font-medium">
              La Maison du combattant — Caserne Galliéni
            </figcaption>
          </figure>

          <div className="flex-1 rounded-lg overflow-hidden border border-unc-border/40 min-h-[320px]">
            <iframe
              title="Localisation UNC 66"
              src={MAPS_EMBED_URL}
              className="w-full h-full min-h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
