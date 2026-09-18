import { Link } from "react-router";
// cabecera global
function Header() {
  return (
    <header className="bg-gray-800 text-white text-center">
      <nav>
        <Link to="/" className="text-center text-5xl font-bold">
          Portal
        </Link>
        <Link to="/tareas" className="text-center text-5xl font-bold">
          Tareas
        </Link>
        <Link to="/quiz" className="text-center text-5xl font-bold">
          Quiz
        </Link>
      </nav>
    </header>
  );
}

export default Header;