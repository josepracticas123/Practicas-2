# 02 · Navega por tu aplicación de tareas

**Tu misión:** terminar de dar sentido a las secciones «Inicio», «Pendientes» y «Finalizadas» que ya has creado. Cada opción debe mostrar un contenido claro y las tareas deben conservarse al navegar.

**Practicarás:** renderizado condicional, estado, props y callbacks. Trabaja sobre tu aplicación actual y conserva Tailwind y tus componentes.

## Lo que ya tienes

Ya has construido el navbar con `map`, destacado la opción activa y utilizado `seccionActual` para mostrar contenido con `&&`. También guardas `tareas` en `App` y pasas `addTareas` a `Article`. Has empezado a explicar el código con comentarios.

Reutiliza ese trabajo. Este reto consiste en corregir detalles, completar las vistas y comprobar que puedes explicar cómo se conectan las piezas.

## 1. Limpia los detalles que dificultan revisar la pantalla

Haz estos cambios pequeños y compruébalos uno a uno:

- En `App.jsx` hay un fragmento suelto que empieza con «para poder cambiar la sección actual…» y termina con `*/`. Ahora es texto de la pantalla. Retíralo o conviértelo en un comentario JSX completo con `{/* … */}`.
- `secciones` no cambia durante el uso de la app. Decláralo como un array constante en lugar de usar `useState` con un `setSecciones` que no utilizas. Mantén en estado `seccionActual` y `tareas`, que sí cambian.
- En `Article.jsx`, retira el import de `useEffect`, porque no lo estás utilizando.
- El input ya tiene `type="text"` correcto. Añade una etiqueta visible «Nueva tarea», asociada al input mediante `htmlFor` e `id`.
- Cambia los nombres internos `name`, `setName` y `addNames` por otros relacionados con tareas, por ejemplo `textoTarea`, `setTextoTarea` y `enviarTarea`. Actualiza todas sus referencias.

Ejecuta `npm run lint` desde `devquest/`. Comprueba que desaparecen los errores de variables e imports sin utilizar.

## 2. Define qué muestra cada sección

Mantén cabecera, navbar y pie de página visibles. Organiza el contenido así:

| Sección | Contenido esperado |
| --- | --- |
| Inicio | Título «Añadir tarea», etiqueta, input y botón «Añadir tarea». |
| Pendientes | Título «Tareas pendientes», total y lista; si está vacía, un mensaje explicativo. |
| Finalizadas | Título «Tareas finalizadas» y mensaje fijo «La opción de finalizar tareas todavía no está disponible». |

En `Article`, sustituye «Contador de tareas» por «Añadir tarea» y retira el título «Lista de tareas», porque esa lista se muestra en Pendientes.

Retira el resumen fijo «0 de 1 completados»: ya no representa lo que hace esta pantalla. En Pendientes mostrarás el número real de tareas con la longitud del array.

**Alcance de Finalizadas:** solo debes mostrar su título y mensaje cuando se seleccione. No tienes que implementar acciones para finalizar tareas ni cambiar los textos del array a objetos. Todas las tareas añadidas se consideran pendientes en este ejercicio.

## 3. Completa el renderizado condicional

1. Conserva `seccionActual` en `App`, inicialmente con el valor `inicio`.
2. Revisa las condiciones que ya muestran Inicio y Pendientes. Añade la condición que falta para Finalizadas.
3. Coloca el título y el contenido de cada sección dentro de su condición, para que solo aparezca la sección seleccionada.
4. Conserva el estilo de opción activa del navbar. Añade `type="button"` a sus botones y `aria-pressed` según estén seleccionados para expresar también ese estado de forma accesible.
5. Comprueba el recorrido: Inicio → Pendientes → Finalizadas → Inicio. Siempre debe haber un contenido que explique dónde estás.

El navbar ya recibe datos y la función que actualiza la sección. Explica con tus palabras qué prop se utiliza al pulsar y qué estado cambia en `App`.

**Pista:** utiliza condiciones en JSX para decidir qué se renderiza. No necesitas rutas ni cambiar la URL. Si una condición ya funciona, basta con revisarla y entenderla.

## 4. Distingue una lista vacía de una lista con tareas

Dentro de Pendientes:

- Muestra el total real de tareas, también cuando sea cero.
- Si no hay tareas, muestra «Todavía no hay tareas pendientes. Añade una desde Inicio».
- Si hay tareas, muestra su contenido en una lista HTML con `ul` o `ol` y elementos `li`.

Puedes usar un ternario para elegir entre el mensaje y la lista. Si eliges `&&`, compara explícitamente la longitud: un cero a la izquierda de `&&` puede acabar apareciendo en pantalla.

## 5. Revisa cómo añades y conservas las tareas

Ya compruebas `trim()`, pero añades el texto original. En `addTareas`, prepara el texto sin espacios al principio o al final, comprueba que no esté vacío y añade ese valor limpio al array.

Mantén la actualización mediante un array nuevo. Conserva también el comportamiento de limpiar el input cuando se añade una tarea válida.

**No muevas el array fuera de `App`:** ya vive en un componente que permanece montado al cambiar de sección. Comprueba ese comportamiento y explica por qué la tarea permanece aunque `Article` deje de renderizarse.

El texto que aún no has enviado puede perderse al salir de Inicio, porque pertenece a `Article`. Las tareas ya añadidas deben conservarse. Recargar la página puede vaciarlas; no necesitas guardado persistente.

## 6. Explica lo que vas entendiendo

Revisa los comentarios que has empezado a añadir. Usa tus palabras para explicar:

- Por qué `secciones` es una constante y `seccionActual` es estado.
- Cómo una condición decide qué sección se muestra.
- Cómo `Article` solicita añadir una tarea a `App`.
- Por qué las tareas permanecen al navegar.

Mantén los comentarios breves y junto a la parte que explican. No hace falta comentar cada línea. Completa las preguntas de [APRENDIZAJE.md](../devquest/APRENDIZAJE.md) según avances; anota las dudas que quieras revisar con el tutor.

## Comprueba tu entrega

Revisión del 16/09/2026 sobre `742f6b7`: código, pruebas en navegador y comandos de validación. Los checks técnicos están verificados; la explicación personal queda para revisar con el tutor.

- [x] Al arrancar se muestra Inicio y su opción está destacada.
- [x] Las tres opciones muestran únicamente su sección, con cabecera y pie siempre visibles.
- [x] No aparece texto suelto de comentarios ni el progreso fijo de la antigua maqueta.
- [x] El input tiene una etiqueta visible y los textos hablan de tareas.
- [x] En Pendientes, cero tareas muestra el total y el mensaje de lista vacía.
- [x] Un texto vacío o solo con espacios no crea una tarea.
- [x] « Leer React » se guarda como «Leer React»; compruébalo inspeccionando el valor, porque HTML puede disimular espacios al mostrarlo.
- [x] Añadir «Leer React» y «Practicar JSX» muestra dos tareas y total 2.
- [x] Visitar Finalizadas y regresar a Pendientes conserva ambas tareas sin duplicarlas.
- [x] Finalizadas muestra su título y el mensaje provisional.
- [x] El navbar funciona con Tab y Enter o Espacio, y el foco es visible.
- [x] La pantalla se lee en móvil y escritorio sin desplazamiento horizontal.
- [ ] Los comentarios y el cuaderno explican lo nuevo con tus palabras. **Parcial:** hay comentarios en el código, pero el cuaderno sigue con las respuestas por completar. Falta explicar especialmente constante frente a estado, el callback y por qué se conservan las tareas.
- [x] `npm run lint` y `npm run build` pasan desde `devquest/`.

### Resultado de las comprobaciones

Se probaron entradas vacías y con espacios, « Leer React » y «Practicar JSX», total 0 y total 2, y el recorrido por las tres secciones. El texto de la primera tarea se comprobó también sin los espacios sobrantes en el DOM. Ambas tareas permanecen al volver desde Finalizadas. La navegación con Tab, Enter y Espacio funciona y el foco es visible.

Se revisó la presentación a 375 px y 1280 px con esos contenidos. `npm run lint` y `npm run build` terminaron correctamente. El mensaje provisional de Finalizadas tiene una redacción equivalente a la propuesta y cumple su objetivo.

Las correcciones iniciales también están hechas: comentario JSX, `secciones` constante, retirada de `useEffect`, etiqueta asociada al input y nombres internos relacionados con tareas. No necesitas repetir esos cambios; céntrate en completar el cuaderno y explicar lo que has implementado.

## Documentación para consultar por bloques

- [Renderizado condicional · React](https://es.react.dev/learn/conditional-rendering).
- [Pasar props a un componente · React](https://es.react.dev/learn/passing-props-to-a-component).
- [Compartir estado entre componentes · React](https://es.react.dev/learn/sharing-state-between-components).
- [Preservar y reiniciar el estado · React](https://es.react.dev/learn/preserving-and-resetting-state).

**Demostración al tutor:** empieza con la lista vacía, añade dos tareas desde Inicio, visita las tres secciones y vuelve a Pendientes. Explica una condición, el recorrido de `addTareas` y por qué se conservan los datos.

[Volver a la guía](../README.md)
