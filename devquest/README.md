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

Distingue estados inicial, carga, éxito y error, y separa los campos del formulario de la consulta aplicada: cambiar los campos no altera los resultados hasta pulsar «Consultar», «Reintentar» repite la consulta que falló y «Mostrar todos» lanza la consulta general. La explicación de los estados, la codificación y la validación de la respuesta está en [Apuntes § 31](resumen/APUNTES_ESTUDIO_REACT.md#31-catálogo-consultas-a-la-api).

Los controles son elementos nativos y se manejan con teclado; las clases responsive de Tailwind reparten las tarjetas según el ancho de la pantalla.

### Escrituras simuladas

El catálogo permite crear productos, consultar uno por ID, editarlo y eliminarlo mediante Fetch. La respuesta de POST se muestra aparte del listado, la edición usa un borrador y la eliminación pide confirmación. DummyJSON no persiste estas escrituras: un nuevo GET devuelve los datos originales, y las tareas guardadas no se ven afectadas. Los estados, los bloqueos y el comportamiento del borrador están explicados en [Apuntes § 32](resumen/APUNTES_ESTUDIO_REACT.md#32-escrituras-simuladas-post-put-y-delete).

**Estado:** cerrado funcionalmente en `84a2a01`. El alcance de las comprobaciones está en el [registro de cierre del reto](../retos/11-crear-editar-eliminar-api.md#registro-de-cierre).

### Publicación

El [reto 12 · Vercel y ramas](../retos/12-deploy-vercel-y-ramas.md) está cerrado por acuerdo con el tutor el 30/09/2026.

- **Producción:** [DevQuest](https://practicasnadunet.vercel.app).
- **Flujo habitual:** `develop → Preview → pull request → main → Production`.
- Comprueba en Vercel el commit del despliegue exitoso para identificar la versión publicada.
- La sincronización final entre ramas queda bajo revisión del tutor.

## Próximos retos

Estas funciones todavía no están implementadas:

- [13 · Detalle de producto](../retos/13-detalle-producto-y-efectos.md): página por ID y carga automática con limpieza.
- [14 · Paginación](../retos/14-paginacion-del-catalogo.md): recorrer el catálogo conservando la consulta aplicada.

Trabaja primero el 13 y continúa con el 14 cuando sus comprobaciones estén completas.

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

## Dónde está cada cosa

- **Este README:** qué hace la aplicación, cómo se ejecuta y cómo está organizado el código.
- **[Resumen del proyecto](resumen/resumen.md):** mapa de la estructura, índice de conceptos y reglas para recordar.
- **[Apuntes de estudio](resumen/APUNTES_ESTUDIO_REACT.md):** teoría con ejemplos del código del proyecto.
- **[Preguntas de repaso](resumen/Preguntas.md):** preguntas del proyecto con su respuesta.
- **[Recordatorio de conceptos](resumen/A-tener-en-cuenta.md):** definiciones cortas, preguntas breves y registro de pruebas.
- **[Cuaderno](APRENDIZAJE.md):** mis respuestas a las preguntas de cada reto.
- **[Repaso con el tutor](REPASO-CON-TUTOR.md)** y **[revisión escrita](resumen/REVISION-PENDIENTE.md):** seguimiento de las conversaciones de comprensión.
