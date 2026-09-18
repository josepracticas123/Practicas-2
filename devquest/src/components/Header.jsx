import { Link } from "react-router";
// cabecera global
function Header() {
  return (
    <header className="bg-gray-800 text-white text-center">
      <Link to="/" className="text-center text-5xl font-bold">
        Portal
      </Link>

    </header>
  );
}

export default Header;