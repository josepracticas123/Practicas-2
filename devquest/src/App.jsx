import Header from './components/Header' // Importa la cabecera y su navegación.
import Footer from './components/Footer' // Importa el pie de página.
import TareasPage from './pages/TareasPage'


// App coordina el estado y las vistas principales.
function App() {
  // JSX describe la estructura que se mostrará en pantalla.
  return (

    <div className="flex flex-col min-h-screen bg-black-100">
     <Header/>

     <main className="flex-1">
      <TareasPage/>
     </main>
     <Footer/>

    </div>
    
  );
}

export default App;