# Resumen de mi primer proyecto React

## Observaciones para revisar antes del reto 06

El resumen es una buena base. Revisa estos puntos en tu código y completa las explicaciones con tus palabras. Marca cada casilla cuando hayas corregido o ampliado el apartado correspondiente y puedas mostrar un ejemplo; leer la observación no basta. Conserva tus notas y anota cualquier duda para el tutor.

- [ ] **Estado y copias (apartados 5, 7 y 8):** explica por qué no basta con llamar a `setTareas` después de modificar el array original. Distingue crear un array nuevo de copiar el objeto que cambia: `[...tareas]` no copia en profundidad los objetos interiores. Señala dónde tu código hace cada cosa.
- [ ] **Inicializador de `useState` (apartado 5):** compara `useState(leerTareasGuardadas)` con `useState(leerTareasGuardadas())`. Explica cuándo se ejecutaría la lectura en cada caso y por qué elegiste la primera forma. No lo describas como «exactamente una llamada»: en desarrollo, Strict Mode puede repetir la inicialización para detectar problemas.
- [ ] **Efecto y búsqueda (apartados 9 y 13):** aclara que el efecto guarda al montar y después cuando cambia su dependencia `tareas`. Explica qué ocurre al escribir en el buscador y por qué puede haber otro renderizado sin otra escritura en el almacenamiento. Añade qué se guarda al eliminar la última tarea.
- [ ] **Validación (apartados 12 y 14):** recorre `every`, `ids.has` e `ids.add` con dos tareas del mismo ID. Explica por qué se rechaza toda la lista. Distingue JSON inválido (`hola`) de JSON válido con estructura incorrecta (`{}`). Explica también qué conserva la app si falla el guardado y qué podría perderse al recargar.
- [ ] **Responsive (apartado 15):** precisa que `sm:flex-row` se aplica desde el breakpoint `sm` hacia arriba (640 px por defecto), no exclusivamente en móviles pequeños. Identifica qué clase organiza la vista por debajo de ese ancho.
- [ ] **Formulario y comentarios (apartados 6, 10 y 17):** comprueba si existe un elemento `<form>` en `Article` y describe cómo se envía actualmente. Tras el paso previo del 06, actualiza la explicación a `onSubmit`. Revisa los comentarios nuevos: conserva los que te ayudan a explicar una decisión y elimina los que solo repiten el nombre del import, etiqueta o función.
- [ ] **Resumen breve coherente:** actualiza también `A-tener-en-cuenta.md` para que no conserve las simplificaciones que acabas de corregir, especialmente las de `setTareas` y `useEffect`.

**Mis dudas para comentar:**

_Escribe aquí las dudas que aparezcan al revisar._

---

1. Qué es este proyecto
DevQuest es una aplicación de tareas hecha con React y Vite. Permite:
Añadir tareas desde Inicio.
Ver las tareas pendientes.
Completar una tarea.
Recuperar una tarea finalizada.
Buscar tareas.
Eliminar tareas.
Mantener las tareas al recargar gracias a localStorage.
Cada tarea es un objeto con esta forma:
{
    id: "identificador-unico",
    texto: "Leer React",
    completada: false
}
El id distingue tareas aunque tengan el mismo texto. completada indica si está pendiente o finalizada.
2. Estructura principal
devquest/
├─ src/
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ index.css
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ Article.jsx
│  │  └─ Footer.jsx
│  ├─ views/
│  │  ├─ Inicio.jsx
│  │  ├─ Pendientes.jsx
│  │  └─ Finalizadas.jsx
│  └─ utils/
│     └─ Almacenamiento.js
└─ package.json
Archivos importantes
main.jsx: inicia React y muestra App dentro del elemento root.
App.jsx: guarda el estado, modifica las tareas y decide qué vista mostrar.
Header.jsx: muestra el título y los botones de navegación.
Article.jsx: contiene el formulario para añadir una tarea.
Pendientes.jsx: muestra, busca, completa y elimina tareas pendientes.
Finalizadas.jsx: muestra, busca, recupera y elimina tareas finalizadas.
Footer.jsx: muestra el pie de página.
Almacenamiento.js: lee y guarda tareas en localStorage.
index.css: carga Tailwind CSS.
3. Cómo empieza la aplicación
En main.jsx se importa React, los estilos y el componente principal:
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import permite utilizar en este archivo algo que ha sido exportado desde otro módulo.
createRoot conecta React con el elemento HTML root.
App es el componente principal.
StrictMode ayuda a encontrar problemas durante el desarrollo.
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
render muestra el JSX de App en la página.
4. Componentes y funciones
Un componente es una función que devuelve JSX:
function Footer() {
    return <footer>...</footer>;
}
La palabra function crea una función. En React, una función puede ser un componente si devuelve la interfaz que queremos mostrar.
export default Footer permite utilizar ese componente desde otro archivo con import Footer from ....
Los componentes ayudan a separar la aplicación en partes pequeñas. App coordina esas partes y los componentes hijos muestran cada zona.
5. Estado con useState
const [tareas, setTareas] = useState(leerTareasGuardadas);
tareas es el valor actual de la lista.
setTareas es la función para actualizar la lista.
useState permite que React conserve el dato entre renderizados y actualice la interfaz cuando se establece un nuevo estado.
leerTareasGuardadas obtiene el valor inicial desde localStorage.
Otros estados de App son:
const [seccionActual, setSeccionActual] = useState("inicio");
const [busqueda, setBusqueda] = useState("");
seccionActual indica qué parte de la aplicación se está mostrando.
busqueda guarda lo que escribe el usuario en el buscador.
No se debe modificar directamente tareas. Se utiliza setTareas para establecer un nuevo estado:
setTareas(nuevasTareas);
No basta con modificar el array original y después llamar a setTareas si seguimos utilizando la misma referencia. Lo correcto es crear una nueva referencia para el array y, cuando sea necesario modificar una tarea concreta, crear también un nuevo objeto para esa tarea.
Inicialización perezosa
Comparamos:
useState(leerTareasGuardadas);
con:
useState(leerTareasGuardadas());
En la primera forma se pasa la función como inicializador para que React obtenga el valor inicial mediante esa función.
En la segunda forma leerTareasGuardadas() se ejecuta directamente y su resultado se pasa a useState.
La primera forma permite utilizar la inicialización perezosa de useState.
En desarrollo, StrictMode puede repetir la inicialización para detectar problemas, por lo que no debe describirse como una ejecución garantizada exactamente una sola vez.
6. Props entre componentes
Las props son datos o funciones que un componente recibe de su padre:
<Article addTareas={addTareas} />
App pasa la función addTareas a Article. Cuando el usuario envía el formulario, Article llama a esa función y App añade la tarea a su estado.
También se pasan listas y acciones a Pendientes y Finalizadas. Así las vistas pueden mostrar datos y avisar a App cuando el usuario pulsa un botón.
7. Añadir una tarea
const tareaLimpia = tarea.trim();
trim() quita espacios del principio y del final. Después se comprueba que el texto no esté vacío.
const nuevaTarea = {
    id: crypto.randomUUID(),
    texto: tareaLimpia,
    completada: false
};
crypto.randomUUID() crea un identificador único.
El texto se guarda limpio.
Una tarea nueva empieza como pendiente.
setTareas([...tareas, nuevaTarea]);
[...tareas] crea un nuevo array copiando los elementos del array anterior y después se añade nuevaTarea al final.
Es una copia superficial: crea un nuevo array, pero los objetos que contiene siguen siendo las mismas referencias.
8. Actualizar y eliminar tareas
Para completar o recuperar se usa map:
const nuevasTareas = tareas.map((tarea) => {
    if (tarea.id === id) {
        return { ...tarea, completada: true };
    }
    return tarea;
});
map recorre todas las tareas y crea otro array.
Solo se cambia el objeto cuyo id coincide:
{ ...tarea, completada: true }
Esto crea un nuevo objeto copiando las propiedades de la tarea y cambiando completada.
Las demás tareas se conservan.
Por tanto, aquí se realizan dos cosas diferentes:
map crea un nuevo array.
{ ...tarea, ...cambios } crea un nuevo objeto para la tarea modificada.
Para eliminar se usa filter:
const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
filter conserva las tareas cuyo id es diferente. Por eso se elimina exactamente la tarea elegida, aunque haya otra con el mismo texto.
9. Separar y buscar tareas
const tareasPendientes = tareas.filter((tarea) => !tarea.completada);
const tareasFinalizadas = tareas.filter((tarea) => tarea.completada);
Las listas se calculan desde el único estado tareas. No hace falta guardar pendientes y finalizadas en estados separados.
La búsqueda se normaliza así:
const textoBusqueda = busqueda.trim().toLowerCase();
trim() ignora espacios sobrantes.
toLowerCase() permite buscar sin distinguir mayúsculas.
includes() comprueba si el texto contiene la búsqueda.
La búsqueda no modifica ni elimina la lista original.
Cuando cambia busqueda, React vuelve a renderizar. Durante ese renderizado, filter calcula una lista temporal con las tareas que coinciden con la búsqueda.
Esa lista se utiliza para mostrar los resultados, pero no sustituye a tareas ni se guarda en localStorage.
Por eso puede producirse un nuevo renderizado al escribir en el buscador sin que se ejecute de nuevo el useEffect cuya dependencia es [tareas].
10. Eventos de React
onClick: ejecuta una función al pulsar un botón.
onChange: detecta que ha cambiado un input.
onKeyDown: detecta una tecla, por ejemplo Enter.
onSubmit: controla el envío de un formulario.
En Article el formulario utiliza onSubmit para gestionar el envío. La función de envío utiliza event.preventDefault() para evitar el comportamiento de envío por defecto del navegador.
Ejemplo de input controlado:
<input
    value={textoTarea}
    onChange={(e) => setTextoTarea(e.target.value)}
/>
El valor del input viene del estado y cada cambio actualiza ese estado.
11. Renderizado condicional y listas JSX
{seccionActual === "pendientes" && (
    <Pendientes ... />
)}
El operador && muestra la vista solo cuando la condición es verdadera.
Para mostrar muchas tareas se usa map dentro del JSX:
{tareasPendientesFiltradas.map((tarea) => (
    <li key={tarea.id}>{tarea.texto}</li>
))}
key ayuda a React a distinguir cada elemento. Por eso se utiliza tarea.id y no la posición del array.
12. Persistencia con localStorage
localStorage guarda datos en el navegador.
En este proyecto se utiliza la clave:
const CLAVE_TAREAS = "devquest.tareas.v1";
Para guardar un array se convierte en texto:
localStorage.setItem(CLAVE_TAREAS, JSON.stringify(tareas));
JSON.stringify() convierte datos de JavaScript en texto JSON.
setItem() guarda ese texto.
Para leerlo:
const tareasParseadas = JSON.parse(tareasGuardadas);
JSON.parse() convierte el texto JSON guardado en valores de JavaScript.
Después se comprueba que sea un array y que cada tarea tenga id, texto y completada con la estructura esperada.
JSON inválido y estructura incorrecta
Por ejemplo:
hola
no es JSON válido. JSON.parse() no puede interpretarlo y produce un error.
En cambio:
{}
sí es JSON válido, pero puede tener una estructura incorrecta para lo que espera la aplicación.
Si no hay datos, el JSON está dañado o la estructura no es válida, la función devuelve [] para que la aplicación pueda arrancar.
Si falla el guardado en localStorage, el estado que React tiene en memoria puede seguir existiendo durante esa sesión, pero el cambio puede no quedar guardado de forma permanente. Si después se recarga la página, la aplicación podría recuperar los datos anteriores y perder los cambios que no llegaron a guardarse.
13. useEffect y guardado automático
useEffect(() => {
    guardarTareas(tareas);
}, [tareas]);
useEffect se ejecuta al montar el componente y posteriormente cuando cambia su dependencia tareas.
La lista se lee al iniciar y después se sincronizan sus cambios con localStorage.
Cuando cambia busqueda, también hay un renderizado, pero tareas no cambia. Por eso este efecto no vuelve a ejecutarse ni vuelve a guardar las tareas.
La búsqueda no necesita otro useEffect porque solo calcula una lista visible a partir de datos que ya existen.
Si se elimina la última tarea, tareas pasa a ser:
[]
Como tareas ha cambiado, el efecto se ejecuta y guarda el array vacío en localStorage.
14. try/catch, every y Set
try {
    // Leer o guardar datos.
} catch (error) {
    console.error(error);
}
try/catch permite controlar errores, por ejemplo al utilizar localStorage o al ejecutar JSON.parse().
Set permite almacenar valores únicos. En este proyecto sirve para comprobar que no haya IDs repetidos.
const ids = new Set();
every() comprueba que todos los elementos del array cumplen una condición.
ids.has(id) comprueba si ese ID ya está dentro del Set.
ids.add(id) añade el ID al Set.
Si hay dos tareas con el mismo ID, al procesar la segunda:
ids.has(id)
devuelve true.
La validación detecta el duplicado y rechaza toda la lista, en lugar de aceptar una lista que contiene IDs repetidos.
15. Tailwind y CSS
En index.css se importa Tailwind:
@import "tailwindcss";
Las clases se escriben en className:
flex: coloca elementos con Flexbox.
flex-col: los coloca en columna.
w-full: ocupa todo el ancho disponible.
max-w-*: limita el ancho máximo.
px-4 y py-2: añaden espacio interior.
mt-5 y gap-3: separan elementos.
text-white y bg-gray-800: cambian color de texto y fondo.
sm:flex-row: cambia a fila desde el breakpoint sm.
break-words: permite partir textos largos.
En Tailwind, sm es de 640 px por defecto. Por tanto, sm:flex-row se aplica desde 640 px hacia arriba.
Por debajo de 640 px se mantiene la clase base. Si la clase base es flex-col, los elementos permanecen organizados en columna.
Estas clases permiten que los buscadores, las tareas y los botones se adapten a diferentes tamaños de pantalla, incluidos móviles como 377 × 844.
16. Comandos del proyecto
Desde la carpeta devquest/:
npm run dev
Inicia el servidor de desarrollo.
npm run lint
Busca errores de estilo o problemas comunes en el código.
npm run build
Comprueba que la aplicación se puede preparar para producción y genera la carpeta dist.
17. Cosas importantes para recordar
El estado que cambia debe actualizarse con su función set....
No hay que modificar directamente un array u objeto del estado.
Crear un nuevo array no significa copiar profundamente los objetos que contiene.
Cada tarea necesita un id estable.
map sirve para crear una lista nueva transformando elementos.
filter sirve para seleccionar o eliminar elementos.
La búsqueda no debe reemplazar el array original.
localStorage solo guarda texto, por eso usamos JSON.
Después de JSON.parse() hay que validar los datos.
Primero se leen los datos guardados y después se sincronizan los cambios.
Los componentes reciben información mediante props.
Los inputs controlados tienen value y onChange.
Los formularios se gestionan mediante onSubmit.
En listas JSX se necesita una key estable.
try/catch permite controlar errores sin romper la aplicación.
En móvil conviene usar anchos fluidos y permitir saltos de línea.
Los comentarios deben explicar el motivo de una decisión, no repetir lo que ya resulta evidente por el nombre del código.
