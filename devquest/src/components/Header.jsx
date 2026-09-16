function Header({ secciones, seccionActual, setSeccionActual }) {
  return (

    <header className="bg-gray-800 text-white py-4">
      <h1 className="text-center text-5xl font-bold">
        Aplicación de Tareas
      </h1>
      <nav className="mt-4 flex justify-center space-x-4">
        {/*
           Función map para recorrer el array de secciones y renderizar un botón por cada sección.
           Al hacer click en el botón se llama a la función setSeccionActual con
           el id de la sección correspondiente para cambiar la sección actual.
           */}
        {secciones.map((seccion) => (
          <button
            type="button"
            aria-pressed={seccion.id === seccionActual}
            key={seccion.id}
            onClick={() => setSeccionActual(seccion.id)}
            className={
              seccion.id === seccionActual
                ? "border-b-2 border-white pb-1 focus:outline-none"
                : "border-b-2 border-transparent pb-1 hover:border-gray-400 focus:outline-none"
            }

          >
            {seccion.nombre}
          </button>
        ))}
      </nav>


    </header>

  )
}

export default Header