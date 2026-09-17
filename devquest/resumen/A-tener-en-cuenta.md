## Observaciones pendientes

- [x] He revisado las observaciones del inicio de [mi resumen](resumen.md) y ajustado estas notas breves para que sean coherentes. Puedo localizar los ejemplos en mi código y explicarlos.

---

App → Coordina el estado y las partes principales de la aplicación.

useState → Guarda datos que pueden cambiar.

setTareas → Actualiza el estado de las tareas y React vuelve a renderizar la interfaz.

useEffect → Se ejecuta al montar el componente y cuando cambia el estado de tareas.
En el código tiene `[tareas]` porque queremos que el efecto se ejecute cuando cambie tareas.

localStorage → Guarda las tareas para que no se pierdan al recargar.

JSON.stringify → Convierte las tareas ose el JSON en texto para guardarlas.

JSON.parse → Convierte el texto guardado otra vez en datos serian un JSON.

try/catch → Controla posibles errores.

Set → Permite comprobar que no haya IDs repetidos.

map → Recorre las tareas y crea un nuevo array, por ejemplo, para actualizar una.

filter → Crea un nuevo array solo con las tareas que cumplen una condición.

Al cambiar la búsqueda, se vuelve a renderizar la aplicación y `filter` calcula qué mostrar, pero `tareas` no cambia.

Props → Permiten pasar datos o funciones de un componente a otro.

onClick → Ejecuta una función cuando hacemos clic.

onChange → Detecta cambios en un input.

Tailwind → Sus clases controlan el diseño, los tamaños, los espacios y la adaptación a móvil.

JSON.stringify() → Convierte un dato de JavaScript en texto.

## Preguntas con respuestas

- ¿Por qué `setTareas` y no modificar directamente `tareas`?

Porque React necesita que actualicemos el estado con su función para detectar el cambio y volver a renderizar.

- ¿Por qué usamos `useEffect` para `localStorage`?

Porque queremos guardar las tareas cada vez que cambia el estado `tareas`.

- ¿Cómo funciona el buscador?

Uso `filter` para crear una lista temporal con las tareas cuyo texto coincide con lo que escribe el usuario. No modifico ni guardo esa lista, solo la muestro.

- ¿Por qué `useState(leerTareasGuardadas)` y no `useState(leerTareasGuardadas())`?

Porque paso la función como inicializador para que React obtenga el valor inicial. Con () la ejecutaría directamente antes de pasársela a useState. Al pasarla sin (), React puede ejecutarla como inicialización perezosa para obtener el estado inicial.

- ¿Qué hace `[...tareas]`?
Crea un nuevo array copiando el que ya teníamos. Para cambiar una tarea sin modificar la original, también se copia el objeto.

- ¿`[...tareas]` copia los objetos que hay dentro?
No. Solo copia el array; los objetos siguen siendo los mismos.

- ¿Qué pasa al eliminar la última tarea?
`tareas` pasa a ser un array vacío. `useEffect` detecta el cambio y guarda el array vacío en `localStorage`.

- ¿Qué pasa cuando escribo en el buscador?
Cambia `busqueda`, React vuelve a renderizar y `filter` calcula las tareas que se muestran. No modifica `tareas` ni guarda el resultado de la búsqueda.

- ¿Para qué sirve `every`?
Comprueba que todas las tareas cumplan la condición.

- ¿Para qué sirven `ids.has` e `ids.add`?
`has` comprueba si el ID existe y `add` guarda el ID.

- ¿Qué pasa si hay dos tareas con el mismo ID?
Se detecta el duplicado y se rechaza la lista.

- ¿Qué diferencia hay entre JSON inválido y una estructura incorrecta?
"hola" → JSON inválido
{}     → JSON válido, pero estructura incorrecta.

- ¿Qué significa `sm:flex-row`?
Desde `sm` (640 px por defecto), los elementos pasan a estar en fila.

- ¿Y por debajo de `sm`?
Se mantiene la disposición de la clase base, por ejemplo, `flex-col` si está puesta.

`useEffect` se ejecuta al montar el componente y cuando cambia el estado de tareas.

## Funcionamiento de guardar las tareas en `localStorage`

Cuando añadimos una tarea, generamos un array nuevo copiando las tareas que ya teníamos y colocando la nueva al final.
Se utiliza `setTareas` para actualizar el estado. React vuelve a renderizar y `useEffect` detecta el cambio en `tareas`. Después se llama a `guardarTareas`, que convierte las tareas con `JSON.stringify` y las guarda en `localStorage`.