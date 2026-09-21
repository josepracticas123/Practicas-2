# 03 · Completa y recupera tus tareas

**Tu misión:** dar utilidad a Finalizadas. Podrás completar una tarea desde Pendientes y devolverla a Pendientes desde Finalizadas.

**Antes:** revisa con el tutor las explicaciones pendientes del reto 02. Conserva el navbar, el formulario y la validación que ya funcionan. **Practicarás:** objetos, identificadores, `map`, `filter` y actualizaciones del estado.

Haz un bloque cada vez. No necesitas acabar todo en una sesión.

## 1. Dale identidad y estado a cada tarea

Ahora `tareas` contiene textos. Un texto no permite distinguir dos tareas iguales ni saber si una está completada. Cada elemento pasará a ser un objeto con estos campos:

| Campo | Tipo | Para qué sirve |
| --- | --- | --- |
| `id` | Texto | Identificar una tarea concreta durante toda su vida. |
| `texto` | Texto | Contenido limpio que escribe el usuario. |
| `completada` | Booleano | `false` al crearla y `true` al completarla. |

1. Mantén un único array `tareas` en `App`.
2. Adapta `addTareas` para construir el objeto al añadir una tarea válida.
3. Genera el identificador una sola vez al crearla. Puedes utilizar `crypto.randomUUID()` en el evento de creación; funciona en el entorno local de desarrollo. No lo generes durante el renderizado ni al completar o recuperar una tarea.
4. Adapta la lista para mostrar `tarea.texto` y utilizar `tarea.id` como `key`, en lugar del índice.

No necesitas migrar datos guardados: la app todavía empieza vacía al recargar. Si la recarga automática de desarrollo mantiene temporalmente datos con el formato antiguo, recarga la página para probar con el nuevo formato.

**Parada:** añade dos tareas con el mismo texto. Ambas deben aparecer, con identificadores diferentes y sin errores en la consola.

## 2. Separa lo pendiente de lo finalizado

Calcula desde `tareas` las listas de pendientes y finalizadas según `completada`. Puedes usar `filter`. No guardes otras dos copias del array en estados separados.

- Pendientes muestra solo las que tienen `completada` en `false`.
- Finalizadas muestra solo las que tienen `completada` en `true`.
- El total de cada sección corresponde a su propia lista.
- Si una sección está vacía, explica que no tiene tareas pendientes o finalizadas.

Retira el mensaje provisional de Finalizadas del reto 02: ahora esa sección sí tendrá contenido funcional. Los checks del 02 describen aquella entrega; no tienes que conservar su mensaje antiguo.

**Parada:** recién recargada la app, ambas secciones tienen total 0 y su mensaje. Al añadir una tarea, solo aumenta Pendientes.

## 3. Completa una tarea

Añade un botón «Completar» junto a cada tarea pendiente. Al pulsarlo, una función en `App` recibe el identificador de esa tarea y actualiza únicamente su campo `completada` a `true`.

Piensa el recorrido antes de escribirlo: el botón identifica la tarea, la función encuentra el objeto correspondiente y React recibe el nuevo estado. Si separas una fila en un componente, pasa los datos y el callback que necesita. No es obligatorio crear más componentes para terminar el reto.

**Pista:** `map` permite construir un nuevo array. Para el objeto que cambia, crea también un objeto nuevo; para los demás, conserva los existentes. No asignes directamente `tarea.completada = true` sobre el estado. Puedes usar la forma de `setTareas` que recibe el estado anterior.

**Parada:** la tarea desaparece de Pendientes y aparece en Finalizadas. No se duplica y su identificador no cambia.

## 4. Recupera una tarea

En Finalizadas, añade «Volver a pendientes». Actualiza esa tarea por su identificador para que `completada` vuelva a ser `false`.

Las dos acciones pueden compartir una función que reciba el identificador y el nuevo valor, o usar funciones separadas si te resulta más claro. Debes poder explicar tu elección.

Completar y recuperar no borran ni crean tareas: solo cambian su estado. La suma de los dos contadores debe mantenerse.

## 5. Explica lo nuevo

Añade comentarios breves sobre la identidad de la tarea y la actualización sin modificar el objeto anterior. Completa las preguntas del reto 03 en [tu cuaderno](../devquest/APRENDIZAJE.md). Evita repetir comentarios en cada botón.

## Comprueba tu entrega

- [x] Cada tarea nueva tiene `id`, `texto` limpio y `completada: false`.
- [x] La lista usa identificadores estables como `key`, sin avisos en consola.
- [x] Pendientes y Finalizadas muestran únicamente las tareas de su estado y el total correcto.
- [x] Ambas secciones muestran un mensaje cuando están vacías.
- [x] Completar una tarea la mueve a Finalizadas sin duplicarla ni cambiar su identificador.
- [x] Recuperarla la devuelve a Pendientes con el mismo texto e identificador.
- [x] Con dos tareas llamadas «Leer React», completar una deja exactamente una pendiente y una finalizada.
- [x] Recuperar esa tarea devuelve los totales a 2 pendientes y 0 finalizadas.
- [x] La suma de los contadores no cambia al completar o recuperar.
- [x] Navegar conserva los datos; siguen rechazándose entradas vacías o con solo espacios.
- [x] Los botones se pueden usar con teclado y el diseño sigue siendo legible en móvil. **El caso de texto largo está corregido en ambas vistas; revisión de `3736740`.**
- [x] Las respuestas sobre identificadores, listas calculadas y actualización de objetos están escritas en el cuaderno.
- [ ] He concretado identidad y copias en [mi repaso personal](../devquest/resumen/REVISION-PENDIENTE.md). Completa allí el ejemplo; no necesitas otro documento.
- [x] `npm run lint` y `npm run build` pasan desde `devquest/`.


### Revisión actual · 17/09/2026, `3736740`

La lógica de objetos, identificadores, completar y recuperar está implementada. Se ha vuelto a probar completar una de dos tareas iguales, eliminar una coincidencia filtrada sin perder la otra ni las tareas ocultas y recuperar desde Finalizadas. Lint y build pasan. Las respuestas del reto 03 están escritas; la explicación en directo queda para la revisión con el tutor.

**Reto cerrado técnicamente.** El pendiente visual compartido con el 04 está resuelto: las cadenas largas se parten y los botones se disponen debajo en móvil, sin desbordamiento. No necesitas rehacer la lógica del 03.

## Documentación

- [Actualizar arrays en el estado · React](https://es.react.dev/learn/updating-arrays-in-state).
- [Renderizado de listas e identificadores · React](https://es.react.dev/learn/rendering-lists).
- [crypto.randomUUID · MDN](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID).

**Demostración al tutor:** crea dos tareas iguales, completa solo una y recupérala. Enseña qué dato permite distinguirlas.

[Volver a la guía](../README.md) · [Reto 04](04-buscar-y-eliminar.md)
