import { useState } from "react"; // Permite controlar el texto del formulario.

// Article recibe por props la función que añade una tarea.
function Article({ addTareas }) {
  const [textoTarea, setTextoTarea] = useState("");

  // Envía el texto limpio y vacía el input si es válido.
  const enviarTarea = (event) => {
   event.preventDefault(); // Evita que el navegador recargue la página al enviar el formulario.
    const tareaLimpia = textoTarea.trim();
    if (tareaLimpia !== "") {
      addTareas(tareaLimpia); 
      setTextoTarea("");
    };
  }
  
  return (
    <form onSubmit={enviarTarea} className="mx-auto flex w-full max-w-xs flex-col gap-2 rounded-lg border border-gray-400 bg-white p-4 text-center shadow-sm">
      <h2>Añadir tarea</h2>
      <label htmlFor="nueva-tarea">Nueva tarea</label>
      <input id="nueva-tarea"
        type="text" placeholder="Añadir tarea"
        value={textoTarea}
        onChange={(e) => setTextoTarea(e.target.value)} 
        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none" />
      <button type="submit" className="rounded-lg  bg-slate-600 px-4 py-2 text-white hover:bg-gray-700">
        Añadir tarea
      </button>
    </form>
  )
}

export default Article;