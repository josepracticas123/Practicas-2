import { NavLink } from "react-router";

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
    <header className="bg-gray-800 text-white text-center">
      <nav className="flex justify-center items-center gap-12 py-8">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `text-center text-2xl font-bold text-amber-500 px-2 py-2
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

