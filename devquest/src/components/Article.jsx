import { useState } from "react"; // Permite controlar el texto que escribe el usuario.

// Article es el hijo que contiene el formulario para crear una tarea.
// Recibe desde su padre la prop addTareas, que es la función encargada de
// añadir la tarea al estado principal que vive en TareasPage.
function Article({ addTareas }) {
  // Guarda temporalmente el texto que se está escribiendo en el input.
  const [textoTarea, setTextoTarea] = useState("");

  // Se ejecuta cuando el usuario envía el formulario, por ejemplo al pulsar ENTER.
  // Usamos onSubmit porque el botón pertenece al formulario y así el mismo flujo
  // funciona tanto con el botón como con la tecla ENTER.
  const enviarTarea = (event) => {
   // Evita la recarga o navegación que el navegador haría por defecto al enviar
   // un formulario. La aplicación puede gestionar el envío con React.
    event.preventDefault();

    // trim elimina los espacios del principio y del final.
    // Por ejemplo, "     " se convierte en "" y no debe crear una tarea vacía.
    const tareaLimpia = textoTarea.trim();

    // Aquí se comprueba que, después de limpiar, quede algún contenido.
    // Si solo se escribieron espacios, se muestra el aviso y no se llama al
    // callback: no se crea ninguna tarea.
    if (tareaLimpia !== "") {
      // Article, que es el hijo, ejecuta el callback recibido por props.
      // Esta función pertenece al padre TareasPage, aunque se ejecuta aquí.
      // El padre recibe el texto, crea la tarea y actualiza su estado tareas.
      addTareas(tareaLimpia);
    }else{
      alert("No se pueden quedar tareas sin contenido")
    }

    // Después de intentar enviar, dejamos el formulario preparado para otra tarea.
    setTextoTarea("");
  }
  
  return (
    <form onSubmit={enviarTarea} className="mx-auto flex w-full max-w-xs flex-col gap-2 rounded-lg border border-gray-400 bg-white p-4 text-center shadow-sm">
      <h2>Añadir tarea</h2>
      <label htmlFor="nueva-tarea">Nueva tarea</label>
      <input id="nueva-tarea"
        type="text" placeholder="Añadir tarea"
        value={textoTarea}
        // Cada cambio del input actualiza el estado local del formulario.
        onChange={(e) => setTextoTarea(e.target.value)}
        className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none" />
      <button type="submit" className="rounded-lg  bg-slate-600 px-4 py-2 text-white hover:bg-gray-700">
        Añadir tarea
      </button>
    </form>
  )
}

export default Article;