import { StrictMode } from 'react' // Ayuda a detectar problemas durante el desarrollo.
import { createRoot } from 'react-dom/client' // Crea el punto donde React dibuja la app.
import './index.css' // Carga los estilos generales y Tailwind.
import App from './App.jsx' // Importa el componente principal.
import {BrowserRouter} from 'react-router'

// Busca el elemento root y muestra App dentro de React.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
