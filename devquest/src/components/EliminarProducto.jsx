import { useEffect, useRef } from "react";
function EliminarProducto({ producto, onCancelar, onConfirmar, mensajeError, estadoEliminacion }) {


    const botonCancelarRef = useRef(null)

    useEffect(() => {
        function manejarEscape(evento) {
            // Bloqueo Escape durante el DELETE para que la confirmación no se
            // cierre a mitad de la petición y podamos ver si falla.
            if (evento.key === "Escape" && estadoEliminacion !== "cargando") {
                onCancelar();
            }
        }

        document.addEventListener("keydown", manejarEscape);

        return () => {
            document.removeEventListener("keydown", manejarEscape);
        };
    }, [onCancelar, estadoEliminacion]);
    
    useEffect(() => {
        botonCancelarRef.current?.focus();
    }, []);




    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-eliminar-producto"
        >
            <div className="w-full max-w-md rounded-xl bg-gray-800 p-6 text-white shadow-2xl">

                <h2
                    id="titulo-eliminar-producto"
                    className="mb-4 text-2xl font-bold"
                >
                    Eliminar producto
                </h2>

                <p className="mb-6 text-gray-300">
                    ¿Estás seguro de que quieres eliminar el producto?
                </p>

                <p className="mb-6 rounded-lg bg-gray-700 p-4 font-semibold text-amber-400">
                    {producto.title}
                </p>

                {mensajeError && (
                    <p
                        role="alert"
                        className="mb-4 rounded-lg bg-red-100 p-3 text-red-700"
                    >
                        {mensajeError}
                    </p>
                )}

                <div className="flex justify-end gap-3">

                    <button
                        ref={botonCancelarRef}
                        type="button"
                        onClick={onCancelar}
                        disabled={estadoEliminacion === "cargando"}
                        className="rounded-lg bg-gray-600 px-4 py-2 font-semibold text-white transition hover:bg-gray-500"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            onConfirmar();
                        }}
                        disabled={estadoEliminacion === "cargando"}
                        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-500"
                    >
                        {estadoEliminacion === "cargando" ? "Eliminando..." : "Eliminar"}
                    </button>

                </div>
            </div>
        </div>
    );
}

export default EliminarProducto;
