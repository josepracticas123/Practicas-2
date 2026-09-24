import Productocard from "../components/ProductoCard";
import { useState } from "react";
function CatalogoPage() {

    //Estados 
    const [productos, setProductos] = useState([]); // inicia vacio
    const [estadoPeticion, setEstadoPeticion] = useState("inicial"); // sin cargar nada
    const [mensajeError, setMensajeError] = useState("");
    const [modoConsulta, setModoConsulta] = useState("todos");
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [estadoCategorias, setEstadoCategorias] = useState("inicial");
    const [mensajeErrorCategorias, setMensajeErrorCategorias] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")
    const [totalResultados, setTotalresultados] = useState(0);

    async function cargarProductos() {
        if (estadoPeticion === "cargando") {
            return;
        }

        setEstadoPeticion("cargando");
        setMensajeError("");
        setProductos([]);

        try {
            let url = "https://dummyjson.com/products?limit=12";

            if (modoConsulta === "texto") {
                const parametros = new URLSearchParams({
                    q: textoBusqueda.trim(),
                    limit: "12",
                });
                url = `https://dummyjson.com/products/search?${parametros}`;
            }
            if (modoConsulta === "categoria") {
                url = `https://dummyjson.com/products/category/${encodeURIComponent(categoriaSeleccionada)}?limit=12`;
            }
            const respuesta = await fetch(url)


            if (!respuesta.ok) { // Comprobamos si la respuesta Http fue correcta si no
                throw new Error("No se pudo obtener el catálogo.");// Preparamos el error al catch.

            }
            const datos = await respuesta.json();
            // Lee el cuerpo JSON y lo interpreta como datos JavaScript

            if (!Array.isArray(datos.products)) {
                // Comprobamos que products sea realmente una lista de productos
                throw new Error("La respuesta no contiene una lista de productos.");
            }
            setProductos(datos.products); //Aquí react nos guarda los datos recibidos en nuestro estado
            setTotalresultados(datos.total);
            setEstadoPeticion("exito");

        } catch (error) {
            console.error(error);
            setMensajeError(
                "No se pudo cargar el catálogo. Comprueba tu conexión y vuelve a intentarlo."
            );
            setEstadoPeticion("error");
        }

    }
    // Función asincrona para la petición 
    async function cargarCategorias() {

        //¿Están cargadas las categorías?
        if (estadoCategorias === "cargando") {
            return;
        }
        setEstadoCategorias("cargando");
        setMensajeErrorCategorias("");

        try {
            //Realizamos la petición. Con await esperamos la respuesta de la API
            const respuesta = await fetch(
                "https://dummyjson.com/products/category-list"
            );

            if (!respuesta.ok) { // Si el servidor devuelve un error lanzamos ese error al catch.
                throw new Error(" No se pudieron obtener las categorias")
            }
            // Convertimos la respuesta JSON a un valor de JavaScript.
            const datos = await respuesta.json();

            // Verificamos que lo que hemos recibido sea un array.
            if (!Array.isArray(datos)) {
                throw new Error("La respuesta no contiene una lista de categorias");
            }

            // Guardamos las categorías recibidas en su propio estado.
            setCategorias(datos);
            // Indicamos que la carga terminó correctamente.
            setEstadoCategorias("exito");


        } catch (error) {
            console.error(error);
            setMensajeErrorCategorias(
                "No se pudieron cargar las categorías. Comprueba tu conexión y vuelve a intentarlo."

            );
            setEstadoCategorias("error");

        }


    }

    return (
        <section className="px-6 py-10 text-white">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-4 text-4xl font-bold">
                    Catálogo de productos
                </h1>

                <p className="mb-6 text-lg text-gray-300">
                    Consulta productos obtenidos desde una API.
                </p>
                <form
                    onSubmit={(evento) => {
                        evento.preventDefault();
                        if (modoConsulta === "texto") {
                            const textoLimpio = textoBusqueda.trim();

                            if (textoLimpio === "") {
                                setMensajeError("Escribe un texto para buscar.")
                                setEstadoPeticion("error")
                                return;
                            }
                        }

                        if (modoConsulta === "categoria" && categoriaSeleccionada === "") {
                            setMensajeError("Selecciona una categoría para continuar.");
                            setEstadoPeticion("error");
                            return;
                        }
                        cargarProductos();
                    }}
                    className="mb-6"
                >
                    <label htmlFor="modo-consulta" className="mb-2 block">
                        Modo de consulta
                    </label>

                    <select
                        id="modo-consulta"
                        value={modoConsulta}
                        onChange={(evento) => setModoConsulta(evento.target.value)}
                        className="mr-3 rounded-lg bg-white px-3 py-2 text-gray-900"
                    >
                        <option value="todos">Todos</option>
                        <option value="texto">Texto</option>
                        <option value="categoria">Categoría</option>
                    </select>
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
                                onChange={(evento) => setTextoBusqueda(evento.target.value)}
                                placeholder="Ejemplo: phone"
                                className="w-full rounded-lg bg-white px-3 py-2 text-gray-900"
                            />
                        </div>
                    )}
                    <div className="mt-4 flex flex-col items-start gap-3">
                        {modoConsulta === "categoria" && (
                            <button
                                type="button"
                                onClick={cargarCategorias}
                                disabled={estadoPeticion === "cargando" || estadoCategorias === "cargando"}
                                className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-gray-900"
                            >
                                Cargar categorías
                            </button>
                        )}
                        {modoConsulta === "categoria" && estadoCategorias === "exito" && (
                            <select
                                id="categoria"
                                value={categoriaSeleccionada}
                                onChange={(evento) => setCategoriaSeleccionada(evento.target.value)}
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

                        <button
                            type="submit"
                            disabled={estadoPeticion === "cargando" || estadoCategorias === "cargando"}
                            className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-gray-900"
                        >
                            Consultar
                        </button>
                    </div>




                    {
                        estadoPeticion === "error" && (
                            <div className="mt-4 rounded-lg border border-red-400 bg-red-900/40 p-4">
                                <p className="mb-3">
                                    {mensajeError}
                                </p>
                                <button
                                    type="button"
                                    onClick={cargarProductos}
                                    className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-gray-900 transition hover:bg-amber-400"
                                >
                                    Reintentar
                                </button>
                            </div>
                        )
                    }
                </form>
                {
                    estadoPeticion === "exito" && (
                        <>
                            <p className="mt-4 mb-6">
                                Recibidos: {productos.length} de {totalResultados} resultados del servidor
                            </p>

                            {productos.length === 0 ? (
                                <p className="rounded-lg bg-gray-700 p-4">
                                    No se encontraron productos para esta consulta.
                                </p>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {productos.map((producto) => (
                                        <Productocard
                                            key={producto.id}
                                            producto={producto}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )
                }
                {
                    estadoPeticion === "inicial" && (
                        <p>
                            {modoConsulta === "categoria"
                                ? "Pulsa «Cargar categorías» para elegir una categoría."
                                : "Pulsa «Consultar» para cargar los productos."}
                        </p>
                    )
                }
            </div >
        </section >
    );
}

export default CatalogoPage;