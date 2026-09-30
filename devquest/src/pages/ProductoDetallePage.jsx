import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function ProductoDetallePage() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);

  useEffect(() => {
    // Creamos la función ya que las peticiones van a ser asincronas
    async function cargarProducto() {
      //Guardaremos la respuesta qu eobtenemos de la API
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      // Convertimos el contenido obtenido de la respuesta de la API en un objeto de Javascript.
      const data = await response.json();
      setProducto(data); // Cambiamos variable producto y le introducimos los datos recibidos "del producto."
    }
    cargarProducto();
  }, [id]);

  return (
    <div className="mx-4 my-6 w-auto max-w-md rounded-xl bg-gray-800 p-6 text-center text-white sm:mx-auto">
      <h1 className="text-yellow-500">Detalle del producto</h1>
      {/*taremos el id del producto*/}
      <p>ID: {id}</p>{" "}
      {/*Traemos la categoria del producto y generamos espacio entre categoria y el testo de categoria.*/}
      <p className="mt-2">
        Categoria: <span className="ml-2">{producto?.category}</span>
      </p>
      {/* Con ?  le estamos diciendo  si el producto existe dam esu título, si no existe no accedas a él. */}
      <p>{producto?.title}</p>
      {/* Traemos la imagen del producto       */}
      <img
        src={producto?.thumbnail}
        alt={producto?.title}
        className=" mx-auto mt-4 w-64"
      />
      {/*Traemos la descripcion del producto       */}
      <p className="mt-4">{producto?.description}</p>
      {/* Traemos el precio del producto*/}
      <p className="mt-4 font-bold">{producto?.price} €</p>
      {/*Generamos un link para devolvernos a la pagina de catalogo */}
      <Link
        to="/catalogo"
        className="mb-4 mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500"
      >
        Volver a catálogo
      </Link>
    </div>
  );
}
export default ProductoDetallePage;
