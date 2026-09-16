# Mi cuaderno de aprendizaje

Esta revisión ordena las notas iniciales y las ajusta al código actual. Que un concepto aparezca en el proyecto significa que lo has utilizado; explica con tus palabras cómo funciona antes de marcarlo como comprendido.

## Archivos que ya he encontrado

| Archivo o carpeta | Para qué sirve en este proyecto |
| --- | --- |
| `package.json` | Define scripts, dependencias de la app y herramientas de desarrollo. |
| `package-lock.json` | Registra las versiones concretas del árbol de dependencias que instala npm. Se guarda en Git. |
| `index.html` | Contiene el elemento `root` y carga el punto de entrada `src/main.jsx`. |
| `src/main.jsx` | Importa estilos y React, crea la raíz con `createRoot` y renderiza `App` dentro de `StrictMode`. |
| `src/App.jsx` | Guarda la sección actual y las tareas; pasa props a `Header` y `Article`, y decide qué contenido mostrar. |
| `src/components/Header.jsx` | Muestra el título y los botones del navbar; recibe la sección activa y la función para cambiarla. |
| `src/components/Article.jsx` | Contiene el input para añadir tareas y llama a `addTareas`, recibida por props. La lista se renderiza desde `App`. |
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
| Evento `onClick` | [x] | `onClick` ejecuta una función cuando pulso un botón. En el navbar cambia la sección y en el botón de añadir guarda la tarea. |
| Comprobación con `trim()` | [x] | `trim()` elimina los espacios del principio y del final del texto. Lo utilizo para evitar guardar tareas vacías o que solo tengan espacios. |
| Nuevo array con `[...tareas, tarea]` | [x] | Creo un array nuevo copiando las tareas anteriores y añadiendo la nueva. Así actualizo el estado sin modificar directamente el array anterior. |
| Renderizar una lista con `map` y `key` | [x] | `map` recorre el array de tareas y crea un elemento para cada tarea. `key` permite que React identifique cada elemento de la lista. |
| Renderizado condicional con `seccionActual` y `&&` | [x] | Compruebo qué sección está seleccionada y solo muestro su contenido. El operador `&&` permite renderizar el JSX cuando la condición es verdadera. |
| Props y callback `addTareas` | [x] | `App` pasa `addTareas` a `Article` mediante props. `Article` llama a esa función cuando se añade una tarea y así puede modificar el estado que está en `App`. |
| Clases de Tailwind | [x] | Son clases que utilizo directamente en `className` para aplicar estilos como colores, espacios, bordes, tamaños y alineación. |

## Reto 02 · Preguntas para investigar

No hace falta responderlas antes de empezar. Complétalas según avances:

- ¿Qué estado decide si se muestra Inicio, Pendientes o Finalizadas?
El estado seccionActual es el que indica en qué sección estoy. Dependiendo de si vale inicio, pendientes o finalizadas, se muestra una sección u otra.
- ¿Por qué el array de secciones puede ser una constante?
Porque las secciones que tengo en la aplicación son siempre las mismas y no necesito cambiarlas. Por eso puedo tenerlas en una constante con const en vez de guardarlas en un estado.
- ¿Cómo se entera `App` de que he pulsado una opción del navbar?
App le pasa a Header la función setSeccionActual. Cuando pulso un botón, Header utiliza esa función y le pasa el id de la sección que he elegido. Así cambia seccionActual en App.
- ¿Qué diferencia hay entre comprobar un texto dentro de una función y mostrar JSX según una condición?
Cuando compruebo un texto dentro de una función estoy decidiendo qué hacer con ese dato. En cambio, en el JSX la condición sirve para decidir qué quiero enseñar en pantalla.
- ¿Cómo decido entre mostrar la lista de pendientes y el mensaje de lista vacía?
Miro cuántas tareas hay en el array tareas. Si no hay ninguna, muestro el mensaje de que todavía no hay tareas. Si hay alguna, las recorro con map y las muestro.
- ¿Qué recorrido hace el texto desde el input de `Article` hasta el array de `App`?
Primero escribo la tarea en el input y onChange va guardando lo que escribo en textoTarea. Cuando pulso "Añadir tarea", se limpia el texto con trim() y Article llama a addTareas. Esa función está en App y añade la tarea al array tareas.
- ¿Por qué las tareas siguen ahí cuando `Article` deja de mostrarse?
Al hacer trim() puedo comprobar si el texto tiene algo más que espacios. Si guardo el resultado de trim(), además me aseguro de que la tarea se guarde ya sin los espacios que sobraban.
- ¿Qué diferencia hay entre comprobar `trim()` y guardar su resultado?
en la página?
Dentro de JSX tengo que escribirlo entre {/* y */}. De esta forma React lo entiende como un comentario y no lo muestra en la página.
- ¿Cómo se escribe un comentario dentro de JSX para que no aparezca como texto en la página?
{/* see scribe dentro de los corchetes y la barra y asterisco*/}
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
