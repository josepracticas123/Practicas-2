# 10 · Busca productos en el servidor

**Estado:** por empezar. **Antes:** completa las mejoras del 09.

**Tu misión:** ampliar `/catalogo` para consultar todos los productos, buscar por texto o filtrar por categoría. Las consultas deben llegar a la API, no limitarse a filtrar los 12 productos que ya tienes en memoria.

Trabaja por bloques y marca cada casilla después de comprobarla. Conserva la carga manual: enviar el formulario inicia la consulta. No hace falta `useEffect`, búsqueda automática ni paginación en este reto.

## 1. Entiende qué consulta vas a enviar

Base: `https://dummyjson.com`. Consulta [Productos · DummyJSON](https://dummyjson.com/docs/products).

| Modo | Método y ruta | Datos para mostrar |
| --- | --- | --- |
| Todos | `GET /products?limit=12` | `products` y `total` |
| Buscar | `GET /products/search?q=phone&limit=12` | `products` y `total` |
| Categorías disponibles | `GET /products/category-list` | Array de textos |
| Una categoría | `GET /products/category/smartphones?limit=12` | `products` y `total` |

- [x] Inspecciona una respuesta de cada tipo y localiza dónde está el array.
- [ ] Explica por qué `total` puede ser mayor que `products.length`.
- [ ] Localiza en Network/Red la URL, el método y el estado HTTP.

**Regla de alcance:** los modos «Todos», «Texto» y «Categoría» son excluyentes. No combines texto y categoría en una misma petición ni inventes parámetros que la API no documenta.

## 2. Prepara un formulario de consulta

- [ ] Añade un selector de modo y un botón «Consultar» dentro de un formulario con `onSubmit`.
- [ ] En «Texto», muestra un input con etiqueta. Aplica `trim()` y rechaza una búsqueda vacía con un mensaje.
- [ ] En «Categoría», muestra un selector y un botón «Cargar categorías». Ese botón hace su propio GET y tiene `type="button"`.
- [ ] Distingue carga, error y reintento de categorías de la consulta de productos. No pongas las categorías en `productos`.
- [ ] Impide consultar una categoría hasta tener una selección válida.
- [ ] Cambiar el modo o escribir modifica solo el formulario; no hace peticiones todavía.

**Parada:** el formulario permite preparar una consulta sin confundir sus campos con la lista que ya se está mostrando.

## 3. Consulta según el modo elegido

- [ ] Al enviar, construye la URL correspondiente al modo y a los valores del formulario.
- [ ] Utiliza `URLSearchParams` para parámetros como `q` y `limit`; para el segmento de categoría utiliza `encodeURIComponent`.
- [ ] Conserva `response.ok`, la lectura JSON, validación del array y los estados de carga/error del 09.
- [ ] Sustituye los productos al recibir la respuesta; no los acumules.
- [ ] Guarda el `total` recibido y muestra «Recibidos X de Y resultados del servidor». Explica que esta versión muestra como máximo 12.
- [ ] Si no hay coincidencias, muestra un mensaje de búsqueda vacía, no un error de conexión.
- [ ] Mientras se consulta, bloquea el formulario y las acciones que iniciarían otra consulta. Conserva también la comprobación al inicio del manejador.

**Pista:** cambiar un estado y leerlo inmediatamente dentro del mismo evento no garantiza obtener el valor nuevo. Construye la consulta con los valores del formulario disponibles en ese evento.

## 4. Distingue lo escrito de lo aplicado

- [ ] Conserva la última consulta enviada, por ejemplo su URL y una descripción. Utilízala para identificar los resultados visibles.
- [ ] Si escribes otro texto sin enviar, los resultados siguen identificados con la consulta anterior.
- [ ] «Reintentar» repite la consulta que falló, aunque hayas cambiado el formulario después.
- [ ] «Mostrar todos» limpia los campos y realiza la consulta general. No uses accidentalmente el valor anterior del estado recién actualizado.
- [ ] Conserva la selección y el texto cuando falle una petición, para que el usuario pueda corregir o repetir.

## 5. Comprueba tu entrega

- [ ] Buscar `phone` genera una petición con `q=phone`, visible en Network.
- [ ] Un texto sin coincidencias muestra cero resultados sin tratarlo como fallo.
- [ ] Una búsqueda con espacios o `&` llega codificada como un único valor de `q`.
- [ ] El filtro por categoría envía su GET y muestra productos de esa categoría.
- [ ] Una segunda consulta sustituye la lista y actualiza su descripción y total.
- [ ] Editar el formulario sin enviar no cambia la descripción de los resultados anteriores.
- [ ] Sin conexión aparece un error; al recuperar la conexión, reintentar repite la consulta fallida.
- [ ] «Mostrar todos» recupera el listado general sin conservar un filtro anterior.
- [ ] Los controles funcionan con teclado y se ajustan a 375 px y 1280 px.
- [ ] Tareas y Quiz siguen funcionando; lint y build pasan.
- [ ] He respondido el bloque 10 del cuaderno con ejemplos de mi código.

**Registro de pruebas:** anota consulta, resultado esperado y observado. No basta con «todo funciona».

_Pendiente de completar._

## Para explicar al tutor

- ¿Por qué filtrar el array recibido no equivale a buscar en el servidor?
- ¿Qué diferencia hay entre los campos del formulario y la consulta aplicada?
- ¿Qué repites al reintentar y qué significa el total que devuelve la API?

Referencias: [Productos · DummyJSON](https://dummyjson.com/docs/products), [URLSearchParams · MDN](https://developer.mozilla.org/es/docs/Web/API/URLSearchParams).

[Volver a la guía](../README.md) · [Reto 09](09-primeras-llamadas-api.md) · [Reto 11](11-crear-editar-eliminar-api.md)
