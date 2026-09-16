function Finalizadas({
    tareasFinalizadas,
    tareasFinalizadasFiltradas,
    busqueda,
    setBusqueda,
    recuperarTarea
}) {
    return (
        <section className="text-white text-center mt-5">
            <h2>Tareas finalizadas</h2><br/>

            <div className="mb-4 flex items-center justify-center gap-3">
                <label
                    htmlFor="buscar-finalizadas"
                    className="font-semibold text-white"
                >
                    Buscar tareas finalizadas
                </label>

                <input
                    id="buscar-finalizadas"
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar tareas"
                    className="w-64 rounded-md border border-white bg-white px-3 py-1.5 text-sm text-black outline-none focus:ring-2 focus:ring-gray-400"
                />
            </div>

            <p>Total: {tareasFinalizadas.length}</p><br/>

            {tareasFinalizadas.length === 0 ? (
                <p>Aún no hay tareas finalizadas.</p>
            ) : (
                <ul className="space-y-3">
                    {tareasFinalizadasFiltradas.map((tarea, index) => (
                        <li
                            key={tarea.id}
                            className="flex items-center justify-center"
                        >
                            <span className="w-72">
                                {index + 1}. {tarea.texto}
                            </span>

                            <button
                                type="button"
                                className="ml-4 bg-green-500 px-4 py-2 text-white"
                                onClick={() => recuperarTarea(tarea.id)}
                            >
                                Recuperar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default Finalizadas;