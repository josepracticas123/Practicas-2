# Revisión práctica antes de continuar con el 06

Las explicaciones sobre copias, inicialización, efectos y validación ya están ampliadas. No necesitas otro resumen ni volver a escribirlas. El 18/09/2026 se corrigieron detalles de formato, ejemplos JSX y la afirmación de que el formulario ya estaba implementado.

Marca estos puntos después de realizarlos. Puedes trabajar sin esperar una conversación con el tutor; anota cualquier duda concreta. Esto no sustituye la explicación del 05 cuando podáis revisarla juntos.

- [x] **Contrastar notas y código:** abre `Article.jsx` y localiza los eventos que llaman hoy a `enviarTarea`. Revisa la corrección sobre el formulario en ambos resúmenes. Antes de implementarlo, distingue qué existe y qué pide el siguiente reto.
- [x] **Implementar el formulario del paso 0 del 06:** centraliza clic y Enter en `onSubmit`, conserva la validación y evita el doble envío. Sigue [las instrucciones y pruebas del reto](../../retos/06-portal-y-rutas.md); después actualiza las notas que describen el envío actual, incluido el apartado 15 y el flujo del documento de apuntes.
- [X] **Comprobar la comprensión con ejemplos propios:** elige dos tareas con el mismo texto y explica por escrito, en unas pocas líneas, qué ID cambia al completar una, qué copia tu código y por qué buscar después no vuelve a guardar tareas. Añade los nombres de las funciones que has localizado. Anótalo debajo; no hace falta copiar funciones completas.
- [x] **Revisar comentarios y validar:** retira los que solo repiten una línea, conserva los motivos que te ayudan a entenderla y ejecuta las comprobaciones del paso 0 del 06 antes de introducir Router. `Inicio.jsx` ya se utiliza desde `App`: ese punto está resuelto.

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