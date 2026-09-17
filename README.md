# DevQuest · Tu panel de retos

Estás construyendo tu propia aplicación de prácticas con React. Partiste de un panel visual y ya has añadido tareas y un navbar. Ya puedes completar, recuperar, buscar y eliminar tareas. Las tareas ya se conservan al recargar. Tú eliges su nombre, colores y estilo.

El proyecto lo creas tú desde cero con **React + Vite + JavaScript y CSS**. Aquí tienes las instrucciones, no la aplicación resuelta. Usaremos JavaScript para practicar sus bases junto a React.

## Qué vas a construir

El panel visual evolucionó hacia una aplicación de tareas. El reto 05 incorpora persistencia con `localStorage` sobre lo que ya funciona. Conserva el diseño y Tailwind. Ahora convertirás el inicio en un portal de miniapps: Tareas tendrá su propia ruta y añadirás un Quiz de React en dos etapas.

No necesitas conocer todo para empezar. Trabaja en un paso, compruébalo en el navegador y continúa. Las ampliaciones son opcionales.

## Punto de partida

**El proyecto ya está creado. No repitas la instalación inicial ni generes otro Vite.** Para continuar, abre una terminal en `Practicas-2/devquest`, instala las dependencias con `npm install` si faltan y ejecuta `npm run dev`.

## Seguimiento · 17/09/2026, `3736740`

**Los retos 01–04 y la implementación del 05 están cerrados técnicamente.** La corrección de textos largos funciona en móvil y escritorio. Se ha comprobado la persistencia al recargar y reabrir la pestaña; lint y build pasan.

1. **Comenta el cierre con el tutor:** explica por qué eliminar por identificador conserva otras tareas con el mismo texto.
2. **Explica el reto 05:** por qué pasas la función de lectura a `useState`, para qué utilizas `Set` y por qué guardar necesita un efecto pero buscar no. Las respuestas del cuaderno ya están escritas; no necesitas reescribirlas.
3. **Empieza el [reto 06](retos/06-portal-y-rutas.md):** portal y navegación, conservando la app de Tareas.
4. **Cuando termines y compruebes el 06**, continúa con el [07](retos/07-quiz-respuestas.md), y después con el [08](retos/08-quiz-recorrido.md). Son bloques sucesivos, no una obligación de terminar los tres hoy.

Compartir componentes, sustituir separaciones por CSS o adoptar un formulario son mejoras graduales. La explicación en directo sigue pendiente de confirmación del tutor; los checks técnicos no acreditan por sí solos la comprensión.

La sección siguiente conserva la guía de instalación inicial como referencia.

## 0. Crea y entiende tu proyecto (referencia inicial)

### Comprueba las herramientas

Abre **este repositorio** en tu editor y abre una terminal dentro de `Practicas-2`.

```bash
node --version
npm --version
git status
```

Si faltan Node o npm, instala la versión **LTS** desde [Node.js](https://nodejs.org/en/download) y vuelve a abrir la terminal. Comprueba los requisitos actuales de Node en la [guía oficial de Vite](https://vite.dev/guide/); atiende cualquier aviso de incompatibilidad durante la instalación.

Node permite ejecutar herramientas de JavaScript en tu ordenador. npm instala dependencias y ejecuta los comandos del proyecto. React sirve para construir la interfaz; Vite proporciona el entorno de desarrollo y genera la versión de producción.

### Genera la base con Vite

Desde `Practicas-2`, ejecuta:

```bash
npm create vite@latest devquest -- --template react
cd devquest
npm install
npm run dev
```

Si npm pide instalar `create-vite`, acepta. Si aparecen opciones adicionales, utiliza la configuración estable por defecto. Si el asistente ya instala dependencias o inicia el servidor, no necesitas repetir esos pasos; puedes detenerlo con `Ctrl+C` para seguir la secuencia.

Crearemos la app en `devquest/` para mantener estos enunciados separados. **No ejecutes el generador con `.` sobre la carpeta de los enunciados.** Si `devquest/` ya existe, comprueba su contenido antes de continuar; no aceptes borrar archivos para repetir el proceso.

Abre la dirección que indique la terminal. Mientras el servidor funciona, esa terminal permanece ocupada. Para detenerlo, pulsa `Ctrl+C`. Los siguientes días, entra en `Practicas-2/devquest` y ejecuta `npm run dev`.

Referencia: [crear un proyecto con Vite](https://vite.dev/guide/#scaffolding-your-first-vite-project).

### Investiga lo que ha creado

Localiza estos archivos y escribe una frase sobre cada uno en `devquest/APRENDIZAJE.md`:

| Archivo | Qué debes investigar |
| --- | --- |
| `package.json` | Dependencias y comandos disponibles en `scripts`. |
| `package-lock.json` | Versiones concretas que instala npm. Se guarda en Git. |
| `index.html` | Documento donde se monta la aplicación. |
| `src/main.jsx` | Punto de entrada de React. |
| `src/App.jsx` | Componente inicial que modificarás. |
| Los CSS de `src/` | Qué estilos importan los componentes. |
| `.gitignore` | Por qué `node_modules/` y `dist/` no se suben. |

Cambia un texto de `App.jsx` y comprueba que el navegador se actualiza. Después sustituye el contenido de demostración por un título propio. Retira los imports y estilos de ejemplo que ya no uses, sin borrar el punto de entrada de React.

Lee [Tu primer componente](https://es.react.dev/learn/your-first-component) y [Escribir marcado con JSX](https://es.react.dev/learn/writing-markup-with-jsx). React usa componentes: funciones que describen partes de la interfaz. JSX se parece a HTML, pero tiene reglas propias, como `className`.

**Listo para empezar:** puedes arrancar la app, cambiar un texto y explicar dónde lo has cambiado.

## Retos definidos

- [01 · Mi panel](retos/01-panel-visual.md): enunciado inicial de la estructura visual.
- [02 · Navega por tu aplicación de tareas](retos/02-renderizado-condicional.md): navegación y conservación de tareas; consulta sus checks de revisión.
- [03 · Completa y recupera tus tareas](retos/03-completar-y-recuperar.md): objetos, identificadores y cambio de estado.
- [04 · Busca y elimina tareas](retos/04-buscar-y-eliminar.md): búsqueda por sección y eliminación de una tarea concreta.
- [05 · Tus tareas sobreviven a una recarga](retos/05-persistencia-local.md): `localStorage` y `useEffect`. **Cerrado técnicamente; pendiente comentar las decisiones con el tutor.**

- [06 · Tu portal de miniapps](retos/06-portal-y-rutas.md): home, React Router y Tareas en `/tareas`. **Siguiente reto.**
- [07 · Tu primera pregunta del quiz](retos/07-quiz-respuestas.md): `/quiz`, datos locales, selección y comprobación de respuestas.
- [08 · Completa el quiz y consulta tu resultado](retos/08-quiz-recorrido.md): progreso, respuestas confirmadas, puntuación y nueva partida.

Trabaja por bloques y comprueba cada uno antes de continuar.

## Cómo trabajar el reto

1. Lee el objetivo y los criterios de entrega antes de escribir código.
2. Dibuja la pantalla o escribe tres pasos pequeños en tu cuaderno.
3. Construye primero la versión mínima y compruébala.
4. Usa las pistas solo cuando las necesites. Lee el apartado enlazado de documentación, no la documentación entera.
5. Añade comentarios breves sobre los conceptos que uses por primera vez. En `APRENDIZAJE.md`, explica con tus palabras lo aprendido y anota tus dudas; no marques como comprendido algo solo por haberlo utilizado.
6. Enseña el resultado y explica una parte del código al tutor.

Si llevas 20–30 minutos sin avanzar, pide ayuda con: qué esperabas, qué ocurre, el error exacto y lo que has probado. Puedes pedir explicaciones o pistas a una IA; cualquier código que incorpores debes poder explicarlo y modificarlo tú.

Antes de entregar, ejecuta desde `devquest/`:

```bash
npm run lint
npm run build
```

Comprueba `scripts` en `package.json` si algún comando no existe. No quites reglas para esconder errores: léelos y pide ayuda si lo necesitas. Estas comprobaciones no sustituyen revisar la pantalla en el navegador.

Para entregar cada reto, revisa su checklist y realiza su demostración al tutor. Los checks anteriores son el registro de aquellas entregas; los nuevos quedan pendientes hasta comprobarlos.

## Organización del proyecto

La aplicación está dentro de `devquest/`. Reutiliza sus componentes y crea los que necesites para separar las vistas.

```text
Practicas-2/
├── README.md
├── retos/
│   ├── 01-panel-visual.md
│   ├── 02-renderizado-condicional.md
│   ├── 03-completar-y-recuperar.md
│   ├── 04-buscar-y-eliminar.md
│   ├── 05-persistencia-local.md
│   ├── 06-portal-y-rutas.md
│   ├── 07-quiz-respuestas.md
│   └── 08-quiz-recorrido.md
└── devquest/
    ├── APRENDIZAJE.md
    ├── package.json
    ├── index.html
    └── src/
        ├── App.jsx
        ├── components/
        ├── main.jsx
        └── …              # Estilos y archivos generados por Vite
```

Utiliza etiquetas HTML y React para construir la pantalla. Puedes mantener Tailwind para los estilos.

## Si algo falla al arrancar

- `node` o `npm` no se encuentran: comprueba la instalación de Node y reinicia la terminal.
- No encuentra `package.json`: entra en `devquest/` antes de ejecutar npm.
- El puerto está ocupado: abre la URL que realmente muestre Vite.
- Pantalla en blanco: mira la terminal y la consola del navegador; empieza por el primer error.
- Un import falla: revisa la ruta, la extensión y las mayúsculas del archivo.

Para consultar: [React en español](https://es.react.dev/learn), [Vite](https://vite.dev/guide/) y [bases de JavaScript en MDN](https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting).
