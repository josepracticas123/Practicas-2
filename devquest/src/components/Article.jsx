import { useState, useEffect } from "react";


function Article({ addTareas }) {
  const [name, setName] = useState("");
  const addNames = () => {
    if (name.trim() !== "") {
      addTareas(name);
      setName("");
    };
  }
  return (
    <article className="mx-auto flex w-full max-w-xs flex-col gap-2 rounded-lg border border-gray-400 bg-white p-4 text-center shadow-sm">

      <h2>Contador de tareas</h2>

      <input type="text" placeholder="Añadir tarea" value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none" />
      <button type="button" className="rounded-lg  bg-slate-600 px-4 py-2 text-white hover:bg-gray-700" onClick={addNames}>
        Añadir a la lista
      </button>

      <h2>Lista de tareas</h2>
    </article>
  )
}

export default Article;