# APUNTES DE ESTUDIO - MI PROYECTO REACT

Estos apuntes describen el código que existe actualmente en `devquest/src/`. Cuando algo pertenece a las instrucciones del Reto 06 pero todavía no está implementado, aparece indicado como futuro.

## 1. Qué he construido

He construido una aplicación de tareas con React y Vite. Permite:

- Añadir tareas desde la sección `Inicio`.
- Ver las tareas pendientes.
- Completar una tarea pendiente.
- Recuperar una tarea finalizada.
- Buscar tareas por texto.
- Eliminar tareas pendientes o finalizadas.
- Mantener las tareas después de recargar gracias a `localStorage`.

Cada tarea se guarda como un objeto con esta forma general:

```js
{
  id: "identificador-unico",
  texto: "Leer React",
  completada: false
}
```

El `id` identifica la tarea. `texto` contiene lo que escribió el usuario y `completada` indica si aparece como pendiente o finalizada.

La navegación interna actual no utiliza rutas: `TareasPage` muestra los botones y guarda en `seccionActual` cuál de las tres secciones se ve: `inicio`, `pendientes` o `finalizadas`. `Header` es ahora la cabecera global del portal y no contiene esa navegación.

## 2. Cómo arranca React

### `main.jsx`

`main.jsx` es el punto de entrada de la aplicación. Importa:

- `StrictMode` desde React.
- `createRoot` desde `react-dom/client`.
- `index.css`, que carga Tailwind.
- `App`, el componente principal.
- `BrowserRouter` desde `react-router`, que ya envuelve `App`.

La parte principal es:

```jsx
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

### `createRoot`

`index.html` contiene el elemento con id `root`. `document.getElementById('root')` busca ese elemento y `createRoot` crea el punto donde React gestionará la interfaz.

### `StrictMode`

`StrictMode` ayuda a detectar problemas durante el desarrollo. En particular, algunas inicializaciones o comprobaciones pueden repetirse en desarrollo. Por eso no debo afirmar que una función inicializadora se ejecuta exactamente una sola vez.

### `App` y `render`

`<App />` representa el componente principal. `render` le indica a React que coloque ese componente dentro de `root`. Desde `App` se construye el resto de la interfaz: cabecera, contenido de la sección elegida y pie de página.

## 3. Componentes

Un componente React es normalmente una función que devuelve JSX. El JSX describe los elementos que React mostrará.

Los componentes actuales son:

- `App.jsx`: componente principal. Mantiene la estructura global con `Header`, `TareasPage` y `Footer`.
- `TareasPage.jsx`: página de tareas. Mantiene estados, lee y guarda tareas, define las acciones, calcula las listas y decide qué vista interna mostrar.
- `Header.jsx`: cabecera global del portal.
- `Footer.jsx`: muestra el pie de página.
- `Article.jsx`: muestra el campo para escribir y el botón para añadir una tarea.
- `Inicio.jsx`: contiene la sección de inicio y renderiza `Article`.
- `Pendientes.jsx`: muestra, busca, completa y elimina las tareas pendientes.
- `Finalizadas.jsx`: muestra, busca, recupera y elimina las tareas finalizadas.
- `Almacenamiento.js`: contiene las funciones que leen y guardan tareas en `localStorage`. No es un componente.

### Relación padre e hijo

`App` es el componente padre de la estructura global. Renderiza `Header`, `TareasPage` y `Footer`. `TareasPage` renderiza la navegación interna y las vistas `Inicio`, `Pendientes` y `Finalizadas`.

El recorrido de la sección de inicio es:

```text
App -> TareasPage -> Inicio -> Article
```

`TareasPage` pasa `addTareas` a `Inicio`, e `Inicio` se la pasa a `Article`. De esta manera el formulario visual está separado, pero el estado de todas las tareas vive en la página que coordina esta funcionalidad.

## 4. Estado: `useState`

El estado es información que puede cambiar mientras la aplicación está funcionando. Cuando se actualiza mediante su función setter, React vuelve a renderizar los componentes que dependen de ese estado.

`useState` devuelve dos valores:

```jsx
const [valor, setValor] = useState(valorInicial);
```

- El primer valor es el estado actual.
- La función `set...` solicita una actualización.
- El valor inicial se utiliza al comenzar el componente.

En `TareasPage.jsx` hay tres estados.

### `seccionActual`

```jsx
const [seccionActual, setSeccionActual] = useState("inicio");
```

- Guarda la sección que debe mostrarse.
- Empieza en `"inicio"`.
- `setSeccionActual` lo cambia cuando se pulsa un botón de la navegación interna de `TareasPage`.
- Al cambiar, React vuelve a renderizar y las condiciones del JSX muestran otra vista.

### `tareas`

```jsx
const [tareas, setTareas] = useState(leerTareasGuardadas);
```

- Guarda la lista completa de tareas.
- Se inicia leyendo la información guardada.
- `setTareas` se utiliza al añadir, completar, recuperar o eliminar.
- Cuando cambia, React vuelve a renderizar y el `useEffect` guarda la nueva lista.

### `busqueda`

```jsx
const [busqueda, setBusqueda] = useState("");
```

- Guarda el texto escrito en los buscadores.
- Empieza vacío, por lo que inicialmente se muestran todas las tareas de la sección.
- `setBusqueda` se llama desde `onChange` y desde el botón `Limpiar búsqueda`.
- Al cambiar, React vuelve a renderizar y calcula de nuevo las tareas filtradas. No se modifica `tareas` ni se guarda la búsqueda.

## 5. Inicialización de datos

La aplicación utiliza:

```jsx
useState(leerTareasGuardadas);
```

Aquí se pasa la función sin paréntesis. React recibe esa función como inicializadora y la utiliza para obtener el valor inicial de `tareas`.

La alternativa es:

```jsx
useState(leerTareasGuardadas());
```

En esta segunda forma, JavaScript ejecuta `leerTareasGuardadas()` al evaluar la expresión y después pasa a `useState` el array que la función haya devuelto.

La primera forma expresa una inicialización perezosa: el trabajo de obtener el valor inicial queda en una función que React puede utilizar como inicializador, en lugar de calcular el valor directamente en cada renderizado posterior. En desarrollo, `StrictMode` puede repetir inicializaciones o comprobaciones. Por eso la explicación correcta es que se evita la lectura como cálculo normal de cada renderizado, no que exista una garantía de exactamente una ejecución en todas las circunstancias.

La función inicializadora es importante porque permite leer las tareas existentes antes de que el estado empiece con una lista vacía. Así no se sustituyen accidentalmente datos ya guardados.

## 6. Props

Las props son datos que un componente padre pasa a un componente hijo. El hijo las recibe como propiedades del objeto de parámetros.

Ejemplo actual:

```jsx
<Inicio addTareas={addTareas} />
```

`TareasPage` pasa la función `addTareas` a `Inicio`. Después `Inicio` hace:

```jsx
<Article addTareas={addTareas} />
```

Otros ejemplos reales:

- `TareasPage` pasa a `Pendientes` las listas pendientes, la búsqueda y las funciones `setBusqueda`, `completarTarea` y `eliminarTarea`.
- `TareasPage` pasa a `Finalizadas` las listas finalizadas, la búsqueda y las funciones `setBusqueda`, `recuperarTarea` y `eliminarTarea`.

Las props permiten reutilizar componentes sin mover todo el estado a cada hijo.

## 7. Callbacks

Una función también es un valor de JavaScript, así que puede pasarse como prop. Cuando la función se pasa para que el hijo la llame como respuesta a una acción, suele llamarse callback.

En este proyecto, `addTareas` se define en `TareasPage`, pero el botón está en `Article`:

```text
TareasPage define addTareas
TareasPage -> Inicio -> Article recibe addTareas
Article llama addTareas
TareasPage actualiza tareas
```

`Article` no modifica directamente el estado `tareas`, porque ese estado pertenece a `TareasPage`. Al llamar al callback, comunica al padre que el usuario quiere añadir una tarea. El padre decide cómo crearla y actualizar el estado.

Lo mismo ocurre cuando una vista llama a `completarTarea`, `recuperarTarea` o `eliminarTarea`.

## 8. Añadir una tarea

El componente `Article` controla el texto que se escribe con:

```jsx
const [textoTarea, setTextoTarea] = useState("");
```

El input utiliza:

```jsx
value={textoTarea}
onChange={(e) => setTextoTarea(e.target.value)}
```

El input es controlado porque su valor viene del estado y cada cambio actualiza ese estado.

Cuando se pulsa el botón o la tecla Enter, se llama a `enviarTarea`:

1. Lee `textoTarea`.
2. Usa `trim()` para quitar espacios del principio y del final.
3. Comprueba que el resultado no sea una cadena vacía.
4. Llama a `addTareas(tareaLimpia)`.
5. Vacía el input con `setTextoTarea("")` si la entrada era válida.

En `TareasPage`, `addTareas` vuelve a limpiar el texto y, si no está vacío, crea:

```jsx
const nuevaTarea = {
  id: crypto.randomUUID(),
  texto: tareaLimpia,
  completada: false,
};
```

`crypto.randomUUID()` crea un identificador para esa tarea. Después se actualiza el estado:

Cada alta genera un ID nuevo, por lo que dos tareas con el mismo texto siguen siendo tareas distintas.

```jsx
setTareas([...tareas, nuevaTarea]);
```

React recibe una lista nueva, vuelve a renderizar y el efecto que depende de `tareas` guarda la lista.

## 9. Arrays y estado

No debo modificar directamente un array del estado, por ejemplo con una asignación directa o mutando uno de sus elementos. React necesita que se le entregue un nuevo valor mediante `setTareas` para reconocer el cambio de forma clara y volver a renderizar.

En el alta se utiliza:

```jsx
[...tareas, nuevaTarea];
```

`...tareas` copia los elementos del array anterior en un array nuevo y `nuevaTarea` se coloca al final.

Esto crea un nuevo array, pero no una copia profunda. Los objetos que había dentro siguen siendo las mismas referencias. Por ejemplo:

```js
const copia = [...tareas];
```

crea otro contenedor de array, pero `copia[0]` y `tareas[0]` siguen apuntando al mismo objeto.

Por eso, cuando se cambia una tarea con `map`, también se crea un objeto nuevo para la tarea modificada:

```jsx
return { ...tarea, completada: true };
```

Así no se modifica directamente el objeto anterior.

## 10. `map`

`map` recorre un array y devuelve otro array con un resultado por cada elemento. No elimina elementos y normalmente conserva la misma cantidad.

Para completar una tarea:

```jsx
const nuevasTareas = tareas.map((tarea) => {
  if (tarea.id === id) {
    return { ...tarea, completada: true };
  }
  return tarea;
});
```

El `id` recibido permite localizar exactamente la tarea pulsada. Si coincide, se devuelve un objeto nuevo con `completada: true`. Si no coincide, se conserva esa tarea.

Para recuperar una tarea se utiliza la misma idea, pero se cambia a `false`:

```jsx
return { ...tarea, completada: false };
```

Al final, `setTareas(nuevasTareas)` coloca la nueva lista en el estado.

También se usa `map` dentro de `Header` y de las vistas para convertir datos en elementos JSX.

## 11. `filter`

`filter` recorre un array y devuelve un array nuevo con los elementos que cumplen una condición.

### Eliminar

```jsx
const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
```

Conserva todas las tareas cuyo `id` sea distinto del recibido. La tarea seleccionada no entra en la nueva lista.

### Obtener pendientes y finalizadas

```jsx
const tareasPendientes = tareas.filter((tarea) => !tarea.completada);
const tareasFinalizadas = tareas.filter((tarea) => tarea.completada);
```

Las dos listas se calculan a partir del único estado `tareas`. No existen dos estados independientes para pendientes y finalizadas.

### Buscar

La búsqueda vuelve a utilizar `filter` sobre las tareas de cada sección. Solo se conservan las tareas cuyo texto contiene la búsqueda normalizada.

`filter` no modifica el array original: crea una lista derivada para mostrarla.

## 12. Búsqueda

En `TareasPage` se normaliza el texto:

```jsx
const textoBusqueda = busqueda.trim().toLowerCase();
```

- `trim()` elimina espacios sobrantes al principio y al final.
- `toLowerCase()` permite comparar sin distinguir mayúsculas y minúsculas.
- `includes()` comprueba si el texto de una tarea contiene el texto buscado.

El cálculo es equivalente a:

```jsx
tarea.texto.toLowerCase().includes(textoBusqueda);
```

La búsqueda no cambia `tareas`. Cambia `busqueda`, React vuelve a renderizar y `filter` calcula las tareas visibles. Si se limpia la búsqueda, `textoBusqueda` queda vacío y `includes("")` permite mostrar todas las tareas de la sección.

No se necesita otro `useEffect` porque la búsqueda es un dato derivado que se puede calcular durante el renderizado. `localStorage` sí es un sistema externo que necesita sincronización; el resultado de la búsqueda solo decide qué se muestra.

## 13. Renderizado condicional

Renderizar condicionalmente significa mostrar una parte del JSX solo cuando se cumple una condición.

En `TareasPage` se usa `&&`:

```jsx
{
  seccionActual === "inicio" && <Inicio addTareas={addTareas} />
}
```

Si la condición es verdadera, React muestra `Inicio`. Si es falsa, no muestra ese componente. Lo mismo ocurre con `Pendientes` y `Finalizadas`.

En las vistas también se usa el operador ternario para distinguir estados:

- Si no hay tareas pendientes, aparece un mensaje de lista vacía.
- Si hay tareas pero ninguna coincide con la búsqueda, aparece un mensaje de resultados vacíos.
- Si hay coincidencias, aparece la lista.

## 14. `map` dentro del JSX

En las vistas, un array de tareas se convierte en varios elementos `<li>`:

```jsx
{
  tareasPendientesFiltradas.map((tarea, index) => (
    <li key={tarea.id}>
      {index + 1}. {tarea.texto}
    </li>
  ))
}
```

React necesita una `key` estable para distinguir los elementos de una lista entre renderizados. Se utiliza `tarea.id` porque identifica la tarea aunque cambie su posición o aunque otra tarea tenga el mismo texto.

El `index` solo se utiliza para mostrar el número visible de la tarea. No se usa como `key`.

La navegación interna de `TareasPage` usa `secciones.map` y `key={seccion.id}` para crear los botones.

## 15. Formularios y eventos

### `onChange`

Se ejecuta cuando cambia el valor de un input. En `Article`:

```jsx
onChange={(e) => setTextoTarea(e.target.value)}
```

En los buscadores hace algo parecido con `setBusqueda`.

### `onClick`

Se ejecuta al pulsar un botón. Los botones de completar, recuperar, eliminar y limpiar búsqueda utilizan `onClick`.

### Estado actual de `onSubmit` y `preventDefault`

`Article` ya contiene un `<form>` y un botón `type="submit"`, pero el código actual todavía conecta `enviarTarea` al `onClick` del botón. La función ejecuta `event.preventDefault()`, aplica `trim()`, rechaza entradas vacías, llama a `addTareas` y limpia el input si la entrada es válida. Aún falta conectar la función al `onSubmit` del formulario y retirar el `onClick` independiente.

La centralización pendiente hará que el clic y Enter recorran un único camino de envío. Así se evita duplicar la lógica de creación y validación de tareas.

### Input controlado

El input controlado tiene `value={textoTarea}` y `onChange`. React conserva el valor en el estado y el componente no depende de un valor separado que viva solo en el DOM.

## 16. `localStorage`

`localStorage` es un almacenamiento del navegador asociado al origen de la aplicación. Permite guardar información para recuperarla en otra visita o después de recargar.

En este proyecto se utiliza la clave:

```js
const CLAVE_TAREAS = "devquest.tareas.v1";
```

La clave identifica el dato y el valor que se guarda es texto. Por eso el array de tareas debe convertirse a JSON.

### Escritura

`guardarTareas(tareas)` ejecuta:

```js
localStorage.setItem(CLAVE_TAREAS, JSON.stringify(tareas));
```

`JSON.stringify` convierte el array y sus objetos de JavaScript en texto JSON. `setItem` guarda ese texto bajo la clave indicada.

### Lectura

`leerTareasGuardadas` ejecuta `localStorage.getItem(CLAVE_TAREAS)`.

- Si devuelve `null`, no hay datos guardados y se devuelve `[]`.
- Si devuelve texto, `JSON.parse` intenta convertirlo de JSON a datos de JavaScript.
- Después se comprueba que el resultado sea un array y que cada tarea tenga la estructura válida.
- Si todo es correcto, se devuelve la lista recuperada.

`JSON.parse` y `JSON.stringify` son operaciones inversas en este flujo: una prepara datos para guardarlos como texto y la otra reconstruye los datos al leerlos.

## 17. Validación de datos

No debo confiar automáticamente en lo que devuelve `localStorage`: puede estar vacío, corrupto, tener JSON válido pero no representar una lista, o contener tareas con campos incorrectos.

La función comprueba:

- Que cada elemento no sea `null` y sea un objeto.
- Que `id` sea un texto no vacío.
- Que `texto` sea un texto no vacío.
- Que `completada` sea un booleano.
- Que no haya dos tareas con el mismo `id`.

### `every`

`every` comprueba si todos los elementos del array cumplen la condición. Si una tarea es inválida, `tareasValidas` pasa a ser `false` y la función devuelve `[]`. No se conserva solo la parte válida: se rechaza la lista recuperada completa.

### `Set`, `has` y `add`

La validación crea:

```js
const ids = new Set();
```

Un `Set` almacena valores sin repetir.

Imaginemos que se recuperan estas dos tareas:

```js
[
  { id: "a1", texto: "Una", completada: false },
  { id: "a1", texto: "Otra", completada: true },
];
```

1. En la primera tarea, `ids.has("a1")` devuelve `false`.
2. `ids.add("a1")` registra ese identificador.
3. En la segunda tarea, `ids.has("a1")` devuelve `true`.
4. La validación devuelve `false` para esa tarea.
5. `every` deja de considerar válida la lista completa y `leerTareasGuardadas` devuelve `[]`.

### JSON inválido y estructura incorrecta

`"hola"` no es un texto JSON válido en el ejemplo de almacenamiento si se guarda como la palabra sin comillas. `JSON.parse` lanza un error, que se captura en `catch`, y la función devuelve `[]`.

`{}` sí puede ser JSON válido, pero no es una lista de tareas. `Array.isArray(tareasParseadas)` devuelve `false`, así que también se devuelve `[]`.

## 18. `try/catch`

`try/catch` permite intentar una operación que puede fallar y manejar el error sin romper toda la aplicación.

En `leerTareasGuardadas`, puede fallar `localStorage.getItem` o `JSON.parse`. El `catch` muestra un error en la consola y devuelve `[]`, permitiendo que la aplicación arranque con una lista vacía.

En `guardarTareas`, puede fallar `localStorage.setItem` o `JSON.stringify`. El `catch` muestra un error en la consola. El estado `tareas` de React sigue estando en memoria durante la sesión, por lo que la interfaz puede continuar funcionando, pero si el guardado falló, los cambios podrían perderse al recargar o cerrar la página.

## 19. `useEffect`

`useEffect` permite ejecutar una operación relacionada con el entorno después de que React haya renderizado. En este proyecto se utiliza para sincronizar el estado con `localStorage`:

```jsx
useEffect(() => {
  guardarTareas(tareas);
}, [tareas]);
```

### Qué significa `[tareas]`

El array de dependencias indica que el efecto depende de `tareas`. El efecto se ejecuta después del montaje y vuelve a ejecutarse después de un renderizado en el que cambió la referencia o el valor de `tareas`.

### Por qué guarda al montar

Al montar `TareasPage`, `tareas` contiene el valor obtenido por `leerTareasGuardadas`. El efecto sincroniza ese estado inicial con el almacenamiento. En `StrictMode` puede haber ejecuciones adicionales de comprobación durante el desarrollo, por lo que no se debe describir como una única ejecución garantizada.

### Por qué vuelve a guardar

Añadir, completar, recuperar o eliminar llama a `setTareas` con una lista nueva. React vuelve a renderizar y el efecto llama a `guardarTareas` con la lista actualizada.

### Búsqueda y efectos

Escribir en un buscador cambia `busqueda`, no `tareas`. Eso puede provocar un nuevo renderizado y recalcular los filtros, pero como `tareas` no cambió, la dependencia del efecto no cambió y no se realiza otra escritura por ese motivo.

La diferencia es:

- Cambiar el estado de React modifica los datos que la interfaz usa.
- Guardar en `localStorage` sincroniza esos datos con un sistema externo.
- La búsqueda solo calcula datos derivados para mostrar; no necesita sincronización externa.

### Eliminar la última tarea

Si `tareas` contiene una sola tarea y se ejecuta `eliminarTarea`, `filter` devuelve `[]` y `setTareas([])` actualiza el estado. El efecto detecta el nuevo array vacío y guarda `[]` con `JSON.stringify`. Así, al recargar no vuelve a aparecer la tarea eliminada.

## 20. Tailwind

`index.css` contiene:

```css
@import "tailwindcss";
```

Las clases de Tailwind aparecen directamente en `className`.

- `flex`: activa Flexbox.
- `flex-col`: organiza los hijos en columna.
- `flex-row`: organiza los hijos en fila cuando se aplica.
- `w-full`: ocupa todo el ancho disponible.
- `max-w-xs`, `max-w-2xl` y `max-w-3xl`: limitan el ancho máximo.
- `px-4`, `px-3` y `px-4`: añaden espacio horizontal interior.
- `py-4`, `py-2` y `py-1.5`: añaden espacio vertical interior.
- `gap-2` y `gap-3`: separan elementos flexibles.
- `mt-5`: añade margen superior.
- `text-center`, `text-white`, `text-black`, `text-sm` y `text-5xl`: controlan alineación, color y tamaño del texto.
- `bg-gray-800`, `bg-gray-500`, `bg-red-500`, `bg-green-500`, `bg-white` y `bg-slate-600`: controlan fondos.
- `break-words`: permite ajustar palabras largas; se utiliza en el texto de tareas pendientes.
- `wrap-break-words`: aparece en el texto de tareas finalizadas con la intención de permitir el ajuste de palabras.
- `border`, `rounded-lg`, `shadow-sm` y otras clases decoran los controles y el formulario.
- `focus:ring-2`, `focus:border-blue-500`, `focus:outline-none` y `focus-visible:ring-1` ayudan a mostrar el foco.

En las vistas se combinan clases como `w-full` y `sm:w-auto` para que los botones ocupen el ancho disponible en tamaños pequeños y puedan ajustarse en tamaños mayores.

## 21. Responsive

La aplicación utiliza clases responsive de Tailwind para adaptarse a tamaños pequeños y grandes.

Por defecto, varios contenedores usan `flex-col`. Esto significa que, por debajo del breakpoint `sm`, los controles de búsqueda y los elementos de cada tarea se organizan en columna.

En `Pendientes.jsx` y `Finalizadas.jsx` aparece:

```text
flex flex-col ... sm:flex-row
```

`sm:flex-row` aplica `flex-row` desde el breakpoint `sm` hacia arriba. En Tailwind, `sm` es 640 px por defecto. Por debajo de 640 px continúa activa la clase base `flex-col`.

También se usan `w-full`, `min-w-0`, `sm:w-64`, `sm:w-auto`, límites `max-w-*` y ajuste de palabras para evitar que los controles y textos largos desborden fácilmente.

La aplicación actual no incluye un sistema separado de diseño para escritorio: utiliza estas clases responsive en los mismos componentes.

## 22. Flujo completo de una tarea

El flujo actual utiliza un `<form>`, un input controlado, `onChange`, el `onClick` del botón y `preventDefault`. La conexión directa del formulario con `onSubmit` sigue pendiente.

```text
Usuario escribe
-> onChange
-> setTextoTarea
-> React renderiza Article con el nuevo value
-> usuario pulsa el botón
-> onClick del botón
-> enviarTarea
-> trim y validación
-> addTareas en TareasPage
-> crypto.randomUUID y nuevo objeto
-> setTareas([...tareas, nuevaTarea])
-> React renderiza de nuevo
-> useEffect detecta el cambio de tareas
-> guardarTareas
-> JSON.stringify
-> localStorage.setItem
```

Si el texto queda vacío después de `trim`, el flujo termina sin crear una tarea.

## 23. Qué ocurre cuando completo una tarea

1. En `Pendientes`, el usuario pulsa `Completar`.
2. El botón llama a `completarTarea(tarea.id)`.
3. `TareasPage` ejecuta `tareas.map(...)`.
4. Para la tarea cuyo `id` coincide, crea un objeto nuevo con `completada: true`.
5. Las demás tareas se devuelven sin cambiar.
6. `setTareas(nuevasTareas)` actualiza el estado.
7. React vuelve a renderizar.
8. La tarea deja de pertenecer a `tareasPendientes` y pasa a `tareasFinalizadas`.
9. El `useEffect` guarda la lista actualizada en `localStorage`.

## 24. Qué ocurre cuando elimino una tarea

1. El usuario pulsa `Eliminar` en `Pendientes` o `Finalizadas`.
2. El botón llama a `eliminarTarea(tarea.id)`.
3. `TareasPage` ejecuta `tareas.filter((tarea) => tarea.id !== id)`.
4. La tarea con ese ID queda fuera de la lista nueva.
5. `setTareas(nuevasTareas)` actualiza el estado.
6. React vuelve a renderizar las listas y los totales.
7. `useEffect` guarda la lista resultante.

Si era la última tarea, la lista resultante es `[]`. Esa lista vacía se serializa y se guarda, por lo que la tarea no reaparece al recargar.

## 25. Qué ocurre al recargar la página

1. El navegador vuelve a cargar la aplicación.
2. `main.jsx` busca `root` y monta `<App />` dentro de `StrictMode`.
3. `TareasPage` inicializa `tareas` usando `leerTareasGuardadas`.
4. La función obtiene el texto de `localStorage` con la clave `devquest.tareas.v1`.
5. Si no hay valor, devuelve `[]`.
6. Si hay valor, `JSON.parse` lo convierte a datos de JavaScript.
7. Se valida que sea una lista de tareas con IDs únicos y campos correctos.
8. `TareasPage` calcula pendientes, finalizadas y resultados de búsqueda.
9. React muestra la sección inicial y sus componentes.
10. El efecto sincroniza el estado inicial con el almacenamiento.

## 26. Conceptos de React que ya conozco

Estos conceptos aparecen realmente en el código actual:

- Componentes funcionales.
- JSX.
- `import` y `export default` entre módulos.
- `createRoot` y renderizado de React.
- `StrictMode`.
- Estado local con `useState`.
- Funciones setter como `setTareas`, `setBusqueda` y `setSeccionActual`.
- Inicializador funcional de `useState`.
- Efectos con `useEffect` y dependencias.
- Props.
- Callbacks o funciones pasadas como props.
- Inputs controlados con `value` y `onChange`.
- Eventos `onClick` y `onChange`; `onSubmit` está previsto en el 06.
- Renderizado condicional con `&&` y operador ternario.
- Renderizado de listas con `map`.
- `key` estable en listas JSX.
- Arrays derivados con `filter`.
- Inmutabilidad práctica del estado mediante arrays y objetos nuevos.
- Persistencia en `localStorage`.
- Serialización con `JSON.stringify` y lectura con `JSON.parse`.
- Validación con `Array.isArray`, `every`, `Set`, `has` y `add`.
- Manejo de errores con `try/catch`.
- Clases Tailwind y diseño responsive.

React Router ya está instalado. `BrowserRouter` envuelve `App` en `main.jsx` y `App` ya declara `Routes`, las rutas `/`, `/tareas` y una ruta comodín. Existe `PortalPage` con un array de miniapps recorrido mediante `map`, pero todavía faltan el componente reutilizable de tarjeta y el enlace real de Tareas. `NavLink` no se utiliza.

## 27. Lo que voy a aprender en el Reto 06

Esta sección describe las instrucciones del Reto 06, no funcionalidades que ya estén implementadas.

### YA LO TENGO

- Una aplicación de tareas funcional.
- Una navegación interna por estado con botones de `TareasPage`.
- Componentes separados para cabecera, pie, formulario y vistas.
- Estado de tareas en `TareasPage`.
- Persistencia de tareas en `localStorage`.

### LO VOY A APRENDER EN RETO 06

- **Separar `TareasPage`:** este paso ya está implementado: la página contiene el estado, la lectura inicial, el efecto, las acciones y las listas calculadas.
- **Páginas:** ya existen `PortalPage` y `TareasPage` como componentes que representan pantallas completas.
- **React Router:** ya se utiliza para decidir qué componente se muestra según la URL.
- **`BrowserRouter`:** ya está colocado en `main.jsx` alrededor de `App` y proporciona el contexto para la futura navegación basada en URL.
- **`Routes`:** ya contiene las rutas declaradas en `App`.
- **`Route`:** ya asocia `/`, `/tareas` y la ruta comodín con sus elementos.
- **`Link`:** se utiliza en la ruta comodín para volver al portal; todavía falta usarlo en la tarjeta de Tareas.
- **`NavLink`:** enlace que puede recibir un estilo especial cuando su ruta está activa.
- **Rutas:** direcciones como `/` y `/tareas`, distintas de las secciones internas actuales.
- **Navegación:** pasar de una URL a otra mediante enlaces y poder usar atrás y adelante del navegador.
- **Portal:** `PortalPage` ya se muestra en `/` y presenta las miniapps iniciales mediante datos y `map`.
- **Rutas desconocidas:** la ruta comodín ya muestra «Página no encontrada» y un enlace al portal.
- **Estado al desmontar y montar:** al salir de la ruta de tareas, el componente puede desmontarse y perder estados locales como la sección activa o el texto de búsqueda. Al volver a montarse, el inicializador vuelve a leer las tareas persistidas. Las tareas se conservan porque están en `localStorage`, mientras que un texto sin enviar puede reiniciarse.

El formulario de `Article` ya utiliza `preventDefault`, `trim` y `type="submit"`, pero la conexión con `onSubmit` sigue pendiente. La parte de rutas del reto también continúa pendiente.

## 28. Preguntas que debería saber responder

### ¿Por qué utilizas `useState`?

Porque necesito guardar datos que cambian y provocar un nuevo renderizado cuando cambian. Lo uso para la sección, la lista de tareas, la búsqueda y el texto del input.

### ¿Qué guarda cada estado de `TareasPage`?

`seccionActual` guarda la vista, `tareas` guarda todas las tareas y `busqueda` guarda el texto del buscador.

### ¿Por qué usas `useState(leerTareasGuardadas)`?

Porque paso una función inicializadora para obtener el estado inicial desde `localStorage`. Con `()` ejecutaría la función al evaluar la expresión y pasaría directamente el array resultante.

### ¿Por qué no modificas directamente `tareas`?

Porque el estado debe actualizarse mediante `setTareas` y las operaciones deben producir nuevos arrays u objetos para evitar mutaciones directas.

### ¿Qué hace `map`?

Crea un array nuevo recorriendo el anterior. En mi código cambia `completada` para completar o recuperar una tarea y conserva las demás.

### ¿Qué hace `filter`?

Crea un array nuevo con los elementos que cumplen una condición. Lo uso para eliminar, separar pendientes y finalizadas y calcular resultados de búsqueda.

### ¿Por qué utilizas un `id`?

Para identificar una tarea concreta aunque otra tenga el mismo texto. También lo uso como `key` en las listas JSX.

### ¿Qué son las props?

Son valores que un padre pasa a un hijo. Por ejemplo, `TareasPage` pasa listas y funciones a `Pendientes` y `Finalizadas`.

### ¿Qué es un callback en este proyecto?

Es una función que un componente recibe y llama después. `Article` llama a `addTareas`, que está definida en `TareasPage`.

### ¿Por qué utilizas `useEffect`?

Para sincronizar la lista de tareas de React con `localStorage` después del renderizado.

### ¿Qué significa `[tareas]`?

Que el efecto depende de `tareas`: se ejecuta al montar y vuelve a ejecutarse cuando cambia esa dependencia.

### ¿Qué ocurre si busco una tarea?

Cambia `busqueda`, se vuelve a renderizar y `filter` calcula las coincidencias. La lista original no se modifica.

### ¿Por qué la búsqueda no utiliza otro `useEffect`?

Porque es un cálculo derivado para mostrar datos. No necesita sincronizar nada con un sistema externo.

### ¿Qué ocurre al recargar?

`leerTareasGuardadas` lee `devquest.tareas.v1`, convierte el JSON, valida las tareas y devuelve la lista para inicializar el estado.

### ¿Qué hace `JSON.stringify`?

Convierte el array de tareas en texto JSON para que `localStorage` pueda guardarlo.

### ¿Qué hace `JSON.parse`?

Convierte el texto JSON recuperado en valores de JavaScript que la aplicación puede validar y utilizar.

### ¿Por qué utilizas `Set`?

Para registrar IDs ya vistos y detectar duplicados mediante `has` y `add`.

### ¿Qué ocurre si hay dos IDs iguales?

El segundo ID ya existe en el `Set`, `has` devuelve `true`, `every` deja de validar la lista como correcta y la función devuelve `[]`.

### ¿Qué ocurre si el JSON está corrupto?

`JSON.parse` lanza un error, `catch` lo captura, se informa en la consola y la lectura devuelve `[]`.

### ¿Qué ocurre si falla el guardado?

La aplicación conserva las tareas en el estado de React durante la sesión, pero los cambios no persistidos podrían perderse al recargar.

### ¿Cómo se envía actualmente una tarea?

`Article` ya contiene un `<form>` y un botón `type="submit"`, pero actualmente el botón llama a `enviarTarea` mediante `onClick`. La función ejecuta `preventDefault()`, aplica `trim()`, valida el texto y llama a `addTareas`. Falta centralizar ese envío en `onSubmit`.

### ¿Qué cambiará en el Reto 06?

Falta centralizar el envío en `onSubmit` del formulario. Ya se separó `TareasPage`, se colocó `BrowserRouter`, se declararon las rutas y se creó `PortalPage`; siguen pendientes el enlace real de Tareas, el componente reutilizable de tarjeta y las comprobaciones de navegación y responsive.
