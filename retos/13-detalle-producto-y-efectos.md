# 13 · Cada producto tiene su página

**Estado:** en curso. Revisión parcial del 30/09/2026 sobre `bc4b76b`. La ruta y la carga inicial están implementadas; revisa los estados del bloque 2 antes de continuar con la limpieza del bloque 3.

**Tu misión:** abrir un producto del catálogo en una página propia que también funcione al compartir su URL. Trabajarás rutas con parámetros, carga automática, dependencias de un efecto y limpieza de peticiones.

Haz primero este reto. El 14 queda para después, cuando estas comprobaciones funcionen. Avanza por bloques; no hace falta terminar ambos hoy si necesitas tiempo para entenderlos.

## Feedback de revisión · antes de seguir

La ruta `/catalogo/:id`, el enlace desde las tarjetas, `useParams` y el efecto dependiente de `id` están bien encaminados. Lint y build pasan en la versión revisada. Conserva ese trabajo y centra la siguiente revisión en estos puntos:

- [ ] **Termina la carga cuando hay un error.** En [ProductoDetallePage.jsx](../devquest/src/pages/ProductoDetallePage.jsx), el `catch` guarda el error pero deja `cargando` en `true`. Prueba un ID positivo inexistente y una petición sin conexión: debe aparecer el error y desaparecer «Cargando producto…». Si usas `finally`, al hacer el bloque 3 recuerda impedir que una petición antigua cambie el estado de la actual.
- [ ] **Muestra solo el estado que corresponde.** La imagen, el precio y la categoría se renderizan incluso sin producto. Organiza el JSX para mostrar carga, error o ficha válida. `producto?.title` evita acceder a una propiedad de `null`, pero no oculta el resto del marcado; por eso pueden quedar un «€» o «Categoría:» sin datos.
- [ ] **Evita conservar el producto anterior ante un ID inválido.** La validación hace `return` antes de limpiar `producto`. Prueba pasar desde una ficha cargada a `/catalogo/abc` mediante un `Link` temporal de React: debe quedar el mensaje de ID inválido, sin la ficha anterior y sin petición para `abc`. Retira el enlace de prueba después. Recargar toda la página no reproduce esta transición porque reinicia el estado.
- [ ] **Corrige el comentario de la ruta.** En [App.jsx](../devquest/src/App.jsx), el comentario dentro de `<Routes>` usa `//`. Dentro del JSX debe escribirse como `{/* comentario */}`. Comprueba también que puedes explicar qué representa `:id`.
- [ ] **Comprueba la recuperación.** Después de un error o un ID inválido, navega a un ID válido: desaparece el error, se carga el producto correcto y termina la carga.

**Orden para continuar:** corrige estos puntos → vuelve a comprobar el bloque 2 → sigue con el bloque 3 → realiza las pruebas del bloque 4. La ausencia de `AbortController` corresponde al trabajo que ya dejaste pendiente; no es una tarea nueva añadida por esta revisión.

**Alcance de la revisión:** lectura de código, lint y build, y pruebas aisladas de la lógica que confirmaron carga activa tras un 404 y conservación del producto al pasar a un ID inválido. No se verificó visualmente el entorno de Dev Tunnels. Los checks de pruebas finales siguen abiertos para que los completes en tu navegador.

## 1. Conecta tarjeta y página

- [x] Localiza las rutas en `src/App.jsx` y las tarjetas en `src/components/ProductoCard.jsx`.
- [x] Crea una página de detalle y registra `/catalogo/:id`. Mantén `/catalogo` como listado.
- [x] Añade a cada tarjeta un `Link` «Ver detalle» con el ID del producto. Conserva los botones de editar y eliminar separados del enlace, sin anidar controles interactivos.
- [x] Lee `id` con `useParams` desde `react-router`, el paquete que ya usa el proyecto. Comprueba su valor: llega como texto.
- [x] Añade un enlace «Volver al catálogo» que también funcione si has entrado directamente desde otra pestaña.

**Parada:** puedes abrir dos productos diferentes y sus URLs son distintas. Por ahora basta con mostrar el ID.

Lee [useParams · React Router](https://reactrouter.com/api/hooks/useParams).

## 2. Carga el producto de la URL

Usa `GET https://dummyjson.com/products/1`, sustituyendo `1` por el ID. La respuesta es un objeto de producto, no un objeto con un array `products`. Consulta [Get a single product · DummyJSON](https://dummyjson.com/docs/products).

- [x] Comprueba que el ID representa un entero positivo. Una URL como `/catalogo/abc` debe mostrar un mensaje comprensible sin pedir ese recurso a la API.
- [x] Obtén el producto automáticamente al entrar a la página. Debe funcionar aunque no hayas visitado el catálogo antes.
- [x] Usa un `useEffect` para sincronizar los datos con el ID de la ruta. Incluye las dependencias que utilizas; no silencies el linter.
- [x] Declara la función asíncrona dentro del efecto y ejecútala allí. El callback del efecto no debe ser `async`: su retorno se reserva para la limpieza.
- [x] Comprueba `respuesta.ok`. Distingue un HTTP 404 («Producto no encontrado») de un fallo de conexión u otro error HTTP.
- [ ] Muestra carga, error o detalle según corresponda. Mientras se carga otro ID, no presentes los datos anteriores como si pertenecieran al nuevo.
- [x] Muestra título, imagen con `alt`, descripción, precio y categoría. No necesitas enseñar todos los campos de la API.

**Por qué ahora un efecto:** esta página debe mantenerse sincronizada con la URL. En el catálogo, «Consultar» sigue siendo una acción del formulario; no cambies su funcionamiento para que todas las peticiones usen efectos.

Lee [peticiones desde un efecto · React](https://react.dev/reference/react/useEffect#fetching-data-with-effects). Si el linter señala un cambio de estado al iniciar el efecto, revisa cómo representas la carga para el ID actual y pide una pista antes de añadir temporizadores o desactivar reglas. Evita guardar estados que puedas deducir de los datos y del ID al que pertenecen.

## 3. Limpia lo que dejas en marcha

- [ ] Crea un `AbortController` nuevo para cada ejecución del efecto y pasa su `signal` a `fetch`.
- [ ] Devuelve una función de limpieza que aborte esa petición al salir de la página o cambiar el ID.
- [ ] No muestres un error al usuario cuando la petición se cancela intencionadamente.
- [ ] Asegura que una ejecución antigua no actualiza producto, error ni carga después de su limpieza. Revisa también cualquier `finally`; cancelar no convierte una ejecución vieja en la actual.
- [ ] Conserva `StrictMode`. Explica por qué en desarrollo puede haber un ciclo adicional de inicio, limpieza e inicio.
- [ ] Escribe dos comentarios breves con tus palabras: por qué el efecto depende del ID y para qué sirve su limpieza.

Lee [AbortController · MDN](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) y [ciclo adicional en desarrollo · React](https://react.dev/reference/react/useEffect#my-effect-runs-twice-when-the-component-mounts).

**Pista:** la limpieza pertenece a una ejecución concreta. Puedes consultar si su señal ya está abortada antes de actualizar estado. No reutilices un controlador cancelado para otra petición.

## 4. Comprueba el recorrido

- [ ] Abre un detalle desde una tarjeta y comprueba en Network el ID solicitado.
- [ ] Abre `/catalogo/1` directamente y recarga: la ficha funciona sin recibir el producto por props ni depender del listado.
- [ ] Prueba un ID con formato inválido y otro positivo que la API confirme como inexistente. Los mensajes son adecuados y no queda una carga infinita.
- [ ] Prueba sin conexión; vuelve a conectarte y recarga. No es obligatorio añadir un botón de reintento en este reto.
- [ ] Con red lenta, sal del detalle antes de recibir la respuesta. La cancelación no muestra un error al usuario.
- [ ] Prueba cambiar entre dos IDs mediante navegación de React mientras el primero carga. Puedes añadir temporalmente dos `Link` de prueba en la ficha y retirarlos después. Cambiar la dirección con una recarga completa no comprueba este caso.
- [ ] Comprueba que la respuesta del primer ID no sustituye al segundo, aunque llegue más tarde.
- [ ] Revisa teclado y anchuras de 375 px y 1280 px.
- [ ] Ejecuta `npm run lint` y `npm run build`.
- [ ] Trabaja en `develop`, comprueba su Preview y prepara la entrega hacia `main` con el tutor. Tras publicarla, abre y recarga una URL de detalle en Vercel.

## 5. Registra lo aprendido

- [ ] Completa el bloque 13 de [APRENDIZAJE](../devquest/APRENDIZAJE.md) con tus palabras y referencias a tu código.
- [ ] Anota al menos tres pruebas: qué hiciste, qué esperabas y qué ocurrió.

**Alcance:** detalle de solo lectura. Editar y eliminar siguen en el catálogo. No añadas carrito, favoritos ni librerías de peticiones. Volver al catálogo puede reiniciar su consulta; conservarla entre rutas no forma parte de este reto. Un GET de DummyJSON devuelve sus datos originales, aunque antes hayas hecho un PUT simulado.

**Terminado cuando:** la ficha funciona por URL, distingue los errores y puedes explicar cuándo empieza y cuándo se limpia su petición.

[Guía](../README.md) · [Reto 12](12-deploy-vercel-y-ramas.md) · [Reto 14](14-paginacion-del-catalogo.md)
