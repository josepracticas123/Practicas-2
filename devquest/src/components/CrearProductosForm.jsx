import { useState } from "react";
export default function CrearProductosForm() {

    //Estados del formulario:
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");

    const [estadoCreacion, setEstadoCreacion] = useState("inicial"); //Estado de operacion del post
    const [mensajeError, setMensajeError] = useState(""); // Guardaremos el mensaje si algo sale mal
    const [ultimaCreacion, setUltimaCreacion] = useState(null);// Guardaremos la respuesta de DummyJSON del POST

    async function crearProductos(evento) { // Funcion asincrona
        evento.preventDefault();

        if (estadoCreacion === "creando") { //No permite enviar 2 veces la peticion mientras la peticion esta en curso.
            return;
        }
        const tituloLimpio = titulo.trim();
        const descripcionLimpia = descripcion.trim();
        //Comprobamos que el título no esté vacío.
        if (tituloLimpio === "") {
            setMensajeError("El titulo no puede estar vacío.");
            setEstadoCreacion("error");
            return;
        }
        //Comprobamos que la descripción no esté vacía.
        if (descripcionLimpia === "") {
            setMensajeError("La descripción no puede estar vacía");
            setEstadoCreacion("error");
            return;
        }
        //Comprobamos que el precio no esté vacío
        if (precio.trim() === "") {
            setMensajeError("El precio no puede estar vacío.");
            setEstadoCreacion("error");
            return;

        }
        // Convertimos el precio de string a número para enviarlo a la API como número.
        const precioNumero = Number(precio); // Convertimos el precio en número, para mostrarlo en el objeto correctamente

        //Comprobamos que sea un número válido y que sea mayor que 0
        if (!Number.isFinite(precioNumero) || precioNumero <= 0) {    //!Number.isFinite = con esto rechazamos números que no sean válidos.
            setMensajeError(
                "El precio debe ser un número finito mayor que cero."
            );
            setEstadoCreacion("error");
            return;
        }

        //Objeto para el POST
        const productoNuevo = {
            title: tituloLimpio,
            description: descripcionLimpia,
            price: precioNumero,
        };

        //Indicamos si l apeticion est aen curso
        setEstadoCreacion("creando");
        //Limpiamos cualquier mensaje de error anterior
        setMensajeError("");

        // Enviamos el nuevo producto al servidor mediante una petición POST y guardamos su respuesta.
        try {
            const respuesta = await fetch("https://dummyjson.com/products/add", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(productoNuevo),
            });
            //Comprobamos que el servidor respondió correctamente a la respuesta HTTP
            if (!respuesta.ok) {
                throw new Error("No se pudo crear el producto");
            }
            //Convertimos la respuesta del servidor a un objeto JavasScript.
            const productoCreado = await respuesta.json();
            // Guardamos el producto creado para mostrarlo en pantalla, lanzandolo a la variable de los estados.
            setUltimaCreacion(productoCreado);
            setEstadoCreacion("exito"); // Indica la peticion exitosa

            //Limpiamos el formulario despues de crear el producto correctamente
            setTitulo("");
            setDescripcion("");
            setPrecio("");
        } catch (error) {
            //Guardamos el mensaje de error que le mostraremos al usuario.
            setMensajeError(error.message); // Recoge el error del try y lo guardamos en mensajeError, contiene el mensaje del error.
            setEstadoCreacion("error");
        }






    }

    return (
        <section className="mx-auto mt-4 w-[calc(100%-2rem)] max-w-2xl rounded-xl bg-gray-800 p-4 text-white shadow-lg sm:mt-8 sm:p-6">
            <h2 className="mb-6 text-2xl font-bold">
                Crear producto
            </h2>

            {/* Conectamos el formulario con nuestra función de crearProductos */}
            <form onSubmit={crearProductos} className="space-y-5">

                <div>
                    {/* Creamos el título */}
                    <label
                        htmlFor="titulo"
                        className="mb-2 block font-semibold text-white"
                    >
                        Título
                    </label>

                    <input
                        id="titulo"
                        type="text"
                        value={titulo}
                        onChange={(evento) => setTitulo(evento.target.value)}
                        className="box-border w-full min-w-0 rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-amber-500"
                    />
                </div>

                <div>
                    {/* Creamos Descripción */}
                    <label
                        htmlFor="descripcion"
                         className="mb-2 block font-semibold text-white"
                    >
                        Descripción
                    </label>

                    <input
                        id="descripcion"
                        type="text"
                        value={descripcion}
                        onChange={(evento) => setDescripcion(evento.target.value)}
                        className="box-border w-full min-w-0 rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-amber-500"
                    />
                </div>

                <div>
                    {/* Creamos el Precio */}
                    <label
                        htmlFor="precio"
                         className="mb-2 block font-semibold text-white"
                    >
                        Precio
                    </label>

                    <input
                        id="precio"
                        type="number"
                        value={precio}
                        onChange={(evento) => setPrecio(evento.target.value)}
                        className="box-border w-full min-w-0 rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-amber-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={estadoCreacion === "creando"}
                    className="w-full rounded-lg bg-amber-500 px-5 py-2.5 font-semibold text-gray-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                    {estadoCreacion === "creando"
                        ? "Creando..."
                        : "Crear producto"}
                </button>

            </form>

            {/* Mostraremos mensajes de error */}
            {mensajeError && (
                <p
                    role="alert"
                    className="mt-4 wrap-break-word rounded-lg bg-red-100 p-3 text-red-700"
                >
                    {mensajeError}
                </p>
            )}

            {/* Esta sección solo la mostraremos cuando el POST se haya terminado correctamente y tengamos una respuesta guardada */}
            {estadoCreacion === "exito" && ultimaCreacion && (
                <div className="mt-6 min-w-0 wrap-break-word rounded-lg bg-gray-700 p-4 text-white">
                    <h3 className="mb-4 text-xl font-bold">
                        Última creación simulada
                    </h3>

                    <p className="mb-2">
                        <strong>ID:</strong> {ultimaCreacion.id}
                    </p>

                    <p className="mb-2">
                        <strong>Título:</strong> {ultimaCreacion.title}
                    </p>

                    <p className="mb-2">
                        <strong>Descripción:</strong> {ultimaCreacion.description}
                    </p>

                    <p>
                        <strong>Precio:</strong> {ultimaCreacion.price} €
                    </p>
                </div>
            )}
        </section>
    )
}
