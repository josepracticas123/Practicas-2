import { NavLink } from "react-router";
import logo from "../assets/logo.png";

// Cabecera global
function Header() {
  const links = [
    {
      to: "/",
      text: "Portal",
    },
    {
      to: "/tareas",
      text: "Tareas",
    },
    {
      to: "/quiz",
      text: "Quiz",
    },
    {
      to: "/catalogo",
      text: "Catálogo",
    },
  ];

  return (
    <header className="bg-gray-800 text-white">
      <nav className="relative flex flex-wrap items-center justify-center gap-2 px-24 py-6 sm:gap-6 sm:px-6 sm:py-8">
        {/* Logo */}
        <NavLink
          to="/"
          className="absolute left-6"
        >
          <img
            src={logo}
            alt="Logo del portal"
            className="h-14 w-14 object-contain sm:h-20 sm:w-20"
          />
        </NavLink>

        {/* Navegación */}
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-center text-base font-semibold text-amber-500
              transition hover:bg-gray-700 hover:text-amber-300 hover:scale-105
              focus:outline-none focus-visible:ring-2
              focus-visible:ring-amber-400 focus-visible:ring-offset-2
              focus-visible:ring-offset-gray-800
              sm:text-xl
              ${isActive ? "border-b-4 border-amber-500" : ""}`
            }
          >
            {link.text}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;

