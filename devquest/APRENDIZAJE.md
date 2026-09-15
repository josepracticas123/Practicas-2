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
| Componente: `Header` o `Article` | [ ] | Pendiente de completar |
| `import` y `export` | [ ] | Pendiente de completar |
| JSX y `className` | [ ] | Pendiente de completar |
| `useState`: texto del input, sección actual y array de tareas | [ ] | Pendiente de completar |
| Input controlado: `value` y `onChange` | [ ] | Pendiente de completar |
| Evento `onClick` | [ ] | Pendiente de completar |
| Comprobación con `trim()` | [ ] | Pendiente de completar |
| Nuevo array con `[...tareas, tarea]` | [ ] | Pendiente de completar |
| Renderizar una lista con `map` y `key` | [ ] | Pendiente de completar |
| Renderizado condicional con `seccionActual` y `&&` | [ ] | Pendiente de completar |
| Props y callback `addTareas` | [ ] | Pendiente de completar |
| Clases de Tailwind | [ ] | Pendiente de completar |

## Reto 02 · Preguntas para investigar

No hace falta responderlas antes de empezar. Complétalas según avances:

- ¿Qué estado decide si se muestra Inicio, Pendientes o Finalizadas?
- ¿Por qué el array de secciones puede ser una constante?
- ¿Cómo se entera `App` de que he pulsado una opción del navbar?
- ¿Qué diferencia hay entre comprobar un texto dentro de una función y mostrar JSX según una condición?
- ¿Cómo decido entre mostrar la lista de pendientes y el mensaje de lista vacía?
- ¿Qué recorrido hace el texto desde el input de `Article` hasta el array de `App`?
- ¿Por qué las tareas siguen ahí cuando `Article` deja de mostrarse?
- ¿Qué diferencia hay entre comprobar `trim()` y guardar su resultado?
- ¿Cómo se escribe un comentario dentro de JSX para que no aparezca como texto en la página?

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
