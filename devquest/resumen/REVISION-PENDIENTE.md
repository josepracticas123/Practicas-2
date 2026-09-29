# Repaso de conceptos · Revisión escrita completada

Seguimiento del 22/09/2026 (`4d4b688`).

Los cuatro puntos del repaso personal están completados y contrastados con el código de `devquest`. El Reto 06 está cerrado, incluida la cabecera móvil. La conversación se registra en [Repaso con el tutor](../REPASO-CON-TUTOR.md).

Este repaso se centra en lo aprendido antes: identidad, copias, búsqueda e inicialización. No es necesario añadir otro documento ni copiar funciones completas.

La pregunta anterior «qué ID cambia» era ambigua. La pregunta correcta es **qué tarea se modifica y cómo la identificas**: completar una tarea no cambia su ID.

## Cuatro puntos completados

- [x] **Identidad:** dos tareas pueden tener el mismo texto y distintos IDs. `completarTarea(id)` identifica la tarea mediante su `id` y cambia `completada`, no el `id`.

- [x] **Copias:** `map()` crea un array nuevo y `{ ...tarea, completada: true }` crea un objeto nuevo para la tarea modificada. Las demás tareas conservan sus objetos y sus IDs.

- [x] **Búsqueda y guardado:** al escribir cambia `busqueda`; se recalculan `tareasPendientesFiltradas` y `tareasFinalizadasFiltradas`, pero `tareas` no cambia, por lo que el efecto que depende de `[tareas]` no vuelve a guardar.

- [x] **Inicialización:** `useState(leerTareasGuardadas)` recibe la función como inicializador para obtener las tareas guardadas. Es diferente de `useState(leerTareasGuardadas())`, que ejecutaría la función directamente. Al salir de Tareas se reinicia el estado local como `busqueda`, mientras las tareas permanecen en `localStorage`.

## Mi ejemplo y las funciones que he localizado

### Identidad

Puedo tener dos tareas con el mismo texto, pero cada una tiene un `id` diferente.

Por ejemplo:

- Tarea A: `"Estudiar React"` → `id: 1`
- Tarea B: `"Estudiar React"` → `id: 2`

Cuando llamo a `completarTarea(id)`, se busca la tarea cuyo `tarea.id` coincide con el `id` recibido. Por ejemplo, `completarTarea(2)` modifica la tarea B.

La tarea conserva su mismo `id`: completar una tarea cambia `completada`, no cambia su identidad.

Función localizada:

- `completarTarea`

### Copias

En `completarTarea`, `map()` crea un array nuevo.

Cuando encuentra la tarea cuyo `id` coincide, `{ ...tarea, completada: true }` crea un objeto nuevo para esa tarea.

Las demás tareas se mantienen en el nuevo array y conservan sus datos y sus `id`.

Funciones y expresiones localizadas:

- `completarTarea`
- `tareas.map(...)`
- `{ ...tarea, completada: true }`

### Búsqueda y guardado

Cuando escribo en el buscador cambia el estado `busqueda`.

A partir de ese estado se recalculan:

- `tareasPendientesFiltradas`
- `tareasFinalizadasFiltradas`

Estas son listas resultado que se utilizan para mostrar las tareas filtradas. No son funciones que guarden datos ni modifican `tareas`.

El efecto de guardado depende de `[tareas]`. Como escribir en el buscador cambia `busqueda`, pero no cambia `tareas`, el efecto de guardado no vuelve a ejecutarse.

Funciones y expresiones localizadas:

- `tareasPendientesFiltradas`
- `tareasFinalizadasFiltradas`
- `guardarTareas`
- `useEffect(..., [tareas])`

### Inicialización

`useState(leerTareasGuardadas)` recibe la función como inicializador. React utiliza esa función para obtener el valor inicial de `tareas`.

Es diferente de escribir `useState(leerTareasGuardadas())`, porque en ese caso la función se ejecutaría directamente y su resultado se pasaría a `useState`.

Al recargar la página, `leerTareasGuardadas` recupera las tareas almacenadas en `localStorage` y ese resultado se utiliza para establecer el estado inicial.

En cambio, cuando escribo en el buscador, cambia `busqueda`, no `tareas`. Por eso buscar no vuelve a leer ni guardar las tareas.

Función localizada:

- `leerTareasGuardadas`

## Dudas concretas

No tengo dudas concretas pendientes sobre este apartado.

Ya entiendo que `useState(leerTareasGuardadas)` utiliza esa función para obtener las tareas guardadas como valor inicial del estado.

## Catálogo actual

La aplicación también tiene la ruta `/catalogo`, que mantiene las consultas de productos separadas de las tareas y el Quiz.

`CatalogoPages.jsx` coordina las peticiones a DummyJSON. `CatalogoForm.jsx` contiene el formulario y los controles; `ListaProductos.jsx` muestra la consulta aplicada, el número de productos recibidos, el total y el mensaje de lista vacía; `ProductoCard.jsx` presenta cada producto.

El catálogo permite consultar todos los productos, buscar por texto mediante `q` y filtrar por categoría. Utiliza `URLSearchParams` para codificar los parámetros de texto y `encodeURIComponent` para la categoría. Las categorías se mantienen en estados separados de los productos.

La consulta aplicada guarda la URL, descripción, tipo y valor de la última petición. Los valores actuales del formulario pueden cambiar sin cambiar los resultados ya mostrados. Si una petición falla, `Reintentar` utiliza la consulta guardada, mientras que `Mostrar todos` limpia el texto y la categoría y ejecuta directamente la consulta general.

La respuesta se valida con `response.ok`, `response.json()` y `Array.isArray(datos.products)`. La interfaz distingue carga, éxito, error y cero resultados.

## Revisión del Reto 11

El código implementa POST, GET por ID, PUT y DELETE contra DummyJSON, además de los bloqueos para que dos operaciones no se interfieran. Las escrituras son simuladas y no persisten en el servidor.

### Implementación hecha (el código ya existe)

- [x] POST en `/products/add` con cabecera y cuerpo JSON, validaciones y estado `Creando...`.
- [x] GET por ID antes de editar, con un borrador separado del producto de la tarjeta.
- [x] PUT al ID seleccionado; tras el éxito se reemplaza solo esa tarjeta y no se hace un GET automático después.
- [x] DELETE con confirmación; la tarjeta se retira solo tras una respuesta válida.
- [x] Bloqueo mientras se guarda (PUT) o se elimina (DELETE), en controles y manejadores. Escape no cierra la confirmación durante el DELETE y «Cancelar»/`cancelarEdicion` no cancelan durante el PUT.
- [x] Mensaje de error de categorías junto al selector y mensaje «Cargando productos...» durante la consulta.
- [x] Ruta `/editar-producto` retirada: entrar en ella muestra «Página no encontrada».

### Pruebas realizadas

- [x] Un POST exitoso muestra los datos recibidos y limpia el formulario.
- [x] Un POST posterior fallido conserva visible la creación anterior y mantiene los campos del intento fallido.
- [x] Durante POST se muestra `Creando...`, el botón queda deshabilitado y un nuevo intento de envío no crea otra petición concurrente.
- [x] `npm run lint` y `npm run build` pasan en el estado actual.

Las pruebas de POST usaron respuestas de Fetch interceptadas; no fueron escrituras reales en DummyJSON. Las de PUT y DELETE todavía no se han hecho en la interfaz.

### Pendiente de comprobar

- [ ] Validaciones de POST y contenido de URL, headers y body en Network con escrituras reales.
- [ ] Reemplazo del panel tras otro POST exitoso.
- [ ] GET antes de editar, cancelar sin PUT, éxito y fallo reales de PUT.
- [ ] Confirmación y cancelación de DELETE, éxito y fallo con la tarjeta correspondiente.
- [ ] Casos de ID inexistente, consulta posterior a PUT/DELETE y matriz completa de operaciones concurrentes.
- [ ] PUT lento: editar otro producto y cancelar; DELETE lento: Escape, error y reintento.
- [ ] Error de categorías sin conexión y mensaje de carga con conexión lenta.
- [ ] Accesibilidad, teclado, tamaños 375 px/1280 px, Tareas y Quiz.

### Conversación con el tutor

- [ ] Comprobar con el tutor la comprensión de los retos 09–11. La conversación no está hecha; no se marca por tener el código escrito.