import { useState } from "react"

function EditarProductosForm() {

    const [idProducto, setIdProducto] = useState(""); // Guardará el ID del producto que queremos editar.
    const [titulo, setTitulo] = useState(""); // Para el título que queremso ponerle.
    const [descripcion, setDescripcion] = useState(""); // Será al nueva descripción.
    const [precio, setPrecio] = useState("");

    const [estadoEdicion, setEstadoEdicion] = useState("inicial");// Para utilizar los diferentes estados y valores
    const [mensajeError, setMensajeError] = useState(""); // Guardaremos el mensaje del texto de error que queremos mostrar
    const [productoEditado, setProductoEditado] = useState(null)

    //
    async function editarProducto(evento) {
        evento.preventDefault();
        // Comprobamos qu eel id del producto no quede o pueda estar vacío.
        if (idProducto.trim() === "") {
            setMensajeError("El ID del producto no puede estar vacío.");
            setEstadoEdicion("error");
            return;
        }
        if (titulo.trim() === "") {
            setMensajeError("El título no puede estar vacío.");
            setEstadoEdicion("error");
            return;
        }
        if (descripcion.trim() === "") {
            setMensajeError("La descripción no puede estar vacía.");
            setEstadoEdicion("error");
            return;
        }
        if (precio.trim() === "") {
            setMensajeError("El precio no puede estar vacio.");
            setEstadoEdicion("error");
            return;
        }

        const precioNumero = Number(precio); // Convertimos el precio en número

        //Comprobamso que sea válido la ocnversion del precio o el precio introducido.
        if (!Number.isFinite(precioNumero) || precioNumero <= 0) {
            setMensajeError(
                "El precio debe ser un número finito mayor de cero."
            );
            setEstadoEdicion("error");
            return;
        }
        //objeto
        const productoActualizado = {
            title: titulo.trim(),
            description: descripcion.trim(),
            price: precioNumero,
        }
        setEstadoEdicion("editando");
        setMensajeError("");


        try {
            //Peticion para modificar producto
            const respuesta = await fetch(
                `https://dummyjson.com/products/${idProducto}`,

                {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",

                    },
                    body: JSON.stringify(productoActualizado)
                }
            );

            //
            if (!respuesta.ok) {
                throw new Error("No se pudo editar el producto");
            }
            // Con esto lleremos el JSON que devuelve l aAPI, después de que la respuesta sea correcta.
            const productoDevuelto = await respuesta.json();

            setProductoEditado(productoDevuelto); // Guardaremos la respuesta
            setEstadoEdicion("exito");

            //Con esto limpiaremso los campos. Si el PUT ha funcionado.
            setIdProducto("");
            setTitulo("");
            setDescripcion("");
            setPrecio("");

        } catch (error) { // Cuando el servidor no puede comunicarse con fecth salt a catch.
            setMensajeError(error.message);// Guardamos el error que editamos en Throw new error arriba
            setEstadoEdicion("error");

        }



    }
    return (
        <section className="mx-auto mt-4 w-[calc(100%-2rem)] max-w-2xl rounded-xl bg-gray-800 p-4 text-white shadow-lg sm:mt-8 sm:p-6">
            <h2 className="mb-6 text-2xl font-bold">
                Editar producto
            </h2>

            <form onSubmit={editarProducto} className="space-y-5">

                <div>
                    {/* El htmlFor relaciona el label con el input */}
                    <label
                        htmlFor="idProducto"
                        className="mb-2 block font-semibold text-white"
                    >
                        ID del producto
                    </label>

                    <input
                        id="idProducto"
                        type="number"
                        value={idProducto}
                        onChange={(evento) => setIdProducto(evento.target.value)}
                        className="box-border w-full min-w-0 rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-amber-500"
                    />
                </div>

                <div>
                    {/* El htmlFor relaciona el label con el input */}
                    <label
                        htmlFor="titulo"
                        className="mb-2 block font-semibold text-white"
                    >
                        Nuevo título
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
                    {/* El htmlFor relaciona el label con el input */}
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
                    {/* El htmlFor relaciona el label con el input */}
                    <label
                        htmlFor="precio"
                        className="mb-2 block font-semibold text-white"
                    >
                        Precio
                    </label>

                    <input
                        id="precio"
                        type="text"
                        value={precio}
                        onChange={(evento) => setPrecio(evento.target.value)}
                        className="box-border w-full min-w-0 rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white outline-none focus:border-amber-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={estadoEdicion === "editando"}
                    className="w-full rounded-lg bg-amber-500 px-5 py-2.5 font-semibold text-gray-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                    {estadoEdicion === "editando"
                        ? "Editando..."
                        : "Editar producto"}
                </button>

            </form>

            {mensajeError && (
                <p
                    role="alert"
                    className="mt-4 wrap-break-word rounded-lg bg-red-100 p-3 text-red-700"
                >
                    {mensajeError}
                </p>
            )}

            {estadoEdicion === "exito" && productoEditado && (
                <div className="mt-6 min-w-0 wrap-break-word rounded-lg bg-gray-700 p-4 text-white">

                    <h3 className="mb-4 text-xl font-bold">
                        Producto editado correctamente
                    </h3>

                    <p className="mb-2">
                        <strong>ID:</strong> {productoEditado.id}
                    </p>

                    <p className="mb-2">
                        <strong>Título:</strong> {productoEditado.title}
                    </p>

                    <p className="mb-2">
                        <strong>Descripción:</strong> {productoEditado.description}
                    </p>

                    <p>
                        <strong>Precio:</strong> {productoEditado.price} €
                    </p>

                </div>
            )}

        </section>

    )
}
export default EditarProductosForm
