
import Header from './components/Header'
import Article from './components/Article'

function App() {
  return (
    <main>
     <Header />
      <section>
        <p className="text-center my-10">
          0 de 1 completados
        </p>      </section>

      <section >
        <Article/>
      </section>
    </main>
  )
}

export default App