// Finalizadas recibe los datos y acciones que necesita mediante props.
function Finalizadas({
    tareasFinalizadas,
    tareasFinalizadasFiltradas,
    busqueda,
    setBusqueda,
    recuperarTarea,
    eliminarTarea
}) {
    return (
        <section className="mt-5 px-4 text-center text-white"> {/* Tailwind adapta espacio y color. */}
            <h2>Tareas finalizadas</h2><br />

            <div className="mx-auto mb-4 flex w-full max-w-2xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <label
                    htmlFor="buscar-finalizadas"
                    className="font-semibold text-white sm:shrink-0"
                >
                    Buscar tareas
                </label>

                <input
                    id="buscar-finalizadas"
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)} // Actualiza la búsqueda al escribir.
                    placeholder="Buscar tareas"
                    className="w-full min-w-0 rounded-md border border-white bg-white px-3 py-1.5 text-sm text-black outline-none focus:ring-2 focus:ring-gray-400 sm:w-64"
                />
                <button
                    type="button"
                    onClick={() => setBusqueda("")} // Limpia el filtro.
                    className="w-full rounded-lg px-3 py-1.5 text-white bg-gray-500 sm:w-auto"
                >
                    Limpiar búsqueda
                </button>


            </div>

            <p>Total: {tareasFinalizadas.length}</p><br />

            {tareasFinalizadas.length === 0 ? (
                <p>Aún no hay tareas finalizadas.</p>
            ) : (
                <>
                    {tareasFinalizadasFiltradas.length === 0 ? (
                        <p>
                            «No hay resultados para esta búsqueda»
                        </p>
                    ) : (
                        <>
                            <p>
                                Mostrando {tareasFinalizadasFiltradas.length} de{" "}
                                {tareasFinalizadas.length} tareas finalizadas
                            </p>

                            <br />

                            <ul className="mx-auto max-w-3xl space-y-3">
                                {tareasFinalizadasFiltradas.map((tarea, index) => ( // Dibuja cada tarea visible.
                                    <li
                                        key={tarea.id}
                                        className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center"
                                    >
                                        <span className="w-full min-w-0 wrap-break-words sm:w-72">
                                            {index + 1}. {tarea.texto}
                                        </span>

                                        <button
                                            type="button"
                                            className="w-full rounded-lg bg-green-500 px-4 py-2 text-white sm:ml-4 sm:w-auto"
                                            onClick={() => recuperarTarea(tarea.id)} // Devuelve la tarea a pendientes.
                                        >
                                            Recuperar
                                        </button>
                                        <button
                                            type="button"
                                            className="w-full rounded-lg bg-gray-500 px-4 py-2 text-white sm:ml-2 sm:w-auto"
                                            onClick={() => eliminarTarea(tarea.id)} // Elimina por id.
                                        >
                                            Eliminar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </>
            )}
        </section>
    );
}

export default Finalizadas;