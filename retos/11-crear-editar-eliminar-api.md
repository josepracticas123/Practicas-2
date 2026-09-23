# 11 · Crea, edita y elimina mediante peticiones

**Estado:** por empezar. **Antes:** termina el 10. Haz un bloque cada vez: POST, después GET + PUT y finalmente DELETE.

**Tu misión:** añadir operaciones de escritura al catálogo, practicando formularios, método HTTP, cabeceras, cuerpo JSON y actualización de la interfaz después de una respuesta correcta.

## 1. Entiende la simulación

DummyJSON simula las escrituras: responde, pero no conserva esos cambios. Consulta los apartados de creación, actualización y eliminación en [su documentación](https://dummyjson.com/docs/products).

| Acción | Método y ruta, sobre `https://dummyjson.com` |
| --- | --- |
| Crear | `POST /products/add` |
| Leer uno | `GET /products/{id}` |
| Editar uno existente | `PUT /products/{id}` |
| Eliminar uno existente | `DELETE /products/{id}` |

- [ ] Muestra en el catálogo una nota breve: «Modo de práctica: los cambios no se guardan en el servidor».
- [ ] Para POST, muestra solo la última alta recibida en un panel separado «Última creación simulada». No la añadas al listado del servidor.
- [ ] Para PUT y DELETE, usa exclusivamente IDs de productos obtenidos mediante GET. No utilices el ID de un alta simulada: no crea un recurso que puedas consultar o editar después.
- [ ] Mantén los datos de práctica en memoria. No añadas `localStorage`, backend propio ni una biblioteca de peticiones.

Esta separación evita mezclar resultados del servidor con altas que no existen allí ni depender de que varias altas simuladas devuelvan IDs distintos.

## 2. Crea un producto con POST

- [ ] Prepara un formulario controlado con título, descripción y precio; utiliza etiquetas visibles.
- [ ] Rechaza título o descripción vacíos después de `trim()`.
- [ ] Comprueba que el precio no esté vacío y, tras convertirlo a número, sea finito y mayor que cero. No confíes solo en `type="number"`.
- [ ] Al enviar, prepara únicamente los campos necesarios: `title`, `description` y `price`.
- [ ] Configura `method: "POST"`, cabecera `Content-Type: application/json` y cuerpo con `JSON.stringify`.
- [ ] Revisa `response.ok`, lee la respuesta y muestra el producto e ID recibidos en el panel de última creación.
- [ ] Muestra «Creando…» durante la petición. Limpia el formulario solo después de un éxito.
- [ ] Si falla, muestra un mensaje comprensible, conserva los campos y permite volver a enviar.

**Parada:** en Network ves POST, el JSON enviado y la respuesta. El producto creado no tiene botones de editar o eliminar.

## 3. Lee un producto y edítalo con PUT

- [ ] Añade «Editar» a las tarjetas de productos recibidos del servidor; pasa un callback a la tarjeta.
- [ ] Al pulsarlo, haz un GET del producto por ID. Muestra carga o error antes de abrir el formulario con los datos recibidos.
- [ ] Guarda por separado el borrador del formulario. Escribir no debe modificar directamente el objeto de la tarjeta.
- [ ] Edita los mismos tres campos del bloque anterior, con las mismas validaciones.
- [ ] «Cancelar» descarta el borrador sin enviar PUT.
- [ ] «Guardar» envía PUT al ID seleccionado, con cabecera y cuerpo JSON.
- [ ] Tras el éxito, actualiza únicamente la tarjeta correspondiente usando el producto devuelto y un array nuevo. No hagas un GET automático inmediatamente después: recuperaría la versión original del servidor.
- [ ] Si falla, conserva la tarjeta anterior y el borrador; no muestres un éxito ni cierres el formulario.

**Matiz de HTTP:** este ejercicio usa el PUT que documenta DummyJSON y su comportamiento simulado. No deduzcas que todas las APIs aceptan campos parciales con PUT; el contrato de cada API importa.

## 4. Elimina con DELETE

- [ ] Añade «Eliminar» a las tarjetas del servidor, identificando siempre el producto por su ID.
- [ ] Muestra una confirmación sencilla con el título: «Eliminar» y «Cancelar». Puedes usar un bloque inline; no necesitas construir un modal.
- [ ] Cancelar no hace ninguna petición.
- [ ] Confirmar envía DELETE al ID elegido, sin cuerpo JSON innecesario.
- [ ] Comprueba el estado HTTP y la respuesta de esta API, que incluye `id` e `isDeleted`.
- [ ] Retira la tarjeta con `filter` solo después de una respuesta correcta. Si falla, mantenla visible y permite reintentar.

## 5. Mantén coherente la pantalla

- [ ] Guarda el estado de la operación de escritura separado del estado de consulta del 10; utiliza nombres claros como «guardando» o «eliminando».
- [ ] Mientras haya una petición en curso, bloquea las acciones incompatibles: consultar, editar otro producto, enviar dos veces o eliminar a la vez. Comprueba el bloqueo también en los manejadores.
- [ ] Al completar o fallar, vuelve a permitir las acciones. Los errores no deben dejar botones bloqueados indefinidamente.
- [ ] Muestra los mensajes junto al formulario o producto al que pertenecen.
- [ ] Después de una edición o eliminación local, distingue «Tarjetas visibles» del «Total del servidor en la última consulta». No cambies el total del servidor fingiendo que persistió una escritura.
- [ ] Una nueva consulta sustituye el listado por el resultado real del servidor y descarta los cambios simulados sobre esas tarjetas. Cierra cualquier editor o confirmación anterior.
- [ ] El panel de última creación sigue siendo independiente de las consultas; una nueva creación lo sustituye y recargar la página lo limpia.
- [ ] Si editas un título bajo un filtro, conserva la tarjeta hasta la próxima consulta. No implementes un filtro local para fingir cómo respondería el servidor a ese cambio.

## 6. Comprueba tu entrega

- [ ] POST válido muestra los datos recibidos; campos vacíos o precio inválido no envían peticiones.
- [ ] Un segundo POST sustituye el panel anterior sin duplicar tarjetas ni claves.
- [ ] Editar realiza GET del ID correcto; cancelar no envía PUT.
- [ ] PUT cambia solo el producto seleccionado después del éxito.
- [ ] Cancelar la eliminación no envía DELETE; confirmarla elimina solo la tarjeta elegida después del éxito.
- [ ] Pruebo un fallo de red en cada escritura: no hay éxito falso, no pierdo el formulario y no desaparece la tarjeta.
- [ ] Pruebo temporalmente un ID inexistente para GET, PUT y DELETE y verifico un error comprensible. Restauro el código de prueba.
- [ ] Tras editar o eliminar, vuelvo a consultar: reaparece el dato original y sé explicar por qué. No es un fallo de mi estado.
- [ ] Reviso en Network método, URL, cuerpo, estado HTTP y respuesta de cada operación.
- [ ] La interfaz funciona con teclado y a 375 px y 1280 px; Tareas y Quiz siguen funcionando.
- [ ] Lint y build pasan y he respondido las preguntas del bloque 11 del cuaderno.

**Registro:** anota una prueba correcta y una fallida por método, y lo observado al volver a consultar.

_Pendiente de completar._

**Demostración al tutor:** crea un producto simulado; edita y elimina productos existentes; consulta de nuevo. Explica qué cambió en React y qué ocurrió realmente en el servidor.

Referencias: [Productos · DummyJSON](https://dummyjson.com/docs/products), [Uso de Fetch · MDN](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch).

[Volver a la guía](../README.md) · [Reto 10](10-busqueda-y-filtros-api.md)
