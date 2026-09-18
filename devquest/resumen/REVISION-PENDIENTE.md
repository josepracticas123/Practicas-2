# Repaso de conceptos · Pendientes del resumen

Revisión del 18/09/2026. Las explicaciones generales han mejorado; ahora falta concretarlas en tu propio ejemplo. El reto 06 está en proceso y se sigue en su enunciado. Este repaso se centra en lo aprendido antes: no necesitas otro documento ni copiar funciones completas.

La pregunta anterior «qué ID cambia» era ambigua. La pregunta correcta es **qué tarea se modifica y cómo la identificas**: completar una tarea no cambia su ID.

## Cuatro puntos para completar

Marca cada casilla cuando hayas revisado el código y ampliado tu ejemplo de abajo con tus palabras. Para cada punto, indica el archivo y la función o expresión que has localizado. Puedes resolverlo sin esperar una conversación con el tutor.

- [ ] **Identidad:** tu ejemplo dice primero «mismo ID» y después «ID diferente». Revisa qué querías decir. Describe dos tareas con el mismo texto y distintos IDs, cuál se completa y qué dato conserva su identidad. Usa el nombre real de la función (`completarTarea`).
- [ ] **Copias:** concreta qué significa «crea una copia». Localiza qué crea el array nuevo y qué crea el objeto de la tarea modificada. Explica qué ocurre con la otra tarea y con los IDs. No basta con decir que se llama al setter.
- [ ] **Búsqueda y guardado:** explica qué estado cambia al escribir en el buscador, qué listas se recalculan y por qué eso no vuelve a ejecutar el guardado que depende de `[tareas]`. Distingue las funciones de filtrado de las variables que contienen sus resultados.
- [ ] **Inicialización:** has indicado que `useState(leerTareasGuardadas)` te generó dudas. Escribe qué has entendido finalmente: quién llama a esa función, para qué utiliza su resultado y qué diferencia habría si escribieras `leerTareasGuardadas()`. Relaciónalo con escribir en el buscador y con recargar la página. Si queda alguna duda, señala exactamente cuál.

## Nota sobre la documentación y el 06

Se ha corregido la descripción del formulario en los apuntes: actualmente existe `<form>`, pero `enviarTarea` sigue conectada al `onClick` del botón; todavía falta conectarla al `onSubmit` del formulario. Esa implementación se continúa en el 06. Cuando cambie el código, actualiza las notas después de comprobarlo, sin marcar como hecho algo que solo está previsto.

Tu texto anterior se conserva a continuación para que lo revises tú. Los checks anteriores no se mantienen como prueba de comprensión: estos cuatro puntos concretan lo que falta explicar. No hace falta reescribir el resto de los resúmenes.

## Mi ejemplo y las funciones que he localizado

He creado dos tareas con el mismo ID. Aunque el texto sea igual, cada tarea tien el ID diferente,  al seleccionar completar tarea [ completarTareas(id) ], busca la trea por el identificador único y crea una copia.
Y Buscar tareas las funciones de filtrado, crean nuevas lsitas a partir de tareas, y no modifica tareas por funciones:

Funciones localizadas:
- `addTareas`
- `completarTarea`
- `tareasPendientesFiltradas`
- `tareasFinalizadasFiltradas`
- `guardarTareas`


## Dudas concretas

No tengo dudas concretas pendientes sobre este apartado.
A pesar de que la función  useState(leerTareasGuardadas) me genero dudas de como realizaba la recogida de los datos del localstorage.
