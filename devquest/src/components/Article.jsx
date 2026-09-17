import { useState } from "react"; // Permite controlar el texto del formulario.

// Article recibe por props la función que añade una tarea en App.
function Article({ addTareas }) {
  const [textoTarea, setTextoTarea] = useState(""); // Guarda lo escrito en el input.

  // Envía el texto limpio y vacía el input si es válido.
  const enviarTarea = () => {
    const tareaLimpia = textoTarea.trim();
    if (tareaLimpia !== "") {
      addTareas(tareaLimpia); // Llama al callback que vive en App.
      setTextoTarea("");
    };
  }
  // JSX muestra el formulario para crear una tarea.
  return (
    <article className="mx-auto flex w-full max-w-xs flex-col gap-2 rounded-lg border border-gray-400 bg-white p-4 text-center shadow-sm">
      <h2>Añadir tarea</h2>
      <label htmlFor="nueva-tarea">Nueva tarea</label>
      <input id="nueva-tarea" 
      type="text" placeholder="Añadir tarea" 
      value={textoTarea} onChange={(e) => setTextoTarea(e.target.value)} // Input controlado por el estado.
      onKeyDown={(e) => { // Permite enviar con Enter.
        if (e.key === "Enter") {
          enviarTarea();
        }
      }}
      className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none" />
      <button type="button" className="rounded-lg  bg-slate-600 px-4 py-2 text-white hover:bg-gray-700" onClick={enviarTarea}>
        Añadir tarea
      </button>
    </article>
  )
}

export default Article;