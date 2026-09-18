# Recordatorio de conceptos

Pendientes prácticos: [lista de revisión](REVISION-PENDIENTE.md).

App → Coordina el estado y las partes principales de la aplicación.

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

Tailwind → Sus clases controlan el diseño, los tamaños, los espacios y la adaptación a diferentes tamaños de pantalla.

## Preguntas con respuestas

### ¿Por qué "setTareas" y no modificar directamente "tareas"?

Porque el estado no debe modificarse directamente. Si modificamos el array original, podemos mantener la misma referencia y React no tiene una nueva referencia de estado que utilizar para detectar correctamente el cambio. Por eso creamos un nuevo array y lo pasamos a "setTareas".

### ¿Qué hace "[...tareas]"?

Crea un nuevo array copiando los elementos del array "tareas".

### ¿"[...tareas]" copia también los objetos que hay dentro?

No. Hace una copia superficial: crea un nuevo array, pero los objetos interiores siguen siendo las mismas referencias. Si necesitamos modificar una tarea concreta sin modificar el objeto original, también debemos crear un nuevo objeto para esa tarea, por ejemplo mediante "{ ...tarea, ...cambios }".

### ¿Por qué usamos "useEffect" para "localStorage"?

Porque queremos guardar las tareas cuando cambia el estado "tareas". El efecto se ejecuta al montar el componente y posteriormente cada vez que cambia "tareas".

### ¿Cómo funciona el buscador?

Cuando cambia "busqueda", React vuelve a renderizar. En ese renderizado, "filter" crea una lista temporal con las tareas cuyo texto coincide con la búsqueda. Esa lista solo se utiliza para mostrar los resultados: no modifica "tareas" ni se guarda en "localStorage".

Por eso cambiar el buscador puede producir un renderizado sin que se ejecute de nuevo el efecto que depende de "[tareas]".

### ¿Por qué "useState(leerTareasGuardadas)" y no "useState(leerTareasGuardadas())"?

Con "useState(leerTareasGuardadas)" paso la función como inicializador para que React obtenga el valor inicial del estado mediante esa función.

Con "useState(leerTareasGuardadas())", la función se ejecutaría directamente antes de pasar su resultado a "useState".

La primera forma permite que React utilice esa función como inicializador perezoso, en lugar de ejecutar "leerTareasGuardadas()" directamente durante la evaluación del componente.

En desarrollo, "StrictMode" puede repetir la inicialización para detectar problemas, por lo que no debe entenderse como una ejecución garantizada exactamente una sola vez.

### ¿Qué pasa al eliminar la última tarea?

"setTareas" establece "tareas" como un array vacío "[]". Como "tareas" ha cambiado, el "useEffect" detecta el cambio y guarda el array vacío en "localStorage". Al recargar, la aplicación puede recuperar correctamente que no quedan tareas.

### ¿Para qué sirve "every"?

Comprueba que todos los elementos del array cumplen una condición.

### ¿Para qué sirven "ids.has" e "ids.add"?

"ids.has(id)" comprueba si ese ID ya está dentro del "Set".

"ids.add(id)" añade el ID al "Set".

Si hay dos tareas con el mismo ID, cuando se procesa la segunda, "ids.has(id)" devuelve "true", por lo que la validación falla y se rechaza toda la lista.

### ¿Qué diferencia hay entre JSON inválido y una estructura incorrecta?

El contenido `hola` sin comillas JSON es inválido: `JSON.parse` falla. El contenido `"hola"` con comillas JSON sí representa una cadena válida, pero tampoco es un array de tareas.

"{}" → JSON válido, pero puede tener una estructura incorrecta para lo que espera la aplicación.

### ¿Qué significa "sm:flex-row"?

Desde el breakpoint "sm", que en Tailwind es de 640 px por defecto, se aplica "flex-row".

Por debajo de 640 px se mantiene la clase base. Si la clase base es "flex-col", los elementos permanecen organizados en columna.

### ¿Qué ocurre actualmente al enviar el formulario?

`Article` todavía no contiene `<form>`. El botón llama a `enviarTarea` mediante `onClick` y Enter lo hace mediante `onKeyDown`. La conversión a `onSubmit` con `preventDefault()` pertenece al paso 0 del reto 06 y está pendiente.

## Funcionamiento del guardado en `localStorage`

Cuando añadimos una tarea, generamos un array nuevo copiando las tareas que ya teníamos y colocando la nueva al final. Después utilizamos "setTareas" para actualizar el estado.

React vuelve a renderizar y el "useEffect" detecta que "tareas" ha cambiado. Entonces se llama a "guardarTareas", que convierte las tareas mediante "JSON.stringify" y las guarda en "localStorage".

Si cambiamos solamente el texto de búsqueda, cambia "busqueda" y se produce otro renderizado, pero "tareas" no cambia. Por ello el efecto cuya dependencia es "[tareas]" no vuelve a guardar las tareas en "localStorage".

Si eliminamos la última tarea, "tareas" pasa a ser "[]" y el efecto guarda ese array vacío.
