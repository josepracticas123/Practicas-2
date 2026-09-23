 function Productocard({producto}) {
    return (
        <div className="flex min-w-0 h-full flex-col rounded-xl border border-gray-400 bg-gray-300 p-4 text-gray-900 shadow-lg">

           <img
           src={producto.thumbnail}
           alt={producto.title}
           className ="mb-4 h-48 w-full rounded-lg object-cover"
           />
           <h2 className="mb-2 wrap-break-words text-xl font-semibold">
            {producto.title}
           </h2>
           <p className="mb-4 wrap-break-words text-gray-700">
            {producto.description}
           </p>
           <p  className="mt-auto font-bold">
            {producto.price} €
           </p>

        </div>
    )
}
export default Productocard;