import Inicio from '../views/Inicio' // Importa el formulario para añadir tareas.
import Pendientes from '../views/Pendientes' // Importa la vista de tareas pendientes.
import Finalizadas from '../views/Finalizadas' // Importa la vista de tareas finalizadas.
import { useEffect, useState } from "react"; // Hooks para guardar estado y sincronizarlo.
import { leerTareasGuardadas, guardarTareas } from '../utils/Almacenamiento'; // Lee y guarda tareas.

function TareasPage() {
  // Lista fija de opciones que aparecen en el navbar.
  const secciones = [
    { id: "inicio", nombre: "Añadir tarea" },
    { id: "pendientes", nombre: "Pendientes" },
    { id: "finalizadas", nombre: "Finalizadas" }
  ];


  const [seccionActual, setSeccionActual] = useState("inicio"); // Guarda la sección visible.

  // tareas es la lista real y el estado principal de este componente padre.
  // Se pasa la función leerTareasGuardadas, sin paréntesis, para que React la
  // use como inicializadora al preparar el estado. Con () se ejecutaría de
  // inmediato y se pasaría su resultado a useState.
  const [tareas, setTareas] = useState(leerTareasGuardadas);

  // Guarda en localStorage la lista real cada vez que cambia tareas.
  // Este efecto depende de [tareas], por eso no se ejecuta solo al escribir o
  // limpiar una búsqueda. No guardamos listas filtradas: la búsqueda solo
  // decide qué se muestra y nunca sustituye el estado principal.
  useEffect(() => {
    guardarTareas(tareas);
  }, [tareas]);


  // Es el callback que recibe Article a través de Inicio.
  // Article (hijo) lo ejecuta al enviar el formulario; aquí, en TareasPage
  // (padre), se crea la tarea y se modifica el estado tareas.
  const addTareas = (tarea) => {
    // Se vuelve a limpiar el texto en el padre para proteger el estado aunque
    // otra parte de la aplicación llamara a este callback directamente.
    const tareaLimpia = tarea.trim();

    if (tareaLimpia !== "") {
      // Cada tarea recibe un ID único al crearse. El texto puede repetirse,
      // pero el ID permite distinguir dos tareas como "Estudiar".
      const nuevaTarea = {
        id: crypto.randomUUID(),
        texto: tareaLimpia,
        completada: false
      };

      // Creamos un array nuevo: no modificamos directamente el array anterior.
      setTareas([...tareas, nuevaTarea]);
    }
  };

  // Cambia a completada solo la tarea cuyo ID recibe la vista Pendientes.
  const completarTarea = (id) => {
    // map crea un array nuevo. Para la tarea coincidente se crea también un
    // objeto nuevo; las tareas que no coinciden se devuelven tal cual y
    // conservan su misma referencia/identidad.
    const nuevasTareas = tareas.map((tarea) => {
      if (tarea.id === id) {
        // Se busca por ID, no por texto. Así, si dos tareas dicen "Estudiar"
        // y tienen IDs 1 y 2, completar la ID 1 solo cambia la primera.
        // La copia evita modificar directamente el objeto del estado anterior.
        return { ...tarea, completada: true };
      }

      return tarea;
    });

    setTareas(nuevasTareas);
  };

  // Cambia a pendiente solo la tarea cuyo ID recibe la vista Finalizadas.
  const recuperarTarea = (id) => {
    // Igual que completarTarea, map crea otro array y solo crea otro objeto
    // para la tarea que coincide; las demás conservan su identidad.
    const nuevasTareas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return { ...tarea, completada: false };
      }

      return tarea;
    });

    setTareas(nuevasTareas);
  };

  // Elimina de la lista real la tarea identificada por id.
  const eliminarTarea = (id) => {
    // filter crea un array nuevo y conserva las tareas cuyo ID no coincide.
    // La tarea cuyo ID coincide queda fuera del resultado. Funciona aunque la
    // vista estuviera filtrada por texto porque el botón pasa el ID real de la
    // tarea visible; el texto puede repetirse, pero el ID identifica una sola.
    const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(nuevasTareas);
  };

  // Cada estado de búsqueda pertenece a su vista. Guarda solo el texto escrito
  // por el usuario, no una copia de las tareas ni una lista nueva para guardar.
  const [busquedaPendientes, setBusquedaPendientes] = useState(""); // Guarda el texto que se busca.
  const [busquedaFinalizadas, setBusquedaFinalizadas] = useState(""); // Guarda el texto que se busca.

  // Estas listas separan la lista real según completada. Se recalculan para
  // mostrar pendientes y finalizadas, pero no reemplazan tareas.
  const tareasPendientes = tareas.filter((tarea) => !tarea.completada);
  const tareasFinalizadas = tareas.filter((tarea) => tarea.completada);

  // Normalizamos la búsqueda para ignorar espacios exteriores y diferencias
  // entre mayúsculas y minúsculas.
  const textoBusquedaPendientes = busquedaPendientes.trim().toLowerCase();
  const textoBusquedaFinalizadas = busquedaFinalizadas.trim().toLowerCase();

  // Estas listas son resultados calculados para mostrar. Cuando cambia busqueda,
  // React vuelve a renderizar y se calculan de nuevo; tareas sigue intacta.
  // Buscar no significa guardar una nueva lista.
  const tareasPendientesFiltradas = tareasPendientes.filter((tarea) =>
    tarea.texto.toLowerCase().includes(textoBusquedaPendientes)
  );

  const tareasFinalizadasFiltradas = tareasFinalizadas.filter((tarea) =>
    tarea.texto.toLowerCase().includes(textoBusquedaFinalizadas)
  );

  return (
    <>
      {/* El cambio de sección modifica solo seccionActual. */}
      <nav className="flex justify-center space-x-4 text-white py-4">
        {secciones.map((seccion) => { // map crea un botón por cada sección.
          const estaActiva = seccion.id === seccionActual;

          return (
            <button
              type="button"
              aria-pressed={estaActiva}
              key={seccion.id}
              onClick={() => setSeccionActual(seccion.id)} // Cambia la sección al pulsar.
              className={[
                "pb-1 border-b border-transparent transition-colors duration-200", // Clases de Tailwind para el estilo.
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-offset-1 focus-visible:ring-offset-gray-800",
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

      {/* TareasPage pasa addTareas a Inicio; Inicio lo pasa después a Article. */}
      {seccionActual === "inicio" && (
        <Inicio addTareas={addTareas} />
      )}

        {/* Pendientes recibe datos visibles y callbacks del padre. Sus botones
          ejecutan completarTarea o eliminarTarea pasando el ID de cada tarea. */}
      {seccionActual === "pendientes" && (
        <Pendientes
          tareasPendientes={tareasPendientes}
          tareasPendientesFiltradas={tareasPendientesFiltradas}
          busqueda={busquedaPendientes}
          setBusqueda={setBusquedaPendientes}
          completarTarea={completarTarea}
          eliminarTarea={eliminarTarea}
        />
      )}

        {/* Finalizadas recibe la lista correspondiente y los callbacks para
          recuperar o eliminar una tarea concreta mediante su ID. */}
      {seccionActual === "finalizadas" && (
        <Finalizadas
          tareasFinalizadas={tareasFinalizadas}
          tareasFinalizadasFiltradas={tareasFinalizadasFiltradas}
          busqueda={busquedaFinalizadas}
          setBusqueda={setBusquedaFinalizadas}
          recuperarTarea={recuperarTarea}
          eliminarTarea={eliminarTarea}
        />
      )}
    </>
  )

}

export default TareasPage;


