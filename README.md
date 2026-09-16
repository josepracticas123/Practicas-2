# DevQuest · Tu panel de retos

Estás construyendo tu propia aplicación de prácticas con React. Partiste de un panel visual y ya has añadido tareas y un navbar. Ahora darás utilidad a Finalizadas y añadirás búsqueda y eliminación de tareas. Tú eliges su nombre, colores y estilo.

El proyecto lo creas tú desde cero con **React + Vite + JavaScript y CSS**. Aquí tienes las instrucciones, no la aplicación resuelta. Usaremos JavaScript para practicar sus bases junto a React.

## Qué vas a construir

El panel visual es la base del proyecto. Con los retos 03 y 04 podrás completar y recuperar tareas, buscarlas y eliminarlas. Trabajarás sobre la navegación que ya has construido. Puedes continuar con el Tailwind que has incorporado.

No necesitas conocer todo para empezar. Trabaja en un paso, compruébalo en el navegador y continúa. Las ampliaciones son opcionales.

## Punto de partida

**El proyecto ya está creado. No repitas la instalación inicial ni generes otro Vite.** Para continuar, abre una terminal en `Practicas-2/devquest`, instala las dependencias con `npm install` si faltan y ejecuta `npm run dev`.

Antes de empezar, dedica unos diez minutos a explicar al tutor lo pendiente del reto 02. Después continúa por [03 · Completa y recupera tus tareas](retos/03-completar-y-recuperar.md), y pasa al 04 cuando funcione y puedas explicarlo. No necesitas terminar ambos en un día. La sección de creación que sigue queda como referencia de los primeros pasos.

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
│   └── 04-buscar-y-eliminar.md
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
