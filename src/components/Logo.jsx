import logo from "../assets/logo.png";

export default function Logo({ size = 56 }) {
  return (
    <img
      src={logo}
      alt="Blason UNC — Union Nationale des Combattants, Pyrénées-Orientales"
      style={{ height: size, width: "auto" }}
      className="object-contain"
    />
  );
}
