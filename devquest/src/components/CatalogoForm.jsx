function CatalogoForm({
    modoConsulta,
    setModoConsulta,
    textoBusqueda,
    setTextoBusqueda,
    categoriaSeleccionada,
    setCategoriaSeleccionada,
    categorias,
    estadoCategorias,
    cargarCategorias,
    onSubmit,
    estadoPeticion,
}) {
    return (
        <form onSubmit={onSubmit} className="mb-6">
            {/* Selector del modo de consulta */}
            <label htmlFor="modo-consulta" className="mb-2 block">
                Modo de consulta
            </label>

            <select
                id="modo-consulta"
                value={modoConsulta}
                onChange={(evento) => setModoConsulta(evento.target.value)}
                disabled={estadoPeticion === "cargando"}
                className="mr-3 rounded-lg bg-white px-3 py-2 text-gray-900"
            >
                <option value="todos">Todos</option>
                <option value="texto">Texto</option>
                <option value="categoria">Categoría</option>
            </select>

            {/* Campo de búsqueda por texto */}
            {modoConsulta === "texto" && (
                <div className="mt-4">
                    <label
                        htmlFor="texto-busqueda"
                        className="mb-2 block"
                    >
                        Buscar producto
                    </label>

                    <input
                        id="texto-busqueda"
                        type="text"
                        value={textoBusqueda}
                        onChange={(evento) =>
                            setTextoBusqueda(evento.target.value)
                        }
                        placeholder="Ejemplo: phone"
                        disabled={estadoPeticion === "cargando"}
                        className="w-full rounded-lg bg-white px-3 py-2 text-gray-900"
                    />
                </div>
            )}

            <div className="mt-4 flex flex-col items-start gap-3">
                {/* Botón para cargar categorías */}
                {modoConsulta === "categoria" && (
                    <button
                        type="button"
                        onClick={cargarCategorias}
                        disabled={
                            estadoPeticion === "cargando" ||
                            estadoCategorias === "cargando"
                        }
                        className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-gray-900"
                    >
                        Cargar categorías
                    </button>
                )}

                {/* Mensaje mientras cargamos categorías */}
                {modoConsulta === "categoria" &&
                    estadoCategorias === "cargando" && (
                        <p className="mb-4 text-gray-300">
                            Cargando categorías...
                        </p>
                    )}

                {/* Selector de categorías */}
                {modoConsulta === "categoria" &&
                    estadoCategorias === "exito" && (
                        <select
                            id="categoria"
                            value={categoriaSeleccionada}
                            onChange={(evento) =>
                                setCategoriaSeleccionada(evento.target.value)
                            }
                            disabled={estadoPeticion === "cargando"}
                            className="rounded-lg bg-white px-3 py-2 text-gray-900"
                        >
                            <option value="" disabled>
                                Selecciona una categoría
                            </option>

                            {categorias.map((categoria) => (
                                <option key={categoria} value={categoria}>
                                    {categoria}
                                </option>
                            ))}
                        </select>
                    )}

                {/* Botón principal */}
                <button
                    type="submit"
                    disabled={
                        estadoPeticion === "cargando" ||
                        estadoCategorias === "cargando"
                    }
                    className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-gray-900"
                >
                    Consultar
                </button>
            </div>
        </form>
    );
}

export default CatalogoForm;