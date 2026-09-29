# Recordatorio de conceptos

Repaso escrito completado: [lista de revisión](REVISION-PENDIENTE.md). Para la conversación: [repaso con el tutor](../REPASO-CON-TUTOR.md).

App → Mantiene la estructura global: cabecera, contenido principal y pie de página.

TareasPage → Coordina el estado, las acciones, los filtros y la navegación interna de la aplicación de tareas.

useState → Guarda datos que pueden cambiar.

setTareas → Actualiza el estado de las tareas. React recibe un nuevo estado y puede volver a renderizar la interfaz. No debemos modificar directamente el estado original esperando que React detecte correctamente el cambio.

useEffect → Se ejecuta al montar el componente y después cuando cambia "tareas", porque "tareas" está incluida en el array de dependencias "[tareas]".

localStorage → Guarda las tareas en el navegador para poder recuperarlas después de recargar.

JSON.stringify → Convierte un valor de JavaScript, como el array de tareas, en texto JSON para poder guardarlo.

JSON.parse → Convierte el texto JSON guardado en valores de JavaScript.

try/catch → Permite controlar posibles errores, por ejemplo, al leer o analizar datos almacenados.

Set → Permite almacenar valores únicos y comprobar que no haya IDs repetidos.

map → Recorre un array y crea un nuevo array transformando sus elementos. En este proyecto puede utilizarse para crear una nueva lista de tareas modificando solo la tarea que corresponde.

filter → Crea un nuevo array únicamente con los elementos que cumplen una condición.

Props → Permiten pasar datos o funciones de un componente a otro.

onClick → Ejecuta una función cuando hacemos clic.

onChange → Detecta cambios realizados en un input.

onSubmit → Ejecuta la función asociada cuando se envía un formulario.

event.preventDefault() → Evita el envío por defecto del navegador. `Article` lo utiliza dentro del manejador conectado a `onSubmit`.

Input controlado → El valor del input procede del estado mediante `value` y se actualiza con `onChange`.

BrowserRouter → Proporciona el contexto para que React Router gestione la navegación basada en la URL.

Routes y Route → `Routes` contiene las rutas y cada `Route` relaciona una dirección, como `/`, `/tareas` o `/quiz`, con el componente que debe mostrarse.

Link → Permite cambiar de ruta sin recargar la aplicación. Se utiliza en las tarjetas de Tareas y Quiz y en el enlace de la página no encontrada. La cabecera utiliza `NavLink` para señalar la ruta activa.

Quiz → `QuizPage` recorre las preguntas de `Preguntas.js`. Sus opciones se generan con `map()` y se controlan con `seleccionadaId`. `QuizQuestions` recibe los datos y comunica la selección mediante un callback; el formulario permite comprobar una vez, bloquea las opciones y muestra el resultado y la explicación. `QuizResult` muestra el resumen final y permite volver a jugar.

Navegación global e interna → Las rutas cambian la pantalla según la URL. La navegación interna de Tareas cambia `seccionActual` mediante estado, sin cambiar la URL.

Tailwind → Sus clases controlan el diseño, los tamaños, los espacios y la adaptación a diferentes tamaños de pantalla.

## Catálogo de productos

`CatalogoPages.jsx` coordina las consultas a DummyJSON; el formulario no consulta hasta que se envía. Los modos y las URLs están en la sección «Catálogo de productos» del [README del proyecto](../README.md#catálogo-de-productos), y los estados, la consulta aplicada y la validación de la respuesta, en [Apuntes § 31](APUNTES_ESTUDIO_REACT.md#31-catálogo-consultas-a-la-api).

## Preguntas

Las preguntas de repaso con respuesta están en [Preguntas.md](Preguntas.md).

## Funcionamiento del guardado en `localStorage`

Al añadir, completar, recuperar o eliminar tareas se crea una lista nueva con `setTareas`, y el `useEffect` que depende de `[tareas]` la guarda con `JSON.stringify`. Cambiar la búsqueda no cambia `tareas`, así que no vuelve a guardar; al eliminar la última tarea se guarda `[]`. El recorrido completo está en [Apuntes § 16–19](APUNTES_ESTUDIO_REACT.md#16-localstorage).

## Registro breve de pruebas

- **Navegación:** se comprobó el acceso entre `/`, `/tareas` y `/quiz`, además de atrás y adelante del navegador. La URL y la página mostrada coinciden.
- **Ruta inexistente:** se comprobó `/no-existe`. Se muestra la página no encontrada y el enlace permite volver al portal.
- **Persistencia:** se crearon dos tareas, se completó una, se salió al portal y se volvió a Tareas. Las dos tareas y sus estados se conservaron sin duplicarse. También se comprobó la recarga directa de `/tareas`.
- **Operaciones de tareas:** se probaron crear, completar, recuperar, buscar y eliminar tareas. El comportamiento fue correcto.
- **Teclado y foco:** se recorrieron los elementos interactivos con el teclado y se comprobó que el foco era visible. También se comprobó el envío mediante teclado.
- **Responsive:** se comprobó el portal y Tareas a 375 px y 1280 px. No se detectaron problemas de disposición ni desbordamiento horizontal.
- **URL larga:** se comprobó una URL larga del reto 04. La aplicación mantuvo el funcionamiento y la ruta inexistente permitió volver al portal.

**Resultado:** todas las comprobaciones realizadas fueron correctas y no se detectaron fallos durante las pruebas.