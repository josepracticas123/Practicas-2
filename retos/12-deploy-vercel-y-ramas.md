# 12 · Publica DevQuest con Vercel y trabaja en develop

**Estado:** en curso. **Punto de partida:** el [reto 11 está cerrado funcionalmente](11-crear-editar-eliminar-api.md#registro-de-cierre) en `84a2a01`. La conversación de comprensión del 11 sigue pendiente por separado.

Ya hecho: ramas `develop` y `main`, `devquest/vercel.json` con el rewrite de SPA, primera integración `develop → main` (PR #1, merge `d92283a`) y la mejora visible del portal en `develop` (`636e800`) con su Preview generada. Pendiente: la pull request `develop → main` de esa mejora, su merge, la comprobación de Production después del merge y las comprobaciones en el navegador de los bloques 5 y 6.

**Tu misión:** compartir DevQuest mediante una URL y aprender a separar el trabajo diario de la versión publicada. Tú configurarás el despliegue y realizarás el recorrido completo con un cambio pequeño.

## 1. Entiende el recorrido

| Lugar | Para qué lo usaremos |
| --- | --- |
| Tu ordenador | Editar y probar con Vite |
| Rama `develop` | Guardar los cambios de trabajo y probarlos en una Preview |
| Pull request de `develop` hacia `main` | Revisar qué cambios entrarán en producción |
| Rama `main` | Conservar la versión que Vercel publica en Production |

Una rama identifica una línea de trabajo del repositorio. Un commit registra cambios localmente; `push` los envía a GitHub. Una pull request propone integrar cambios entre ramas. El despliegue construye y publica la aplicación a partir de un commit.

- [x] Explica con tus palabras por qué un cambio en `develop` no debe modificar todavía la web de producción.
- [ ] A partir de este reto, realiza el trabajo diario en `develop` y lleva las versiones comprobadas a `main` mediante una pull request.
- [x] Mantén ambas ramas: `develop` seguirá utilizándose después de cada entrega.

**Pendiente en este bloque:** el flujo ya se ha usado en dos integraciones (PR #1 y PR #3), pero la mejora visible actual (`636e800`) todavía no tiene pull request, así que el recorrido completo de esta entrega sigue abierto.

Para este ejercicio bastan estas dos ramas, un proyecto de Vercel y el dominio que genera Vercel. No necesitas incorporar otra miniapp ni un backend.

Referencias: [ramas en Git](https://git-scm.com/book/es/v2/Ramificaciones-en-Git-Las-Ramas-en-Pocas-Palabras) y [entornos de Vercel](https://vercel.com/docs/deployments/environments).

## 2. Prepara develop

Ejecuta Git desde la raíz `Practicas-2/`. Primero inspecciona el estado:

```bash
git status
git branch --show-current
git fetch origin
git branch -a
```

- [x] Identifica la rama actual y los cambios pendientes. Guarda los cambios que correspondan con un commit revisado antes de cambiar de rama; no descartes archivos para conseguir un estado limpio.
- [x] Con el directorio de trabajo limpio, actualiza `main`:

```bash
git switch main
git pull --ff-only origin main
```

- [x] Si `develop` no existe ni localmente ni en GitHub, créala desde esta versión de `main` y publícala:

```bash
git switch -c develop
git push -u origin develop
```

Si ya existe localmente, usa `git switch develop` y actualízala con `git pull --ff-only origin develop` si tiene rama remota. Si solo existe en GitHub, usa `git switch --track origin/develop`. No vuelvas a crear una rama existente. Si Git indica divergencias o conflictos, lee el mensaje y consúltalo con el tutor; no uses `push --force` para resolverlo.

- [x] Comprueba con `git branch --show-current` que estás en `develop` antes de editar.
- [x] Localiza `main` y `develop` en GitHub y explica qué hace `-u` en el primer push.

Referencia: [git switch](https://git-scm.com/docs/git-switch).

## 3. Prepara la aplicación para el servidor

Tu aplicación usa Vite con `BrowserRouter`. Al abrir directamente `/tareas`, Vercel tiene que entregar `index.html` para que React resuelva la ruta.

- [x] En `develop`, crea `devquest/vercel.json` con la configuración de SPA indicada en [Vite en Vercel](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas):

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

- [x] Explica por qué el archivo va junto a `devquest/package.json`: esa carpeta será la raíz del proyecto en Vercel. No añadas comentarios dentro del JSON.
- [x] Desde `devquest/`, ejecuta `npm ci`, `npm run lint` y `npm run build`. Comprueba que la salida se genera en `dist/`.
- [x] Ejecuta `npm run preview` y prueba la compilación local. Este comando sirve para revisar el build; no publica la aplicación en Internet.
- [x] Revisa los archivos que vas a subir: incluye la configuración y conserva `package-lock.json`; `node_modules/`, `dist/` y la guía privada de `docs/` deben seguir fuera de Git.
- [x] Guarda y sube a `develop` los cambios revisados. Por ejemplo, desde la raíz, si el único cambio es la configuración:

```bash
git add devquest/vercel.json
git diff --cached
git commit -m "Configura las rutas de DevQuest en Vercel"
git push
```

### Primera integración

- [x] En GitHub abre una pull request con **base: `main`** y **compare: `develop`**. Revisa los archivos y describe el cambio y las pruebas realizadas.
- [x] Revisa la propuesta con el tutor e intégrala cuando esté lista. Para este ejercicio utiliza **Create a merge commit** y conserva `develop`.

**Notas de la revisión (29/09/2026):** `npm run lint` (sin errores) y `npm run build` (genera `dist/`) comprobados desde `devquest/`; `npm ci` y `npm run preview` constan como hechos por el alumno, sin dejar rastro en el repositorio. Las PR #1 y #3 se integraron sin descripción, así que la próxima debe incluir qué cambia, enlace a la Preview y pruebas realizadas.

Esta primera integración prepara `main` para el despliegue inicial. La Preview se comprobará después de conectar Vercel.

Referencia: [crear una pull request](https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

## 4. Conecta GitHub con Vercel

- [x] Accede a Vercel con la cuenta o equipo acordado con el tutor e importa el repositorio **Practicas-2** mediante su integración con GitHub.
- [x] Configura y comprueba estos valores:

| Ajuste | Valor para este repositorio |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | `devquest` |
| Build Command | `npm run build` |
| Output Directory | `dist` (relativa a `devquest`) |
| Install Command | `npm ci` |
| Production Branch / seguimiento de rama de Production | `main` |

- [ ] Comprueba que la versión de Node elegida en Vercel es compatible con las dependencias y con la que has usado localmente; deja constancia de ella en la entrega.
- [x] Inicia el primer despliegue desde `main`. Verifica la rama y el commit en el resultado; el primer despliegue de un proyecto nuevo es Production, incluso si se inicia desde otra rama.
- [x] Espera a que termine y abre la URL de producción. Si falla, lee los logs desde el primer error: revisa raíz, comandos e imports, incluidas sus mayúsculas.

**Notas de la revisión (29/09/2026):** los ajustes de la tabla anterior están indicados por el alumno desde el panel de Vercel; no se pueden comprobar desde el repositorio. En local se usa Node `v24.21.0` con npm `11.19.0`, pero la versión de Node de Vercel sigue sin anotar. Primeros despliegues verificados en GitHub: **Production** del commit `d92283a` (`vercel[bot]`, 29/09/2026 10:44 UTC) y **Production** de `c22d4da` (11:04 UTC).

Referencias: [integración con Git](https://vercel.com/docs/git), [configuración del build](https://vercel.com/docs/builds/configure-a-build) y [primer despliegue y entornos](https://vercel.com/docs/deployments/environments#first-deployment).

## 5. Comprueba la web publicada

- [ ] Prueba Portal, Tareas, Quiz y Catálogo en la URL de producción.
- [x] Abre directamente `/tareas`, `/quiz`, `/catalogo` y `/crear-producto` en una pestaña nueva y recarga cada una. No debe aparecer un 404 de Vercel.
- [x] Abre una ruta inventada: debe aparecer la página no encontrada de tu aplicación.
- [ ] Comprueba imágenes, estilos, búsqueda del catálogo y operaciones de práctica; revisa la consola si algo falla.
- [ ] Añade una tarea en la web publicada y recarga: debe conservarse. Los datos de `localhost` no se trasladan a Vercel: `localStorage` pertenece al origen del navegador, y otra URL de Preview puede tener datos distintos.
- [ ] Comprueba móvil y escritorio. Publicar no cambia el comportamiento simulado de las escrituras de DummyJSON.

**Notas de la revisión (29/09/2026):** el acceso directo y la recarga de `/tareas`, `/quiz`, `/catalogo` y `/crear-producto` se comprobaron a nivel de servidor en `https://practicasnadunet.vercel.app`: las cuatro devuelven el `index.html` de la app y no aparece un 404 de Vercel, igual que una ruta inventada, que llega a React. **Pendiente:** revisar en el navegador Portal, Tareas, Quiz y Catálogo, las imágenes y los estilos, la búsqueda del catálogo y las operaciones de práctica con la consola abierta, la tarea creada en la web publicada que debe conservarse al recargar, y la comprobación en móvil y escritorio.

## 6. Haz una entrega desde develop hasta producción

Después del merge inicial, sincroniza las ramas locales desde la raíz, con el directorio de trabajo limpio:

```bash
git switch main
git pull --ff-only origin main
git switch develop
git merge main
git push origin develop
```

- [x] En `develop`, realiza una mejora pequeña y visible, por ejemplo aclarar el texto de presentación del portal. Compruébala, crea un commit y haz push.
- [ ] Localiza el despliegue **Preview** de `develop` en Vercel. Abre su URL y verifica el cambio y la recarga de `/catalogo`.
- [ ] Abre la URL de **Production** y confirma que todavía muestra el texto anterior. Comprueba las etiquetas de entorno y los commits, no solo el aspecto de las URLs.
- [ ] Abre una pull request **develop → main**. Incluye qué cambia, enlace a la Preview y pruebas realizadas. Comprueba que el tutor puede acceder a la Preview; si pide autenticación, revisad el acceso en Vercel.
- [ ] Revisa la propuesta con el tutor y haz merge cuando esté lista. Conserva `develop`.
- [ ] Comprueba el nuevo despliegue de `main`: debe ser Production y mostrar el cambio en la URL de producción.
- [ ] Repite la sincronización local del bloque anterior y termina situado en `develop`, listo para el próximo trabajo.

**Estado real de este bloque (29/09/2026):** la mejora del portal está en `develop` (`636e800`, junto a `2e271b7` del lint) y su despliegue **Preview** existe y está en `success` (29/09/2026 11:41 UTC), pero esa URL todavía pide iniciar sesión en Vercel. **Production** sigue en `c22d4da`, es decir, sin el cambio visible. **Pendiente:** abrir y comprobar la Preview, abrir la pull request `develop → main` con descripción, enlace a la Preview y pruebas realizadas, revisarla con el tutor, mergearla conservando `develop`, comprobar el nuevo despliegue de `main` en Production y repetir la sincronización local terminando en `develop`.

**Si falla:** un build correcto no sustituye probar la pantalla. Corrige desde `develop`, vuelve a comprobar la Preview y actualiza la pull request antes de integrarla. Si el problema se detecta en producción, avisa al tutor y prepara la corrección con el mismo recorrido.

## 7. Registra la entrega y explica lo aprendido

- [x] Completa el bloque 12 de [APRENDIZAJE](../devquest/APRENDIZAJE.md) con tus palabras.
- [x] Añade a la guía del proyecto la URL de producción y el flujo `develop → Preview → pull request → main → Production`.
- [x] Completa este registro con datos reales; no marques el reto terminado solo porque Vercel muestre un despliegue exitoso.

| Evidencia | Resultado |
| --- | --- |
| URL de producción | https://practicasnadunet.vercel.app — comprobada el 29/09/2026: responde con el `index.html` de la app y ya no pide login de Vercel. La antigua `https://practicas-2-two.vercel.app` da 404 y no se utiliza. |
| URL de la Preview comprobada | **Pendiente.** La Preview del commit `636e800` existe y está en `success` (29/09/2026 11:41 UTC), pero su URL todavía pide iniciar sesión en Vercel y no consta la comprobación del cambio en pantalla. |
| Pull request del cambio visible | **Pendiente.** Todavía no existe. La última PR mergeada es la #3 (`develop → main`, merge `c22d4da`); antes están la #1 (merge `d92283a`) y la #2 (dirección contraria y sin descripción). |
| Commit de develop probado y commit de main desplegado | `develop` = `636e800` (texto del portal) y `2e271b7` (lint), probados con `npm run lint` y `npm run build`; falta la prueba en navegador. Desplegado en **Production**: `main` = `c22d4da` (29/09/2026 11:04 UTC). |
| Versión de Node local / Vercel | Local: Node `v24.21.0` y npm `11.19.0`. Vercel: **pendiente de anotar**. |
| Acceso directo y recarga de rutas | Comprobado a nivel de servidor en `https://practicasnadunet.vercel.app`: `/tareas`, `/quiz`, `/catalogo`, `/crear-producto` y una ruta inventada devuelven el `index.html` de la app, sin 404 de Vercel. Falta la comprobación con recarga en el navegador. |
| Producción sin cambios antes del merge y actualizada después | Antes del merge: **sí**, Production está en `c22d4da` y el commit `636e800` solo tiene Preview. Después del merge: **pendiente**, porque la pull request y el merge todavía no se han hecho. |
| Lint, build y pruebas funcionales | `npm run lint` sin errores y `npm run build` correcto (genera `dist/`). Pruebas funcionales en navegador (Portal, Tareas, Quiz, Catálogo, tarea guardada, móvil y escritorio): **pendientes**. |

**Demostración al tutor:** enseña la rama actual, la Preview, la pull request y la versión de producción. Explica qué desencadenó cada despliegue y por qué recargar una ruta interna funciona.

[Volver a la guía](../README.md) · [Reto 11](11-crear-editar-eliminar-api.md)
