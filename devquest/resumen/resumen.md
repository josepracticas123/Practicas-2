# Resumen de mi primer proyecto React

## 1. Qué es este proyecto

DevQuest es una aplicación de tareas hecha con React y Vite. Permite:

- Añadir tareas desde Inicio.
- Ver las tareas pendientes.
- Completar una tarea.
- Recuperar una tarea finalizada.
- Buscar tareas.
- Eliminar tareas.
- Mantener las tareas al recargar gracias a `localStorage`.

Cada tarea es un objeto con esta forma:

```js
{
	id: "identificador-unico",
	texto: "Leer React",
	completada: false
}
```

El `id` distingue tareas aunque tengan el mismo texto. `completada` indica si está pendiente o finalizada.

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

- `main.jsx`: inicia React y muestra `App` dentro del elemento `root`.
- `App.jsx`: guarda el estado, modifica las tareas y decide qué vista mostrar.
- `Header.jsx`: muestra el título y los botones de navegación.
- `Article.jsx`: contiene el formulario para añadir una tarea.
- `Pendientes.jsx`: muestra, busca, completa y elimina tareas pendientes.
- `Finalizadas.jsx`: muestra, busca, recupera y elimina tareas finalizadas.
- `Footer.jsx`: muestra el pie de página.
- `Almacenamiento.js`: lee y guarda tareas en `localStorage`.
- `index.css`: carga Tailwind CSS.

## 3. Cómo empieza la aplicación

En `main.jsx` se importa React, los estilos y el componente principal:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
```

- `import` trae algo que está definido en otro archivo.
- `createRoot` conecta React con el elemento HTML `root`.
- `App` es el componente principal.
- `StrictMode` ayuda a encontrar problemas durante el desarrollo.

```jsx
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>
);
```

`render` muestra el JSX de `App` en la página.

## 4. Componentes y funciones

Un componente es una función que devuelve JSX:

```jsx
function Footer() {
	return <footer>...</footer>;
}
```

La palabra `function` crea una función. En React, una función puede ser un componente si devuelve la interfaz que queremos mostrar.

`export default Footer` permite utilizar ese componente desde otro archivo con `import Footer from ...`.

Los componentes ayudan a separar la aplicación en partes pequeñas. `App` coordina esas partes y los componentes hijos muestran cada zona.

## 5. Estado con `useState`

```jsx
const [tareas, setTareas] = useState(leerTareasGuardadas);
```

- `tareas` es el valor actual de la lista.
- `setTareas` es la función para cambiar la lista.
- `useState` hace que React recuerde el dato y actualice la pantalla cuando cambia.
- `leerTareasGuardadas` obtiene el valor inicial desde `localStorage`.

Otros estados de `App` son:

```jsx
const [seccionActual, setSeccionActual] = useState("inicio");
const [busqueda, setBusqueda] = useState("");
```

- `seccionActual` indica qué parte de la aplicación se está mostrando.
- `busqueda` guarda lo que escribe el usuario en el buscador.

No se debe cambiar directamente `tareas` con una asignación. Se usa `setTareas` para que React detecte el cambio:

```jsx
setTareas(nuevasTareas);
```

## 6. Props entre componentes

Las props son datos o funciones que un componente recibe de su padre:

```jsx
<Article addTareas={addTareas} />
```

`App` pasa la función `addTareas` a `Article`. Cuando el usuario envía el formulario, `Article` llama a esa función y `App` añade la tarea a su estado.

También se pasan listas y acciones a `Pendientes` y `Finalizadas`. Así las vistas pueden mostrar datos y avisar a `App` cuando el usuario pulsa un botón.

## 7. Añadir una tarea

```jsx
const tareaLimpia = tarea.trim();
```

`trim()` quita espacios del principio y del final. Después se comprueba que el texto no esté vacío.

```jsx
const nuevaTarea = {
	id: crypto.randomUUID(),
	texto: tareaLimpia,
	completada: false
};
```

- `crypto.randomUUID()` crea un identificador único.
- El texto se guarda limpio.
- Una tarea nueva empieza como pendiente.

```jsx
setTareas([...tareas, nuevaTarea]);
```

`...tareas` copia la lista anterior y añade la nueva tarea al final.

## 8. Actualizar y eliminar tareas

Para completar o recuperar se usa `map`:

```jsx
const nuevasTareas = tareas.map((tarea) => {
	if (tarea.id === id) {
		return { ...tarea, completada: true };
	}
	return tarea;
});
```

`map` recorre todas las tareas y crea otra lista. Solo se cambia el objeto cuyo `id` coincide; las demás se conservan.

Para eliminar se usa `filter`:

```jsx
const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
```

`filter` conserva las tareas cuyo `id` es diferente. Por eso se elimina exactamente la tarea elegida, aunque haya otra con el mismo texto.

## 9. Separar y buscar tareas

```jsx
const tareasPendientes = tareas.filter((tarea) => !tarea.completada);
const tareasFinalizadas = tareas.filter((tarea) => tarea.completada);
```

Las listas se calculan desde el único estado `tareas`. No hace falta guardar pendientes y finalizadas en estados separados.

La búsqueda se normaliza así:

```jsx
const textoBusqueda = busqueda.trim().toLowerCase();
```

- `trim()` ignora espacios sobrantes.
- `toLowerCase()` permite buscar sin distinguir mayúsculas.
- `includes()` comprueba si el texto contiene la búsqueda.

La búsqueda solo cambia lo que se muestra. No modifica ni elimina la lista original.

## 10. Eventos de React

- `onClick`: ejecuta una función al pulsar un botón.
- `onChange`: detecta que ha cambiado un input.
- `onKeyDown`: detecta una tecla, por ejemplo `Enter`.

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
	<Pendientes ... />
)}
```

El operador `&&` muestra la vista solo cuando la condición es verdadera.

Para mostrar muchas tareas se usa `map` dentro del JSX:

```jsx
{tareasPendientesFiltradas.map((tarea) => (
	<li key={tarea.id}>{tarea.texto}</li>
))}
```

`key` ayuda a React a distinguir cada elemento. Por eso se utiliza `tarea.id` y no la posición del array.

## 12. Persistencia con `localStorage`

`localStorage` guarda datos en el navegador. En este proyecto se utiliza la clave:

```js
const CLAVE_TAREAS = "devquest.tareas.v1";
```

Para guardar un array se convierte en texto:

```js
localStorage.setItem(CLAVE_TAREAS, JSON.stringify(tareas));
```

- `JSON.stringify()` convierte datos de JavaScript en texto JSON.
- `setItem()` guarda ese texto.

Para leerlo:

```js
const tareasParseadas = JSON.parse(tareasGuardadas);
```

`JSON.parse()` convierte el texto otra vez en datos de JavaScript. Después se comprueba que sea un array y que cada tarea tenga `id`, `texto` y `completada` correctos.

Si no hay datos, el JSON está dañado o la estructura no es válida, la función devuelve `[]` para que la aplicación pueda arrancar.

## 13. `useEffect` y guardado automático

```jsx
useEffect(() => {
	guardarTareas(tareas);
}, [tareas]);
```

`useEffect` ejecuta el guardado cuando cambia `tareas`. La lista se lee al iniciar y después se sincronizan sus cambios con `localStorage`.

La búsqueda no necesita otro `useEffect` porque solo calcula una lista visible a partir de datos que ya existen.

## 14. `try/catch` y `Set`

```js
try {
	// Leer o guardar datos.
} catch (error) {
	console.error(error);
}
```

`try/catch` evita que un error de `localStorage` o de `JSON.parse` rompa la aplicación.

```js
const ids = new Set();
```

`Set` guarda valores sin repetir. Aquí sirve para detectar si dos tareas tienen el mismo `id`.

## 15. Tailwind y CSS

En `index.css` se importa Tailwind:

```css
@import "tailwindcss";
```

Las clases se escriben en `className`:

- `flex`: coloca elementos con Flexbox.
- `flex-col`: los coloca en columna.
- `w-full`: ocupa todo el ancho disponible.
- `max-w-*`: limita el ancho máximo.
- `px-4` y `py-2`: añaden espacio interior.
- `mt-5` y `gap-3`: separan elementos.
- `text-white` y `bg-gray-800`: cambian color de texto y fondo.
- `sm:flex-row`: cambia a fila desde pantallas pequeñas.
- `break-words`: permite partir textos largos.

Estas clases hacen que los buscadores, las tareas y los botones se adapten a móviles como 377 × 844.

## 16. Comandos del proyecto

Desde la carpeta `devquest/`:

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

Comprueba que la aplicación se puede preparar para producción.

## 17. Cosas importantes para recordar

1. El estado que cambia debe actualizarse con su función `set...`.
2. No hay que modificar directamente un array u objeto del estado.
3. Cada tarea necesita un `id` estable.
4. `map` sirve para crear una lista nueva cambiando elementos.
5. `filter` sirve para seleccionar o eliminar elementos.
6. La búsqueda no debe reemplazar el array original.
7. `localStorage` solo guarda texto, por eso usamos JSON.
8. Después de `JSON.parse()` hay que validar los datos.
9. Primero se leen los datos guardados y después se sincronizan los cambios.
10. Los componentes reciben información mediante props.
11. Los inputs controlados tienen `value` y `onChange`.
12. En listas JSX se necesita una `key` estable.
13. `try/catch` permite controlar errores sin romper la app.
14. En móvil conviene usar anchos fluidos y permitir saltos de línea.
15. Los comentarios deben explicar el motivo de una decisión, no cada línea.
