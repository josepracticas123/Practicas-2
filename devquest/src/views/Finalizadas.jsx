// Finalizadas es hijo de TareasPage. Recibe por props la lista real de
// finalizadas, el resultado visible de la búsqueda y callbacks del padre.
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

                {/* busqueda controla únicamente el texto del filtro en el padre.
                    Escribir aquí no cambia la lista principal tareas. */}
                <input
                    id="buscar-finalizadas"
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)} // Recalcula la lista visible.
                    placeholder="Buscar tareas"
                    className="w-full min-w-0 rounded-md border border-white bg-white px-3 py-1.5 text-sm text-black outline-none focus:ring-2 focus:ring-gray-400 sm:w-64"
                />
                <button
                    type="button"
                    // Al limpiar busqueda, el filtro queda vacío y vuelven a
                    // mostrarse todas las finalizadas que existen en el estado.
                    onClick={() => setBusqueda("")}
                    className="w-full rounded-lg px-3 py-1.5 text-white bg-gray-500 sm:w-auto"
                >
                    Limpiar búsqueda
                </button>


            </div>
             {/* Esta es la lista de tareas que se muestra en pantalla. La lista
                 filtrada no se guarda como si fuera la lista principal. */}
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
                                        className="mx-2 flex min-w-0 flex-col items-stretch gap-2 rounded-lg border border-gray-600 bg-gray-800 p-3 sm:mx-0 sm:flex-row sm:items-center sm:justify-center"
                                    >
                                        <span className="w-full min-w-0 wrap-break-words sm:w-72">
                                            {index + 1}. {tarea.texto}
                                        </span>

                                        <button
                                            type="button"
                                            className="w-full rounded-lg bg-green-500 px-4 py-2 text-white sm:ml-4 sm:w-auto"
                                            // El hijo avisa al padre con el ID; el
                                            // padre cambia completada a false.
                                            onClick={() => recuperarTarea(tarea.id)}
                                        >
                                            Recuperar
                                        </button>
                                        <button
                                            type="button"
                                            className="w-full rounded-lg bg-gray-500 px-4 py-2 text-white sm:ml-2 sm:w-auto"
                                            // El ID identifica esta tarea aunque
                                            // su texto sea igual al de otra.
                                            onClick={() => eliminarTarea(tarea.id)}
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