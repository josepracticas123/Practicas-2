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
- [x] Explica por qué `total` puede ser mayor que `products.length`.
- [x] Localiza en Network/Red la URL, el método y el estado HTTP.

**Regla de alcance:** los modos «Todos», «Texto» y «Categoría» son excluyentes. No combines texto y categoría en una misma petición ni inventes parámetros que la API no documenta.

## 2. Prepara un formulario de consulta

- [x] Añade un selector de modo y un botón «Consultar» dentro de un formulario con `onSubmit`.
- [x] En «Texto», muestra un input con etiqueta. Aplica `trim()` y rechaza una búsqueda vacía con un mensaje.
- [x] En «Categoría», muestra un selector y un botón «Cargar categorías». Ese botón hace su propio GET y tiene `type="button"`.
- [x] Distingue carga, error y reintento de categorías de la consulta de productos. No pongas las categorías en `productos`.
- [x] Impide consultar una categoría hasta tener una selección válida.
- [x] Cambiar el modo o escribir modifica solo el formulario; no hace peticiones todavía.

**Parada:** el formulario permite preparar una consulta sin confundir sus campos con la lista que ya se está mostrando.

## 3. Consulta según el modo elegido

- [x] Al enviar, construye la URL correspondiente al modo y a los valores del formulario.
- [x] Utiliza `URLSearchParams` para parámetros como `q` y `limit`; para el segmento de categoría utiliza `encodeURIComponent`.
- [x] Conserva `response.ok`, la lectura JSON, validación del array y los estados de carga/error del 09.
- [x] Sustituye los productos al recibir la respuesta; no los acumules.
- [x] Guarda el `total` recibido y muestra «Recibidos X de Y resultados del servidor». Explica que esta versión muestra como máximo 12.
- [x] Si no hay coincidencias, muestra un mensaje de búsqueda vacía, no un error de conexión.
- [x] Mientras se consulta, bloquea el formulario y las acciones que iniciarían otra consulta. Conserva también la comprobación al inicio del manejador.

**Pista:** cambiar un estado y leerlo inmediatamente dentro del mismo evento no garantiza obtener el valor nuevo. Construye la consulta con los valores del formulario disponibles en ese evento.

## 4. Distingue lo escrito de lo aplicado

- [x] Conserva la última consulta enviada, por ejemplo su URL y una descripción. Utilízala para identificar los resultados visibles.
- [x] Si escribes otro texto sin enviar, los resultados siguen identificados con la consulta anterior.
- [x] «Reintentar» repite la consulta que falló, aunque hayas cambiado el formulario después.
- [x] «Mostrar todos» limpia los campos y realiza la consulta general. No uses accidentalmente el valor anterior del estado recién actualizado.
- [x] Conserva la selección y el texto cuando falle una petición, para que el usuario pueda corregir o repetir.

## 5. Comprueba tu entrega

- [x] Buscar `phone` genera una petición con `q=phone`, visible en Network.
- [x] Un texto sin coincidencias muestra cero resultados sin tratarlo como fallo.
- [x] Una búsqueda con espacios o `&` llega codificada como un único valor de `q`.
- [x] El filtro por categoría envía su GET y muestra productos de esa categoría.
- [x] Una segunda consulta sustituye la lista y actualiza su descripción y total.
- [x] Editar el formulario sin enviar no cambia la descripción de los resultados anteriores.
- [x] Sin conexión aparece un error; al recuperar la conexión, reintentar repite la consulta fallida.
- [x] «Mostrar todos» recupera el listado general sin conservar un filtro anterior.
- [x] Los controles funcionan con teclado y se ajustan a 375 px y 1280 px.
- [x] Tareas y Quiz siguen funcionando; lint y build pasan.
- [x] He respondido el bloque 10 del cuaderno con ejemplos de mi código.

### Registro de pruebas

- **Buscar `phone`:** Esperaba que se hiciera una petición al servidor buscando `phone`. En Network comprobé que la petición llevaba `q=phone&limit=12` y aparecieron los productos.
- **Buscar un texto que no existe:** Probé con `zzzzzz999999`. Esperaba que salieran 0 resultados sin considerarlo un error. La aplicación mostró 0 resultados y el mensaje de que no se encontraron productos.
- **Buscar `phone & tablet`:** Comprobé que los espacios y el símbolo `&` se codificaban correctamente. En Network apareció `q=phone+%26+tablet`, por lo que todo el texto se envió como un único valor de búsqueda.
- **Buscar por categoría:** Seleccioné `tablets` y pulsé Consultar. Se hizo una petición a `/products/category/tablets?limit=12` y aparecieron productos de esa categoría.
- **Hacer otra consulta:** Hice una consulta y después otra diferente. Los resultados anteriores se sustituyeron por los nuevos y también se actualizaron la descripción y el total.
- **Cambiar el formulario sin consultar:** Después de hacer una búsqueda cambié el texto del formulario sin pulsar Consultar. Los resultados anteriores no cambiaron y siguieron mostrando la consulta que ya había enviado.
- **Probar sin conexión:** Puse la conexión en Offline e hice una consulta. Apareció el mensaje de error y el botón Reintentar. Después recuperé la conexión y Reintentar volvió a cargar la consulta que había fallado.
- **Mostrar todos:** Después de aplicar un filtro pulsé Mostrar todos. Los campos quedaron vacíos y se volvió a cargar el listado general.
- **Teclado y tamaños:** Probé los controles con el teclado y comprobé la página a 375 px y 1280 px. Los controles funcionaron y la página se adaptó correctamente.
- **Lint y build:** Ejecuté `npm run lint` y `npm run build`. Después de corregir una variable que no se estaba usando, los dos comandos terminaron correctamente.

## Para explicar al tutor

**¿Por qué filtrar el array recibido no equivale a buscar en el servidor?**

Porque si filtro el array en JavaScript solo estoy buscando entre los productos que ya me ha enviado la API. No estoy haciendo una búsqueda nueva en el servidor. En mi proyecto envío el texto mediante el parámetro `q` en la URL y hago un `fetch` de esa URL, por lo que la búsqueda la realiza la API.

**¿Qué diferencia hay entre los campos del formulario y la consulta aplicada?**

Los campos del formulario son los valores que estoy escribiendo o seleccionando antes de enviar una consulta. La consulta aplicada es la que realmente se ha enviado al servidor y corresponde a los resultados que aparecen en pantalla. Por eso puedo cambiar el formulario sin que cambien los resultados hasta pulsar Consultar.

**¿Qué repites al reintentar y qué significa el total que devuelve la API?**

Al pulsar Reintentar repito la misma consulta que había fallado, utilizando la consulta que había guardado anteriormente, aunque después haya cambiado el formulario.

El total que devuelve la API indica cuántos resultados existen para esa consulta en el servidor. No tiene por qué coincidir con los productos que estoy mostrando, porque la petición puede tener un límite. Por ejemplo, puede haber 50 resultados y recibir solamente 12 si la petición lleva `limit=12`.

Referencias: [Productos · DummyJSON](https://dummyjson.com/docs/products), [URLSearchParams · MDN](https://developer.mozilla.org/es/docs/Web/API/URLSearchParams).

[Volver a la guía](../README.md) · [Reto 09](09-primeras-llamadas-api.md) · [Reto 11](11-crear-editar-eliminar-api.md)
