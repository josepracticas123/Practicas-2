import Article from '../components/Article';

function Inicio({ addTareas }) {
  return (
    <section className="mt-5">
      <Article addTareas={addTareas} />
    </section>
  );
}

export default Inicio;