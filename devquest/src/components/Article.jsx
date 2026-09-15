import {useState} from "react";


function Article() {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const addNames = () => {
    if (name.trim() !== "") {
      setNames([...names, name]);
      setName("");
    };
  }
  return (
        <article className="mx-auto flex w-full max-w-xs flex-col gap-2 rounded-lg border border-gray-400 bg-white p-4 text-center shadow-sm">

          <span>{String(names.length).padStart(2, '0')}</span>
          <h2>Mi panel</h2>
          <p>Construye tu primer panel con React y JSX.</p>
          <span>Interfaz</span>
          <span>Pendiente</span>
          
          <input tipe="text" placeholder="Escribe tu nombre" value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none" />
          <button type="button" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" onClick={addNames}>
            Añadir tarea
          </button>
          {names.map((name, index) => (
            <p key={index}> {index + 1}. {name}</p>
          ))}
        </article>
  )
}

export default Article;