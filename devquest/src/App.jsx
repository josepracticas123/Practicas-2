import Header from './components/Header'
import Article from './components/Article'
import Footer from './components/Footer'
import Pendientes from './views/Pendientes'
import Finalizadas from './views/Finalizadas'
import { useEffect, useState } from "react";
import { leerTareasGuardadas,guardarTareas } from './utils/Almacenamiento';
function App() {
  const secciones = [
    { id: "inicio", nombre: "Inicio" },
    { id: "pendientes", nombre: "Pendientes" },
    { id: "finalizadas", nombre: "Finalizadas" }
  ];

  const [seccionActual, setSeccionActual] = useState("inicio");
  const [tareas, setTareas] = useState(leerTareasGuardadas);
  const [busqueda, setBusqueda] = useState("");

  //cada vez que cambie la tarea, se guardará en el localStorage
  useEffect(() => {
    guardarTareas(tareas);
  }, [tareas]);

  // Limpia el texto antes de enviarlo a la lista de tareas y evita tareas vacías
  const addTareas = (tarea) => {
    const tareaLimpia = tarea.trim();

    if (tareaLimpia !== "") {
      // Creamos un objeto para que cada tarea tenga un id único
      const nuevaTarea = {
        id: crypto.randomUUID(),
        texto: tareaLimpia,
        completada: false
      };

      setTareas([...tareas, nuevaTarea]);
    }
  };

  // Función para completar tareas
  const completarTarea = (id) => {
    const nuevasTareas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return { ...tarea, completada: true };
      }

      return tarea;
    });

    setTareas(nuevasTareas);
  };

  // Función para recuperar tareas
  const recuperarTarea = (id) => {
    const nuevasTareas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return { ...tarea, completada: false };
      }

      return tarea;
    });

    setTareas(nuevasTareas);
  };

  const eliminarTarea = (id) => {
    const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(nuevasTareas);
  };

  // Calculamos las tareas de cada grupo
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
    <div className="flex flex-col min-h-screen bg-black-100">

      <Header
        secciones={secciones}
        seccionActual={seccionActual}
        setSeccionActual={setSeccionActual}
      />

      <main className="flex-1">
        {/* Vista Inicio */}
        {seccionActual === "inicio" && (
          <section className="mt-5">
            <Article addTareas={addTareas} />
          </section>
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

      </main>

      <Footer />
    </div>
  );
}

export default App;