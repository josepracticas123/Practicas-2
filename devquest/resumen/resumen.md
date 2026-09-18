# Resumen de mi primer proyecto React

Revisión documental del 18/09/2026: se han corregido formato y ejemplos, y retirado las observaciones ya incorporadas. Los pendientes prácticos están en [REVISION-PENDIENTE.md](REVISION-PENDIENTE.md).

## 1. Qué es este proyecto

DevQuest es una aplicación de tareas hecha con React y Vite. Permite:

Añadir tareas desde Inicio.

Ver las tareas pendientes.

Completar una tarea.

Recuperar una tarea finalizada.

Buscar tareas.

Eliminar tareas.

Mantener las tareas al recargar gracias a localStorage.

Cada tarea es un objeto con esta forma:

```js
{
    id: "identificador-unico",
    texto: "Leer React",
    completada: false
}
```

El id distingue tareas aunque tengan el mismo texto. completada indica si está pendiente o finalizada.

## 2. Estructura principal

```text
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
```

### Archivos importantes

main.jsx: inicia React y muestra App dentro del elemento root.

App.jsx: guarda el estado, modifica las tareas y decide qué vista mostrar.

Header.jsx: muestra el título y los botones de navegación.

Article.jsx: contiene el input y los eventos para añadir una tarea; la conversión a `<form>` está pendiente.

Inicio.jsx: recibe `addTareas` desde `App` y muestra `Article`.

Pendientes.jsx: muestra, busca, completa y elimina tareas pendientes.

Finalizadas.jsx: muestra, busca, recupera y elimina tareas finalizadas.

Footer.jsx: muestra el pie de página.

Almacenamiento.js: lee y guarda tareas en localStorage.

index.css: carga Tailwind CSS.

## 3. Cómo empieza la aplicación

En main.jsx se importa React, los estilos y el componente principal:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
```

import permite utilizar en este archivo algo que ha sido exportado desde otro módulo.

createRoot conecta React con el elemento HTML root.

App es el componente principal.

StrictMode ayuda a encontrar problemas durante el desarrollo.

```jsx
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
```

render muestra el JSX de App en la página.

## 4. Componentes y funciones

Un componente es una función que devuelve JSX:

```jsx
function Footer() {
    return <footer>...</footer>;
}
```

La palabra function crea una función. En React, una función puede ser un componente si devuelve la interfaz que queremos mostrar.

export default Footer permite utilizar ese componente desde otro archivo con import Footer from ....

Los componentes ayudan a separar la aplicación en partes pequeñas. App coordina esas partes y los componentes hijos muestran cada zona.

## 5. Estado con useState

```js
const [tareas, setTareas] = useState(leerTareasGuardadas);
```

tareas es el valor actual de la lista.

setTareas es la función para actualizar la lista.

useState permite que React conserve el dato entre renderizados y actualice la interfaz cuando se establece un nuevo estado.

leerTareasGuardadas obtiene el valor inicial desde localStorage.

Otros estados de App son:

```js
const [seccionActual, setSeccionActual] = useState("inicio");
```

```js
const [busqueda, setBusqueda] = useState("");
```

seccionActual indica qué parte de la aplicación se está mostrando.

busqueda guarda lo que escribe el usuario en el buscador.

No se debe modificar directamente tareas. Se utiliza setTareas para establecer un nuevo estado:

```js
setTareas(nuevasTareas);
```

No basta con modificar el array original y después llamar a setTareas si seguimos utilizando la misma referencia. Lo correcto es crear una nueva referencia para el array y, cuando sea necesario modificar una tarea concreta, crear también un nuevo objeto para esa tarea.

### Inicialización perezosa

Comparamos:

```js
useState(leerTareasGuardadas);
```

con:

```js
useState(leerTareasGuardadas());
```

En la primera forma se pasa la función como inicializador para que React obtenga el valor inicial mediante esa función.

En la segunda forma leerTareasGuardadas() se ejecuta directamente y su resultado se pasa a useState.

La primera forma permite utilizar la inicialización perezosa de useState.

En desarrollo, StrictMode puede repetir la inicialización para detectar problemas, por lo que no debe describirse como una ejecución garantizada exactamente una sola vez.

## 6. Props entre componentes

Las props son datos o funciones que un componente recibe de su padre:

```jsx
<Article addTareas={addTareas} />
```

App pasa `addTareas` a `Inicio`, que la pasa a `Article`. Cuando el usuario pulsa el botón o Enter, `Article` llama a esa función y `App` añade la tarea a su estado.

También se pasan listas y acciones a Pendientes y Finalizadas. Así las vistas pueden mostrar datos y avisar a App cuando el usuario pulsa un botón.

## 7. Añadir una tarea

```js
const tareaLimpia = tarea.trim();
```

trim() quita espacios del principio y del final. Después se comprueba que el texto no esté vacío.

```js
const nuevaTarea = {
    id: crypto.randomUUID(),
    texto: tareaLimpia,
    completada: false
};
```

crypto.randomUUID() crea un identificador único.

El texto se guarda limpio.

Una tarea nueva empieza como pendiente.

```js
setTareas([...tareas, nuevaTarea]);
```

[...tareas] crea un nuevo array copiando los elementos del array anterior y después se añade nuevaTarea al final.

Es una copia superficial: crea un nuevo array, pero los objetos que contiene siguen siendo las mismas referencias.

## 8. Actualizar y eliminar tareas

Para completar o recuperar se usa map:

```js
const nuevasTareas = tareas.map((tarea) => {
    if (tarea.id === id) {
        return { ...tarea, completada: true };
    }
    return tarea;
});
```

map recorre todas las tareas y crea otro array.

Solo se cambia el objeto cuyo id coincide:

```js
{ ...tarea, completada: true }
```

Esto crea un nuevo objeto copiando las propiedades de la tarea y cambiando completada.

Las demás tareas se conservan.

Por tanto, aquí se realizan dos cosas diferentes:

map crea un nuevo array.

{ ...tarea, ...cambios } crea un nuevo objeto para la tarea modificada.

Para eliminar se usa filter:

```js
const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
```

filter conserva las tareas cuyo id es diferente. Por eso se elimina exactamente la tarea elegida, aunque haya otra con el mismo texto.

## 9. Separar y buscar tareas

```js
const tareasPendientes = tareas.filter((tarea) => !tarea.completada);
```

```js
const tareasFinalizadas = tareas.filter((tarea) => tarea.completada);
```

Las listas se calculan desde el único estado tareas. No hace falta guardar pendientes y finalizadas en estados separados.

La búsqueda se normaliza así:

```js
const textoBusqueda = busqueda.trim().toLowerCase();
```

trim() ignora espacios sobrantes.

toLowerCase() permite buscar sin distinguir mayúsculas.

includes() comprueba si el texto contiene la búsqueda.

La búsqueda no modifica ni elimina la lista original.

Cuando cambia busqueda, React vuelve a renderizar. Durante ese renderizado, filter calcula una lista temporal con las tareas que coinciden con la búsqueda.

Esa lista se utiliza para mostrar los resultados, pero no sustituye a tareas ni se guarda en localStorage.

Por eso puede producirse un nuevo renderizado al escribir en el buscador sin que se ejecute de nuevo el useEffect cuya dependencia es [tareas].

## 10. Eventos de React

onClick: ejecuta una función al pulsar un botón.

onChange: detecta que ha cambiado un input.

onKeyDown: detecta una tecla, por ejemplo Enter.

onSubmit: controla el envío de un formulario.

Actualmente `Article` no tiene `<form>`, `onSubmit` ni `preventDefault`. El botón utiliza `onClick` y Enter se gestiona con `onKeyDown`. El paso 0 del reto 06 pide centralizar ambos en un formulario con `onSubmit`; esa mejora todavía está pendiente.

Ejemplo de input controlado:

```jsx
<input
    value={textoTarea}
    onChange={(e) => setTextoTarea(e.target.value)}
/>
```

El valor del input viene del estado y cada cambio actualiza ese estado.

## 11. Renderizado condicional y listas JSX

```jsx
{seccionActual === "pendientes" && (
    <h2>Tareas pendientes</h2>
)}
```

Este ejemplo simplificado muestra un título cuando se cumple la condición. En `App`, esa condición muestra `Pendientes` con sus props.

Para mostrar muchas tareas se usa map dentro del JSX:

```jsx
{tareasPendientesFiltradas.map((tarea) => (
    <li key={tarea.id}>{tarea.texto}</li>
))}
```

key ayuda a React a distinguir cada elemento. Por eso se utiliza tarea.id y no la posición del array.

## 12. Persistencia con localStorage

localStorage guarda datos en el navegador.

En este proyecto se utiliza la clave:

```js
const CLAVE_TAREAS = "devquest.tareas.v1";
```

Para guardar un array se convierte en texto:

```js
localStorage.setItem(CLAVE_TAREAS, JSON.stringify(tareas));
```

JSON.stringify() convierte datos de JavaScript en texto JSON.

setItem() guarda ese texto.

Para leerlo:

```js
const tareasParseadas = JSON.parse(tareasGuardadas);
```

JSON.parse() convierte el texto JSON guardado en valores de JavaScript.

Después se comprueba que sea un array y que cada tarea tenga id, texto y completada con la estructura esperada.

### JSON inválido y estructura incorrecta

Por ejemplo:

```js
hola
```

no es JSON válido. JSON.parse() no puede interpretarlo y produce un error.

En cambio:

```js
{}
```

sí es JSON válido, pero puede tener una estructura incorrecta para lo que espera la aplicación.

Si no hay datos, el JSON está dañado o la estructura no es válida, la función devuelve [] para que la aplicación pueda arrancar.

Si falla el guardado en localStorage, el estado que React tiene en memoria puede seguir existiendo durante esa sesión, pero el cambio puede no quedar guardado de forma permanente. Si después se recarga la página, la aplicación podría recuperar los datos anteriores y perder los cambios que no llegaron a guardarse.

## 13. useEffect y guardado automático

```jsx
useEffect(() => {
    guardarTareas(tareas);
}, [tareas]);
```

useEffect se ejecuta al montar el componente y posteriormente cuando cambia su dependencia tareas.

La lista se lee al iniciar y después se sincronizan sus cambios con localStorage.

Cuando cambia busqueda, también hay un renderizado, pero tareas no cambia. Por eso este efecto no vuelve a ejecutarse ni vuelve a guardar las tareas.

La búsqueda no necesita otro useEffect porque solo calcula una lista visible a partir de datos que ya existen.

Si se elimina la última tarea, tareas pasa a ser:

```js
[]
```

Como tareas ha cambiado, el efecto se ejecuta y guarda el array vacío en localStorage.

## 14. try/catch, every y Set

```js
try {
    // Leer o guardar datos.
} catch (error) {
    console.error(error);
}
```

try/catch permite controlar errores, por ejemplo al utilizar localStorage o al ejecutar JSON.parse().

Set permite almacenar valores únicos. En este proyecto sirve para comprobar que no haya IDs repetidos.

```js
const ids = new Set();
```

every() comprueba que todos los elementos del array cumplen una condición.

ids.has(id) comprueba si ese ID ya está dentro del Set.

ids.add(id) añade el ID al Set.

Si hay dos tareas con el mismo ID, al procesar la segunda:

```js
ids.has(id)
```

devuelve true.

La validación detecta el duplicado y rechaza toda la lista, en lugar de aceptar una lista que contiene IDs repetidos.

## 15. Tailwind y CSS

En index.css se importa Tailwind:

```css
@import "tailwindcss";
```

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

## 16. Comandos del proyecto

Desde la carpeta devquest/:

```bash
npm run dev
```

Inicia el servidor de desarrollo.

```bash
npm run lint
```

Busca errores de estilo o problemas comunes en el código.

```bash
npm run build
```

Comprueba que la aplicación se puede preparar para producción y genera la carpeta dist.

## 17. Cosas importantes para recordar

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
