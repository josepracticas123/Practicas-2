// Pendientes es hijo de TareasPage y recibe por props los datos calculados para
// mostrar y las funciones que pertenecen al padre para modificar tareas.
function Pendientes({
    tareasPendientes,
    tareasPendientesFiltradas,
    busqueda,
    setBusqueda,
    completarTarea,
    eliminarTarea
}) {
    return (
        <section className="mt-5 px-4 text-center text-white"> {/* Tailwind adapta espacio y color. */}
            <h2>Tareas pendientes</h2><br />

            <div className="mx-auto mb-4 flex w-full max-w-2xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <label
                    htmlFor="buscar-pendientes"
                    className="font-semibold text-white sm:shrink-0"
                >
                    Buscar tareas
                </label>

                {/* busqueda es el texto que vive en TareasPage. Al escribir,
                    setBusqueda modifica ese estado; no modifica tareas. */}
                <input
                    id="buscar-pendientes"
                    type="text"
                    tabIndex={0}
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)} // Recalcula la lista visible en el padre.
                    placeholder="Buscar tareas"
                    className="w-full min-w-0 rounded-md border border-white bg-white px-3 py-1.5 text-sm text-black outline-none focus:ring-2 focus:ring-gray-400 sm:w-64"
                />
                <button
                    type="button"
                    // Al poner busqueda en "", el filtro deja de ocultar tareas
                    // y vuelven a mostrarse las tareas originales de esta sección.
                    onClick={() => setBusqueda("")}
                    className="w-full rounded-lg px-3 py-1.5 text-white bg-gray-500 sm:w-auto"
                >
                    Limpiar búsqueda
                </button>
            </div>

            <p>Total: {tareasPendientes.length}</p><br />

            {tareasPendientes.length === 0 ? (
                <p>
                    Todavía no hay tareas pendientes. Añade una desde Inicio
                </p>
            ) : (
                <>
                    {/* tareasPendientesFiltradas solo es el resultado visible de
                        aplicar busqueda a tareasPendientes. La lista original
                        nunca se ha perdido ni se ha sustituido. */}
                    {tareasPendientesFiltradas.length === 0 ? (
                        <p>No se encontraron tareas pendientes que coincidan con la búsqueda.</p>
                    ) : (
                        <>

                            <p>Mostrando {tareasPendientesFiltradas.length} de{" "}
                                {tareasPendientes.length} tareas pendientes</p><br />

                            <ul className="mx-auto max-w-3xl space-y-3">
                                {tareasPendientesFiltradas.map((tarea, index) => ( // Dibuja cada tarea visible.
                                    <li key={tarea.id} className="mx-2 flex min-w-0 flex-col items-stretch gap-2 rounded-lg border border-gray-600 bg-gray-800 p-3 sm:mx-0 sm:flex-row sm:items-center sm:justify-center">
                                        <span className="w-full min-w-0 wrap-break-words sm:w-72">
                                            {index + 1}. {tarea.texto}
                                        </span>

                                        <button
                                            type="button"
                                            className="w-full rounded-lg bg-red-500 px-4 py-2 text-white sm:ml-4 sm:w-auto"
                                            // Pendientes es el hijo, pero llama al
                                            // callback del padre con el ID concreto.
                                            onClick={() => completarTarea(tarea.id)}
                                        >
                                            Completar
                                        </button>
                                        <button
                                            type="button"
                                            className="w-full rounded-lg bg-gray-500 px-4 py-2 text-white sm:ml-2 sm:w-auto"
                                            // Eliminar recibe el ID, no el texto,
                                            // para no confundir tareas repetidas.
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

export default Pendientes;