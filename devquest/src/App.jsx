
import Header from './components/Header'
import Article from './components/Article'
import Footer from './components/Footer'
import { useState } from "react";

function App() {
  const secciones = [
    { id: "inicio", nombre: "Inicio" },
    { id: "pendientes", nombre: "Pendientes" },
    { id: "finalizadas", nombre: "Finalizadas" }];
  //Variable de estado para almacenar la sección actual y poder renderizar la sección correspondiente al hacer click en los botones del header
  const [seccionActual, setSeccionActual] = useState("inicio");
  //Array para para el esatdo de tareas
  const [tareas, setTareas] = useState([]);

  //limpia el texto antes de enviarlo a la lista de tareas y evita que se agreguen tareas vacías
  const addTareas = (tarea) => {
    const tareaLimpia = tarea.trim();

    if (tareaLimpia !== "") {
      //Creamos un objeto para que cada tarea tenga un id único y podamos distinguirlo.
      const nuevaTarea = {
        id: crypto.randomUUID(), // Método de identificador único para cada tarea
        texto: tareaLimpia,
        completada: false
      };
      setTareas([...tareas, nuevaTarea]);
    }

  };
  //Función para  tareas completadas y actualizar el estado de tareas.
  const completarTarea = (id) => {
    const nuevasTareas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return { ...tarea, completada: true };
      }
      return tarea;
    });
    setTareas(nuevasTareas);
  };
  const recuperarTarea = (id) => {
    const nuevasTareas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return { ...tarea, completada: false };
      }
      return tarea;
    });
    setTareas(nuevasTareas);
  };

  //Constantes para calcular que tareas pertenece a cada grupo.
  const tareasPendientes = tareas.filter((tarea) => !tarea.completada);
  const tareasFinalizadas = tareas.filter((tarea) => tarea.completada);


  return (

    <div className="flex flex-col min-h-screen bg-black-100">
      {/*para poder cambiar la sección actual al hacer click en los botones del header*/}
      <Header secciones={secciones} seccionActual={seccionActual} setSeccionActual={setSeccionActual} />
      <main className="flex-1">
        {/*Renderizado condicional para mostrar la sección correspondiente al hacer click en los botones del header*/}
        <section className="mt-5">
          {seccionActual === "inicio" && (<Article addTareas={addTareas} />)}
        </section>

        {/*Renderizado condicional para mostrar la sección correspondiente al hacer click en los botones del header*/}
        <section className="text-white text-center">
          {seccionActual === "pendientes" && (
            <>
              <h2 >Tareas pendientes</h2>
              <p >Total: {tareasPendientes.length}</p>
              {tareasPendientes.length === 0 ? (
                <p>Todavía no hay tareas pendientes. Añade una desde Inicio</p>
              ) : (
                <ul>
                  {tareasPendientes.map((tarea, index) => (
                    <li key={tarea.id}>
                      {index + 1}. {tarea.texto}
                      <button type="button"
                        className="ml-4 bg-red-500 px-4 py-2 text-white"
                        onClick={() => completarTarea(tarea.id)}>
                        Completar
                      </button>
                    </li>
                  ))}
                </ul>

              )}
            </>
          )}
        </section>
        <section className="text-white text-center">
          {seccionActual === "finalizadas" && (
            <>
              <h2>Tareas finalizadas</h2>
              <p>Total: {tareasFinalizadas.length}</p>
              {tareasFinalizadas.length === 0 ? (
                <p>Aún no hay tareas finalizadas.</p>
              ) : (
                <ul>
                  {tareasFinalizadas.map((tarea, index) => (
                    <li key={tarea.id}>
                      {index + 1}. {tarea.texto}
                      <button type="button"
                        className="ml-4 bg-green-500 px-4 py-2 text-white"
                        onClick={() => recuperarTarea(tarea.id)}>
                        Recuperar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

        </section>

      </main>
      <Footer />
    </div>


  )
}


export default App;