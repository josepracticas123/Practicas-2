# Mi cuaderno de aprendizaje

Esta revisión ordena las notas iniciales y las ajusta al código actual. Que un concepto aparezca en el proyecto significa que lo has utilizado; explica con tus palabras cómo funciona antes de marcarlo como comprendido.

## Archivos que ya he encontrado

| Archivo o carpeta | Para qué sirve en este proyecto |
| --- | --- |
| `package.json` | Define scripts, dependencias de la app y herramientas de desarrollo. |
| `package-lock.json` | Registra las versiones concretas del árbol de dependencias que instala npm. Se guarda en Git. |
| `index.html` | Contiene el elemento `root` y carga el punto de entrada `src/main.jsx`. |
| `src/main.jsx` | Importa estilos y React, crea la raíz con `createRoot` y renderiza `App` dentro de `StrictMode` y `BrowserRouter`. |
| `src/App.jsx` | Mantiene la estructura global y decide mediante `Routes` qué página mostrar. |
| `src/pages/TareasPage.jsx` | Mantiene el estado, las acciones, los filtros y la persistencia de la aplicación de tareas. |
| `src/pages/PortalPage.jsx` | Define los datos de las miniapps y muestra sus tarjetas. |
| `src/pages/QuizPage.jsx` | Muestra la primera pregunta del Quiz y controla la opción seleccionada. |
| `src/data/Preguntas.js` | Contiene las cinco preguntas locales con sus opciones, respuestas correctas y explicaciones. |
| `src/utils/Almacenamiento.js` | Lee y guarda las tareas en `localStorage`, comprobando que los datos tengan el formato esperado. |
| `src/components/Header.jsx` | Muestra enlaces globales a Portal, Tareas y Quiz. |
| `src/components/Article.jsx` | Contiene el formulario controlado para añadir tareas y llama a `addTareas`, recibida por props. |
| `src/components/MiniappCards.jsx` | Recibe los datos de una miniapp por props y muestra su tarjeta y enlace cuando existe una ruta. |
| `src/components/Footer.jsx` | Muestra el pie de página. |
| `src/index.css` | Importa Tailwind; las clases de los componentes dan estilo a la pantalla. |
| `vite.config.js` | Configura los plugins de React y Tailwind para Vite. |
| `node_modules/` | Contiene las dependencias instaladas. No se guarda en Git. |
| `dist/` | Contiene los archivos que genera `npm run build` para publicar la app. No se guarda en Git. |
| `.gitignore` | Indica qué archivos sin seguimiento debe ignorar Git. No oculta archivos ya publicados ni sustituye proteger secretos. |

## Lo que ya aparece en mi código

Completa la última columna con un ejemplo de tu aplicación y marca cada casilla cuando puedas explicarlo al tutor.

| Concepto utilizado | Lo puedo explicar | Mi explicación o duda |
| --- | --- | --- |
| Componente: `Header` o `Article` | [x] | Son partes de la interfaz separadas en archivos. `Header` muestra el título y el menú, y `Article` contiene el formulario para añadir tareas. |
| `import` y `export` | [x] | `import` permite utilizar un componente o función de otro archivo y `export` permite que ese archivo pueda ser utilizado desde otros. |
| JSX y `className` | [x] | JSX permite escribir la estructura que se muestra en la página dentro de React. `className` se utiliza para poner clases CSS, en este caso clases de Tailwind. |
| `useState`: texto del input, sección actual y array de tareas | [x] | `useState` guarda datos que pueden cambiar. En mi aplicación guarda el texto del input, la sección seleccionada y las tareas. |
| Input controlado: `value` y `onChange` | [x] | El valor del input está controlado por el estado `textoTarea`. `onChange` actualiza ese estado cuando escribo. |
| Evento `onClick` | [x] | `onClick` ejecuta una función cuando pulso un botón. Se usa en la navegación interna y en las acciones de las tareas. El alta se centraliza en `onSubmit`. |
| Comprobación con `trim()` | [x] | `trim()` elimina los espacios del principio y del final del texto. Lo utilizo para evitar guardar tareas vacías o que solo tengan espacios. |
| Nuevo array con `[...tareas, tarea]` | [x] | Creo un array nuevo copiando las tareas anteriores y añadiendo la nueva. Así actualizo el estado sin modificar directamente el array anterior. |
| Renderizar una lista con `map` y `key` | [x] | `map` recorre el array de tareas y crea un elemento para cada tarea. `key` permite que React identifique cada elemento de la lista. |
| Renderizado condicional con `seccionActual` y `&&` | [x] | Compruebo qué sección está seleccionada y solo muestro su contenido. El operador `&&` permite renderizar el JSX cuando la condición es verdadera. |
| Props y callback `addTareas` | [x] | `TareasPage` pasa `addTareas` a `Inicio`, y `Inicio` la pasa a `Article`. `Article` llama a esa función y la página actualiza el estado de tareas. |
| Clases de Tailwind | [x] | Son clases que utilizo directamente en `className` para aplicar estilos como colores, espacios, bordes, tamaños y alineación. |

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
Permite guardar mas información que un simple texto. En la app guardo el texto de tarea, un  id para identificarla y completada pra saber si esta pendiente o finalizada.
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

**Estado:** terminado. La estructura de rutas, el Portal, los enlaces y la navegación están implementados y comprobados.

- ¿Qué diferencia hay entre cambiar `seccionActual` y navegar a `/tareas`?
- ¿Qué responsabilidad tienen `BrowserRouter`, `Routes`, `Route` y `Link`?
- ¿Dónde vive ahora el estado de Tareas? ¿Qué sucede al salir de esa página y volver?
- ¿Por qué las tareas se recuperan pero el buscador puede reiniciarse?
- ¿Qué props recibe mi tarjeta y cómo represento una miniapp todavía no disponible?

**Mi explicación:** `seccionActual` cambia la sección dentro de Tareas sin cambiar la URL. Navegar a `/tareas` cambia la ruta global y React Router muestra `TareasPage`.

`BrowserRouter` proporciona el contexto de navegación. `Routes` contiene las rutas, `Route` relaciona cada URL con un componente y `Link` permite navegar sin recargar la página.

El estado de las tareas vive en `TareasPage`. Cuando salgo de esa página, el estado local se desmonta, pero las tareas se recuperan desde `localStorage` cuando vuelvo.

Las tareas se recuperan porque están guardadas en `localStorage`, mientras que el buscador es un estado de `TareasPage` y no se guarda, por lo que puede empezar de nuevo al volver.

`MiniappCards` recibe los datos de cada miniapp mediante la prop `miniapp`. Si una miniapp todavía no tiene una ruta, la tarjeta muestra su estado informativo en lugar de crear un enlace de navegación.

### Reto 07 · Seleccionar y comprobar

**Estado:** terminado. Están implementados y comprobados los datos locales, la página del Quiz, la ruta `/quiz`, los enlaces del Portal/Header, la selección controlada, la comprobación de respuestas y la comunicación con el componente de pregunta. El recorrido completo y la pantalla final de resultados corresponden al Reto 08.

- ¿Por qué las preguntas son datos constantes y la selección es estado?
- ¿Qué significa controlar un input `radio` desde React?
- ¿Cómo comunica el componente de pregunta una elección a la página?
- ¿Por qué guardo un ID en vez de copiar la opción completa?
- ¿Qué guardo al comprobar y qué puedo calcular? ¿Por qué no necesito un efecto?

**Mi explicación:**

- Las preguntas son datos constantes porque están escritos en `src/data/Preguntas.js` y no cambian durante la partida. La selección sí es estado porque cambia cuando el usuario elige una opción.
- Un `radio` controlado significa que su atributo `checked` depende de `seleccionadaId`. Cuando el usuario elige una opción, `onChange` actualiza ese estado y React vuelve a mostrar cuál está marcada.
- `QuizQuestions` recibe por props la pregunta, `seleccionadaId`, `comprobada` y la función `onSeleccionar`. Cuando se elige un radio, el componente llama a `onSeleccionar(opcion.id)` y `QuizPage` actualiza el estado.
- Guardo el ID de la opción porque identifica de forma sencilla la respuesta elegida y permite compararlo con `respuestaCorrectaId`. No necesito copiar toda la opción.
- Al comprobar, guardo en `respuestasConfirmadas` el ID de la pregunta junto con el ID de la opción elegida. A partir de esos datos puedo calcular si la respuesta es correcta, si la pregunta ya está comprobada y, en `QuizResult`, cuántas respuestas son correctas con `filter().length`.
- No necesito un efecto porque estos valores se calculan directamente durante el renderizado a partir del estado y de los datos. Solo uso los setters para guardar los cambios que hace el usuario.

### Reto 08 · Recorrido y resultado

- ¿Qué datos necesito guardar para reconstruir el estado de la partida?
- ¿Cómo evito que una pregunta herede la selección de la anterior?
- ¿Cómo impido contar dos veces una misma respuesta?
- ¿Cómo calculo la puntuación a partir de las respuestas confirmadas?
- ¿Qué reinicio al volver a jugar y qué sucede al salir de la ruta?
- ¿Cómo evito leer una pregunta que no existe al llegar al final?

**Mi explicación:**

- Para reconstruir el estado de la partida necesito guardar `indicePregunta`, que indica qué pregunta estoy viendo; `seleccionadaId`, que guarda la opción elegida en esa pregunta; y `respuestasConfirmadas`, que relaciona el ID de cada pregunta con el ID de la opción que confirmé.
- Una pregunta no hereda la selección anterior porque `siguientePregunta` llama a `setSeleccionadaId(null)` cuando aumenta `indicePregunta`. Al mostrar la nueva pregunta, sus radios empiezan sin ninguna opción marcada y sus mensajes todavía no aparecen.
- No puedo contar dos veces una respuesta porque `comprobada` se calcula comprobando si ya existe una respuesta para el ID de la pregunta actual. Además, `comprobarRespuesta` sale sin guardar si `comprobada` ya es verdadera y el botón de comprobar deja de mostrarse.
- En `QuizResult`, `filter()` recorre las preguntas y conserva las que tienen en `respuestasConfirmadas` el mismo ID que `respuestaCorrectaId`. Después, `length` cuenta esas preguntas y obtiene la puntuación sin guardar otro contador.
- `volverAJugar` reinicia `indicePregunta` a `0`, `seleccionadaId` a `null` y `respuestasConfirmadas` a `{}`. Si salgo de la ruta, `QuizPage` se desmonta y su estado desaparece; al volver se crea una partida nueva. Esto no modifica las tareas porque pertenecen a `TareasPage` y se guardan aparte en `localStorage`.
- Para no leer una pregunta inexistente, cuando `indicePregunta` alcanza `preguntas.length`, `QuizPage` devuelve primero `QuizResult` y no intenta obtener `preguntas[indicePregunta]`. En la última pregunta, `verResultado` establece exactamente ese valor al pulsar «Ver resultado».

No quedan dudas pendientes sobre este bloque.

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
