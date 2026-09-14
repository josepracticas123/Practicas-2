function Article() {
  return (
        <article className="mx-auto flex w-full max-w-xs flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">

          <span>01</span>
          <h2>Mi panel</h2>
          <p>Construye tu primer panel con React y JSX.</p>
          <span>Interfaz</span>
          <span>Pendiente</span>

          <button type="button" disabled>
            Abrir reto
          </button>
        </article>
  )
}

export default Article