import Article from '../components/Article'; // Reutiliza el formulario de tareas.

// Inicio es una vista intermedia: recibe addTareas desde su padre TareasPage
// y se la pasa a Article, que es el hijo que contiene el formulario.
// Así el recorrido queda: Article ejecuta el callback -> TareasPage modifica
// el estado tareas -> React vuelve a renderizar las vistas con los nuevos datos.
function Inicio({ addTareas }) {
  return (
    <section className="mt-5">
      {/* Article recibe el mismo callback que TareasPage creó. */}
      <Article addTareas={addTareas} />
    </section>
  );
}

export default Inicio;