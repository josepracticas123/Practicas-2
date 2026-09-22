# 06 · Tu portal de miniapps

## Seguimiento · 22/09/2026, `4d4b688`

**Funcionalidad completada; queda un ajuste de cabecera en móvil.** Rutas, formulario, navegación y persistencia están implementados y revisados. El repaso escrito y las respuestas del cuaderno están completos.

**Único pendiente técnico:** en `src/components/Header.jsx`, separa los enlaces Portal, Tareas y Quiz y adapta su tamaño o distribución. A 375 px la cabecera alcanza unos 378 px de ancho. Comprueba todas las rutas, porque comparten cabecera. No ocultes el desbordamiento con `overflow-x-hidden`: ajusta el contenido.

El checklist de abajo conserva un único punto abierto. La conversación de comprensión se registra por separado en [Repaso con el tutor](../devquest/REPASO-CON-TUTOR.md). Los apartados del enunciado son referencia del trabajo realizado.

**Tu misión:** convertir el inicio del proyecto en un portal desde el que abrir tus miniapps. La aplicación de tareas seguirá funcionando en `/tareas`.

**Antes:** la implementación del 05 está revisada. Conserva sus pendientes de explicación al tutor. **Practicarás:** rutas, enlaces, composición de páginas y ubicación del estado.

Trabaja en el mismo `devquest/`. No crees otro Vite. Haz un bloque cada vez; no necesitas terminar todos los retos nuevos hoy.

## 0. Revisa tu base antes de moverla

La app funciona y el 05 sigue cerrado técnicamente. Este paso prepara el código para el portal y sirve para comprobar lo que has aprendido. Haz un cambio cada vez y pruébalo antes de añadir Router.

1. Completa la [revisión práctica pendiente](../devquest/resumen/REVISION-PENDIENTE.md). Las aclaraciones teóricas ya están incorporadas; contrástalas con ejemplos reales. No necesitas otro documento largo ni esperar al tutor para hacer estas comprobaciones.
2. **Centraliza el envío de tareas en un formulario.** En `Article`, utiliza un `<form>` con `onSubmit`, evita la recarga mediante `event.preventDefault()` y usa un botón `type="submit"`. Conserva la etiqueta y el input controlado. Retira el envío manual mediante `onKeyDown` y el `onClick` de envío del botón para que Enter y clic recorran una sola función. Mantén `trim`, el rechazo de entradas vacías y el vaciado del input tras añadir.
3. **Revisa los comentarios nuevos.** Conserva las explicaciones sobre identidad, copias, lectura inicial y dependencia del efecto. Retira comentarios que solo repiten lo que ya dice una línea. Donde un concepto sea nuevo para ti, explica brevemente el motivo o anota la duda en el resumen.
4. **`views/Inicio.jsx` ya está integrado.** `TareasPage` renderiza `Inicio` y este pasa `addTareas` a `Article`. Conserva ese recorrido al reorganizar las páginas; no necesitas repetir esta corrección.

No hace falta extraer ahora todos los componentes repetidos ni cambiar las funciones de tareas a una arquitectura nueva. Los setters actuales funcionan en estos eventos; la prioridad es entender las copias y conservar el comportamiento.

### Comprobación previa

- [x] He completado los cuatro puntos del repaso escrito con mi ejemplo.
- [x] El formulario tiene `onSubmit={enviarTarea}` y el botón `type="submit"` ya no tiene `onClick` de envío.
- [x] He probado clic y Enter: cada envío añade exactamente una tarea y no recarga la página.
- [x] El código mantiene `trim`, rechazo del texto vacío y vaciado del input tras añadir una tarea válida.
- [x] He revisado los comentarios para que expliquen decisiones sin repetir cada línea.
- [x] `Inicio.jsx` se utiliza desde `TareasPage` y pasa `addTareas` a `Article`.
- [x] He repetido las pruebas de completar, recuperar, buscar, eliminar y recargar después de la reorganización.
- [x] `npm run lint` y `npm run build` pasan en `4d4b688`.

Referencias: [el elemento form · MDN](https://developer.mozilla.org/es/docs/Web/HTML/Element/form), [preventDefault · MDN](https://developer.mozilla.org/es/docs/Web/API/Event/preventDefault) y [responder a eventos · React](https://es.react.dev/learn/responding-to-events).

## 1. Separa la página de tareas

La aplicación que ahora vive en `App` pasará a una página, por ejemplo `pages/TareasPage.jsx`.

1. Mueve allí el estado de tareas, su lectura inicial, el efecto de guardado, las acciones y sus listas calculadas.
2. Conserva los componentes existentes y las secciones internas. No cambies completar, recuperar, buscar ni eliminar.
3. Reserva `App` para la estructura común y las rutas. Mantén una sola cabecera global, un solo `main` y un solo pie. El menú propio de Tareas puede estar dentro de esa página, sin repetir la estructura global.
4. Para distinguir los dos niveles, llama «Portal» al acceso global a `/` y «Añadir tarea» al antiguo «Inicio» de Tareas. Su identificador interno puede seguir siendo `inicio`.

No mantengas dos copias del estado ni dos efectos de guardado. Conserva la clave `devquest.tareas.v1` y los identificadores existentes.

**Parada:** antes de añadir rutas, renderiza la página de tareas desde `App` y comprueba que sigue funcionando y conservando datos al recargar.

## 2. Añade React Router

Desde `devquest/`, instala la librería:

```bash
npm install react-router
```

Sigue la [instalación en modo declarativo](https://reactrouter.com/start/declarative/installation). Es el modo que usaremos con el Vite existente; no necesitas generar otro proyecto.

1. Coloca un único `BrowserRouter` alrededor de la aplicación, manteniendo `StrictMode`.
2. Utiliza `Routes` y `Route` para asociar las páginas con estas direcciones:

| Dirección | Contenido |
| --- | --- |
| `/` | Portal de miniapps. |
| `/tareas` | Aplicación de tareas actual. |
| Cualquier otra | «Página no encontrada» y un enlace al portal. |

3. Usa `Link` para los accesos y `NavLink` si quieres destacar la página activa. Si el enlace al portal se marca activo también en otras páginas, consulta la propiedad `end`.

La URL decide qué página se muestra. No crees otro estado para duplicar la ruta ni uses `window.location` para cambiar entre miniapps. Las secciones internas de Tareas siguen utilizando su estado actual; no necesitan rutas propias en este reto.

**Parada:** entra en `/tareas` escribiendo la dirección completa en el navegador. Debe aparecer Tareas sin pasar por el portal.

## 3. Construye el portal

Muestra un título, una introducción breve y dos tarjetas:

- **Tareas:** descripción de lo que hace y enlace «Abrir tareas» a `/tareas`.
- **Quiz de React:** el objetivo inicial era mostrar «Próximamente» hasta el 07. En tu versión ya está activado su enlace; consérvalo.

Define sus datos en un array y renderiza las tarjetas con `map` y claves estables. Extrae un componente de tarjeta que reciba sus datos por props. Para una tarjeta sin ruta, muestra el estado informativo sin crear un enlace vacío o con `#`.

Mantén la identidad visual del proyecto. En móvil las tarjetas deben apilarse y los textos largos ajustarse. Los enlaces deben tener nombres claros y foco visible.

## 4. Comprueba la navegación y los datos

La página de Tareas se desmonta al salir de su ruta. Al volver, su inicializador recupera las tareas guardadas. La sección activa, el buscador y un texto sin enviar pueden reiniciarse: es el comportamiento aceptado. Las tareas guardadas deben conservarse.

1. Crea dos tareas, completa una y sal al portal.
2. Vuelve a Tareas y comprueba ambas secciones.
3. Usa atrás y adelante del navegador: la URL y la página deben coincidir.
4. Recarga directamente en `/tareas` usando el mismo origen y puerto.
5. Abre `/no-existe` y utiliza su enlace para volver al portal.

Estas pruebas se realizan con el servidor local de Vite. Cuando llegue el momento de publicar, habrá que configurar el alojamiento para servir la app al abrir rutas directamente; publicar no forma parte de este reto.

## 5. Explica lo nuevo

Añade comentarios breves sobre la responsabilidad de las rutas y dónde vive ahora el estado de Tareas. Actualiza en el cuaderno la descripción de `App` y de los archivos que hayas movido. Responde las preguntas del 06 sin copiar las definiciones de la documentación.

## Comprueba tu entrega

- [x] El proyecto sigue siendo un único Vite y tiene un solo `BrowserRouter`.
- [x] `/` tiene `PortalPage`, tarjetas generadas desde datos y el componente reutilizable `MiniappCards`, con `key` en el `map`.
- [x] Tareas tiene un `Link` real. Quiz ya enlaza a `/quiz` como avance del 07; no vuelvas a poner «Próximamente».
- [x] `/tareas` renderiza `TareasPage` con sus secciones internas.
- [x] Se separan navegación global e interna sin duplicar cabecera, `main` ni pie.
- [x] He comprobado los enlaces con teclado y foco visible.
- [x] He probado atrás, adelante y recarga directa en `/tareas` desde Vite.
- [x] Existe una ruta comodín con mensaje de página no encontrada y enlace al portal.
- [x] He probado crear, completar, recuperar, buscar y eliminar en esta versión.
- [x] He comprobado que salir al portal y volver conserva las tareas y sus estados sin duplicarlas.
- [x] Se ha revisado la presentación en móvil y escritorio; se localizó el desbordamiento en la cabecera compartida.
- [ ] He ajustado la cabecera: enlaces separados, legibles y utilizables con teclado; Portal, Tareas y Quiz no tienen desplazamiento horizontal a 375 px y siguen viéndose bien a 1280 px.
- [x] El cuaderno describe las rutas, sus componentes, la ubicación del estado y la recuperación de tareas al volver.
- [x] He concretado por qué se reinicia el buscador al salir de Tareas y volver.
- [x] He completado los cuatro puntos del repaso personal; la explicación escrita de rutas no sustituye ese repaso.
- [x] `npm run lint` y `npm run build` pasan (revisión del 22/09/2026, `4d4b688`).

**Registro breve de pruebas:** anota aquí las acciones, el resultado y cualquier fallo encontrado. No hace falta otro archivo.

Revisión funcional sobre `4d4b688`: altas con Enter, tareas duplicadas independientes, completar, búsqueda sin coincidencias, recuperar, eliminar y recargar; conservación al cambiar entre apps; ruta desconocida y navegación de vuelta. Lint y build pasan. El Quiz produjo 5/5, 0/5 y 3/5 y reinició correctamente. A 375 px se detectó el desbordamiento de cabecera descrito arriba; el ajuste aún debe realizarse.

## Documentación por bloques

- [Instalación · React Router](https://reactrouter.com/start/declarative/installation).
- [Rutas · React Router](https://reactrouter.com/start/declarative/routing).
- [NavLink · React Router](https://reactrouter.com/api/components/NavLink).
- [Pasar props · React](https://es.react.dev/learn/passing-props-to-a-component).
- [Conservar y reiniciar estado · React](https://es.react.dev/learn/preserving-and-resetting-state).

**Demostración al tutor:** abre Tareas desde el portal, modifica una tarea, vuelve al portal y regresa. Explica qué se recupera y qué puede reiniciarse.

[Volver a la guía](../README.md) · [Reto 07](07-quiz-respuestas.md)
