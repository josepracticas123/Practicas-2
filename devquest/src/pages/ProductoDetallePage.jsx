import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function ProductoDetallePage() {
  const { id } = useParams();

  // Estado donde guardaremos al informacion del producto
  const [producto, setProducto] = useState(null);

  // Mostraremos el mensaje de cargando con esta variable modificadora
  const [cargando, setCargando] = useState(true);

  //Mostraremos el error, se inicia en null porque no hay error
  const [error, setError] = useState(null);
  // El efecto depende del ID porque debe cargar el producto correspondiente a la URL actual.
  useEffect(() => {
    const controller = new AbortController();
    let activa = true;

    // Creamos la función ya que las peticiones van a ser asincronas
    async function cargarProducto() {
      // Convertimos el ID que viene de la URL, que es texto, a número.
      const numeroId = Number(id);

      // Comprobamos que el ID sea un número entero y positivo antes de hacer la petición a la API.
      if (!Number.isInteger(numeroId) || numeroId <= 0) {
        setProducto(null); // limpiamos producto anterior, para que no se quede mostrando el producto anterior y el mensaje de error.
        setError("El ID del producto no es válido.");
        setCargando(false);
        return;
      }

      setError(null); //quitamos el error anterior.
      setProducto(null); // limpiamos "borramos producto anterior"
      setCargando(true); // activamos el mensaje de cargando..
      try {
        //Guardaremos la respuesta qu eobtenemos de la API
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("ID inválido, producto no encontrado.");
          }
          throw new Error("Error al cargar el producto.");
        }

        // Convertimos el contenido obtenido de la respuesta de la API en un objeto de Javascript.
        const data = await response.json();

        //Protegemos el set de petición antigua.
        if (activa) {
          setProducto(data); // Cambiamos variable producto y le introducimos los datos recibidos "del producto."
          setCargando(false);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        // Protegemos error sobre el producto nuevo, así la petición atigua no puede mostrar error sobre el nuevo
        if (activa) {
          setError(error.message);
          setCargando(false);
        }
      }
    }
    // La limpieza cancela la petición anterior cuando cambia el ID o salimos de la página.
    cargarProducto();
    return () => {
      activa = false;
      controller.abort(); // Cancela la petición que estaba en marcha.
    };
  }, [id]);

  return (
    <div className="mx-4 my-6 w-auto max-w-md rounded-xl bg-gray-800 p-6 text-center text-white sm:mx-auto">
      <h1 className="text-yellow-500">Detalle del producto</h1>
      {/*taremos el id del producto*/}
      <p>ID: {id}</p> {/*ponemos el cargando en la pantalla*/}
      {cargando && (
        <p className=" mt-6 mb-6 font-bold text-green-600">
          Cargando producto...
        </p>
      )}
      {/*Añadiremos el error */}
      {error && <p className="mt-6 mb-6 font-bold text-red-500">{error}</p>}
      {/* Con ?  le estamos diciendo  si el producto existe dam esu título, si no existe no accedas a él. */}
      {producto && (
        <>
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
          {/*Traemos la categoria del producto y generamos espacio entre categoria y el testo de categoria.*/}
          <p className="mt-2">
            Categoria: <span className="ml-2">{producto?.category}</span>
          </p>
        </>
      )}
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
