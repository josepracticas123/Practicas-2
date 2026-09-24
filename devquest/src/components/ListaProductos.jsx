import Productocard from "./ProductoCard";

function ListaProductos({
    consultaAplicada,
    productos,
    totalResultados,
}) {
    return (
        <>
            {/* Mostramos qué consulta produjo los resultados */}
            <p className="mb-2 text-gray-300">
                Consulta aplicada:{" "}
                <span className="font-semibold text-amber-400">
                    {consultaAplicada?.descripcion}
                </span>
            </p>

            {/* Mostramos cuántos productos hemos recibido */}
            <p className="mt-4 mb-6">
                Recibidos: {productos.length} de {totalResultados} resultados del servidor
            </p>

            {/* Si no hay productos, mostramos un mensaje */}
            {productos.length === 0 ? (
                <p className="rounded-lg bg-gray-700 p-4">
                    No se encontraron productos para esta consulta.
                </p>
            ) : (
                /* Si hay productos, los mostramos en tarjetas */
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
    );
}

export default ListaProductos;