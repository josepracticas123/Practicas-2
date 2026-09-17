function Header({ secciones, seccionActual, setSeccionActual }) {
  return (
    <header className="bg-gray-800 text-white py-4">
      <h1 className="text-center text-5xl font-bold">
        Aplicación de Tareas
      </h1>

      <nav className="mt-4 flex justify-center space-x-4">
        {secciones.map((seccion) => {
          const estaActiva = seccion.id === seccionActual;

          return (
            <button
              type="button"
              aria-pressed={estaActiva}
              key={seccion.id}
              onClick={() => setSeccionActual(seccion.id)}
              className={[
                "pb-1 border-b border-transparent transition-colors duration-200",
                "focus-visible:border-b focus-visible:border-yellow-300",
                estaActiva
                  ? "border-white/90 text-white"
                  : "text-gray-300 hover:border-gray-500 hover:text-white",
              ].join(" ")}
            >
              {seccion.nombre}
            </button>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;