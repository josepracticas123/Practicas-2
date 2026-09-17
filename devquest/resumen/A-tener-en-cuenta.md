App → coordina el estado y las partes principales de la aplicación.
useState → guarda datos que pueden cambiar.
setTareas → modifica el estado de las tareas y provoca un nuevo renderizado.
useEffect → ejecuta código cuando cambia tareas.
localStorage → guarda las tareas para que no se pierdan al recargar.
JSON.stringify → convierte las tareas en texto para guardarlas.
JSON.parse → convierte el texto guardado otra vez en datos.
try/catch → controla posibles errores.
Set → permite comprobar que no haya IDs repetidos.
map → recorre las tareas y crea un nuevo array, por ejemplo para actualizar una.
filter → crea un nuevo array solo con las tareas que cumplen una condición.
Props → permiten pasar datos o funciones de un componente a otro.
onClick → ejecuta una función cuando hacemos clic.
onChange → detecta cambios en un input.
Tailwind → sus clases controlan el diseño, tamaños, espacios y adaptación a móvil.

-¿Por qué setTareas y no modificar directamente tareas?

Porque React necesita que actualicemos el estado con su función para detectar el cambio y volver a renderizar.

-¿Por qué usamos useEffect para localStorage?

Porque queremos guardar las tareas cada vez que el estado tareas cambia.

-¿Cómo funciona el buscador?

Uso filter para crear una lista temporal con las tareas cuyo texto coincide con lo que escribe el usuario. No modifico ni guardo esa lista, solo la muestro.