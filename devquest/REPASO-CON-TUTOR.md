# Repaso breve · Retos 01–08

Preparación para comentar con el tutor. La funcionalidad está revisada en `4d4b688`; solo queda el ajuste visual de la cabecera del reto 06. Este repaso sirve para comprobar comprensión, no para repetir las tareas ni escribir otro resumen.

Abre tu aplicación y tu código. Para cada punto, muestra el archivo, explica el recorrido con tus palabras y haz la pequeña demostración. Si no sabes algo, anota la duda. Reserva unos 15–20 minutos; puedes consultar tus apuntes.

Las casillas se marcan después de comentarlo con el tutor. Tener la respuesta escrita no significa que ya se haya hecho la conversación.

- [ ] **Del formulario al estado.** Localiza `Article`, `Inicio` y `TareasPage`. Añade una tarea con Enter y explica `onSubmit`, `preventDefault`, `trim` y cómo el callback llega al padre. ¿Qué ocurre si escribes solo espacios?
- [ ] **Identidad y copias.** Crea dos tareas con el mismo texto y completa una. Localiza `completarTarea`: ¿qué array es nuevo, qué objeto es nuevo y qué conserva su identidad? Explica también por qué eliminar por ID funciona sobre una lista filtrada.
- [ ] **Buscar no es guardar.** Localiza `busqueda`, las listas filtradas y el efecto con `[tareas]`. Busca algo y limpia la búsqueda. ¿Qué estado cambia, qué se calcula y por qué no se sobrescribe la lista con los resultados visibles?
- [ ] **Persistencia e inicialización.** Localiza `leerTareasGuardadas` y `guardarTareas`. Explica pasar la función a `useState` frente a ejecutarla con `()`, la validación con `Set`, qué pasa con datos inválidos y por qué hay que guardar también `[]`. Demuestra una recarga después de eliminar la última tarea.
- [ ] **Rutas y estado local.** Sal de Tareas y vuelve; después hazlo desde una partida del Quiz. Explica por qué las tareas se recuperan, el buscador se reinicia y el Quiz empieza otra partida. Localiza `BrowserRouter`, `Routes`, `Route` y `Link`.
- [ ] **El recorrido del Quiz.** Localiza `QuizPage`, `QuizQuestions` y `QuizResult`. Explica las props y el callback, la actualización de `respuestasConfirmadas`, cómo se evita confirmar dos veces y cómo se calcula la puntuación. Muestra qué se limpia al avanzar y al volver a jugar, y qué evita leer una pregunta fuera del array. ¿Por qué aquí no has necesitado un efecto?

## Nota breve tras la conversación

- Fecha:
- Algo que pude explicar y mostrar:
- Duda o concepto para practicar:
- Próximo paso acordado:

Si quieres mejorar la legibilidad mientras preparas el repaso, simplifica comentarios que solo narran la línea siguiente. Conserva los que expliquen decisiones; no es un requisito para reabrir los retos cerrados.
