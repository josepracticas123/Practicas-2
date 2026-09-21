# Repaso de conceptos · Pendientes del resumen

Seguimiento del 21/09/2026 (`afb24ca`).

Los cuatro puntos del repaso personal están completados y contrastados con el código de `devquest`. El Reto 06 también tiene completadas las comprobaciones prácticas.

Este repaso se centra en lo aprendido antes: identidad, copias, búsqueda e inicialización. No es necesario añadir otro documento ni copiar funciones completas.

La pregunta anterior «qué ID cambia» era ambigua. La pregunta correcta es **qué tarea se modifica y cómo la identificas**: completar una tarea no cambia su ID.

## Cuatro puntos para completar

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