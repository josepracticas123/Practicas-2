function Pendientes({
    tareasPendientes,
    tareasPendientesFiltradas,
    busqueda,
    setBusqueda,
    completarTarea
}) {
    return (
        <section className="text-white text-center mt-5">
            <h2>Tareas pendientes</h2><br/>

            <div className="mb-4 flex items-center justify-center gap-3">
                <label
                    htmlFor="buscar-pendientes"
                    className="font-semibold text-white"
                >
                    Buscar tareas
                </label>

                <input
                    id="buscar-pendientes"
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar tareas"
                    className="w-64 rounded-md border border-white bg-white px-3 py-1.5 text-sm text-black outline-none focus:ring-2 focus:ring-gray-400"
                />
            </div>

            <p>Total: {tareasPendientes.length}</p><br/>

            {tareasPendientes.length === 0 ? (
                <p>
                    Todavía no hay tareas pendientes. Añade una desde Inicio
                </p>
            ) : (
                <ul className="space-y-3">
                    {tareasPendientesFiltradas.map((tarea, index) => (
                        <li key={tarea.id} className="flex items-center justify-center">
                            <span className="w-72">
                                {index + 1}. {tarea.texto}
                            </span>

                            <button
                                type="button"
                                className="ml-4 bg-red-500 px-4 py-2 text-white"
                                onClick={() => completarTarea(tarea.id)}
                            >
                                Completar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default Pendientes;