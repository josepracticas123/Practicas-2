import Inicio from '../views/Inicio' // Importa el formulario para añadir tareas.
import Pendientes from '../views/Pendientes' // Importa la vista de tareas pendientes.
import Finalizadas from '../views/Finalizadas' // Importa la vista de tareas finalizadas.
import { useEffect, useState } from "react"; // Hooks para guardar estado y sincronizarlo.
import { leerTareasGuardadas, guardarTareas } from '../utils/Almacenamiento'; // Lee y guarda tareas.

function TareasPage() {
  // Lista fija de opciones que aparecen en el navbar.
  const secciones = [
    { id: "inicio", nombre: "Inicio" },
    { id: "pendientes", nombre: "Pendientes" },
    { id: "finalizadas", nombre: "Finalizadas" }
  ];


  const [seccionActual, setSeccionActual] = useState("inicio"); // Guarda la sección visible.
  /* React usa la función "const [tareas, setTareas] = useState(leerTareasGuardadas);" 
   para obtener el valor inicial, osea se usa la función como inicializadora por no tener el (),
   con el () ejecuta la función y despues pasa el resutado. 
   Esto evita leer localStorage en cada renderizado.*/
  const [tareas, setTareas] = useState(leerTareasGuardadas); // Guarda tareas y las recupera al iniciar.
  const [busqueda, setBusqueda] = useState(""); // Guarda el texto que se busca.

  // Guarda las tareas cuando cambia el estado tareas.
  useEffect(() => {
    guardarTareas(tareas);
  }, [tareas]);


  // Limpia el texto y evita crear tareas vacías.
  const addTareas = (tarea) => {
    const tareaLimpia = tarea.trim();

    if (tareaLimpia !== "") {
      // Cada tarea recibe su identidad una sola vez al crearse.
      const nuevaTarea = {
        id: crypto.randomUUID(),
        texto: tareaLimpia,
        completada: false
      };

      setTareas([...tareas, nuevaTarea]); // Crea un array nuevo copiando las tareas qu eya teniamos y añade la nueva al final.
    }
  };

  // Cambia a true solo la tarea cuyo id recibe.
  const completarTarea = (id) => {
    // map crea una lista nueva y conserva las demás tareas.
    const nuevasTareas = tareas.map((tarea) => {
      if (tarea.id === id) {
        // Copiamos el objeto para no modificar directamente el estado anterior.
        return { ...tarea, completada: true };
      }

      return tarea;
    });

    setTareas(nuevasTareas);
  };

  // Cambia a false solo la tarea cuyo id recibe.
  const recuperarTarea = (id) => {
    // map devuelve otra lista con la tarea actualizada.
    const nuevasTareas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return { ...tarea, completada: false };
      }

      return tarea;
    });

    setTareas(nuevasTareas);
  };

  // filter elimina la tarea indicada y conserva las demás.
  const eliminarTarea = (id) => {
    const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(nuevasTareas);
  };
  const tareasPendientes = tareas.filter((tarea) => !tarea.completada);
  const tareasFinalizadas = tareas.filter((tarea) => tarea.completada);

  const textoBusqueda = busqueda.trim().toLowerCase();

  const tareasPendientesFiltradas = tareasPendientes.filter((tarea) =>
    tarea.texto.toLowerCase().includes(textoBusqueda)
  );

  const tareasFinalizadasFiltradas = tareasFinalizadas.filter((tarea) =>
    tarea.texto.toLowerCase().includes(textoBusqueda)
  );
  
  return (
    <>
      {/*Navegador de botones*/}
      <nav className="flex justify-center space-x-4 bg-gray-800 text-white py-4">
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

      {/* Vista Inicio */}
      {seccionActual === "inicio" && (
        <Inicio addTareas={addTareas} />
      )}

      {/* Vista Pendientes */}
      {seccionActual === "pendientes" && (
        <Pendientes
          tareasPendientes={tareasPendientes}
          tareasPendientesFiltradas={tareasPendientesFiltradas}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          completarTarea={completarTarea}
          eliminarTarea={eliminarTarea}
        />
      )}

      {/* Vista Finalizadas */}
      {seccionActual === "finalizadas" && (
        <Finalizadas
          tareasFinalizadas={tareasFinalizadas}
          tareasFinalizadasFiltradas={tareasFinalizadasFiltradas}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          recuperarTarea={recuperarTarea}
          eliminarTarea={eliminarTarea}
        />
      )}
    </>
  )

}

export default TareasPage;


