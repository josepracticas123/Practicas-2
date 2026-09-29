# Resumen de mi primer proyecto React

Revisión documental del 18/09/2026: se han corregido formato y ejemplos, y retirado las observaciones ya incorporadas. El repaso escrito está completado en [REVISION-PENDIENTE.md](REVISION-PENDIENTE.md). La conversación se prepara en [Repaso con el tutor](../REPASO-CON-TUTOR.md).

## 1. Qué es este proyecto

DevQuest es una aplicación de tareas hecha con React y Vite que además incluye un Quiz y un catálogo de productos consultado a la API DummyJSON. La descripción funcional, los comandos y la organización del código están en el [README del proyecto](../README.md).

Este documento es el **mapa**: la estructura del proyecto, dónde se explica cada concepto y qué reglas conviene recordar. La teoría con ejemplos está en los [apuntes de estudio](APUNTES_ESTUDIO_REACT.md) y las definiciones cortas, en el [recordatorio de conceptos](A-tener-en-cuenta.md).

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

### Lista de archivos

La responsabilidad de cada archivo está descrita en «Organización del código» del [README del proyecto](../README.md#organización-del-código).

## 3. Cómo empieza la aplicación

`main.jsx` monta React con `createRoot` dentro de `StrictMode` y `BrowserRouter`, y `App` declara las rutas y la estructura global. El recorrido completo, con el código, está en [Apuntes § 2](APUNTES_ESTUDIO_REACT.md#2-cómo-arranca-react).

## 4. Estado de los retos

La lista de los doce retos con su estado está en [«Retos definidos»](../../README.md#retos-definidos). Las comprobaciones de cada reto viven en su enunciado, y mis respuestas, en el [cuaderno](../APRENDIZAJE.md).

## 5. Índice de conceptos

Aquí solo está el índice; la explicación con ejemplos del proyecto está en los apuntes.

| Tema | Dónde se explica |
| --- | --- |
| Qué he construido y forma de una tarea | [Apuntes § 1](APUNTES_ESTUDIO_REACT.md#1-qué-he-construido) |
| Arranque de React (`main.jsx`, `createRoot`, `StrictMode`) | [Apuntes § 2](APUNTES_ESTUDIO_REACT.md#2-cómo-arranca-react) |
| Componentes y relación padre-hijo | [Apuntes § 3](APUNTES_ESTUDIO_REACT.md#3-componentes) |
| Estado con `useState` (`seccionActual`, `tareas`, `busqueda`) | [Apuntes § 4](APUNTES_ESTUDIO_REACT.md#4-estado-usestate) |
| Inicialización de datos (`useState(leerTareasGuardadas)`) | [Apuntes § 5](APUNTES_ESTUDIO_REACT.md#5-inicialización-de-datos) |
| Props | [Apuntes § 6](APUNTES_ESTUDIO_REACT.md#6-props) |
| Callbacks | [Apuntes § 7](APUNTES_ESTUDIO_REACT.md#7-callbacks) |
| Añadir una tarea | [Apuntes § 8](APUNTES_ESTUDIO_REACT.md#8-añadir-una-tarea) |
| Arrays y estado (copia superficial) | [Apuntes § 9](APUNTES_ESTUDIO_REACT.md#9-arrays-y-estado) |
| `map` | [Apuntes § 10](APUNTES_ESTUDIO_REACT.md#10-map) |
| `filter` (eliminar, pendientes y finalizadas, buscar) | [Apuntes § 11](APUNTES_ESTUDIO_REACT.md#11-filter) |
| Búsqueda | [Apuntes § 12](APUNTES_ESTUDIO_REACT.md#12-búsqueda) |
| Renderizado condicional | [Apuntes § 13](APUNTES_ESTUDIO_REACT.md#13-renderizado-condicional) |
| `map` dentro del JSX | [Apuntes § 14](APUNTES_ESTUDIO_REACT.md#14-map-dentro-del-jsx) |
| Formularios y eventos (`onChange`, `onClick`, `onSubmit`, input controlado) | [Apuntes § 15](APUNTES_ESTUDIO_REACT.md#15-formularios-y-eventos) |
| `localStorage` (escritura y lectura) | [Apuntes § 16](APUNTES_ESTUDIO_REACT.md#16-localstorage) |
| Validación (`Array.isArray`, `every`, `Set`, JSON inválido) | [Apuntes § 17](APUNTES_ESTUDIO_REACT.md#17-validación-de-datos) |
| `try/catch` | [Apuntes § 18](APUNTES_ESTUDIO_REACT.md#18-trycatch) |
| `useEffect` y la dependencia `[tareas]` | [Apuntes § 19](APUNTES_ESTUDIO_REACT.md#19-useeffect) |
| Tailwind | [Apuntes § 20](APUNTES_ESTUDIO_REACT.md#20-tailwind) |
| Responsive | [Apuntes § 21](APUNTES_ESTUDIO_REACT.md#21-responsive) |
| Flujo completo de una tarea | [Apuntes § 22](APUNTES_ESTUDIO_REACT.md#22-flujo-completo-de-una-tarea) |
| Completar, eliminar y recargar | [Apuntes § 23–25](APUNTES_ESTUDIO_REACT.md#23-qué-ocurre-cuando-completo-una-tarea) |
| Rutas y navegación | [Apuntes § 27](APUNTES_ESTUDIO_REACT.md#27-rutas-y-navegación) |
| Quiz: selección, recorrido y resultado | [Apuntes § 29–30](APUNTES_ESTUDIO_REACT.md#29-reto-07-selección-y-comprobación) |
| Catálogo: consultas a la API | [Apuntes § 31](APUNTES_ESTUDIO_REACT.md#31-catálogo-consultas-a-la-api) |
| Escrituras simuladas (POST, PUT y DELETE) | [Apuntes § 32](APUNTES_ESTUDIO_REACT.md#32-escrituras-simuladas-post-put-y-delete) |
| Preguntas de repaso con respuesta | [Preguntas](Preguntas.md) |

## 6. Comandos

Los comandos (`npm install`, `npm run dev`, `npm run lint`, `npm run build`, `npm run preview`) están en «Cómo ejecutar el proyecto» y «Comprobaciones» del [README del proyecto](../README.md#cómo-ejecutar-el-proyecto).

## 7. Cosas importantes para recordar

El estado que cambia debe actualizarse con su función `set...`.

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
