# 11 · Crea, edita y elimina mediante peticiones

**Estado:** operaciones principales implementadas; pendiente de cierre tras la revisión del 29/09/2026 (`fce6a5d`). Empieza por el checklist siguiente.

**Tu misión:** añadir operaciones de escritura al catálogo, practicando formularios, método HTTP, cabeceras, cuerpo JSON y actualización de la interfaz después de una respuesta correcta.

## Checklist de cierre · empieza aquí

Ya funcionan los recorridos principales de creación, edición y eliminación. En la revisión se comprobaron GET + PUT, cancelar/confirmar DELETE y recuperar los datos originales al consultar de nuevo. Lint y build pasan en la versión revisada. Conserva ese trabajo y resuelve estos bloques en orden; marca cada casilla después de comprobarla.

### A. Impide que dos operaciones se interfieran

Archivos: `CatalogoPages.jsx`, `ProductoCard.jsx`, `ListaProductos.jsx` y `EditarProductosForm.jsx`.

- [x] Localiza qué representa `estadoEdicion` en la página y qué representa `estadoGuardado`. Revisa la guarda de `editarProducto(id)`: durante PUT debe comprobar el estado que realmente indica que se está guardando.
- [x] Mientras se guarda, bloquea editar otro producto, eliminar, consultar y enviar otra vez. Aplica el bloqueo tanto a los controles como a sus manejadores; pasa las props necesarias hasta las tarjetas.
- [x] Deshabilita «Cancelar» durante PUT y protege también `cancelarEdicion`. Antes de enviar, cancelar debe seguir descartando el borrador sin hacer ninguna petición.
- [x] Comprueba que, después de un éxito o un error, se puede continuar: guardar otra vez, cancelar el borrador o realizar una nueva consulta.
- [x] **Prueba con conexión lenta:** guarda el producto A e intenta editar B o cancelar mientras espera. No debe iniciarse otro GET ni cerrarse el editor. Tras terminar, abre B y comprueba que una respuesta anterior no modifica ni cierra su formulario.

### B. Haz coherente la cancelación de DELETE

Archivos: `EliminarProducto.jsx` y `CatalogoPages.jsx`.

- [x] Antes de confirmar, «Cancelar» y Escape cierran la confirmación sin enviar DELETE.
- [x] Durante DELETE, bloquea también Escape y protege `cancelarEliminacion`; ahora el botón está bloqueado, pero el teclado permite cerrar la confirmación.
- [x] **Prueba con conexión lenta:** confirma, pulsa Escape y comprueba que la confirmación permanece hasta que termina la petición. Si falla, conserva la tarjeta y permite reintentar o cancelar.

Cerrar un formulario o un modal no cancela una petición enviada. Para este cierre basta con impedir esas cancelaciones mientras se espera; no necesitas añadir un sistema de cancelación de peticiones.

### C. Resuelve la ruta de edición incompleta

Archivos: `App.jsx` y `EditarProductoPage.jsx`.

- [x] Mantén un único recorrido funcional. Como ya editas dentro del catálogo, puedes retirar la ruta `/editar-producto`, su import y la página que quede sin uso. Si decides conservarla, necesita recibir un producto y todos sus callbacks antes de permitir guardar.
- [x] **Prueba:** entra directamente en `/editar-producto`. Debe mostrar una pantalla coherente (por ejemplo, la página no encontrada si retiraste la ruta), nunca un formulario vacío que falla al enviar. Editar desde una tarjeta debe seguir funcionando.

### D. Recupera los mensajes pendientes del 09 y del 10

Archivos: `CatalogoPages.jsx` y `CatalogoForm.jsx`.

- [x] Conserva y muestra el valor de `mensajeErrorCategorias`: actualmente se guarda el error, pero se descarta su lectura. Colócalo junto al selector y permite repetir «Cargar categorías».
- [x] Muestra «Cargando productos…» mientras `estadoPeticion` sea `"cargando"`; desaparece al terminar, tanto en éxito como en error.
- [x] **Prueba:** sin conexión, carga categorías y comprueba el mensaje. Recupera la conexión y repite. Después consulta productos con conexión lenta y comprueba el mensaje de carga y el bloqueo de controles. Restaura la conexión normal al acabar.

### E. Deja los documentos de acuerdo con lo que has comprobado

- [x] En el bloque 09 de [APRENDIZAJE](../devquest/APRENDIZAJE.md), corrige la frase sobre el segundo `await`: `respuesta.json()` lee el cuerpo JSON y lo interpreta como datos JavaScript. Añade un ejemplo de tu respuesta de productos.
- [x] Completa las respuestas que faltan en los bloques 10 y 11 del cuaderno con ejemplos de tu código. Puedes aprovechar tus explicaciones del reto 10 sin escribir otro resumen nuevo.
- [x] Actualiza los estados y pendientes de los resúmenes y guías: distingue implementación, pruebas realizadas y conversación con el tutor. No marques una prueba o conversación solo porque el código ya existe.
- [x] Añade un comentario breve con tus palabras donde introduzcas una comprobación nueva: explica qué problema evita. No hace falta comentar cada línea.


### F. Comprueba el cierre

- [x] Repite crear, editar, cancelar, eliminar y consultar de nuevo. Comprueba que las tarjetas solo cambian tras una respuesta correcta.
- [x] Prueba errores de red en POST, PUT y DELETE: conserva los campos o la tarjeta, muestra un mensaje comprensible y permite recuperarte.
- [x] Comprueba los controles con teclado y a 375 px y 1280 px. Revisa también que Tareas y Quiz siguen funcionando.
- [x] Ejecuta `npm run lint` y `npm run build` desde `devquest/` después de los cambios.
- [x] Registra debajo los resultados y revisa las casillas reabiertas de las secciones 5 y 6. Si algo falla, déjalo pendiente con una frase que explique cómo reproducirlo.

| Prueba de cierre | Resultado observado |
| --- | --- |
| PUT lento: editar otro producto y cancelar | Pendiente |
| DELETE lento: Escape; error y reintento | Pendiente |
| Acceso directo a la ruta de edición | Pendiente |
| Error de categorías y carga de productos | Pendiente |
| Operaciones, teclado, tamaños, Tareas y Quiz | Pendiente |
| Lint y build tras las correcciones | Pendiente |

Los checks del enunciado que sigue conservan tu progreso. Los puntos reabiertos necesitan una nueva comprobación; el reto se cierra cuando este checklist está resuelto.

## 1. Entiende la simulación

DummyJSON simula las escrituras: responde, pero no conserva esos cambios. Consulta los apartados de creación, actualización y eliminación en [su documentación](https://dummyjson.com/docs/products).

| Acción | Método y ruta, sobre `https://dummyjson.com` |
| --- | --- |
| Crear | `POST /products/add` |
| Leer uno | `GET /products/{id}` |
| Editar uno existente | `PUT /products/{id}` |
| Eliminar uno existente | `DELETE /products/{id}` |

- [x] Muestra en el catálogo una nota breve: «Modo de práctica: los cambios no se guardan en el servidor».
- [x] Para POST, muestra solo la última alta recibida en un panel separado «Última creación simulada». No la añadas al listado del servidor.
- [x] Para PUT y DELETE, usa exclusivamente IDs de productos obtenidos mediante GET. No utilices el ID de un alta simulada: no crea un recurso que puedas consultar o editar después.
- [x] Mantén los datos de práctica en memoria. No añadas `localStorage`, backend propio ni una biblioteca de peticiones.

Esta separación evita mezclar resultados del servidor con altas que no existen allí ni depender de que varias altas simuladas devuelvan IDs distintos.

## 2. Crea un producto con POST

- [x] Prepara un formulario controlado con título, descripción y precio; utiliza etiquetas visibles.
- [x] Rechaza título o descripción vacíos después de `trim()`.
- [x] Comprueba que el precio no esté vacío y, tras convertirlo a número, sea finito y mayor que cero. No confíes solo en `type="number"`.
- [x] Al enviar, prepara únicamente los campos necesarios: `title`, `description` y `price`.
- [x] Configura `method: "POST"`, cabecera `Content-Type: application/json` y cuerpo con `JSON.stringify`.
- [x] Revisa `response.ok`, lee la respuesta y muestra el producto e ID recibidos en el panel de última creación.
- [x] Muestra «Creando…» durante la petición. Limpia el formulario solo después de un éxito.
- [x] Si falla, muestra un mensaje comprensible, conserva los campos y permite volver a enviar.

**Parada:** en Network ves POST, el JSON enviado y la respuesta. El producto creado no tiene botones de editar o eliminar.

## 3. Lee un producto y edítalo con PUT

- [x] Añade «Editar» a las tarjetas de productos recibidos del servidor; pasa un callback a la tarjeta.
- [x] Al pulsarlo, haz un GET del producto por ID. Muestra carga o error antes de abrir el formulario con los datos recibidos.
- [x] Guarda por separado el borrador del formulario. Escribir no debe modificar directamente el objeto de la tarjeta.
- [x] Edita los mismos tres campos del bloque anterior, con las mismas validaciones.
- [x] «Cancelar» descarta el borrador sin enviar PUT.
- [x] «Guardar» envía PUT al ID seleccionado, con cabecera y cuerpo JSON.
- [x] Tras el éxito, actualiza únicamente la tarjeta correspondiente usando el producto devuelto y un array nuevo. No hagas un GET automático inmediatamente después: recuperaría la versión original del servidor.
- [x] Si falla, conserva la tarjeta anterior y el borrador; no muestres un éxito ni cierres el formulario.

**Matiz de HTTP:** este ejercicio usa el PUT que documenta DummyJSON y su comportamiento simulado. No deduzcas que todas las APIs aceptan campos parciales con PUT; el contrato de cada API importa.

## 4. Elimina con DELETE

- [x] Añade «Eliminar» a las tarjetas del servidor, identificando siempre el producto por su ID.
- [x] Muestra una confirmación sencilla con el título: «Eliminar» y «Cancelar». Puedes usar un bloque inline; no necesitas construir un modal.
- [x] Cancelar no hace ninguna petición.
- [x] Confirmar envía DELETE al ID elegido, sin cuerpo JSON innecesario.
- [x] Comprueba el estado HTTP y la respuesta de esta API, que incluye `id` e `isDeleted`.
- [x] Retira la tarjeta con `filter` solo después de una respuesta correcta. Si falla, mantenla visible y permite reintentar.

## 5. Mantén coherente la pantalla

- [x] Guarda el estado de la operación de escritura separado del estado de consulta del 10; utiliza nombres claros como «guardando» o «eliminando».
- [X] Mientras haya una petición en curso, bloquea las acciones incompatibles: consultar, editar otro producto, enviar dos veces o eliminar a la vez. Comprueba el bloqueo también en los manejadores.
- [X] Al completar o fallar, vuelve a permitir las acciones. Los errores no deben dejar botones bloqueados indefinidamente.
- [x] Muestra los mensajes junto al formulario o producto al que pertenecen.
- [x] Después de una edición o eliminación local, distingue «Tarjetas visibles» del «Total del servidor en la última consulta». No cambies el total del servidor fingiendo que persistió una escritura.
- [x] Una nueva consulta sustituye el listado por el resultado real del servidor y descarta los cambios simulados sobre esas tarjetas. Cierra cualquier editor o confirmación anterior.
- [x] El panel de última creación sigue siendo independiente de las consultas; una nueva creación lo sustituye y recargar la página lo limpia.
- [x] Si editas un título bajo un filtro, conserva la tarjeta hasta la próxima consulta. No implementes un filtro local para fingir cómo respondería el servidor a ese cambio.

## 6. Comprueba tu entrega

- [x] POST válido muestra los datos recibidos; campos vacíos o precio inválido no envían peticiones.
- [x] Un segundo POST sustituye el panel anterior sin duplicar tarjetas ni claves.
- [x] Editar realiza GET del ID correcto; cancelar no envía PUT.
- [x] PUT cambia solo el producto seleccionado después del éxito.
- [x] Cancelar la eliminación no envía DELETE; confirmarla elimina solo la tarjeta elegida después del éxito.
- [x] Pruebo un fallo de red en cada escritura: no hay éxito falso, no pierdo el formulario y no desaparece la tarjeta.
- [x] Pruebo temporalmente un ID inexistente para GET, PUT y DELETE y verifico un error comprensible. Restauro el código de prueba.
- [x] Tras editar o eliminar, vuelvo a consultar: reaparece el dato original y sé explicar por qué. No es un fallo de mi estado.
- [x] Reviso en Network método, URL, cuerpo, estado HTTP y respuesta de cada operación.
- [x] La interfaz funciona con teclado y a 375 px y 1280 px; Tareas y Quiz siguen funcionando.
- [X] Lint y build pasan y he respondido las preguntas del bloque 11 del cuaderno.

**Registro:** anota una prueba correcta y una fallida por método, y lo observado al volver a consultar.

Registro de pruebas
Método	Prueba correcta	Prueba fallida / comportamiento observado
POST	Se envían title, description y price; la API responde correctamente y se muestra la última creación simulada.	
Datos inválidos o fallo de petición: se muestra error y se conservan los campos.
GET /products/{id} devuelve el producto solicitado con 200 OK.	
ID inexistente: se comprueba y muestra el error correspondiente.
PUT /products/1 → 200 OK; la respuesta devuelve el producto actualizado.	
Sin ID correcto en la URL se obtuvo 404; se corrigió usando products/${producto.id}.
DELETE /products/1 → 200 OK.	Tras eliminar, una consulta posterior vuelve a devolver el producto porque DummyJSON simula la escritura y no la persiste.

Comprobación final de persistencia

Se verificó mediante Network:

PUT /products/1
→ 200 OK

GET /products/1
→ 200 OK
→ producto disponible

DELETE /products/1
→ 200 OK

GET /products/1
→ 200 OK
→ el producto vuelve a aparecer

Conclusión: las peticiones se realizan correctamente. El hecho de que los datos originales reaparezcan después de una nueva consulta se debe al comportamiento simulado de DummyJSON, no a un problema del estado de React.

**Demostración al tutor:** crea un producto simulado; edita y elimina productos existentes; consulta de nuevo. Explica qué cambió en React y qué ocurrió realmente en el servidor.

Referencias: [Productos · DummyJSON](https://dummyjson.com/docs/products), [Uso de Fetch · MDN](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch).

[Volver a la guía](../README.md) · [Reto 10](10-busqueda-y-filtros-api.md)

**Después del cierre:** [12 · Deploy en Vercel y trabajo en develop](12-deploy-vercel-y-ramas.md).
