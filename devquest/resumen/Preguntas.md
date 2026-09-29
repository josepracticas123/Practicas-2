# Preguntas de repaso con respuesta

Banco único de preguntas del proyecto: un tema, una pregunta. Las respuestas están con mis palabras y la explicación con ejemplos está en los [apuntes de estudio](APUNTES_ESTUDIO_REACT.md).

Las preguntas de cada reto, con mis respuestas, están en el [cuaderno](../APRENDIZAJE.md). El repaso oral se prepara en [Repaso con el tutor](../REPASO-CON-TUTOR.md).

## Estado y arrays

### ¿Por qué utilizo `useState`?

Porque necesito guardar datos que cambian y provocar un nuevo renderizado cuando cambian. Lo uso para la sección, la lista de tareas, la búsqueda y el texto del input.

### ¿Qué guarda cada estado de `TareasPage`?

`seccionActual` guarda la vista, `tareas` guarda todas las tareas y `busqueda` guarda el texto del buscador.

### ¿Por qué uso `setTareas` y no modifico directamente `tareas`?

El estado no debe modificarse directamente: si modifico el array original mantengo la misma referencia y React no tiene una referencia nueva que utilizar para detectar el cambio. Por eso las operaciones producen nuevos arrays u objetos y el resultado se pasa a `setTareas`.

### ¿Qué hace `[...tareas]`?

Crea un nuevo array copiando los elementos del array `tareas`.

### ¿`[...tareas]` copia también los objetos que hay dentro?

No. Hace una copia superficial: crea un nuevo array, pero los objetos interiores siguen siendo las mismas referencias. Si necesito modificar una tarea concreta sin modificar el objeto original, también creo un nuevo objeto para esa tarea, por ejemplo mediante `{ ...tarea, ...cambios }`.

### ¿Qué hace `map`?

Crea un array nuevo recorriendo el anterior. En mi código cambia `completada` para completar o recuperar una tarea y conserva las demás.

### ¿Qué hace `filter`?

Crea un array nuevo con los elementos que cumplen una condición. Lo uso para eliminar, separar pendientes y finalizadas y calcular resultados de búsqueda.

### ¿Por qué utilizo un `id`?

Para identificar una tarea concreta aunque otra tenga el mismo texto. También lo uso como `key` en las listas JSX.

## Búsqueda

### ¿Qué ocurre si busco una tarea?

Cuando cambia `busqueda`, React vuelve a renderizar. En ese renderizado, `filter` crea una lista temporal con las tareas cuyo texto coincide con la búsqueda. Esa lista solo se utiliza para mostrar los resultados: no modifica `tareas` ni se guarda en `localStorage`.

### ¿Por qué la búsqueda no utiliza otro `useEffect`?

Porque es un cálculo derivado para mostrar datos: no necesita sincronizar nada con un sistema externo. Por eso cambiar el buscador puede producir un renderizado sin que se ejecute de nuevo el efecto que depende de `[tareas]`.

## Persistencia

### ¿Por qué uso `useState(leerTareasGuardadas)` y no `useState(leerTareasGuardadas())`?

Con `useState(leerTareasGuardadas)` paso la función como inicializador para que React obtenga el valor inicial del estado mediante esa función. Con `useState(leerTareasGuardadas())`, la función se ejecutaría directamente antes de pasar su resultado a `useState`.

La primera forma permite que React utilice esa función como inicializador perezoso, en lugar de ejecutar `leerTareasGuardadas()` directamente durante la evaluación del componente. En desarrollo, `StrictMode` puede repetir la inicialización para detectar problemas, por lo que no debe entenderse como una ejecución garantizada exactamente una sola vez.

### ¿Por qué utilizo `useEffect`?

Para sincronizar la lista de tareas de React con `localStorage` después del renderizado: quiero guardar las tareas cuando cambia el estado `tareas`. El efecto se ejecuta al montar el componente y posteriormente cada vez que cambia `tareas`.

### ¿Qué significa `[tareas]`?

Que el efecto depende de `tareas`: se ejecuta al montar y vuelve a ejecutarse cuando cambia esa dependencia.

### ¿Qué ocurre al recargar?

`leerTareasGuardadas` lee `devquest.tareas.v1`, convierte el JSON, valida las tareas y devuelve la lista para inicializar el estado.

### ¿Qué hace `JSON.stringify`?

Convierte el array de tareas en texto JSON para que `localStorage` pueda guardarlo.

### ¿Qué hace `JSON.parse`?

Convierte el texto JSON recuperado en valores de JavaScript que la aplicación puede validar y utilizar.

### ¿Qué diferencia hay entre JSON inválido y una estructura incorrecta?

El contenido `hola` sin comillas JSON es inválido: `JSON.parse` falla. El contenido `"hola"` con comillas JSON sí representa una cadena válida, pero tampoco es un array de tareas. `{}` es JSON válido, pero puede tener una estructura incorrecta para lo que espera la aplicación.

### ¿Qué ocurre si el JSON está corrupto?

`JSON.parse` lanza un error, `catch` lo captura, se informa en la consola y la lectura devuelve `[]`.

### ¿Para qué sirve `every`?

Comprueba que todos los elementos del array cumplen una condición.

### ¿Para qué utilizo `Set`, `ids.has` e `ids.add`?

`ids.has(id)` comprueba si ese ID ya está dentro del `Set` y `ids.add(id)` añade el ID al `Set`. Sirven para registrar IDs ya vistos y detectar duplicados.

### ¿Qué ocurre si hay dos IDs iguales?

El segundo ID ya existe en el `Set`, `has` devuelve `true`, `every` deja de validar la lista como correcta y la función devuelve `[]`.

### ¿Qué pasa al eliminar la última tarea?

`setTareas` establece `tareas` como un array vacío `[]`. Como `tareas` ha cambiado, el `useEffect` detecta el cambio y guarda el array vacío en `localStorage`. Al recargar, la aplicación puede recuperar correctamente que no quedan tareas.

### ¿Qué ocurre si falla el guardado?

La aplicación conserva las tareas en el estado de React durante la sesión, pero los cambios no persistidos podrían perderse al recargar.

## Props y eventos

### ¿Qué son las props?

Son valores que un padre pasa a un hijo. Por ejemplo, `TareasPage` pasa listas y funciones a `Pendientes` y `Finalizadas`.

### ¿Qué es un callback en este proyecto?

Es una función que un componente recibe y llama después. `Article` llama a `addTareas`, que está definida en `TareasPage`.

### ¿Cómo se envía actualmente una tarea?

`Article` usa `<form onSubmit={enviarTarea}>` con `preventDefault()`, `trim` y vaciado del input, y el botón es `type="submit"`. El detalle está en [Apuntes § 15](APUNTES_ESTUDIO_REACT.md#15-formularios-y-eventos).

### ¿Qué significa `sm:flex-row`?

Desde el breakpoint `sm`, que en Tailwind es de 640 px por defecto, se aplica `flex-row`. Por debajo de 640 px se mantiene la clase base; si la clase base es `flex-col`, los elementos permanecen organizados en columna.

## Rutas

### ¿Qué aprendí en el reto 06?

Aprendí que `seccionActual` cambia una sección interna sin cambiar la URL, mientras que navegar a `/tareas` cambia la ruta global y muestra `TareasPage`. También aprendí que `TareasPage` conserva el estado de tareas, que se recupera desde `localStorage` al volver, mientras que estados locales como `busqueda` pueden reiniciarse al desmontar la página. Las piezas de React Router están explicadas en [Apuntes § 27](APUNTES_ESTUDIO_REACT.md#27-rutas-y-navegación).
