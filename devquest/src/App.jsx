
import Header from './components/Header'
import Article from './components/Article'
import Footer from './components/Footer'
import { useState } from "react";

function App() {
  //Array de secciones con id y nombre para poder renderizar los botones del header y cambiar la sección actual al hacer click en ellos
  const [secciones, setSecciones] = useState([{ id: "inicio", nombre: "Inicio" }, { id: "pendientes", nombre: "Pendientes" }, { id: "finalizadas", nombre: "Finalizadas" }]);
  //Variable de estado para almacenar la sección actual y poder renderizar la sección correspondiente al hacer click en los botones del header
  const [seccionActual, setSeccionActual] = useState("inicio");
  //Array para para el esatdo de tareas
  const[tareas, setTareas] = useState([]);
  //Función para añadir tareas al array de tareas
  const addTareas = (tarea) => {
    if (tarea.trim() !== "") {
      setTareas([...tareas, tarea]);
    }
  };


  return (


    <div className="flex flex-col min-h-screen bg-black-100">
      <main className="flex-1"> 
         para poder cambiar la sección actual al hacer click en los botones del header*/
        <Header secciones={secciones} seccionActual={seccionActual} setSeccionActual={setSeccionActual}  />
        <section>
          <p className="text-center my-5 bg-white text-black p-4 rounded-lg shadow-md">
            0 de 1 completados
          </p>
        </section>

        <section > 
          {seccionActual === "inicio" && (<Article  addTareas={addTareas}/>)}
        </section>

        <section>
          {seccionActual === "pendientes" && (
            tareas.map((tarea, index) => (
              <p key={index}  className="text-center bg-white text-black p-4 rounded-lg shadow-md">
                {index + 1}. {tarea}
              </p>
            ))
          )}
        </section>

      </main>
      <Footer />
    </div>
  

  )
}


export default App;