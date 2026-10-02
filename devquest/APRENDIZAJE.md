# Mi cuaderno de aprendizaje

Esta revisión ordena las notas iniciales y las ajusta al código actual. Que un concepto aparezca en el proyecto significa que lo has utilizado; explica con tus palabras cómo funciona antes de marcarlo como comprendido.

Reparto de la documentación: [README del proyecto](README.md) (uso, estructura y comandos) · [resumen del proyecto](resumen/resumen.md) (mapa e índice) · [apuntes de estudio](resumen/APUNTES_ESTUDIO_REACT.md) (teoría con ejemplos) · [recordatorio de conceptos](resumen/A-tener-en-cuenta.md) (definiciones cortas y pruebas). Este archivo es el cuaderno: mis respuestas a las preguntas de cada reto y mi registro.

## Archivos que ya he encontrado

| Archivo o carpeta                 | Para qué sirve en este proyecto                                                                                        |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `package.json`                    | Define scripts, dependencias de la app y herramientas de desarrollo.                                                   |
| `package-lock.json`               | Registra las versiones concretas del árbol de dependencias que instala npm. Se guarda en Git.                          |
| `index.html`                      | Contiene el elemento `root` y carga el punto de entrada `src/main.jsx`.                                                |
| `src/main.jsx`                    | Importa estilos y React, crea la raíz con `createRoot` y renderiza `App` dentro de `StrictMode` y `BrowserRouter`.     |
| `src/App.jsx`                     | Mantiene la estructura global y decide mediante `Routes` qué página mostrar.                                           |
| `src/pages/TareasPage.jsx`        | Mantiene el estado, las acciones, los filtros y la persistencia de la aplicación de tareas.                            |
| `src/pages/PortalPage.jsx`        | Define los datos de las miniapps y muestra sus tarjetas.                                                               |
| `src/pages/QuizPage.jsx`          | Muestra la primera pregunta del Quiz y controla la opción seleccionada.                                                |
| `src/data/Preguntas.js`           | Contiene las cinco preguntas locales con sus opciones, respuestas correctas y explicaciones.                           |
| `src/utils/Almacenamiento.js`     | Lee y guarda las tareas en `localStorage`, comprobando que los datos tengan el formato esperado.                       |
| `src/components/Header.jsx`       | Muestra enlaces globales a Portal, Tareas y Quiz.                                                                      |
| `src/components/Article.jsx`      | Contiene el formulario controlado para añadir tareas y llama a `addTareas`, recibida por props.                        |
| `src/components/MiniappCards.jsx` | Recibe los datos de una miniapp por props y muestra su tarjeta y enlace cuando existe una ruta.                        |
| `src/components/Footer.jsx`       | Muestra el pie de página.                                                                                              |
| `src/index.css`                   | Importa Tailwind; las clases de los componentes dan estilo a la pantalla.                                              |
| `vite.config.js`                  | Configura los plugins de React y Tailwind para Vite.                                                                   |
| `node_modules/`                   | Contiene las dependencias instaladas. No se guarda en Git.                                                             |
| `dist/`                           | Contiene los archivos que genera `npm run build` para publicar la app. No se guarda en Git.                            |
| `.gitignore`                      | Indica qué archivos sin seguimiento debe ignorar Git. No oculta archivos ya publicados ni sustituye proteger secretos. |

## Lo que ya aparece en mi código

Completa la última columna con un ejemplo de tu aplicación y marca cada casilla cuando puedas explicarlo al tutor.

| Concepto utilizado                                            | Lo puedo explicar | Mi explicación o duda                                                                                                                                          |
| ------------------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Componente: `Header` o `Article`                              | [x]               | Son partes de la interfaz separadas en archivos. `Header` muestra el título y el menú, y `Article` contiene el formulario para añadir tareas.                  |
| `import` y `export`                                           | [x]               | `import` permite utilizar un componente o función de otro archivo y `export` permite que ese archivo pueda ser utilizado desde otros.                          |
| JSX y `className`                                             | [x]               | JSX permite escribir la estructura que se muestra en la página dentro de React. `className` se utiliza para poner clases CSS, en este caso clases de Tailwind. |
| `useState`: texto del input, sección actual y array de tareas | [x]               | `useState` guarda datos que pueden cambiar. En mi aplicación guarda el texto del input, la sección seleccionada y las tareas.                                  |
| Input controlado: `value` y `onChange`                        | [x]               | El valor del input está controlado por el estado `textoTarea`. `onChange` actualiza ese estado cuando escribo.                                                 |
| Evento `onClick`                                              | [x]               | `onClick` ejecuta una función cuando pulso un botón. Se usa en la navegación interna y en las acciones de las tareas. El alta se centraliza en `onSubmit`.     |
| Comprobación con `trim()`                                     | [x]               | `trim()` elimina los espacios del principio y del final del texto. Lo utilizo para evitar guardar tareas vacías o que solo tengan espacios.                    |
| Nuevo array con `[...tareas, tarea]`                          | [x]               | Creo un array nuevo copiando las tareas anteriores y añadiendo la nueva. Así actualizo el estado sin modificar directamente el array anterior.                 |
| Renderizar una lista con `map` y `key`                        | [x]               | `map` recorre el array de tareas y crea un elemento para cada tarea. `key` permite que React identifique cada elemento de la lista.                            |
| Renderizado condicional con `seccionActual` y `&&`            | [x]               | Compruebo qué sección está seleccionada y solo muestro su contenido. El operador `&&` permite renderizar el JSX cuando la condición es verdadera.              |
| Props y callback `addTareas`                                  | [x]               | `TareasPage` pasa `addTareas` a `Inicio`, y `Inicio` la pasa a `Article`. `Article` llama a esa función y la página actualiza el estado de tareas.             |
| Clases de Tailwind                                            | [x]               | Son clases que utilizo directamente en `className` para aplicar estilos como colores, espacios, bordes, tamaños y alineación.                                  |

## Reto 02 · Preguntas para investigar

No hace falta responderlas antes de empezar. Complétalas según avances:

- ¿Qué estado decide si se muestra Inicio, Pendientes o Finalizadas?
  El estado seccionActual es el que indica en qué sección estoy. Dependiendo de si vale inicio, pendientes o finalizadas, se muestra una sección u otra.
- ¿Por qué el array de secciones puede ser una constante?
  Porque las secciones que tengo en la aplicación son siempre las mismas y no necesito cambiarlas. Por eso puedo tenerlas en una constante con const en vez de guardarlas en un estado.
- ¿Cómo se entera `TareasPage` de que he pulsado una opción de la navegación interna?
  `TareasPage` renderiza los botones y les asigna un `onClick`. Al pulsar uno, se llama a `setSeccionActual` con el identificador de la sección y React muestra la vista correspondiente.
- ¿Qué diferencia hay entre comprobar un texto dentro de una función y mostrar JSX según una condición?
  Cuando compruebo un texto dentro de una función estoy decidiendo qué hacer con ese dato. En cambio, en el JSX la condición sirve para decidir qué quiero enseñar en pantalla.
- ¿Cómo decido entre mostrar la lista de pendientes y el mensaje de lista vacía?
  Miro cuántas tareas hay en el array tareas. Si no hay ninguna, muestro el mensaje de que todavía no hay tareas. Si hay alguna, las recorro con map y las muestro.
- ¿Qué recorrido hace el texto desde el input de `Article` hasta el array de `TareasPage`?
  Primero escribo la tarea en el input y `onChange` va guardando lo que escribo en `textoTarea`. Al enviar el formulario, `Article` aplica `trim()` y llama a `addTareas`. Esa función está en `TareasPage` y añade la tarea al array `tareas`.
- ¿Por qué las tareas siguen ahí cuando `Article` deja de mostrarse?
  Porque el array `tareas` está guardado en `TareasPage`, que permanece montada al cambiar de sección interna. `Article` solo deja de mostrarse; no se desmonta el estado que vive en la página de tareas.
- ¿Qué diferencia hay entre comprobar `trim()` y guardar su resultado?
  Comprobar `trim()` permite saber si el texto está vacío o solo contiene espacios. Guardar su resultado permite añadir el texto ya limpio, sin espacios al principio ni al final.
- ¿Cómo se escribe un comentario dentro de JSX para que no aparezca como texto en la página?
  Dentro de JSX se escribe entre `{/*` y `*/}`. React lo interpreta como un comentario y no lo muestra en la página.

## Reto 03 · Preguntas para investigar

Completa estas respuestas cuando lo implementes; no implican que ya esté hecho:

- ¿Qué información aporta un objeto de tarea frente a un texto?
  Permite guardar mas información que un simple texto. En la app guardo el texto de tarea, un id para identificarla y completada pra saber si esta pendiente o finalizada.
- ¿Cuándo genero su `id` y por qué no lo cambio al completarla?
  El id se genera cuando creo una tarea nueva. No lo cambio al completarla porque el id sirve para identificar siempre a esa misma tarea. Al completar solo cambio el valor de completada.
- ¿Por qué dos tareas con el mismo texto necesitan identificadores diferentes?
  Porque dos tareas pueden tener el mismo texto pero, siguen siendo tareas dieferentes. Por eso cada una necesita un id distinto, para que se reconozca o se pueda saber exactamente cual estoy modificando o completando.
- ¿Qué hace `map` al completar una tarea y qué hace `filter` al mostrar Pendientes?
  map recorre todas las tareas y crea un nuevo array. Cuando encuentra la tarea que he seleccioando, crea una copia cambiando de completada a true. filter crea otro array seleccionando solo las tareas que cumplen esa condición, y en pendienets selecciona las qu etienen completada en false.
- ¿Por qué copio también el objeto que cambia y no solo el array?
  Copio el objeto con ...tarea para no modificar directamente la tarea original. Así creo un nuevo objeto con la misma información y solo cambio el valor de completada. De esta forma actualizo el estado creando los datos nuevos en lugar de cambiar directamente los anteriores.
- ¿Por qué no guardo pendientes y finalizadas en dos estados independientes?
  No necesito guardar las tareas pendientes y finalizadas por separado porque todas las tareas ya están en tareas. Uso filter para obtener las pendientes o las finalizadas según el valor de completada. Así tengo un único estado con todas las tareas y evito tener que mantener dos listas actualizadas.

## Reto 04 · Preguntas para investigar

- ¿Qué diferencia hay entre las tareas de la sección y los resultados visibles?
  Las tareas de la sección son todas las tareas que pertenecen a esa sección. Los resultados visibles son las tareas que coinciden con la búsqueda. Puedo tener 3 tareas pendientes, pero mostrar solo 1 de ellas si busco algo en concreto.
- ¿Por qué buscar no debe llamar a `setTareas` para sustituir los datos?
  Buscar solo debe cambiar las tareas que se muestran, no los datos originales. Los resultados se pueden calcular usando filter() a partir de tareas y busqueda. Si utilizo setTareas para guardar los resultados de la búsqueda, estaría eliminando de tareas las tareas que no coinciden y después podría perderlas al cambiar o limpiar la búsqueda.
- ¿Cómo distingo una sección vacía de una búsqueda sin resultados?
  Compruebo si una sección tiene tareas. Si no tiene ninguna, muestro el mensaje de lista vacía y el total es 0. Si sí tenemos tareas, pero después de aplicar la búsqueda no hay coincidencias, muestro el mensaje de "No hay resultados en la búsqueda". De esta forma sé si realmente no hay tareas o si simplemente la búsqueda no encuentra ninguna.
- ¿Por qué eliminar por el índice de la lista filtrada podría borrar otra tarea?
  El índice pertenece a la lista que estoy mostrando después de aplicar el filtro y no tiene por qué coincidir con la posición de la tarea en el array original. Por eso no usamos la posición. Utilizando el id se identifica de forma única la tarea que queremos eliminar.
- ¿Cómo utilizo `filter` para mostrar coincidencias y cómo lo utilizo para eliminar?
  Se utiliza filter() para generar una lista nueva de tareas que coinciden con el texto introducido en la búsqueda. Para eliminar también usamos filter(), pero conservamos todas las tareas cuyo id sea diferente al de la tarea que queremos eliminar. Después guardamos el nuevo array con setTareas().
- ¿Qué comprobé con dos tareas iguales y con tareas ocultas por la búsqueda?
  Comprobé que podemos eliminar una tarea aunque tenga el mismo texto que otra, porque cada una tiene un id diferente. Posteriormente verifiqué que, al eliminar una tarea que aparece en la búsqueda, las tareas que estaban ocultas por el filtro siguen existiendo.

## Reto 05 · Preguntas para investigar

- ¿Qué diferencia hay entre el estado en memoria y `localStorage`?
  Las tareas viven en el estado de React mientras la aplicación está abierta. Si recargo o cierro la página, ese estado se pierde. `localStorage` me permite guardarlas en el navegador y recuperarlas después.
- ¿Por qué utilizo JSON y por qué valido el resultado de `JSON.parse`?
  `localStorage` guarda texto, así que uso `JSON.stringify()` para convertir el array de tareas antes de guardarlo. Después uso `JSON.parse()` para recuperarlo. Valido el resultado porque un JSON puede estar bien escrito, pero no tener tareas con la estructura correcta.
- ¿Qué podría ocurrir si guardo un array vacío antes de leer los datos anteriores?
  Podría borrar sin querer las tareas que ya estaban guardadas. Por eso primero leo los datos con una función inicializadora de `useState`. Después se puede guardar el estado correcto sin sobrescribir los datos antiguos al empezar.
- ¿Por qué guardar sí necesita sincronización y filtrar la búsqueda no?
  Guardar necesita sincronización porque tengo que copiar los cambios de `tareas` a `localStorage`. Para eso uso `useEffect` cada vez que cambia ese estado. La búsqueda solo filtra lo que se muestra y se puede calcular otra vez sin guardar nada nuevo.
- ¿Qué debe pasar cuando elimino la última tarea?
  También tengo que guardar `[]` en `localStorage`. Así queda constancia de que ya no hay tareas. Si no lo hiciera, al recargar podría volver a aparecer la última tarea eliminada.
- ¿Qué ocurre si el navegador no permite guardar?
  La aplicación sigue funcionando con las tareas que tiene en memoria mientras la página está abierta. El `try/catch` captura el error y lo muestra en la consola. Al no poder guardar, esas tareas no se podrán recuperar después de recargar.

### Reto 05 — Lo que he aprendido

**Qué hice:**
Guardé las tareas en `localStorage` usando la clave `devquest.tareas.v1`. Preparé una lectura inicial con validación y un guardado que se ejecuta cuando cambia `tareas`.

**Para qué sirve:**
Sirve para que las tareas sobrevivan a una recarga o al cierre y la reapertura de la misma URL.

**Comprobación:**
Comprobé crear, recargar, completar, recuperar, eliminar y volver a recargar. También comprobé tareas repetidas, búsquedas, datos inválidos, IDs duplicados y el array vacío.

**Estado:**
Hecho. `npm run lint` y `npm run build` pasan desde `devquest/`.

## Seguimiento de la revisión · 17/09/2026, `3736740`

Los retos 01–05 están cerrados técnicamente. Las respuestas anteriores pertenecen al alumno; la revisión técnica no confirma por sí sola su comprensión. Queda explicar al tutor el inicializador de `useState`, la validación con `Set` y la dependencia `[tareas]` del efecto. No hace falta reescribir las respuestas: anota después las dudas o aclaraciones que salgan de esa conversación.

## Retos 06–08 · Preguntas para completar al avanzar

Estas preguntas se van respondiendo conforme avanzan los retos. Completa solo el bloque que estés trabajando, con ejemplos de tu código. Las descripciones de archivos del inicio deben mantenerse alineadas con las responsabilidades actuales.

### Reto 06 · Portal y rutas

**Estado:** cerrado funcionalmente, incluido el ajuste de cabecera móvil verificado en `f5cb81c`. La conversación de comprensión se registra en [Repaso con el tutor](REPASO-CON-TUTOR.md).

- ¿Qué diferencia hay entre cambiar `seccionActual` y navegar a `/tareas`?
  `seccionActual` cambia la sección dentro de Tareas sin cambiar la URL. Navegar a `/tareas` cambia la ruta global y React Router muestra `TareasPage`.
- ¿Qué responsabilidad tienen `BrowserRouter`, `Routes`, `Route` y `Link`?
  `BrowserRouter` proporciona el contexto de navegación. `Routes` contiene las rutas, `Route` relaciona cada URL con un componente y `Link` permite navegar sin recargar la página.
- ¿Dónde vive ahora el estado de Tareas? ¿Qué sucede al salir de esa página y volver?
  El estado de las tareas vive en `TareasPage`. Cuando salgo de esa página, el estado local se desmonta, pero las tareas se recuperan desde `localStorage` cuando vuelvo.
- ¿Por qué las tareas se recuperan pero el buscador puede reiniciarse?
  Las tareas se recuperan porque están guardadas en `localStorage`, mientras que el buscador es un estado de `TareasPage` y no se guarda, por lo que puede empezar de nuevo al volver.
- ¿Qué props recibe mi tarjeta y cómo represento una miniapp todavía no disponible?
  `MiniappCards` recibe los datos de cada miniapp mediante la prop `miniapp`. Si una miniapp todavía no tiene una ruta, la tarjeta muestra su estado informativo en lugar de crear un enlace de navegación.

### Reto 07 · Seleccionar y comprobar

**Estado:** terminado. Están implementados y comprobados los datos locales, la página del Quiz, la ruta `/quiz`, los enlaces del Portal/Header, la selección controlada, la comprobación de respuestas y la comunicación con el componente de pregunta. El recorrido completo y la pantalla final de resultados corresponden al Reto 08.

- ¿Por qué las preguntas son datos constantes y la selección es estado?
  Las preguntas son datos constantes porque están escritos en `src/data/Preguntas.js` y no cambian durante la partida. La selección sí es estado porque cambia cuando el usuario elige una opción.
- ¿Qué significa controlar un input `radio` desde React?
  Un `radio` controlado significa que su atributo `checked` depende de `seleccionadaId`. Cuando el usuario elige una opción, `onChange` actualiza ese estado y React vuelve a mostrar cuál está marcada.
- ¿Cómo comunica el componente de pregunta una elección a la página?
  `QuizQuestions` recibe por props la pregunta, `seleccionadaId`, `comprobada` y la función `onSeleccionar`. Cuando se elige un radio, el componente llama a `onSeleccionar(opcion.id)` y `QuizPage` actualiza el estado.
- ¿Por qué guardo un ID en vez de copiar la opción completa?
  Guardo el ID de la opción porque identifica de forma sencilla la respuesta elegida y permite compararlo con `respuestaCorrectaId`. No necesito copiar toda la opción.
- ¿Qué guardo al comprobar y qué puedo calcular? ¿Por qué no necesito un efecto?
  Al comprobar, guardo en `respuestasConfirmadas` el ID de la pregunta junto con el ID de la opción elegida. A partir de esos datos puedo calcular si la respuesta es correcta, si la pregunta ya está comprobada y, en `QuizResult`, cuántas respuestas son correctas con `filter().length`. No necesito un efecto porque estos valores se calculan directamente durante el renderizado a partir del estado y de los datos. Solo uso los setters para guardar los cambios que hace el usuario.

### Reto 08 · Recorrido y resultado

- ¿Qué datos necesito guardar para reconstruir el estado de la partida?
  Para reconstruir el estado de la partida necesito guardar `indicePregunta`, que indica qué pregunta estoy viendo; `seleccionadaId`, que guarda la opción elegida en esa pregunta; y `respuestasConfirmadas`, que relaciona el ID de cada pregunta con el ID de la opción que confirmé.
- ¿Cómo evito que una pregunta herede la selección de la anterior?
  Una pregunta no hereda la selección anterior porque `siguientePregunta` llama a `setSeleccionadaId(null)` cuando aumenta `indicePregunta`. Al mostrar la nueva pregunta, sus radios empiezan sin ninguna opción marcada y sus mensajes todavía no aparecen.
- ¿Cómo impido contar dos veces una misma respuesta?
  No puedo contar dos veces una respuesta porque `comprobada` se calcula comprobando si ya existe una respuesta para el ID de la pregunta actual. Además, `comprobarRespuesta` sale sin guardar si `comprobada` ya es verdadera y el botón de comprobar deja de mostrarse.
- ¿Cómo calculo la puntuación a partir de las respuestas confirmadas?
  En `QuizResult`, `filter()` recorre las preguntas y conserva las que tienen en `respuestasConfirmadas` el mismo ID que `respuestaCorrectaId`. Después, `length` cuenta esas preguntas y obtiene la puntuación sin guardar otro contador.
- ¿Qué reinicio al volver a jugar y qué sucede al salir de la ruta?
  `volverAJugar` reinicia `indicePregunta` a `0`, `seleccionadaId` a `null` y `respuestasConfirmadas` a `{}`. Si salgo de la ruta, `QuizPage` se desmonta y su estado desaparece; al volver se crea una partida nueva. Esto no modifica las tareas porque pertenecen a `TareasPage` y se guardan aparte en `localStorage`.
- ¿Cómo evito leer una pregunta que no existe al llegar al final?
  Para no leer una pregunta inexistente, cuando `indicePregunta` alcanza `preguntas.length`, `QuizPage` devuelve primero `QuizResult` y no intenta obtener `preguntas[indicePregunta]`. En la última pregunta, `verResultado` establece exactamente ese valor al pulsar «Ver resultado».

No quedan dudas pendientes sobre este bloque.

## Reto 09 · Primeras llamadas a una API

**Estado:** terminado en implementación y con las pruebas registradas abajo. La miniapp del catálogo está integrada en la ruta `/catalogo` y carga productos desde DummyJSON con `fetch` al pulsar el botón. Queda comentar la explicación con el tutor; la conversación no está hecha todavía.

- ¿Qué diferencia hay entre `response`, el resultado de `response.json()` y `datos.products`?
  `response` es el objeto que devuelve `fetch()`. Contiene la información HTTP de la petición, como el estado de la respuesta y `response.ok`, pero aún no tiene el contenido del catálogo como datos JavaScript. `response.json()` lee el cuerpo de la respuesta y lo interpreta como datos JavaScript. En este caso, esos datos tienen una propiedad `products` con el array de productos.
- ¿Qué espera cada `await`? ¿Qué ve el usuario mientras espera?
  El primer `await` espera a que termine la petición HTTP, es decir, a que llegue la respuesta del servidor. El segundo `await` espera a que `respuesta.json()` acabe de leer el cuerpo de la respuesta y lo interprete como datos JavaScript. No convierto los datos en JSON: al revés, `respuesta.json()` coge el texto JSON y me devuelve objetos de JavaScript que puedo usar en React. Mientras eso sucede, el estado cambia a `"cargando"` y el usuario ve un mensaje como «Cargando productos…».
- ¿Por qué un error HTTP necesita comprobar `response.ok` aunque haya `try/catch`?
  `response.ok` se comprueba porque una respuesta HTTP con error, como un 404, no lanza automáticamente un error en `fetch()`. Si `response.ok` es falso, se lanza un error para que lo capture `catch` y así mostrar el mensaje de error. La comprobación y el `try/catch` trabajan juntos.
- ¿Por qué esta petición se realiza desde el botón y no desde `useEffect`?
  La petición se dispara desde el botón: se ejecuta al pulsar «Cargar productos», no al montar el componente. Por eso no hace falta `useEffect`; la acción depende de la interacción del usuario.
- ¿Cómo diferencias la pantalla inicial de una respuesta con una lista vacía?
  Si la respuesta llega con un array vacío, se distingue la situación de una respuesta con lista vacía y se puede mostrar un mensaje adecuado.
- ¿Qué reinicias al reintentar y por qué sustituyes los productos en lugar de añadirlos a los anteriores?
  Al reintentar, primero se vuelve a poner el estado en `"cargando"`, se limpia el error y se vacía el array antes de pedir de nuevo. Después se sustituye el contenido del estado con `setProductos(datos.products)`, evitando acumular productos antiguos y duplicados. El botón se desactiva mientras la solicitud está en curso para no lanzar varias peticiones simultáneas.

**Ejemplo de la respuesta de productos:**

Cuando pido `https://dummyjson.com/products?limit=12` recibo un objeto como este (lo abrevio para no copiarlo entero):

```json
{
  "products": [
    {
      "id": 1,
      "title": "Essence Mascara Lash Princess",
      "description": "The Essence Mascara Lash Princess...",
      "price": 9.99,
      "thumbnail": "https://cdn.dummyjson.com/..."
    }
  ],
  "total": 194,
  "skip": 0,
  "limit": 12
}
```

`products` es el array con los productos que muestro en las tarjetas, y `total` es el número total que hay en el servidor. En mi código uso `setProductos(datos.products)` y `setTotalResultados(datos.total)`.

**Pruebas registradas:**

- Se comprobó la ruta `/catalogo` y la navegación desde el portal. Al entrar no se realiza ninguna petición hasta pulsar «Cargar productos». Resultado: correcto.

- Se verificó la carga manual de productos desde DummyJSON. Al pulsar el botón se realizó la petición y se recibieron 12 productos. Resultado: correcto.

- Se probó una carga lenta. Mientras esperaba la respuesta apareció «Cargando productos…» y el botón quedó deshabilitado. Resultado: correcto.

- Se probó un error de red sin conexión. Se mostró el mensaje de error y se pudo utilizar «Reintentar». Resultado: correcto.

- Se recuperó la conexión y se utilizó «Reintentar». La petición volvió a realizarse y los productos se mostraron correctamente. Resultado: correcto.

- Se probó temporalmente una ruta inexistente para provocar un error HTTP. `response.ok` permitió detectar el error y se mostró el estado de error. Resultado: correcto.

- Se comprobó una respuesta con un array `products` vacío. Se mostró «No hay productos disponibles» sin tratarlo como un error de conexión. Resultado: correcto.

- Se probó volver a cargar los productos. La lista anterior se sustituyó y no aparecieron duplicados. Resultado: correcto.

- Se comprobó el uso con teclado y los tamaños de 375 px y 1280 px. Resultado: correcto.

- Se ejecutó `npm run lint` y terminó correctamente.

- Se ejecutó `npm run build` y terminó correctamente.

## Reto 10 · GET, búsqueda y categorías

**Estado:** implementado y respondido en el cuaderno. Pendiente la prueba de cierre y comentarlo con el tutor (la conversación no está hecha).

- ¿Qué diferencia hay entre filtrar los productos descargados y enviar una búsqueda al servidor?
  **Filtrar en el cliente o buscar en el servidor.** Si me descargo todos los productos y luego los filtro con `filter()` en el navegador, solo puedo buscar entre los que ya tengo (por ejemplo, los 12 que devuelve `limit=12`). Si la búsqueda la hace el servidor, le mando el texto con `q` y me devuelve los productos que coinciden en toda su base de datos. Yo uso la segunda porque así la búsqueda es sobre todos los productos, no solo sobre los que ya me he descargado.
- ¿Cómo construyes la URL y qué ocurre si el texto contiene espacios o `&`?
  **Cómo construyo la URL.** Para el texto uso `URLSearchParams`:
  ```js
  const parametros = new URLSearchParams({
    q: textoBusqueda.trim(),
    limit: "12",
  });
  url = `https://dummyjson.com/products/search?${parametros}`;
  ```
  Si el texto lleva espacios o `&`, `URLSearchParams` los codifica solo (los espacios se convierten en `+` y `&` en `%26`), así que todo el texto viaja como un único valor de `q` y la URL no se rompe. Para la categoría uso `encodeURIComponent(categoriaSeleccionada)` porque va dentro de la ruta, no como parámetro.
- ¿Por qué el array de categorías se procesa de forma distinta a la respuesta de productos?
  **Por qué las categorías se procesan distinto.** La respuesta de categorías es directamente un array de textos (`["beauty", "fragrances", "groceries", ...]`), mientras que la de productos es un objeto con `products`, `total`, `skip` y `limit`. Por eso compruebo cosas diferentes:
  ```js
  if (!Array.isArray(datos)) {
    throw new Error("La respuesta no contiene una lista de categorias");
  }
  setCategorias(datos);
  ```
  ```js
  if (!Array.isArray(datos.products)) {
    throw new Error("La respuesta no contiene una lista de productos.");
  }
  setProductos(datos.products);
  ```
- ¿Qué diferencia hay entre los campos del formulario y la consulta aplicada? ¿Cuál usas al reintentar?
  **Campos del formulario y consulta aplicada.** Los campos (`modoConsulta`, `textoBusqueda`, `categoriaSeleccionada`) son lo que el usuario está escribiendo en ese momento. La consulta aplicada (`consultaAplicada`) guarda la URL, la descripción, el tipo y el valor de la última petición que sí se hizo. Así puedo cambiar los campos sin que cambien los resultados que ya están en pantalla. Al pulsar «Reintentar» uso `consultaAplicada`, no los campos, para repetir exactamente la misma búsqueda que falló:
  ```js
  onClick={() => cargarProductos(consultaAplicada)}
  ```
- ¿Qué representan `total` y `productos.length`?
  **Qué representan `total` y `products.length`.** `total` es el número de resultados que existen en el servidor para esa consulta y `products.length` es el número de productos que me ha devuelto realmente esa petición. Por ejemplo, con `limit=12` puedo recibir 12 productos aunque `total` sea 194, porque `limit` limita cuántos me traigo, no cuántos hay. `total` no cambia al editar o eliminar en local; solo cambia con una nueva consulta.

## Reto 11 · POST, PUT y DELETE

**Estado:** Cerrado funcionalmente tras revisar `84a2a01`. Puedes continuar con el reto 12. La conversación de comprensión con el tutor se registra por separado y sigue pendiente. Consulta el [registro de cierre](../retos/11-crear-editar-eliminar-api.md#registro-de-cierre).

### ¿Qué método, URL, cabecera y cuerpo utilizas para crear, leer, editar y eliminar?

- **Crear:** utilizo `POST` en `/products/add`, con la cabecera `Content-Type: application/json` y un cuerpo JSON con `title`, `description` y `price`.
- **Leer:** utilizo `GET` en `/products/{id}`. No necesita cuerpo.
- **Editar:** utilizo `PUT` en `/products/{id}`, con la cabecera `Content-Type: application/json` y un cuerpo JSON con los datos que quiero modificar.
- **Eliminar:** utilizo `DELETE` en `/products/{id}`. No necesito enviar un cuerpo.

### ¿Por qué `JSON.stringify` al enviar y `respuesta.json()` al recibir?

Utilizo `JSON.stringify` porque necesito convertir el objeto JavaScript a texto en formato JSON para enviarlo en el `body` de la petición.

Cuando recibo la respuesta utilizo `respuesta.json()` para convertir el JSON que devuelve el servidor en un objeto JavaScript que pueda utilizar en React.

### ¿Por qué un campo de precio vacío necesita validación antes de convertirlo a número?

Porque si convierto directamente un campo vacío con `Number("")`, JavaScript devuelve `0`.

Por eso primero compruebo que el campo no esté vacío y después convierto el valor a número. También compruebo que sea un número finito y mayor que cero.

### ¿Qué cambia en la pantalla cuando la petición tiene éxito y qué conservas cuando falla?

Cuando la petición tiene éxito, actualizo la interfaz con la información que devuelve el servidor.

Por ejemplo, después de un `PUT` actualizo la tarjeta del producto y después de un `DELETE` retiro la tarjeta de la pantalla.

Si la petición falla, mantengo la tarjeta o los datos del formulario y muestro un mensaje de error para que el usuario pueda volver a intentarlo.

### ¿Cómo evitas modificar la tarjeta mientras escribes su borrador?

Utilizo estados separados para los datos del formulario, como `titulo`, `descripcion` y `precio`.

Cuando escribo en el formulario modifico esos estados y no directamente el objeto del producto que aparece en la tarjeta.

Solo cuando el `PUT` responde correctamente actualizo la tarjeta con el producto que devuelve la API.

### ¿Por qué un alta simulada no se usa después como recurso para GET, PUT o DELETE?

Porque DummyJSON simula la creación y no guarda realmente el producto.

Aunque el `POST` devuelva un producto con un ID, ese producto no se crea realmente como un recurso permanente en el servidor.

Por eso, para editar o eliminar utilizo productos que ya existen y cuyos IDs he obtenido mediante un `GET`.

### ¿Por qué reaparece un producto borrado o su título anterior al consultar de nuevo DummyJSON?

Porque DummyJSON simula las operaciones de escritura.

El `PUT` y el `DELETE` responden correctamente, pero los cambios no se guardan realmente en el servidor.

Por eso React puede mostrar temporalmente el producto editado o eliminarlo de la pantalla, pero cuando hago un nuevo `GET`, el servidor devuelve los datos originales.

No es un problema del estado de React, sino del funcionamiento de la API de práctica.

## Reto 12 · Deploy en Vercel y ramas

**Estado:** cerrado el 30/09/2026 por acuerdo con el tutor. Publicación y flujo de ramas completados; la sincronización final queda bajo revisión del tutor. [Registro de cierre](../retos/12-deploy-vercel-y-ramas.md#registro-de-cierre--30092026).

- ¿Qué diferencia hay entre un commit, un push, una pull request y un despliegue? Localiza un ejemplo de cada uno en esta entrega.
  **Commit, push, pull request y despliegue:** un commit guarda el cambio en mi ordenador (`2e271b7`, `636e800`); el `push` lo sube a GitHub (mi `develop` pasó a `636e800`); la pull request propone pasar esos commits de `develop` a `main` (así se hizo con la PR #1 y la PR #3, merge `c22d4da`); y el despliegue es Vercel construyendo un commit y publicándolo (Preview de `636e800`, Production de `c22d4da`).
- ¿Para qué utilizo `develop` y `main`? ¿Qué comprobé en Preview antes de integrar el cambio?
  **`develop` y `main`:** `develop` es donde trabajo a diario y cada `push` ahí genera una **Preview** en Vercel, una URL de prueba. `main` guarda solo lo que ya está comprobado y es la rama que Vercel publica en **Production**. Un cambio en `develop` no toca la web publicada porque Vercel construye cada rama por separado.
  **Preview frente a Production:** es la misma aplicación, pero distinto commit y distinto origen. La Preview me deja probar el cambio antes de integrarlo y en Production solo aparece cuando se hace merge en `main`.
  **Flujo de trabajo:** `develop → Preview → pull request → main → Production`. La pull request es el momento de revisar qué va a entrar en producción y, después del merge, vuelvo a sincronizar `develop` con `main` para seguir trabajando.
- ¿Por qué Root Directory es `devquest` y Output Directory es `dist`? ¿Qué hace el build?
  **Root Directory `devquest`:** la aplicación no está en la raíz del repositorio, sino dentro de `devquest/`, que es donde están `package.json`, `vercel.json` y `src/`. Vercel tiene que construir desde esa carpeta, y por eso el `vercel.json` va junto a ese `package.json`. El **build** (`npm run build`) compila React y Tailwind y deja el resultado en `dist/`, que es el Output Directory.
- ¿Qué resuelve `vercel.json` cuando abro o recargo `/catalogo` directamente?
  **`vercel.json`:** como uso `BrowserRouter`, si abro o recargo `/catalogo` Vercel no encuentra ese archivo en el servidor. El rewrite `"/(.*)"` hacia `/index.html` hace que el servidor entregue siempre `index.html` y que sea React quien decida la pantalla. Lo he comprobado: `/tareas`, `/quiz`, `/catalogo`, `/crear-producto` y una ruta inventada devuelven el `index.html` y no dan un 404 de Vercel.
- ¿Por qué no aparecen en producción las tareas que guardé en localhost?
  `localStorage` guarda los datos por **origen**, no por aplicación. `http://localhost:5173` y `https://practicasnadunet.vercel.app` son orígenes distintos, así que cada uno tiene su propio almacenamiento: las tareas que creé en local se quedan en el navegador donde las creé y no viajan con el despliegue. La clave `devquest.tareas.v1` existe por separado en cada origen y puede tener contenidos diferentes (una URL de Preview también tendría los suyos). No es un fallo del despliegue: para ver tareas en la web publicada tengo que crearlas allí, y las de local siguen intactas en local.
- ¿Cómo identifico el commit publicado y cómo preparo una corrección si detecto un fallo?
  El commit publicado lo identifico en **Vercel**, donde cada despliegue indica si es Preview o Production y a qué commit corresponde, La revisión del 30/09/2026 registra Production correcta de `1f53ba6` y Preview de `4866234`. `main` contiene la versión que se quiere publicar; si el despliegue falla, la web puede seguir mostrando una versión anterior. En local, `git branch --show-current` y `git log --oneline -1` identifican mi rama y commit locales, no confirman por sí solos lo publicado.
  Si detecto un fallo, no toco `main` directamente: corrijo desde `develop`, lo compruebo en local (`npm run lint`, `npm run build` y el navegador), hago commit y `push`, reviso la **Preview** de ese commit y abro o actualizo la pull request `develop → main`. Después del merge, Vercel publica un nuevo despliegue de **Production**, lo compruebo y vuelvo a sincronizar `develop` con `main`. Si el fallo ya está en producción, aviso al tutor antes de preparar la corrección.

### Notas del bloque

- **GitHub con Vercel:** al importar el repositorio, Vercel se conecta a GitHub y despliega solo. Los despliegues aparecen en GitHub creados por `vercel[bot]`: uno de **Preview** por cada `push` a `develop` y uno de **Production** cada vez que `main` recibe un merge.
- **`npm ci`, `lint`, `build` y `preview`:** `npm ci` instala exactamente las versiones de `package-lock.json` (es lo que ejecuta Vercel). `npm run lint` revisa el código sin ejecutarlo y ahora pasa sin errores, porque `2e271b7` quitó un import que no se usaba. `npm run build` genera la carpeta `dist/`. `npm run preview` sirve esa compilación en local para revisarla; no publica nada en Internet.
- **`-u` en el primer push:** `git push -u origin develop` sube la rama y la deja enlazada con `origin/develop`, así los siguientes `push` y `pull` no necesitan indicar el remoto ni la rama.
- **Cierre acordado:** PR #3–#6 integradas y cambio visible publicado. El tutor revisa por separado la sincronización entre ramas. Las descripciones de PR, el acceso del tutor a Preview y la versión exacta de Node del servidor no quedan como tareas exigidas en esta entrega. Los ejemplos de commits anteriores se conservan como recorrido histórico.

## Reto 13 · Detalle de producto y efectos

**Estado:** terminado técnicamente; pendiente de merge a `main` y comprobación final en Vercel. [Enunciado y checklist](../retos/13-detalle-producto-y-efectos.md).

- ¿De dónde sale el ID y por qué la ficha funciona al abrir su URL sin visitar antes el catálogo?
  El ID sale de la URL. En `App.jsx` la ruta es `/catalogo/:id`, donde `:id` es un parámetro variable, y en la página lo leo con `const { id } = useParams();` (llega como texto). Al entrar desde una tarjeta, el enlace de `ProductoCard.jsx` apunta a `/catalogo/${producto.id}`. La ficha funciona por URL directa porque no le paso el producto por props: el efecto pide por su cuenta `https://dummyjson.com/products/${id}`. Por eso `/catalogo/1` carga sin visitar antes `/catalogo`.
- ¿Por qué aquí usas un efecto y en «Consultar» mantienes un manejador de evento?
  Porque son dos casos distintos. En el detalle manda el ID de la URL: al pasar de `/catalogo/1` a `/catalogo/2` debo pedir el producto nuevo, y eso se sincroniza con un efecto que depende de `[id]`. En el catálogo, «Consultar» es una acción del usuario, así que la petición sale del manejador `onSubmit`. Con un efecto se lanzaría sola al entrar y dependería del texto mientras escribo.
- ¿Cuándo vuelve a ejecutarse el efecto y cuándo se ejecuta su limpieza?
  Se ejecuta al montar la página y cada vez que cambia `id`, porque la dependencia es `}, [id]);`. La limpieza (la función que devuelve el efecto) corre justo antes de la siguiente ejecución y también al salir de la página. En la mía pongo `activa = false` y llamo a `controller.abort()`: la ejecución antigua deja de contar como actual y su petición se cancela.
- ¿Qué evita `AbortController`? ¿Cómo impides que una ejecución antigua cambie los datos o el error actuales?
  Cada ejecución crea su propio `new AbortController()` y pasa su `signal` al `fetch`; con `controller.abort()` se cancela la petición en vuelo al cambiar de ID o al salir de la página. Cancelar no basta, porque una respuesta lenta puede llegar tarde, así que cada ejecución tiene su `let activa = true` y los setters solo se usan dentro de `if (activa) { ... }`. No hay `finally`: el `cargando` se cierra dentro de esas comprobaciones, para que una ejecución vieja no toque el estado de la actual.
- ¿Cómo distingues ID inválido, producto inexistente, error de conexión y cancelación intencionada?
  Los cuatro casos los separo así:
  - **ID inválido:** lo compruebo antes de pedir nada, con `Number(id)` y la condición `!Number.isInteger(numeroId) || numeroId <= 0`; con `/catalogo/abc` muestro «El ID del producto no es válido.» sin hacer petición.
  - **Producto inexistente:** la petición sí se hace y la API contesta 404 (`/products/9999` da 404 y `/products/1` da 200); `response.status === 404` lanza «Producto no encontrado.» .
  - **Conexión u otro error HTTP:** `!response.ok` lanza «Error al cargar el producto.», y sin conexión es `fetch` quien lanza el error (un `TypeError`, no un `AbortError`); en el `catch` hago `setError(error.message)` y `setCargando(false)`.
  - **Cancelación intencionada:** si `error.name === "AbortError"` hago `return` sin tocar ningún estado, así que el usuario no ve un error que no ha provocado él.
- ¿Qué ocurre con el efecto en StrictMode durante el desarrollo y por qué no necesitas desactivarlo?
  En desarrollo React monta, ejecuta la limpieza y vuelve a montar, así que el efecto se ejecuta dos veces (inicio → limpieza → inicio). La primera petición se aborta y la segunda crea su propio controlador; como el `AbortError` se ignora, se ven los datos de la segunda sin ningún error. `StrictMode` sigue en `main.jsx` porque no es un fallo: avisa de efectos que no soportan repetirse, y en la versión compilada esto no pasa.

Las correcciones del [feedback del reto](../retos/13-detalle-producto-y-efectos.md#feedback-de-revisión--antes-de-seguir) ya están en el código; las dos aclaraciones que pide el documento van aquí.

**Mis explicaciones:**

- **Por qué guardar un error no termina la carga.** `setError(...)` solo cambia `error`; `cargando` es otro estado y sigue en `true` hasta que algo lo baje. Por eso antes quedaba «Cargando producto…» junto al error. Ahora cierro la carga en la validación del ID (`setCargando(false)` antes del `return`) y en el `catch`, dentro del `if (activa)` que acompaña a `setError(error.message)`.
- **Por qué `producto?.title` no oculta la ficha.** El `?.` solo evita leer una propiedad de `null` o `undefined`; no decide qué se dibuja en pantalla. Lo que oculta es `{producto && ( ... )}`, que envuelve el título, la imagen, la descripción, el precio y la categoría. Antes esas etiquetas estaban fuera y podían salir un « €» o un «Categoría:» sin datos; ahora carga, error y ficha son tres bloques separados.

**Pruebas realizadas:** bloques 2, 3 y 4 del reto, en el navegador (con Network abierto) y sobre la versión actual. Queda pendiente la entrega de `develop` a `main` y la comprobación de una URL de detalle en Vercel.

| Acción                                                                       | Resultado esperado                                                                 | Resultado observado                                                                                                                                                                             |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Entrar desde una tarjeta con «Ver detalle»                                   | Cambiar a `/catalogo/<id>` sin recargar y pedir ese producto a la API              | La URL cambió a la del producto y la petición fue la del ID de la tarjeta. Correcto                                                                                                             |
| Abrir directamente `/catalogo/1` y recargar                                  | La ficha se carga sola, sin recibir el producto por props ni pasar por el catálogo | Apareció «Cargando producto…» y después título, imagen con `alt`, descripción, precio y categoría. Correcto                                                                                     |
| ID inválido: `/catalogo/abc`                                                 | Mensaje comprensible, sin ficha anterior y sin petición a la API                   | Se mostró «El ID del producto no es válido.», no quedó nada de la ficha y no se creó ninguna petición para `abc`. Correcto                                                                      |
| Producto inexistente: `/catalogo/9999`                                       | Mensaje de no encontrado y la carga termina                                        | La API contestó 404 (`/products/1` sí responde 200), se mostró «Producto no encontrado.» y desapareció «Cargando producto…». Correcto                                                           |
| Sin conexión y después recuperarla                                           | Error de red sin carga infinita y carga correcta al reconectar                     | Desconectado apareció el mensaje del error de `fetch` y la carga se cerró; al volver a conectar y recargar, la ficha se cargó bien. Correcto (sin botón de reintento: el reto no lo pide)       |
| Red lenta y salir del detalle antes de la respuesta                          | Se cancela la petición y no se muestra ningún error al usuario                     | Al salir la petición quedó cancelada (`AbortError`) y no apareció ningún mensaje de error. Correcto                                                                                             |
| Cambiar rápido entre dos IDs mientras el primero carga                       | La respuesta lenta del primero no sustituye al segundo                             | Con dos enlaces temporales en la ficha (retirados después) salté de un ID a otro mientras cargaba: se mostró el producto del segundo ID y el primero no pisó ni los datos ni el error. Correcto |
| Transición de una ficha ya cargada a `/catalogo/abc` con navegación de React | Queda solo el mensaje de ID inválido, sin la ficha anterior                        | El producto anterior desapareció, quedó el mensaje de ID inválido y no se hizo petición. Correcto (recargar la página no reproduce este caso porque reinicia el estado)                         |
| Después de un error, navegar a un ID válido                                  | Desaparece el error y carga el producto correcto                                   | El error se limpió, la ficha del nuevo ID se cargó y la carga terminó. Correcto                                                                                                                 |
| Teclado y anchuras de 375 px y 1280 px                                       | Llegar a los enlaces con Tab y ver bien la ficha en móvil y escritorio             | Se alcanzaron «Ver detalle» y «Volver a catálogo» con Tab y foco visible; la tarjeta y la ficha se adaptaron a 375 px y 1280 px. Correcto                                                       |
| `npm run lint`                                                               | Termina sin errores                                                                | Se ejecutó desde `devquest/` y terminó sin avisos ni errores. Correcto                                                                                                                          |
| `npm run build`                                                              | Genera `dist/` correctamente                                                       | Terminó correctamente: 116 módulos transformados y los archivos de `dist/` generados. Correcto                                                                                                  |

## Feedback de revisión · antes de seguir

La ruta `/catalogo/:id`, el enlace desde las tarjetas, `useParams` y el efecto dependiente de `id` están bien encaminados. Lint y build pasan en la versión revisada. Conserva ese trabajo y centra la siguiente revisión en estos puntos:

- [x] **Termina la carga cuando hay un error.** En [ProductoDetallePage.jsx](../devquest/src/pages/ProductoDetallePage.jsx), el `catch` guarda el error pero deja `cargando` en `true`. Prueba un ID positivo inexistente y una petición sin conexión: debe aparecer el error y desaparecer «Cargando producto…». Si usas `finally`, al hacer el bloque 3 recuerda impedir que una petición antigua cambie el estado de la actual.
- [x] **Muestra solo el estado que corresponde.** La imagen, el precio y la categoría se renderizan incluso sin producto. Organiza el JSX para mostrar carga, error o ficha válida. `producto?.title` evita acceder a una propiedad de `null`, pero no oculta el resto del marcado; por eso pueden quedar un «€» o «Categoría:» sin datos.
- [x] **Evita conservar el producto anterior ante un ID inválido.** La validación hace `return` antes de limpiar `producto`. Prueba pasar desde una ficha cargada a `/catalogo/abc` mediante un `Link` temporal de React: debe quedar el mensaje de ID inválido, sin la ficha anterior y sin petición para `abc`. Retira el enlace de prueba después. Recargar toda la página no reproduce esta transición porque reinicia el estado.
- [x] **Corrige el comentario de la ruta.** En [App.jsx](../devquest/src/App.jsx), el comentario dentro de `<Routes>` usa `//`. Dentro del JSX debe escribirse como `{/* comentario */}`. Comprueba también que puedes explicar qué representa `:id`.
- [x] **Comprueba la recuperación.** Después de un error o un ID inválido, navega a un ID válido: desaparece el error, se carga el producto correcto y termina la carga.

**Orden para continuar:** corrige estos puntos → vuelve a comprobar el bloque 2 → sigue con el bloque 3 → realiza las pruebas del bloque 4. La ausencia de `AbortController` corresponde al trabajo que ya dejaste pendiente; no es una tarea nueva añadida por esta revisión.

**Alcance de la revisión:** lectura de código, lint y build, y pruebas aisladas de la lógica que confirmaron carga activa tras un 404 y conservación del producto al pasar a un ID inválido. No se verificó visualmente el entorno de Dev Tunnels. Los checks de pruebas finales siguen abiertos para que los completes en tu navegador.

## Reto 14 · Paginación del catálogo

**Estado:** implementación y pruebas funcionales completas. Queda únicamente comprobar el cambio en Preview, preparar la entrega hacia `main` con el tutor y verificar producción después del despliegue. [Enunciado y checklist](../retos/14-paginacion-del-catalogo.md).

- ¿Qué representan `limit`, `skip` y `total`? Calcula el `skip` de la página 3 con 12 productos por página.
  `limit` limita la cantidad de productos que devuelve una petición. `skip` es la cantidad de resultados que se omiten antes de empezar la página; no es el número de página. `total` es el total de resultados que informa el servidor para la consulta. En la página 3, `skip = (3 - 1) * 12 = 24`.
- ¿Qué datos guardas en estado y cuáles calculas? Enseña el cálculo de la última página.
  Guardo `pagina` y `totalResultados`. Calculo `skip` a partir de la página objetivo y `totalPaginas` con `Math.ceil(totalResultados / 12)`, así evito estados derivados duplicados. Si el servidor informa 194 resultados, hay `Math.ceil(194 / 12) = 17` páginas; la última empieza en `skip = (17 - 1) * 12 = 192` y contiene los 2 resultados restantes.
- ¿Por qué «Siguiente» utiliza la consulta aplicada y no el texto que estás escribiendo?
  Los campos del formulario son valores editables y pueden no haberse consultado. `consultaAplicada` conserva el tipo y el valor que produjeron los resultados, de modo que avanzar mantiene ese filtro hasta que envío otra consulta.
- ¿Por qué no puedes llamar al setter de página y leer inmediatamente el nuevo valor en el mismo manejador?
  React trata el estado como una instantánea del render actual. `setPagina(...)` solicita una actualización, pero la variable `pagina` del manejador no cambia inmediatamente. Por eso paso `paginaObjetivo` directamente a `cargarProductos(consultaAplicada, paginaObjetivo)`.
- Si falla la página 2 y cambias los campos, ¿qué petición hace «Reintentar»?
  Repite la URL guardada para la consulta y página que fallaron. Antes del `fetch`, se guarda en `consultaAplicada` la URL, el tipo, el valor, la descripción y la página; «Reintentar» usa ese objeto y no los campos editados después.
- ¿Por qué borrar una tarjeta con DummyJSON no cambia el total del servidor?
  El DELETE simulado quita la tarjeta del estado local, pero `totalResultados` conserva el total informado por el servidor. DummyJSON no persiste esa escritura, así que un GET posterior puede devolver otra vez el producto o su título original. No recalculo el total con `productos.length`.

La carga del catálogo sigue siendo manual desde el formulario y los botones; no se añadió un `useEffect`. Las respuestas actualizan los productos y el total juntos. Los botones de paginación respetan los límites de página y `operacionesBloqueadas`, y el manejador de carga también sale si el catálogo está cargando, se abre o permanece abierta la edición, se guarda o se elimina. Con cero resultados se mantiene el mensaje vacío y se ocultan el indicador y los botones; durante carga o error no se muestra la lista.

**Pruebas de cierre:** realizadas.

| Acción                            | Resultado esperado                                                                     | Resultado observado                                                                           |
| --------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Listado general: página 1 → 2 → 1 | Cambian `skip` e IDs y se puede volver a la primera página                             | Correcto; página 1 usa `skip=0`, página 2 `skip=12` y al volver se recupera la primera página |
| Última página                     | Puede tener menos de 12 productos y «Siguiente» queda deshabilitado                    | Correcto; se alcanza la última página y no permite avanzar                                    |
| Búsqueda y categoría              | La paginación conserva la consulta aplicada y respeta el `total` del servidor          | Correcto; Texto y Categoría mantienen su filtro al avanzar                                    |
| Nueva consulta desde página 2     | La nueva consulta empieza en página 1                                                  | Correcto                                                                                      |
| Cambiar formulario sin consultar  | «Siguiente» mantiene la consulta aplicada anterior                                     | Correcto                                                                                      |
| Error y reintento                 | Se vuelve a solicitar la misma página/consulta que falló                               | Correcto; el reintento conserva la URL intentada                                              |
| Cero resultados                   | Se muestra el mensaje vacío y no aparece «Página 1 de 0»                               | Correcto                                                                                      |
| Edición, eliminación y detalle    | Las operaciones siguen funcionando y los controles de paginación respetan los bloqueos | Correcto                                                                                      |
| Responsive, teclado, lint y build | La interfaz funciona y las comprobaciones técnicas pasan                               | Correcto                                                                                      |

## Comentarios explicativos en el código

Cuando utilices algo por primera vez, escribe un comentario breve con tus palabras junto a esa parte: qué guarda un estado, por qué haces una comprobación o por qué un dato vive en el padre. No comentes cada línea. Usa este archivo para explicaciones largas y actualiza los comentarios si cambia el código.

En JavaScript puedes usar `// comentario`. Dentro del marcado JSX se escribe `{/* comentario */}`.

## Registro de una sesión

Copia este bloque cuando quieras registrar un avance:

- **Fecha:**
- **Qué intenté conseguir:**
- **Qué cambié:**
- **Qué comprobé en el navegador:**
- **Qué entiendo ahora (con mis palabras):**
- **Qué duda me queda:**
