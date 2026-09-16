import { useState } from "react";

function Article({ addTareas }) {
  const [textoTarea, setTextoTarea] = useState("");

  //Función para enviar la tarea al array de tareas y limpiar el input
  const enviarTarea = () => {
    const tareaLimpia = textoTarea.trim();
    if (tareaLimpia !== "") {
      addTareas(tareaLimpia);
      setTextoTarea("");
    };
  }
  return (
    <article className="mx-auto flex w-full max-w-xs flex-col gap-2 rounded-lg border border-gray-400 bg-white p-4 text-center shadow-sm">
      <h2>Añadir tarea</h2>
      <label htmlFor="nueva-tarea">Nueva tarea</label>
      <input id="nueva-tarea" type="text" placeholder="Añadir tarea" value={textoTarea} onChange={(e) => setTextoTarea(e.target.value)} className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none" />
      <button type="button" className="rounded-lg  bg-slate-600 px-4 py-2 text-white hover:bg-gray-700" onClick={enviarTarea}>
        Añadir tarea
      </button>
    </article>
  )
}

export default Article;