import Article from '../components/Article'; // Reutiliza el formulario de tareas.

// Inicio recibe addTareas y lo pasa al formulario como prop.
function Inicio({ addTareas }) {
  return (
    <section className="mt-5">
      <Article addTareas={addTareas} />
    </section>
  );
}

export default Inicio;