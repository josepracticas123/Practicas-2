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

### Reto 11: escrituras simuladas

El catálogo incluye operaciones de escritura mediante Fetch. DummyJSON devuelve respuestas de práctica y no persiste esos cambios.

- **POST:** `/crear-producto` contiene un formulario controlado para título, descripción y precio. Valida los campos, muestra `Creando...`, conserva los valores si falla y los limpia tras éxito. La respuesta se guarda en `ultimaCreacion`, fuera del estado del catálogo, y se presenta en «Última creación simulada». El panel depende de que haya una creación exitosa guardada, no del estado de la petición: permanece visible durante un POST posterior y si este falla; un nuevo éxito lo reemplaza.
- **GET + PUT:** desde una tarjeta se consulta primero `GET /products/{id}`. El formulario mantiene un borrador separado. Un PUT exitoso reemplaza solo la tarjeta seleccionada en el estado local; no se consulta de nuevo automáticamente. Si falla, se conservan la tarjeta y el borrador.
- **DELETE:** una tarjeta abre una confirmación. Se valida la respuesta y solo se retira la tarjeta tras el éxito.
- **Coherencia:** los estados de consulta, GET de edición, PUT y DELETE son independientes. El catálogo muestra tarjetas visibles y total de la última consulta por separado. Hay guardas en handlers y controles, pero falta comprobar la matriz completa de acciones incompatibles y sus transiciones.
- Las altas POST se muestran en una ruta y estado propios; no se incorporan a la lista de productos obtenida por GET. Las tareas mantienen su persistencia existente en `localStorage`, independiente del Reto 11.

#### Verificación registrada

En navegador, con Fetch interceptado, se comprobó una creación exitosa seguida de un POST fallido. El panel anterior permaneció visible durante la segunda petición y tras el error; los campos se conservaron. El botón mostró `Creando...`, quedó deshabilitado y un envío adicional no inició otra petición. La prueba no envió escrituras reales a DummyJSON.

Siguen pendientes las pruebas completas de GET, PUT y DELETE, los fallos de red de cada operación, la matriz completa de acciones concurrentes, la revisión integral de la sección 6 y la demostración al tutor. Los bloques A, B, C y D del checklist de `retos/11-crear-editar-eliminar-api.md` ya están resueltos y el bloque E deja la documentación al día; quedan el bloque F (pruebas de cierre) y la conversación con el tutor.

## Organización del código

- `src/main.jsx`: monta React, `StrictMode`, `BrowserRouter` y `App`.
- `src/App.jsx`: define las rutas `/`, `/tareas`, `/quiz`, `/catalogo` y `/crear-producto`, además de la ruta de página no encontrada.
- `src/pages/TareasPage.jsx`: coordina el estado y las operaciones de las tareas.
- `src/pages/QuizPage.jsx`: controla el recorrido del Quiz y sus respuestas.
- `src/pages/CatalogoPages.jsx`: mantiene el estado del catálogo, construye las URLs, ejecuta las consultas, valida las respuestas y controla `Reintentar` y `Mostrar todos`.
- `src/pages/CrearProductoPage.jsx` y `src/components/CrearProductosForm.jsx`: aíslan el formulario POST y el panel de la última creación simulada del listado del catálogo.
- `src/components/EditarProductosForm.jsx` y `src/components/EliminarProducto.jsx`: contienen el formulario de PUT y la confirmación de DELETE.
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

`npm run lint` y `npm run build` pasan en el estado actual (última comprobación tras resolver los bloques A–E del checklist de cierre).
