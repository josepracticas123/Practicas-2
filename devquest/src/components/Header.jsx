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
  ];

  return (
    <header className="bg-gray-800 text-white">
      <nav className="relative flex items-center justify-center gap-12 py-8">

        {/* Logo */}
        <NavLink
          to="/"
          className="absolute left-6 rounded-lg transition hover:scale-105"
        >
          <img
            src={logo}
            alt="Logo del portal"
            className="h-20 w-20 object-contain"
          />
        </NavLink>

        {/* Navegación */}
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `text-center text-xl font-semibold text-amber-500 px-3 py-2
              rounded-lg
              transition
              hover:bg-gray-700
              hover:text-amber-300
              hover:scale-105
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-amber-400
              focus-visible:ring-offset-2
              focus-visible:ring-offset-gray-800
              ${
                isActive
                  ? "border-b-4 border-amber-500"
                  : ""
              }`
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