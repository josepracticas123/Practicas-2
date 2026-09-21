import Header from './components/Header' // Importa la cabecera y su navegación.
import Footer from './components/Footer' // Importa el pie de página.
import TareasPage from './pages/TareasPage' // Importa el contenido ahora.
import { Routes, Route, Link } from 'react-router';
import PortalPage from './pages/PortalPage'
import QuizPage from './pages/QuizPage';

// App organiza las rutas y la estructura común de la aplicación.
function App() {
  // JSX describe la estructura que se mostrará en pantalla.
  return (

    <div className="flex flex-col min-h-screen bg-black-100">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<PortalPage/>} />
          <Route path="/tareas" element={<TareasPage/>} />
          <Route path="/quiz" element={<QuizPage/>}/>
          <Route
            path="*"
            element={
              <div className="h-[60vh] bg-black text-white flex flex-col items-center justify-center text-2xl">
                Página no encontrada.
                <Link to="/" className="mt-4 rounded-lg border border-gray-400 bg-gray-300 px-4 py-2 text-base font-medium text-gray-900 shadow-sm transition hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"> Volver al portal</Link>
              </div>
            }
          />

        </Routes>

      </main>
      <Footer />

    </div>

  );
}

export default App;