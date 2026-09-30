# 12 · Publica DevQuest con Vercel y trabaja en develop

**Estado:** cerrado el 30/09/2026 por acuerdo con el tutor. Objetivo conseguido: publicar DevQuest y realizar entregas desde `develop` a `main` mediante pull requests. La sincronización final entre ramas queda bajo revisión del tutor, fuera del cierre del reto.

José ha integrado sus PR #3, #4, #5 y #6. La mejora visible del portal pasó a producción mediante la PR #4. Se conservan ambas ramas y hay despliegues de Preview y Production correctos. Las descripciones de PR y el acceso del tutor a Preview no se exigen como pendientes de esta primera práctica de Git.

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
- [x] A partir de este reto, realiza el trabajo diario en `develop` y lleva las versiones comprobadas a `main` mediante una pull request.
- [x] Mantén ambas ramas: `develop` seguirá utilizándose después de cada entrega.

**Completado:** el recorrido `develop → Preview → PR → main → Production` está registrado en GitHub, incluida la mejora visible del portal.

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

**Revisión del 30/09/2026:** `npm run lint` y `npm run build` pasan en `develop` (`4866234`). `npm ci` y `npm run preview` constan como realizados por el alumno. El tutor acepta las descripciones de las PR para esta primera práctica; no hace falta rehacerlas para cerrar el reto.

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

- Comprueba la compatibilidad de Node al configurar Vercel. **Dato no registrado al cierre:** versión exacta de Node del servidor; no se exige completarlo en esta entrega.
- [x] Inicia el primer despliegue desde `main`. Verifica la rama y el commit en el resultado; el primer despliegue de un proyecto nuevo es Production, incluso si se inicia desde otra rama.
- [x] Espera a que termine y abre la URL de producción. Si falla, lee los logs desde el primer error: revisa raíz, comandos e imports, incluidas sus mayúsculas.

**Alcance de la revisión:** los ajustes del panel constan como indicados por el alumno. GitHub registra Production correcta para `1f53ba6`. La versión exacta de Node de Vercel no quedó registrada; se deja como dato no verificado, sin bloquear el cierre acordado.

Referencias: [integración con Git](https://vercel.com/docs/git), [configuración del build](https://vercel.com/docs/builds/configure-a-build) y [primer despliegue y entornos](https://vercel.com/docs/deployments/environments#first-deployment).

## 5. Comprueba la web publicada

- [x] Prueba Portal, Tareas, Quiz y Catálogo en la URL de producción.
- [x] Abre directamente `/tareas`, `/quiz`, `/catalogo` y `/crear-producto` en una pestaña nueva y recarga cada una. No debe aparecer un 404 de Vercel.
- [x] Abre una ruta inventada: debe aparecer la página no encontrada de tu aplicación.
- [x] Comprueba imágenes, estilos, búsqueda del catálogo y operaciones de práctica; revisa la consola si algo falla.
- [x] Añade una tarea en la web publicada y recarga: debe conservarse. Los datos de `localhost` no se trasladan a Vercel: `localStorage` pertenece al origen del navegador, y otra URL de Preview puede tener datos distintos.
- [x] Comprueba móvil y escritorio. Publicar no cambia el comportamiento simulado de las escrituras de DummyJSON.

**Revisión del 30/09/2026:** comprobados en navegador el portal con el texto actualizado, el acceso directo y la recarga de `/tareas`, `/quiz`, `/catalogo` y `/crear-producto`, y la carga de 12 productos sin errores de consola durante esa prueba. El resto de pruebas marcadas en este bloque son las declaradas por el alumno; no se han repetido todas en esta revisión.

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
- [x] Localiza el despliegue **Preview** de `develop` en Vercel. Abre su URL y verifica el cambio y la recarga de `/catalogo`.
- [x] Abre la URL de **Production** y confirma que todavía muestra el texto anterior. Comprueba las etiquetas de entorno y los commits, no solo el aspecto de las URLs.
- [x] Abre una pull request **develop → main** y revisa los cambios que vas a integrar. Para esta primera entrega, el tutor acepta las descripciones existentes y no exige acceso compartido a Preview.
- [x] Revisa la propuesta con el tutor y haz merge cuando esté lista. Conserva `develop`.
- [x] Comprueba el nuevo despliegue de `main`: debe ser Production y mostrar el cambio en la URL de producción.
- **A cargo del tutor:** revisar la sincronización final de `main` hacia `develop`. En la revisión, `develop` estaba cuatro commits por detrás; no se marca aquí como realizada.

**Cierre del bloque (30/09/2026):** Preview de `4866234` y Production de `1f53ba6` figuran como correctas en GitHub. El cambio visible ya aparece en producción. La sincronización restante la revisa el tutor por separado.

**Si falla:** un build correcto no sustituye probar la pantalla. Corrige desde `develop`, vuelve a comprobar la Preview y actualiza la pull request antes de integrarla. Si el problema se detecta en producción, avisa al tutor y prepara la corrección con el mismo recorrido.

## 7. Registra la entrega y explica lo aprendido

- [x] Completa el bloque 12 de [APRENDIZAJE](../devquest/APRENDIZAJE.md) con tus palabras.
- [x] Añade a la guía del proyecto la URL de producción y el flujo `develop → Preview → pull request → main → Production`.
- [x] Completa este registro con datos reales; no marques el reto terminado solo porque Vercel muestre un despliegue exitoso.

### Registro de cierre · 30/09/2026

| Evidencia | Resultado |
| --- | --- |
| URL de producción | [DevQuest publicado](https://practicasnadunet.vercel.app), accesible y con el texto actualizado del portal. |
| Preview | [Preview de `4866234`](https://practicas-2-qd66sqo6a-jose15-3b83.vercel.app): despliegue `success` registrado en GitHub. Pide autenticación; no se exige acceso del tutor para este cierre. |
| PR de José | [#3](https://github.com/josepracticas123/Practicas-2/pull/3), [#4](https://github.com/josepracticas123/Practicas-2/pull/4), [#5](https://github.com/josepracticas123/Practicas-2/pull/5) y [#6](https://github.com/josepracticas123/Practicas-2/pull/6), integradas de `develop` a `main`. La #4 incluye el cambio visible. |
| Commits revisados | `develop`: `4866234`; `main`: `1f53ba6`. Production correcta registrada para este último. Son referencias de esta revisión, no valores que deban permanecer fijos. |
| Node | Versión local registrada por el alumno: `v24.21.0`. Versión de Vercel no registrada; no bloquea el cierre. |
| Rutas | Acceso directo y recarga comprobados en navegador para `/tareas`, `/quiz`, `/catalogo` y `/crear-producto`. |
| Antes y después del merge | El historial distingue Preview del cambio y Production tras integrarlo; el portal publicado muestra el nuevo texto. |
| Validación | Lint y build correctos en `develop`; portal y carga de catálogo comprobados en producción sin errores de consola durante la prueba. Las demás pruebas del checklist constan como declaradas por el alumno. |
| Sincronización de ramas | El tutor revisará la integración pendiente de `main` en `develop`; seguimiento separado del reto cerrado. |

**Criterio de cierre:** el tutor da por logrado el objetivo de esta primera práctica de despliegue y ramas. No quedan correcciones exigidas al alumno en este reto.

**Demostración al tutor:** enseña la rama actual, la Preview, la pull request y la versión de producción. Explica qué desencadenó cada despliegue y por qué recargar una ruta interna funciona.

[Volver a la guía](../README.md) · [Reto 11](11-crear-editar-eliminar-api.md)
