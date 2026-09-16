
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
      setTareas([...tareas, tareaLimpia]);
    }
  };


  return (

    <div className="flex flex-col min-h-screen bg-black-100">
       {/*para poder cambiar la sección actual al hacer click en los botones del header*/}
        <Header secciones={secciones} seccionActual={seccionActual} setSeccionActual={setSeccionActual} />
      <main className="flex-1">
        {/*Renderizado condicional para mostrar la sección correspondiente al hacer click en los botones del header*/}
        <section className ="mt-5">
          {seccionActual === "inicio" && (<Article addTareas={addTareas} />)}
        </section>

        {/*Renderizado condicional para mostrar la sección correspondiente al hacer click en los botones del header*/}
        <section className="text-white text-center">
          {seccionActual === "pendientes" && (
            <>
            <h2 >Tareas pendientes</h2>
            <p >Total: {tareas.length}</p>
            {tareas.length === 0 ? (
              <p>Todavía no hay tareas pendientes. Añade una desde Inicio</p>
            ) : (
              <ul>
                {tareas.map((tarea, index) => (
                  <li key={index}>
                    {index + 1}. {tarea}
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
              <p>La opción de tareas finalizadas aún no está implementada.</p>
            </>
          )}
        
        </section>

      </main>
      <Footer />
    </div>


  )
}


export default App;