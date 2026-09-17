# 05 · Tus tareas sobreviven a una recarga

**Estado: cerrado técnicamente en la revisión del 17/09/2026 sobre `3736740`. Pendiente explicación en directo con el tutor.**

Los retos 01–04 están cerrados técnicamente, incluido el desbordamiento con textos largos. La persistencia está implementada y las comprobaciones realizadas pasan. Los pasos siguientes quedan como referencia; no necesitas rehacerlos.

**Tu misión:** conservar las tareas al recargar o volver a abrir la aplicación en el mismo navegador.

**Practicarás:** `localStorage`, JSON, inicialización de estado y `useEffect`. Mantendrás los objetos con `id`, `texto` y `completada` que ya utiliza tu app.

## Orden de trabajo

Avanza por bloques y comprueba cada uno antes de continuar:

1. Lectura inicial de una clave ausente o con datos válidos, incluyendo validación y control de errores.
2. Efecto de guardado cuando cambian las tareas.
3. Pruebas de crear, completar, recuperar y eliminar, recargando entre acciones.
4. Pruebas con datos dañados y explicación en el cuaderno.

Conserva la búsqueda, los identificadores y las actualizaciones que ya funcionan. Añade comentarios sobre lo nuevo sin resolver la práctica copiando una aplicación completa.

## Qué guardarás

Guarda únicamente el array completo de tareas bajo una clave propia: `devquest.tareas.v1`. La búsqueda y la sección activa pueden reiniciarse al recargar. Las listas filtradas y los contadores se siguen calculando desde las tareas.

Estos datos quedan en el navegador y el origen de la página. Usa la misma URL y puerto al probar: `localhost` y `127.0.0.1` tienen almacenamientos distintos. No se comparten entre dispositivos y pueden desaparecer si se borran los datos del navegador. No necesitas backend ni sincronización entre pestañas.

## 1. Entiende qué guardas y dónde

Abre las herramientas de desarrollo del navegador y busca **Application/Aplicación → Local Storage** (el nombre puede variar).

`localStorage` guarda texto. `JSON.stringify` convierte el array a texto JSON; `JSON.parse` permite recuperar los datos. Ninguna de esas conversiones sustituye la validación.

Antes de integrarlo, escribe en tu cuaderno qué diferencia hay entre el array en memoria y su representación guardada. No crees identificadores nuevos al recuperar tareas: son las mismas tareas.

## 2. Recupera las tareas al inicializar el estado

Prepara una función de lectura pequeña, fuera del componente, que devuelva el array inicial:

1. Lee tu clave con `localStorage.getItem`.
2. Si no existe, devuelve un array vacío.
3. Si existe, utiliza `JSON.parse` y valida su contenido.
4. Si no puedes leer o los datos son inválidos, devuelve un array vacío para que la app pueda arrancar.

Incluye tanto el acceso al almacenamiento como la conversión dentro de `try/catch`: ambos pueden fallar.

Usa esa función como inicializadora de `useState`: pásala para que React la invoque al inicializar, en lugar de ejecutar la lectura en cada renderizado. La función de lectura no debe escribir ni borrar datos, generar identificadores ni llamar a setters.

Para este ejercicio, valida que:

- El resultado es un array.
- Cada elemento es un objeto no nulo con `id` y `texto` de tipo texto y no vacíos, y `completada` de tipo booleano.
- Los identificadores no se repiten.

Puedes rechazar la lista completa si algún elemento falla. No necesitas recuperar parcialmente archivos dañados. Usa solo tareas de prueba al comprobar este caso: con esta política la lista vacía recuperada podrá reemplazar los datos inválidos cuando se guarde.

**Parada:** con la clave ausente la app sigue arrancando. Si preparas manualmente un array válido en esa clave y recargas, aparecen esas tareas en la sección que corresponde a su estado.

## 3. Guarda los cambios con un efecto

Añade un `useEffect` en el componente que mantiene `tareas`. Su responsabilidad será convertir el array completo a JSON y escribirlo en tu clave cuando cambie `tareas`.

- Declara `tareas` como dependencia del efecto.
- Conserva una sola escritura centralizada; los botones siguen cambiando el estado mediante `setTareas`.
- Incluye la escritura en un `try/catch`. Si falla, conserva las tareas en memoria y registra un mensaje claro en consola. No necesitas añadir todavía un sistema de notificaciones.
- Guarda también el array vacío cuando se elimina la última tarea. Si omites ese caso, al recargar reaparecerían datos antiguos.

Aquí el efecto sincroniza React con el almacenamiento del navegador. La búsqueda local sigue siendo un cálculo durante el renderizado: no la conviertas en otro efecto.

**Importante:** implementa primero la recuperación inicial y después activa el guardado. Si arrancas siempre con `[]`, lees en un efecto y guardas en otro, puedes sobrescribir los datos antes de recuperarlos.

En desarrollo, Strict Mode puede repetir la inicialización y la ejecución inicial del efecto para detectar problemas. Leer debe ser una operación sin escrituras, y guardar el mismo array dos veces debe dejar el mismo resultado. No desactives Strict Mode para ocultarlo.

## 4. Prueba el ciclo completo

Utiliza tareas de prueba y haz estas comprobaciones por separado:

1. Añade dos tareas iguales y otra diferente; recarga y verifica las tres.
2. Completa solo una de las repetidas; recarga y revisa ambas secciones.
3. Recupera esa tarea; recarga y verifica su estado.
4. Elimina una tarea; recarga y confirma que no vuelve.
5. Elimina todas; recarga y comprueba que sigue vacío.
6. Cierra la pestaña y abre la misma URL: los datos válidos guardados deben recuperarse.

En las herramientas del navegador, revisa que los identificadores no cambian entre recargas y que se guarda el array completo, incluso si tienes activa una búsqueda que oculta algunas tareas.

## 5. Prueba datos ausentes o dañados

Con tareas desechables, edita solo `devquest.tareas.v1` en las herramientas del navegador y recarga después de cada prueba:

| Valor guardado | Resultado esperado |
| --- | --- |
| Clave eliminada | Lista vacía, sin romper la app. |
| `[]` | Lista vacía válida. |
| `hola` | JSON inválido: se recupera con lista vacía. |
| `{}` o `null` | JSON válido, formato incorrecto: lista vacía. |
| Un objeto de tarea sin `id`, dentro de un array | Lista rechazada sin romper la app. |
| Dos tareas con el mismo `id` | Lista rechazada sin romper la app. |

Después de cada caso, confirma que puedes añadir una tarea nueva. No utilices `localStorage.clear()`: borraría todas las claves de ese origen, no solo las de este ejercicio.

## 6. Explica lo que has aprendido

Añade comentarios breves sobre la lectura inicial, la dependencia del efecto y el tratamiento de errores. Responde con tus palabras en `APRENDIZAJE.md` cuando implementes el reto:

- ¿Qué diferencia hay entre el estado en memoria y `localStorage`?
  El estado de memoria existe mientras la aplicación see sta ejecutando. si recargamos la pagina se pierde.
  localStorage: permite guardar los datos en el navegador para que permanezcan usando la key y valor del navegador.
- ¿Por qué utilizo JSON y por qué valido el resultado de `JSON.parse`?
  porque localStorage guarda texto, y mis tareas son objetos dentro de un array, usamos JSON.stringfy para conertir estas tareas en texto al guardarlas. Posteriormente usamos JSON.parse para volver a convertir este texto en un array de objetos de nuevo.
  Validamos JSON.parse: ya qu elos datos podrían no existir o no tener el formato esperado y así evitamos que la APP falle.
- ¿Qué podría ocurrir si guardo un array vacío antes de leer los datos anteriores?
  Creo que podría sobreescribir los datos y borrar o eliminar los existentes.
- ¿Por qué guardar sí necesita sincronización y filtrar la búsqueda no?
  Guardar modifica algo externo de React, qu ees localStorage, de ahi el sincronizarlo cuando cambia el estado. Filtrar solo calcula que tareas queremos mostrar usando los datos qu eya tenemos
- ¿Qué debe pasar cuando elimino la última tarea?
  Pues debe eliminarse la tarea, y eliminarse tambien del localStorage y debe de guardar el estado de nuevo.
- ¿Qué ocurre si el navegador no permite guardar?
  Pues guardaria la APP los datos pero al recargar no podríamos cargar las tareas guardadas, ya que no se habrian cargado a localStorage, de ahi el controlar el error para evitar que esto falle

## Comprueba tu entrega

La revisión de `3736740` confirma el ciclo de recarga y reapertura en navegador, además de pruebas aisladas de validación y errores de lectura/escritura con almacenamiento simulado. `npm run lint` y `npm run build` pasan. Los checks técnicos no sustituyen la explicación personal al tutor.

- [x] Revisión técnica de los retos anteriores realizada el 17/09/2026 sobre `96de975`.
- [x] El desbordamiento del 04 está corregido y verificado en la revisión técnica.
- [ ] He explicado al tutor la corrección y las decisiones del reto 05. **Pendiente de confirmación del tutor.**
- [x] Se guarda el array completo en `devquest.tareas.v1`, con sus identificadores originales.
- [x] Crear, completar, recuperar y eliminar persisten después de recargar.
- [x] Dos tareas iguales siguen siendo independientes tras recuperarlas.
- [x] Eliminar la última tarea deja la lista vacía también después de recargar.
- [x] Cerrar y abrir la misma URL recupera los datos guardados.
- [x] La búsqueda no hace que se guarde solo el subconjunto visible.
- [x] Una clave ausente, JSON inválido o una estructura incorrecta no rompen la aplicación.
- [x] Se rechazan identificadores duplicados y campos de tipo incorrecto.
- [x] Lectura y escritura manejan errores; si guardar falla, la app sigue funcionando en memoria.
- [x] La lectura inicial no escribe datos y el efecto depende de `tareas`.
- [x] No se modifica ninguna otra clave de almacenamiento.
- [x] Los comentarios y el cuaderno explican las decisiones con tus palabras.
- [x] `npm run lint` y `npm run build` pasan desde `devquest/`.

## Cómo se mantiene actualizado el almacenamiento

La implementación actual cumple el reto: cada acción crea un nuevo estado `tareas` y el efecto con `[tareas]` guarda el array completo, incluido `[]`. Buscar o navegar no cambia ese array, por lo que no necesita provocar otro guardado. Al abrir la app, la función inicializadora recupera los datos antes del primer guardado.

No necesitas intervalos, guardar desde cada botón ni un evento de cierre de página. Tampoco necesitas sincronización entre pestañas para este reto: si modificas los datos desde otra pestaña o desde las herramientas del navegador, esta instancia no los incorpora automáticamente; los vuelve a leer al recargar. Si guardar falla, la app continúa en memoria y registra el error, tal como pide el enunciado.

### Pendiente · Explicación al tutor

El código está cerrado técnicamente. Estos puntos quedan pendientes hasta que los expliques con tus palabras al tutor:

- [ ] Explicar por qué pasas `leerTareasGuardadas` sin ejecutarla a `useState` y cómo evita leer en cada renderizado.
- [ ] Explicar cómo utilizas `Set` para detectar identificadores repetidos y qué ocurre si los datos no son válidos.
- [ ] Explicar por qué el efecto depende de `[tareas]`, cuándo vuelve a guardar y por qué buscar no necesita otro efecto. Incluye qué ocurre al eliminar la última tarea.

No necesitas añadir funcionalidades para completar esta explicación. Si al prepararla detectas un comentario poco claro, mejóralo para explicar la decisión; no hace falta comentar cada línea. El tutor confirmará estos checks después de la conversación.

## Documentación oficial

- [Inicializador de useState · React](https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state).
- [useEffect · React](https://react.dev/reference/react/useEffect).
- [localStorage · MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
- [JSON.parse · MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse).
- [JSON.stringify · MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

**Demostración al tutor:** crea, completa, recupera y elimina recargando entre acciones. Enseña la clave guardada y explica cómo evitas sobrescribirla antes de leerla.

[Volver a la guía](../README.md) · [Reto 06](06-portal-y-rutas.md)
