# 07 · Tu primera pregunta del quiz

## Seguimiento · 18/09/2026, `6d128da`

**En proceso: datos preparados.** `src/data/Preguntas.js` contiene cinco preguntas, tres opciones por pregunta, IDs consistentes y una respuesta correcta referenciada en cada caso. `QuizPage.jsx` existe, pero está vacío; la ruta `/quiz` todavía no está conectada.

**Siguiente bloque:** implementa el apartado 2 y muestra solo la primera pregunta. Después continúa con la selección y comprobación de los apartados 3 y 4. No hace falta rehacer las preguntas ni adelantar la puntuación del 08. Mantén también el repaso personal pendiente y las pruebas de cierre del 06.

**Tu misión:** añadir una miniapp en `/quiz` donde puedas elegir una respuesta y comprobarla con una explicación.

**Antes:** termina el 06. **Practicarás:** modelado de datos, componentes con props, inputs controlados y estados de una interacción.

En este reto prepararás cinco preguntas, pero mostrarás solo la primera. El recorrido completo llegará en el 08. No necesitas API, almacenamiento ni temporizador.

## 1. Prepara los datos

Crea un archivo de datos, por ejemplo `src/data/preguntas.js`, con cinco preguntas sobre lo que has practicado: props, estado, identificadores, renderizado condicional y persistencia.

Cada pregunta tendrá:

| Campo | Contenido |
| --- | --- |
| `id` | Identificador estable de la pregunta. |
| `enunciado` | Texto de la pregunta. |
| `opciones` | Array de tres objetos con `id` y `texto`. |
| `respuestaCorrectaId` | Identificador de una de sus opciones. |
| `explicacion` | Motivo por el que esa opción es correcta. |

Cada pregunta tiene una sola respuesta correcta. Usa identificadores de pregunta únicos y opciones con IDs únicos dentro de su pregunta. No generes IDs durante el renderizado. Evita que todas las respuestas correctas estén en la misma posición.

Los datos son constantes: no necesitan `useState`. Escríbelos tú y contrasta su contenido con lo aprendido; pregunta al tutor si dudas de una respuesta.

**Parada:** comprueba que las cinco preguntas tienen tres opciones y que cada `respuestaCorrectaId` corresponde a una de ellas.

## 2. Conecta la nueva página

1. Crea una página para el Quiz y añade la ruta `/quiz`.
2. Activa su tarjeta del portal con un enlace y retira «Próximamente».
3. Añade Quiz a la navegación global manteniendo el acceso al portal y a Tareas.
4. Muestra el título de la miniapp y la primera pregunta del array.

No añadas preguntas ni estado del quiz al componente de Tareas. Cada miniapp tiene sus propios datos y responsabilidades.

## 3. Permite elegir una opción

Utiliza un grupo de inputs `radio`, con etiquetas asociadas, dentro de un `fieldset` cuyo `legend` sea el enunciado. Comparte el atributo `name` entre las opciones de esa pregunta.

- Guarda el ID seleccionado, inicialmente `null`.
- Controla cada `checked` a partir de ese estado y actualízalo mediante `onChange`.
- Puedes cambiar de opción antes de comprobar. Elegir no muestra todavía si es correcta.
- Usa el ID de la opción como `key` al renderizar.

Separa un componente de pregunta que reciba los datos, la selección, si está comprobada y un callback para elegir. El estado vive en la página del Quiz; evita copiarlo dentro del componente hijo.

**Parada:** selecciona una opción y luego otra. Solo una puede estar marcada. Prueba también Tab, flechas y Espacio.

## 4. Comprueba una sola vez

Añade «Comprobar respuesta». Debe estar deshabilitado mientras no haya selección y después de comprobar.

| Momento | Comportamiento |
| --- | --- |
| Sin selección | Opciones disponibles; comprobar deshabilitado. |
| Seleccionada | Puedes cambiar de opción o comprobar. |
| Comprobada | Opciones bloqueadas; se muestra resultado y explicación. |

Guarda si la pregunta está comprobada. Calcula si hay acierto comparando los identificadores; no necesitas otro estado para guardar esa comparación ni un efecto para actualizarla.

Tras comprobar, muestra «Respuesta correcta» o «Respuesta incorrecta». Si falla, indica también la opción correcta. En ambos casos muestra la explicación y utiliza texto, además de color. Puedes usar una zona con `aria-live="polite"` para anunciar el resultado.

No añadas todavía puntuación ni botón de siguiente pregunta. Para repetir las pruebas de este bloque puedes recargar `/quiz`: la selección se reinicia y Tareas conserva sus datos.

## 5. Explica tus decisiones

Comenta por qué guardas el ID seleccionado y por qué el resultado se calcula. Responde las preguntas del 07 en el cuaderno. No marques comprensión solo porque funciona.

## Comprueba tu entrega

- [x] Hay cinco preguntas locales con estructura consistente y una respuesta correcta por pregunta (datos verificados en `6d128da`).
- [x] `/quiz`, su tarjeta y el enlace global funcionan, también al abrir la URL directamente.
- [x] Solo se muestra la primera pregunta; no se han adelantado pasos del 08.
- [x] Las opciones se renderizan desde los datos, con claves estables e inputs etiquetados.
- [x] Solo se selecciona una opción; puedo cambiarla antes de comprobar.
- [ ] El componente de pregunta recibe props y comunica la selección mediante un callback.
- [ ] No puedo comprobar sin elegir ni cambiar la respuesta después de comprobar.
- [ ] El caso correcto y el incorrecto muestran un mensaje y una explicación coherentes.
- [ ] El resultado no depende solo del color y el formulario funciona con teclado.
- [ ] Recargar reinicia el quiz sin alterar las tareas guardadas.
- [ ] Los enunciados y opciones largos se leen a 375 px y 1280 px sin desbordamiento.
- [ ] He añadido comentarios sobre lo nuevo y respondido las preguntas del cuaderno.
- [x] `npm run lint` y `npm run build` pasan al terminar la implementación del 07. **La base actual pasa; repetir tras implementar la interacción.**

## Documentación por bloques

- [Renderizar listas · React](https://es.react.dev/learn/rendering-lists).
- [Inputs controlados · React](https://react.dev/reference/react-dom/components/input).
- [Compartir estado · React](https://es.react.dev/learn/sharing-state-between-components).
- [Elegir la estructura del estado · React](https://es.react.dev/learn/choosing-the-state-structure).
- [Grupos de opciones radio · MDN](https://developer.mozilla.org/es/docs/Web/HTML/Element/input/radio).

**Demostración al tutor:** muestra una respuesta incorrecta y otra correcta recargando entre pruebas. Explica cómo llega la selección del componente hijo a la página.

[Volver a la guía](../README.md) · [Reto 08](08-quiz-recorrido.md)
