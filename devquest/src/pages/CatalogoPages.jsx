import Productocard from "../components/Productocard";
import { useState } from "react";
function CatalogoPage() {

    //Estados 
    const [productos, setProductos] = useState([]); // inicia vacio
    const [estadoPeticion, setEstadoPeticion] = useState("inicial"); // sin cargar nada
    const [mensajeError, setMensajeError] = useState("");

    async function cargarProductos() {
        if (estadoPeticion === "cargando") {
            return;
        }

        setEstadoPeticion("cargando");
        setMensajeError("");
        setProductos([]);

        try {
            const respuesta = await fetch( // Await  espera la respuesta, fetch hace la petición
                "https://dummyjson.com/products?limit=12"
            );

            if (!respuesta.ok) { // Comprobamos si la respuesta Http fue correcta si no
                throw new Error("No se pudo obtener el catálogo.");// Preparamos el error al catch.

            }
            const datos = await respuesta.json(); // Espera que la respuesta se convierta en JSON

            if (!Array.isArray(datos.products)) { // Comprobamos que realmente datos es una lista de productos
                throw new Error("La respuesta no contiene una lista de productos.");
            }
            setProductos(datos.products); //Aquí react nos guarda los datos recibidos en nuestro estado
            setEstadoPeticion("exito");

        } catch (error) {
            setMensajeError(error.message); // Guarda el mensaje que se le muestra al usuario
            setEstadoPeticion("error"); // Indica que la petición terminó en un error

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
                {/* El botón se desactiva mientras se cargan los datos y evita peticiones simultáneas */}
                <button
                    type="button"
                    onClick={cargarProductos}
                    disabled={estadoPeticion === "cargando"}
                    className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-gray-900 transition hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                    {estadoPeticion === "exito"
                        ? "Volver a cargar"
                        : "Cargar productos"}
                </button>
                {estadoPeticion === "cargando" && (
                    <p role="status" className="mt-4">
                        Cargando productos...
                    </p>
                )}
                {estadoPeticion === "error" && (
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
                )}



                {estadoPeticion === "exito" && (
                    <>
                        <p className="mt-4 mb-6">
                            Productos recibidos: {productos.length}
                        </p>

                        {productos.length === 0 ? (
                            <p className="rounded-lg bg-gray-700 p-4">
                                No hay productos disponibles.
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
                )}
                <p>
                    Pulsa cargar productos para consultar el catálogo
                </p>
            </div>
        </section>
    );
}

export default CatalogoPage;