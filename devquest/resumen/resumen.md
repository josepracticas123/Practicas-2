# Resumen de mi primer proyecto React

Revisión documental del 18/09/2026: se han corregido formato y ejemplos, y retirado las observaciones ya incorporadas. El repaso escrito está completado en [REVISION-PENDIENTE.md](REVISION-PENDIENTE.md). La conversación se prepara en [Repaso con el tutor](../REPASO-CON-TUTOR.md).

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
│  ├─ pages/
│  │  ├─ TareasPage.jsx
│  │  ├─ PortalPage.jsx
│  │  └─ QuizPage.jsx
│  ├─ data/
│  │  └─ Preguntas.js
│  ├─ index.css
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ Article.jsx
│  │  ├─ MiniappCards.jsx
│  │  ├─ CatalogoForm.jsx
│  │  ├─ ListaProductos.jsx
│  │  ├─ ProductoCard.jsx
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

main.jsx: inicia React y muestra App dentro de `BrowserRouter` y del elemento root. Las rutas se declaran en `App.jsx`.

App.jsx: mantiene la estructura global con Header y Footer, y declara las rutas para PortalPage, TareasPage, QuizPage y CatalogoPage.

TareasPage.jsx: guarda el estado, modifica las tareas, calcula las listas y decide qué vista interna mostrar.

Header.jsx: muestra la cabecera global del portal.

Article.jsx: contiene el formulario con `onSubmit`, el input controlado y la validación del texto.

PortalPage.jsx: define el array de miniapps y lo recorre con `map`.

MiniappCards.jsx: recibe un objeto `miniapp` por props y muestra sus datos. Recibe el objeto desde `PortalPage` para separar los datos de la presentación y poder reutilizar la tarjeta.

QuizPage.jsx: controla el recorrido completo del Quiz, la opción seleccionada, las respuestas confirmadas y el resultado.

QuizQuestions.jsx: recibe por props los datos de la pregunta, la selección y el estado de comprobación; comunica la opción elegida mediante un callback.

Preguntas.js: contiene cinco preguntas locales, cada una con tres opciones, una respuesta correcta y una explicación.

Inicio.jsx: recibe `addTareas` desde `TareasPage` y muestra `Article`.

Pendientes.jsx: muestra, busca, completa y elimina tareas pendientes.

Finalizadas.jsx: muestra, busca, recupera y elimina tareas finalizadas.

Footer.jsx: muestra el pie de página.

Almacenamiento.js: lee y guarda tareas en localStorage.

CatalogoPages.jsx: coordina el estado del catálogo, las consultas a DummyJSON, los estados de carga y error, la consulta aplicada y las acciones de reintento y «Mostrar todos».

CatalogoForm.jsx: muestra el selector de modo, el campo de texto, el selector de categorías, «Consultar», «Cargar categorías» y «Mostrar todos». Recibe los estados y las funciones mediante props.

ListaProductos.jsx: muestra la descripción de la consulta aplicada, los productos recibidos frente al total y el mensaje cuando la lista está vacía.

ProductoCard.jsx: muestra la imagen, el título, la descripción y el precio de cada producto.

index.css: carga Tailwind CSS.

## 3. Cómo empieza la aplicación

En main.jsx se importa React, los estilos y el componente principal:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
```

import permite utilizar en este archivo algo que ha sido exportado desde otro módulo.

createRoot conecta React con el elemento HTML root.

App es el componente principal de la estructura global. Contiene `Routes` y decide si muestra `PortalPage`, `TareasPage` o la página no encontrada.

StrictMode ayuda a encontrar problemas durante el desarrollo.

```jsx
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
```

render muestra el JSX de App en la página. `BrowserRouter` proporciona el contexto para que las rutas cambien según la URL.

`Routes` agrupa las rutas declaradas y cada `Route` relaciona una URL con una página: `/` muestra `PortalPage`, `/tareas` muestra `TareasPage`, `/quiz` muestra `QuizPage` y la ruta comodín muestra la página no encontrada. `Link` permite navegar sin recargar.

La navegación global se realiza mediante esas rutas y modifica la URL. Dentro de `TareasPage`, la navegación entre `inicio`, `pendientes` y `finalizadas` es interna: usa `seccionActual` y `setSeccionActual`, por lo que cambia el contenido sin crear rutas nuevas.

## Estado actual del Reto 07

El Reto 07 está completado en su implementación. No se ha añadido puntuación ni una siguiente pregunta porque pertenecen al Reto 08.

Está implementado:

- `src/data/Preguntas.js` con cinco preguntas locales. Cada una tiene `id`, `enunciado`, tres opciones, `respuestaCorrectaId` y `explicacion`.
- `QuizPage.jsx`, la ruta `/quiz` y los accesos desde `PortalPage` y `Header`.
- Solo se muestra la primera pregunta del array.
- Radios controlados, con `label` asociado mediante `htmlFor`, IDs estables y selección mediante `seleccionadaId`.
- `QuizQuestions.jsx` recibe por props la pregunta, la selección y el estado de comprobación, y comunica los cambios mediante `onSeleccionar`.
- El estado de selección permanece en `QuizPage` y se puede cambiar de opción antes de comprobar.
- El formulario comprueba la respuesta una sola vez mediante `onSubmit` y `preventDefault()`.
- Después de comprobar, las opciones quedan bloqueadas y se muestra si la respuesta es correcta o incorrecta.
- Se muestra la explicación y, cuando la respuesta es incorrecta, también la opción correcta.
- Al recargar, el estado local del Quiz se reinicia.
- Las responsabilidades del Quiz se mantienen separadas de los datos, estado y lógica de Tareas.

### Qué he practicado/aprendido en el 07

- Modelar preguntas y opciones como datos constantes.
- Pasar datos y funciones mediante props entre `QuizPage` y `QuizQuestions`.
- Controlar radios con el ID seleccionado.
- Calcular el resultado comparando `seleccionadaId` con `respuestaCorrectaId`.
- Usar estado para distinguir una pregunta disponible de una ya comprobada.

### Decisiones importantes

- Se guarda el ID de la opción seleccionada, no el texto completo, porque los IDs son estables y permiten comparar directamente con `respuestaCorrectaId`.
- El resultado se calcula a partir de los datos y la selección, en lugar de duplicar ese resultado como un estado independiente.
- El estado de selección y comprobación vive en `QuizPage`; `QuizQuestions` se encarga de recibir props y comunicar la elección.
- Solo se muestra la primera pregunta en el alcance del Reto 07. La navegación y la puntuación se implementan en el Reto 08.

### Pruebas realizadas

Revisión sobre `4d4b688`: partidas de 5/5, 0/5 y 3/5, bloqueo de opciones, reinicio, recarga directa y conservación de Tareas. Se comprobó selección y envío con teclado y presentación a 375 px y 1280 px. Lint y build pasan.

### Seguimiento

El 07 está cerrado funcionalmente y sus preguntas están respondidas. La cabecera compartida está corregida; el cierre se registra en el 06. La conversación se registra en [Repaso con el tutor](../REPASO-CON-TUTOR.md).

## Estado actual del Reto 08

El Reto 08 está completado.

Está implementado:

- Navegación secuencial por las cinco preguntas mediante el índice de `QuizPage`.
- Estado de la opción seleccionada y respuestas confirmadas asociadas al ID de cada pregunta.
- Comprobación de una respuesta una sola vez, botón «Siguiente pregunta» y limpieza de la selección al avanzar.
- Botón «Ver resultado» en la última pregunta.
- Pantalla de resultados separada en `QuizResult`.
- Cálculo de aciertos mediante `filter().length`, sin estado adicional para la puntuación.
- Resumen de cada pregunta con enunciado, respuesta del usuario, respuesta correcta, resultado y explicación.
- Botón «Volver a jugar», que reinicia índice, selección y respuestas confirmadas sin recargar.
- Recargar o salir del Quiz comienza una partida nueva; las tareas guardadas no se modifican.
- Indicador «Pregunta X de Y».
- `QuizPage` y `QuizResult` están separados y comentados para facilitar la comprensión a un perfil junior.

### Pruebas realizadas

- Todas correctas.
- Todas incorrectas.
- Respuestas mezcladas.
- «Volver a jugar».
- Recorrido secuencial, bloqueo tras comprobar y pantalla de resultados.

`npm run lint` y `npm run build` pasan correctamente.

### Pendientes

No quedan pendientes del Reto 08.

## Estado actual del Reto 09

El Reto 09 está implementado.

Está hecho:

- Ruta `/catalogo` integrada desde el portal y la navegación global.
- Petición `fetch` a DummyJSON para consultar productos con `limit=12`.
- Estados inicial, cargando, éxito, lista vacía y error.
- Reintento y vuelta a cargar sin duplicar productos.
- Bloqueo del botón mientras la petición está en curso para evitar solicitudes simultáneas.
- Sustitución del array de productos en cada carga nueva en lugar de añadirlos a la lista anterior.

La lógica principal se mantiene en `CatalogoPage` y usa `response.ok`, `await response.json()` y comprobaciones de tipo para validar la respuesta real antes de renderizar los productos.

## Estado actual del Reto 10

El Reto 10 está implementado en `/catalogo`. La carga sigue siendo manual: cambiar los campos no consulta hasta enviar el formulario.

### Consultas disponibles

- Todos: `GET https://dummyjson.com/products?limit=12`.
- Texto: `GET https://dummyjson.com/products/search?q=...&limit=12`.
- Lista de categorías: `GET https://dummyjson.com/products/category-list`.
- Categoría: `GET https://dummyjson.com/products/category/<categoria>?limit=12`.


La consulta de texto crea los parámetros con `URLSearchParams`, por lo que espacios y caracteres como `&` se codifican correctamente en `q`. El segmento de categoría se codifica con `encodeURIComponent`.

`CatalogoPages.jsx` mantiene por separado los campos actuales del formulario y `consultaAplicada`. La última consulta guarda su URL, descripción, tipo y valor. Por eso cambiar el texto o la categoría sin enviar no cambia la descripción de los resultados visibles. Si una petición falla, «Reintentar» usa la consulta guardada, no los valores modificados después.

El botón «Mostrar todos» limpia el texto y la categoría y pasa directamente una consulta general a la función de carga. Así no depende de que el cambio de modo se haya aplicado inmediatamente.

La respuesta se acepta solo si `response.ok` es verdadero y `products` es un array. La interfaz sustituye los productos anteriores, guarda `total`, muestra `productos.length` frente a ese total y distingue una búsqueda sin coincidencias de un error de conexión. Las categorías tienen estados y datos independientes.

### Organización del catálogo

- `CatalogoPages.jsx` contiene la lógica y el estado.
- `CatalogoForm.jsx` contiene los controles y el formulario.
- `ListaProductos.jsx` muestra el resumen y decide si renderiza tarjetas o el mensaje de lista vacía.
- `ProductoCard.jsx` presenta cada producto.

Las clases de Tailwind organizan las tarjetas en una columna, dos o tres según el ancho disponible. Los controles son elementos HTML interactivos y se pueden recorrer con el teclado.

El Reto 11 está documentado como siguiente paso, pero todavía no hay código actual para crear, editar o eliminar productos.

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

Otros estados de `TareasPage` son:

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

`TareasPage` pasa `addTareas` a `Inicio`, que la pasa a `Article`. El input es controlado y `onSubmit` llama a `enviarTarea`, que valida y comunica el alta a `TareasPage`.

La conexión a `onSubmit` ya está implementada y el botón no tiene `onClick` independiente.

También se pasan listas y acciones a Pendientes y Finalizadas. Así las vistas pueden mostrar datos y avisar a `TareasPage` cuando el usuario pulsa un botón.

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

Por eso dos tareas con el mismo texto pueden tener IDs diferentes: cada alta genera un nuevo ID.

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

onSubmit: controla el envío de un formulario.

`Article` utiliza `<form onSubmit={enviarTarea}>`. La función recibe el evento de envío, llama a `preventDefault()`, limpia y valida el texto, añade la tarea y vacía el input. El botón tiene `type="submit"` y ya no lleva un `onClick` de envío. La implementación está presente; las pruebas de clic y Enter se registran en el checklist del 06.

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

Este ejemplo simplificado muestra un título cuando se cumple la condición. En `TareasPage`, esa condición muestra `Pendientes` con sus props.

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
