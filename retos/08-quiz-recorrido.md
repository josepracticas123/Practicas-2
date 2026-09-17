# 08 · Completa el quiz y consulta tu resultado

**Tu misión:** recorrer las cinco preguntas, obtener un resultado y poder empezar otra partida.

**Antes:** termina el 07. **Practicarás:** transiciones de estado, actualización de objetos, valores calculados y reinicio de una interacción.

Mantén los datos y el componente de pregunta. No necesitas API, temporizador, persistencia, Context ni un nuevo efecto.

## 1. Decide qué datos cambian

Prepara el recorrido antes de programar:

- Índice de la pregunta actual, empezando por cero.
- ID de la opción seleccionada para esa pregunta, inicialmente `null`.
- Respuestas confirmadas, por ejemplo un objeto que asocie el ID de pregunta con el ID de opción elegido.

En el 07 guardabas si la pregunta estaba comprobada. Ahora puedes calcularlo consultando si existe una respuesta confirmada para esa pregunta. Sustituye aquel estado si usas este enfoque: evita mantener dos versiones de la misma información.

La pregunta actual, el número total, el resultado de una respuesta y la puntuación se calculan desde los datos anteriores. No los dupliques en estados ni los sincronices mediante efectos.

## 2. Registra la respuesta confirmada

Al comprobar, guarda la selección asociada al ID de la pregunta. Crea un objeto nuevo sin modificar el anterior; puedes usar el setter que recibe el estado previo.

Solo se registra una respuesta por pregunta. Conserva las reglas del 07: no comprobar sin selección, bloquear cambios y mostrar explicación después de confirmar. Una segunda pulsación no debe añadir puntos ni respuestas.

**Parada:** confirma la primera pregunta y comprueba que el registro contiene su ID y la opción elegida, sin modificar el array de preguntas.

## 3. Avanza con una regla clara

1. Muestra «Pregunta 1 de 5», calculado desde el índice y la longitud del array.
2. Después de comprobar, habilita «Siguiente pregunta».
3. Al avanzar, cambia el índice y limpia la selección. La nueva pregunta empieza sin resultado ni explicación visibles.
4. No permitas saltar preguntas sin confirmar. En esta versión no hay botón para retroceder.
5. En la última pregunta, el botón pasa a llamarse «Ver resultado» después de comprobar.

Una opción para representar el final es que el índice alcance la longitud del array. En ese caso, renderiza primero el resultado y evita acceder a propiedades de una pregunta que ya no existe. No incrementes el índice más allá del final.

**Parada:** responde dos preguntas distintas. La segunda no debe heredar la selección, el bloqueo ni la explicación de la primera.

## 4. Calcula y muestra el resultado

Muestra «Has acertado X de 5» y un resumen por pregunta: enunciado, tu respuesta, respuesta correcta y explicación. Si lo prefieres, extrae un componente de resultado con los datos necesarios por props.

Calcula los aciertos comparando las respuestas confirmadas con las correctas. Puedes usar `filter` y su longitud; no necesitas aprender `reduce` para terminar este reto. Evita un contador que aumente cada vez que se pulsa un botón.

Obtén el total desde los datos, sin escribir el número 5 repetidamente en la lógica. Usa IDs para relacionar respuestas con preguntas.

## 5. Vuelve a jugar

El botón «Volver a jugar» reinicia el índice, la selección y las respuestas confirmadas mediante sus setters. Debe mostrar la primera pregunta sin opciones seleccionadas, resultado ni puntos anteriores. No recargues el navegador para conseguirlo.

En esta miniapp, recargar o salir a otra ruta y regresar empieza una partida nueva. Mantén su estado dentro de la página del Quiz para que ese comportamiento sea coherente. La app de Tareas conserva su persistencia; el quiz no escribe en su clave.

## 6. Prueba y explica

Haz tres partidas: todas correctas, todas incorrectas y una mezcla. En una partida comprueba una respuesta y pulsa de nuevo el botón si sigue disponible: no debe aceptarlo ni alterar el resultado.

Añade comentarios sobre las transiciones y el reinicio. Responde las preguntas del 08 en el cuaderno. Si algo falla, identifica qué estado quedó con un valor de la pregunta anterior.

## Comprueba tu entrega

- [ ] Se recorren todas las preguntas en orden y el progreso coincide con la pregunta actual.
- [ ] No puedo avanzar sin confirmar una respuesta ni confirmar dos veces la misma pregunta.
- [ ] Al avanzar se limpian selección y mensajes, y las opciones vuelven a estar disponibles.
- [ ] Las respuestas se registran por ID sin modificar los datos originales ni el objeto anterior.
- [ ] La última pregunta lleva al resultado sin errores por acceder fuera del array.
- [ ] Todas correctas produce 5/5; todas incorrectas, 0/5; la mezcla coincide con las elecciones realizadas.
- [ ] El resumen muestra la elección, la correcta y la explicación de cada pregunta.
- [ ] Progreso, puntuación y total se calculan sin estados duplicados ni efectos añadidos.
- [ ] «Volver a jugar» reinicia toda la partida sin recargar la página.
- [ ] Salir del quiz y regresar, o recargar, inicia otra partida; las tareas guardadas permanecen intactas.
- [ ] El recorrido completo funciona con teclado, foco visible y mensajes comprensibles.
- [ ] Preguntas y resumen se leen a 375 px y 1280 px sin desbordamiento.
- [ ] He completado las preguntas del cuaderno y puedo explicar qué reinicio y qué calculo.
- [ ] `npm run lint` y `npm run build` pasan.

## Documentación por bloques

- [El estado: la memoria de un componente · React](https://es.react.dev/learn/state-a-components-memory).
- [Actualizar objetos en el estado · React](https://es.react.dev/learn/updating-objects-in-state).
- [Elegir la estructura del estado · React](https://es.react.dev/learn/choosing-the-state-structure).
- [Conservar y reiniciar estado · React](https://es.react.dev/learn/preserving-and-resetting-state).

**Demostración al tutor:** completa una partida con errores y aciertos, explica de dónde sale la puntuación y comienza otra. Muestra que la primera pregunta no conserva datos de la partida anterior.

[Volver a la guía](../README.md)
