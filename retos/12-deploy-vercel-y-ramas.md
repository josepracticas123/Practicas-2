# 12 · Publica DevQuest con Vercel y trabaja en develop

**Estado:** por empezar; siguiente reto. **Punto de partida:** el [reto 11 está cerrado funcionalmente](11-crear-editar-eliminar-api.md#registro-de-cierre) en `84a2a01`. Puedes comenzar. La conversación de comprensión con el tutor sigue pendiente por separado.

**Tu misión:** compartir DevQuest mediante una URL y aprender a separar el trabajo diario de la versión publicada. Tú configurarás el despliegue y realizarás el recorrido completo con un cambio pequeño.

## 1. Entiende el recorrido

| Lugar | Para qué lo usaremos |
| --- | --- |
| Tu ordenador | Editar y probar con Vite |
| Rama `develop` | Guardar los cambios de trabajo y probarlos en una Preview |
| Pull request de `develop` hacia `main` | Revisar qué cambios entrarán en producción |
| Rama `main` | Conservar la versión que Vercel publica en Production |

Una rama identifica una línea de trabajo del repositorio. Un commit registra cambios localmente; `push` los envía a GitHub. Una pull request propone integrar cambios entre ramas. El despliegue construye y publica la aplicación a partir de un commit.

- [ ] Explica con tus palabras por qué un cambio en `develop` no debe modificar todavía la web de producción.
- [ ] A partir de este reto, realiza el trabajo diario en `develop` y lleva las versiones comprobadas a `main` mediante una pull request.
- [ ] Mantén ambas ramas: `develop` seguirá utilizándose después de cada entrega.

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

- [ ] Identifica la rama actual y los cambios pendientes. Guarda los cambios que correspondan con un commit revisado antes de cambiar de rama; no descartes archivos para conseguir un estado limpio.
- [ ] Con el directorio de trabajo limpio, actualiza `main`:

```bash
git switch main
git pull --ff-only origin main
```

- [ ] Si `develop` no existe ni localmente ni en GitHub, créala desde esta versión de `main` y publícala:

```bash
git switch -c develop
git push -u origin develop
```

Si ya existe localmente, usa `git switch develop` y actualízala con `git pull --ff-only origin develop` si tiene rama remota. Si solo existe en GitHub, usa `git switch --track origin/develop`. No vuelvas a crear una rama existente. Si Git indica divergencias o conflictos, lee el mensaje y consúltalo con el tutor; no uses `push --force` para resolverlo.

- [ ] Comprueba con `git branch --show-current` que estás en `develop` antes de editar.
- [ ] Localiza `main` y `develop` en GitHub y explica qué hace `-u` en el primer push.

Referencia: [git switch](https://git-scm.com/docs/git-switch).

## 3. Prepara la aplicación para el servidor

Tu aplicación usa Vite con `BrowserRouter`. Al abrir directamente `/tareas`, Vercel tiene que entregar `index.html` para que React resuelva la ruta.

- [ ] En `develop`, crea `devquest/vercel.json` con la configuración de SPA indicada en [Vite en Vercel](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas):

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

- [ ] Explica por qué el archivo va junto a `devquest/package.json`: esa carpeta será la raíz del proyecto en Vercel. No añadas comentarios dentro del JSON.
- [ ] Desde `devquest/`, ejecuta `npm ci`, `npm run lint` y `npm run build`. Comprueba que la salida se genera en `dist/`.
- [ ] Ejecuta `npm run preview` y prueba la compilación local. Este comando sirve para revisar el build; no publica la aplicación en Internet.
- [ ] Revisa los archivos que vas a subir: incluye la configuración y conserva `package-lock.json`; `node_modules/`, `dist/` y la guía privada de `docs/` deben seguir fuera de Git.
- [ ] Guarda y sube a `develop` los cambios revisados. Por ejemplo, desde la raíz, si el único cambio es la configuración:

```bash
git add devquest/vercel.json
git diff --cached
git commit -m "Configura las rutas de DevQuest en Vercel"
git push
```

### Primera integración

- [ ] En GitHub abre una pull request con **base: `main`** y **compare: `develop`**. Revisa los archivos y describe el cambio y las pruebas realizadas.
- [ ] Revisa la propuesta con el tutor e intégrala cuando esté lista. Para este ejercicio utiliza **Create a merge commit** y conserva `develop`.

Esta primera integración prepara `main` para el despliegue inicial. La Preview se comprobará después de conectar Vercel.

Referencia: [crear una pull request](https://docs.github.com/es/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

## 4. Conecta GitHub con Vercel

- [ ] Accede a Vercel con la cuenta o equipo acordado con el tutor e importa el repositorio **Practicas-2** mediante su integración con GitHub.
- [ ] Configura y comprueba estos valores:

| Ajuste | Valor para este repositorio |
| --- | --- |
| Framework Preset | Vite |
| Root Directory | `devquest` |
| Build Command | `npm run build` |
| Output Directory | `dist` (relativa a `devquest`) |
| Install Command | `npm ci` |
| Production Branch / seguimiento de rama de Production | `main` |

- [ ] Comprueba que la versión de Node elegida en Vercel es compatible con las dependencias y con la que has usado localmente; deja constancia de ella en la entrega.
- [ ] Inicia el primer despliegue desde `main`. Verifica la rama y el commit en el resultado; el primer despliegue de un proyecto nuevo es Production, incluso si se inicia desde otra rama.
- [ ] Espera a que termine y abre la URL de producción. Si falla, lee los logs desde el primer error: revisa raíz, comandos e imports, incluidas sus mayúsculas.

Referencias: [integración con Git](https://vercel.com/docs/git), [configuración del build](https://vercel.com/docs/builds/configure-a-build) y [primer despliegue y entornos](https://vercel.com/docs/deployments/environments#first-deployment).

## 5. Comprueba la web publicada

- [ ] Prueba Portal, Tareas, Quiz y Catálogo en la URL de producción.
- [ ] Abre directamente `/tareas`, `/quiz`, `/catalogo` y `/crear-producto` en una pestaña nueva y recarga cada una. No debe aparecer un 404 de Vercel.
- [ ] Abre una ruta inventada: debe aparecer la página no encontrada de tu aplicación.
- [ ] Comprueba imágenes, estilos, búsqueda del catálogo y operaciones de práctica; revisa la consola si algo falla.
- [ ] Añade una tarea en la web publicada y recarga: debe conservarse. Los datos de `localhost` no se trasladan a Vercel: `localStorage` pertenece al origen del navegador, y otra URL de Preview puede tener datos distintos.
- [ ] Comprueba móvil y escritorio. Publicar no cambia el comportamiento simulado de las escrituras de DummyJSON.

## 6. Haz una entrega desde develop hasta producción

Después del merge inicial, sincroniza las ramas locales desde la raíz, con el directorio de trabajo limpio:

```bash
git switch main
git pull --ff-only origin main
git switch develop
git merge main
git push origin develop
```

- [ ] En `develop`, realiza una mejora pequeña y visible, por ejemplo aclarar el texto de presentación del portal. Compruébala, crea un commit y haz push.
- [ ] Localiza el despliegue **Preview** de `develop` en Vercel. Abre su URL y verifica el cambio y la recarga de `/catalogo`.
- [ ] Abre la URL de **Production** y confirma que todavía muestra el texto anterior. Comprueba las etiquetas de entorno y los commits, no solo el aspecto de las URLs.
- [ ] Abre una pull request **develop → main**. Incluye qué cambia, enlace a la Preview y pruebas realizadas. Comprueba que el tutor puede acceder a la Preview; si pide autenticación, revisad el acceso en Vercel.
- [ ] Revisa la propuesta con el tutor y haz merge cuando esté lista. Conserva `develop`.
- [ ] Comprueba el nuevo despliegue de `main`: debe ser Production y mostrar el cambio en la URL de producción.
- [ ] Repite la sincronización local del bloque anterior y termina situado en `develop`, listo para el próximo trabajo.

**Si falla:** un build correcto no sustituye probar la pantalla. Corrige desde `develop`, vuelve a comprobar la Preview y actualiza la pull request antes de integrarla. Si el problema se detecta en producción, avisa al tutor y prepara la corrección con el mismo recorrido.

## 7. Registra la entrega y explica lo aprendido

- [ ] Completa el bloque 12 de [APRENDIZAJE](../devquest/APRENDIZAJE.md) con tus palabras.
- [ ] Añade a la guía del proyecto la URL de producción y el flujo `develop → Preview → pull request → main → Production`.
- [ ] Completa este registro con datos reales; no marques el reto terminado solo porque Vercel muestre un despliegue exitoso.

| Evidencia | Resultado |
| --- | --- |
| URL de producción | Pendiente |
| URL de la Preview comprobada | Pendiente |
| Pull request del cambio visible | Pendiente |
| Commit de develop probado y commit de main desplegado | Pendiente |
| Versión de Node local / Vercel | Pendiente |
| Acceso directo y recarga de rutas | Pendiente |
| Producción sin cambios antes del merge y actualizada después | Pendiente |
| Lint, build y pruebas funcionales | Pendiente |

**Demostración al tutor:** enseña la rama actual, la Preview, la pull request y la versión de producción. Explica qué desencadenó cada despliegue y por qué recargar una ruta interna funciona.

[Volver a la guía](../README.md) · [Reto 11](11-crear-editar-eliminar-api.md)
