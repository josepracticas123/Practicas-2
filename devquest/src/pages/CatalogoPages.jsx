import { useState } from "react";
import CatalogoForm from "../components/CatalogoForm";
import ListaProductos from "../components/ListaProductos";
import EditarProductosForm from "../components/EditarProductosForm";
import { Link } from "react-router";
function CatalogoPage() {

    //Estados 
    const [productos, setProductos] = useState([]); // inicia vacio
    const [estadoPeticion, setEstadoPeticion] = useState("inicial"); // sin cargar nada
    const [mensajeError, setMensajeError] = useState("");
    const [modoConsulta, setModoConsulta] = useState("todos");
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [estadoCategorias, setEstadoCategorias] = useState("inicial");
    const [, setMensajeErrorCategorias] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("")
    const [totalResultados, setTotalResultados] = useState(0);
    const [consultaAplicada, setConsultaAplicada] = useState(null)
    const [puedeReintentar, setPuedeReintentar] = useState(false);
    const [productoEdicion, setProductoEdicion] = useState(null);
    const [estadoEdicion, setEstadoEdicion] = useState("inicial");
    const [mensajeErrorEdicion, setMensajeErrorEdicion] = useState("");


    async function cargarProductos(consultaGuardada = null) {
        if (estadoPeticion === "cargando") {
            return;
        }

        setEstadoPeticion("cargando");
        setMensajeError("");
        setProductos([]);
        setPuedeReintentar(false);

        try {
            let url = "https://dummyjson.com/products?limit=12";

            if (consultaGuardada) {
                url = consultaGuardada.url;
            } else {
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
            }
            let descripcionConsulta = "Todos los productos";
            let tipoConsulta = "todos";
            let valorConsulta = "";

            if (consultaGuardada) {
                descripcionConsulta = consultaGuardada.descripcion;
                tipoConsulta = consultaGuardada.tipo;
                valorConsulta = consultaGuardada.valor;
            } else {
                if (modoConsulta === "texto") {
                    descripcionConsulta = `Busqueda: "${textoBusqueda.trim()}"`;
                    tipoConsulta = "texto";
                    valorConsulta = textoBusqueda.trim();
                }

                if (modoConsulta === "categoria") {
                    descripcionConsulta = `Categoria: "${categoriaSeleccionada}"`;
                    tipoConsulta = "categoria";
                    valorConsulta = categoriaSeleccionada;
                }
            }

            setConsultaAplicada({
                url,
                descripcion: descripcionConsulta,
                tipo: tipoConsulta,
                valor: valorConsulta,
            });

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
            setTotalResultados(datos.total);
            setEstadoPeticion("exito");

        } catch (error) {
            console.error(error);
            setMensajeError(
                "No se pudo cargar el catálogo. Comprueba tu conexión y vuelve a intentarlo."
            );
            setEstadoPeticion("error");
            setPuedeReintentar(true);
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

    async function editarProducto(id) {
        if (estadoEdicion === "cargando") {
            return;
        }
        setEstadoEdicion("cargando"); // cargando el producto
        setMensajeErrorEdicion(""); // limpia cualquier error
        setProductoEdicion(null);// Quitamos el producto que pudiera estar seleccionado anteriormente


        try {
            const respuesta = await fetch(
                `https://dummyjson.com/products/${id}`
            );

            if (!respuesta.ok) {
                throw new Error("No se pudo obtener el producto");
            }
            const producto = await respuesta.json();

            setProductoEdicion(producto);
            setEstadoEdicion("exito");





        } catch (error) {
            console.error(error);
            setMensajeErrorEdicion(
                "Nose pudo cargar el producto para editar."
            );
            setEstadoEdicion("error");

        }

    }

    function guardarProductoEditado(productoActualizado) {
        setProductos((productosActuales) =>
            productosActuales.map((producto) =>
                producto.id === productoActualizado.id
                    ? productoActualizado
                    : producto
            )
        );

        setProductoEdicion(null);
        setEstadoEdicion("inicial");
    }
    function cancelarEdicion() {
        setProductoEdicion(null);
        setEstadoEdicion("inicial");
        setMensajeErrorEdicion("");
    }


    function mostrarTodos() {
        const consultaGeneral = {
            url: "https://dummyjson.com/products?limit=12",
            descripcion: "Todos los productos",
            tipo: "todos",
            valor: "",
        };
        setTextoBusqueda("");
        setCategoriaSeleccionada(""),
            setModoConsulta("todos");

        cargarProductos(consultaGeneral);
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
                <div className="mb-6 flex flex-wrap gap-3">

                    <Link
                        to="/crear-producto"
                        className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-gray-900 transition hover:bg-amber-400"
                    >
                        Crear producto
                    </Link>

                </div>
                <p className="mb-4 rounded-lg bg-red-900/20 p-3 text-sm text-amber-200">
                    Modo de prácticas: los cambios no se guardaran en el servidor
                </p>
                <CatalogoForm
                    modoConsulta={modoConsulta}
                    setModoConsulta={setModoConsulta}
                    textoBusqueda={textoBusqueda}
                    setTextoBusqueda={setTextoBusqueda}
                    categoriaSeleccionada={categoriaSeleccionada}
                    setCategoriaSeleccionada={setCategoriaSeleccionada}
                    categorias={categorias}
                    estadoCategorias={estadoCategorias}
                    cargarCategorias={cargarCategorias}
                    mostrarTodos={mostrarTodos}
                    onSubmit={(evento) => {
                        evento.preventDefault();

                        // Comprobamos que el texto no esté vacío.
                        if (modoConsulta === "texto") {
                            const textoLimpio = textoBusqueda.trim();

                            if (textoLimpio === "") {
                                setMensajeError("Escribe un texto para buscar.");
                                setEstadoPeticion("error");
                                setPuedeReintentar(false);
                                return;
                            }
                        }

                        // Comprobamos que haya una categoría seleccionada.
                        if (
                            modoConsulta === "categoria" &&
                            categoriaSeleccionada === ""
                        ) {
                            setMensajeError(
                                "Selecciona una categoría para continuar."
                            );
                            setEstadoPeticion("error");
                            return;
                        }

                        // Si todo está correcto, hacemos la consulta.
                        cargarProductos();
                    }}
                    estadoPeticion={estadoPeticion}
                />

                {estadoEdicion === "cargando" && (
                    <p className="mt-4"> Cargando producto para editar...</p>
                )}
                {estadoEdicion === "error" && (
                    <p className="mt-4 text-red-400">
                        {mensajeErrorEdicion}
                    </p>
                )}
                {estadoEdicion === "exito" && productoEdicion && (
                    <EditarProductosForm
                        producto={productoEdicion}
                        onGuardado={guardarProductoEditado}
                        onCancelar={cancelarEdicion}
                    />
                )}

                {estadoPeticion === "error" && (
                    <div className="mt-4 rounded-lg border border-red-400 bg-red-900/40 p-4">
                        <p className="mb-3">
                            {mensajeError}
                        </p>

                        {puedeReintentar && (
                            <button
                                type="button"
                                onClick={() => cargarProductos(consultaAplicada)}
                                className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-gray-900 transition hover:bg-amber-400"
                            >
                                Reintentar
                            </button>
                        )}


                    </div>
                )}
                {estadoPeticion === "exito" && (
                    <ListaProductos
                        consultaAplicada={consultaAplicada}
                        productos={productos}
                        totalResultados={totalResultados}
                        onEditar={editarProducto}
                    />
                )}
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