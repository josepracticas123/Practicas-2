import { useState } from "react"; // Permite controlar el texto del formulario.

// Article recibe por props la función que añade una tarea en App.
function Article({ addTareas }) {
  const [textoTarea, setTextoTarea] = useState(""); // Guarda lo escrito en el input.

  // Envía el texto limpio y vacía el input si es válido.
  const enviarTarea = (event) => {
   event.preventDefault(); // Evita el comportamienro por defecto del navegador, osea recargar, deja que react lo realice.
    const tareaLimpia = textoTarea.trim();
    if (tareaLimpia !== "") {
      addTareas(tareaLimpia); // Llama al callback que vive en App.
      setTextoTarea("");
    };
  }
  // JSX muestra el formulario para crear una tarea.
  return (
    //form agrupa los componentes
    <form onSubmit={enviarTarea} className="mx-auto flex w-full max-w-xs flex-col gap-2 rounded-lg border border-gray-400 bg-white p-4 text-center shadow-sm">
      <h2>Añadir tarea</h2>
      <label htmlFor="nueva-tarea">Nueva tarea</label>
      <input id="nueva-tarea"
        type="text" placeholder="Añadir tarea"
        value={textoTarea} // conecta el valor del input con el estado de react
        //setTextoTarea( actualiza ele stado de la tarea)
        onChange={(e) => setTextoTarea(e.target.value)} // detecta cambios en un input
        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none" />
      <button type="submit" className="rounded-lg  bg-slate-600 px-4 py-2 text-white hover:bg-gray-700">
        Añadir tarea
      </button>
    </form>
  )
}

export default Article;