
import Header from './components/Header'
import Article from './components/Article'
import Footer from './components/Footer'
import {useState} from "react";

function App() {
  const [secciones, setSecciones] = useState("inicio", "pendientes", "finalizadas");

  return (

    <div className="flex flex-col min-h-screen bg-black-100">
      <main className="flex-1">
        <Header setSecciones={setSecciones}/>
        <section>
          <p className="text-center my-5 bg-white text-black p-4 rounded-lg shadow-md">
            0 de 1 completados
          </p>
        </section>

        <section >
          <Article />
        </section>
        

      </main>
      <Footer/>
      </div>
      

      )
}

      export default App;