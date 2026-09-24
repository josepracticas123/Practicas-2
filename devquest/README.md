# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

# DevQuest

DevQuest es una aplicación educativa creada con React y Vite. Reúne una aplicación de tareas, un Quiz y un catálogo de productos consultado mediante la API de DummyJSON.

## Funcionalidades actuales

### Tareas

- Añadir tareas desde Inicio.
- Ver, buscar, completar y eliminar tareas pendientes.
- Recuperar y eliminar tareas finalizadas.
- Conservar las tareas al recargar mediante `localStorage`.

### Quiz

- Recorrer las cinco preguntas en orden.
- Seleccionar y comprobar una respuesta.
- Ver la explicación, el resultado y el resumen final.
- Volver a jugar sin recargar la página.

### Catálogo de productos

La ruta `/catalogo` consulta productos en `https://dummyjson.com` cuando se envía el formulario. Los modos son excluyentes:

- **Todos:** `GET /products?limit=12`.
- **Texto:** `GET /products/search?q=...&limit=12`.
- **Categoría:** `GET /products/category/<categoria>?limit=12`.
- **Categorías disponibles:** `GET /products/category-list`.

La búsqueda de texto utiliza `URLSearchParams`, por lo que espacios y caracteres como `&` se envían codificados como parte de un único valor de `q`. Las categorías utilizan `encodeURIComponent` para el segmento de la URL.

El catálogo muestra estados inicial, carga, éxito y error. Comprueba `response.ok`, procesa el JSON y valida que `products` sea un array. Guarda los productos recibidos, el `total` devuelto por la API y la consulta aplicada. La interfaz muestra cuántos productos se han recibido frente al total del servidor y muestra un mensaje específico cuando no hay coincidencias.

El formulario y la consulta aplicada son conceptos distintos. Se pueden cambiar sus campos sin modificar los resultados visibles hasta pulsar `Consultar`. `Reintentar` vuelve a utilizar la URL de la consulta que falló. `Mostrar todos` limpia el texto y la categoría y lanza la consulta general.

Los controles usan formularios, botones y campos nativos, por lo que se pueden manejar con teclado. Las clases responsive de Tailwind organizan el catálogo y las tarjetas en distintos tamaños de pantalla.

El Reto 11 todavía no está implementado: no hay peticiones `POST`, `PUT` ni `DELETE` en el código actual.

## Organización del código

- `src/main.jsx`: monta React, `StrictMode`, `BrowserRouter` y `App`.
- `src/App.jsx`: define las rutas `/`, `/tareas`, `/quiz` y `/catalogo`, además de la ruta de página no encontrada.
- `src/pages/TareasPage.jsx`: coordina el estado y las operaciones de las tareas.
- `src/pages/QuizPage.jsx`: controla el recorrido del Quiz y sus respuestas.
- `src/pages/CatalogoPages.jsx`: mantiene el estado del catálogo, construye las URLs, ejecuta las consultas, valida las respuestas y controla `Reintentar` y `Mostrar todos`.
- `src/components/CatalogoForm.jsx`: representa el formulario del catálogo y comunica sus acciones mediante props.
- `src/components/ListaProductos.jsx`: muestra la consulta aplicada, el número recibido, el total y la lista o el mensaje de cero resultados.
- `src/components/ProductoCard.jsx`: muestra la imagen, el título, la descripción y el precio de un producto.
- `src/components/Header.jsx` y `src/components/Footer.jsx`: forman la estructura compartida del portal.
- `src/views/`: contiene las vistas internas de tareas.
- `src/utils/Almacenamiento.js`: lee y guarda las tareas en `localStorage`.
- `src/data/Preguntas.js`: contiene las preguntas locales del Quiz.

## Cómo ejecutar el proyecto

Desde la carpeta `devquest`:

```bash
npm install
npm run dev
```

Después, abre la URL local que muestre Vite. También se puede crear una compilación de producción con `npm run build` y previsualizarla con `npm run preview`.

## Comprobaciones

Desde `devquest`, los comandos actuales son:

```bash
npm run lint
npm run build
```

Ambos comandos pasan en el estado actual del proyecto.
