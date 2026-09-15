 function Header() {
  return (

    <header className="bg-gray-800 text-white py-4">
      <h1 className="text-center text-5xl font-bold">
        Aplicación de Tareas
      </h1>

      <nav className="mt-4 flex justify-center space-x-4">
        <a href="#" className="text-white hover:text-gray-300">
          Inicio
        </a>
        <a href="#" className="text-white hover:text-gray-300">
          Pendientes
        </a>
        <a href="#" className="text-white hover:text-gray-300">
          Finalizadas
        </a>
      </nav>


    </header>

  )
}

export default Header