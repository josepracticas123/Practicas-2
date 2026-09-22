# 09 · Un catálogo que trae datos de una API

**Estado:** por empezar.

**Tu misión:** añadir una miniapp en `/catalogo` que muestre productos recibidos de una API cuando pulses «Cargar productos».

**Practicarás:** peticiones HTTP, `fetch`, `async/await`, respuestas JSON y estados de carga y error.

Trabaja en el mismo `devquest/`. Completa un bloque y compruébalo antes de pasar al siguiente. Marca las casillas cuando lo hayas realizado. Los retos 01–08 están cerrados funcionalmente. Antes de empezar, termina la lectura de [APUNTES_ESTUDIO_REACT](../devquest/resumen/APUNTES_ESTUDIO_REACT.md) y comenta el [repaso con el tutor](../devquest/REPASO-CON-TUTOR.md).

## 1. Conoce los datos antes de programar

Usaremos el catálogo de prueba de [DummyJSON · Productos](https://dummyjson.com/docs/products).

Dirección de la petición:

```text
https://dummyjson.com/products?limit=12
```

- [ ] Abre esa dirección en el navegador y localiza el JSON.
- [ ] Identifica el objeto principal y su propiedad `products`: esa propiedad contiene el array que mostrarás.
- [ ] Localiza en un producto `id`, `title`, `description`, `price` y `thumbnail`.
- [ ] Identifica `total` y diferencia el total disponible del número de productos recibidos.
- [ ] Anota en el cuaderno qué es una petición `GET` y qué significa recibir una respuesta JSON.

**Parada:** puedes señalar dónde están los productos sin confundir el objeto de respuesta con el array.

## 2. Añade la página del catálogo

- [ ] Crea `pages/CatalogoPage.jsx` y conecta `/catalogo` desde `App`.
- [ ] Añade una tarjeta al portal reutilizando `MiniappCards` y un enlace en la navegación global.
- [ ] Muestra un título, una descripción breve y el botón «Cargar productos».
- [ ] Al entrar, muestra «Pulsa Cargar productos para consultar el catálogo».
- [ ] Comprueba la cabecera con el nuevo enlace a 375 px y 1280 px.

**Parada:** puedes entrar y salir del catálogo y todavía no se hace ninguna petición automáticamente.

## 3. Haz tu primera petición

Mantén los datos y el estado de la petición en `CatalogoPage`. Una estructura sencilla es un array `productos`, un estado `estadoPeticion` (`inicial`, `cargando`, `exito` o `error`) y un texto `mensajeError`. El número de productos se calcula desde el array.

- [ ] Prepara una función asíncrona para cargar los productos al pulsar el botón.
- [ ] Antes de pedirlos, cambia a `cargando`, limpia el error y vacía los resultados anteriores para esta versión sencilla.
- [ ] Usa `fetch` con la URL del bloque 1 y espera la respuesta con `await`.
- [ ] Comprueba `response.ok`. Si es falso, lanza un error para tratarlo en `catch`.
- [ ] Espera `response.json()` y comprueba que `datos.products` es un array con `Array.isArray`.
- [ ] Guarda ese array y cambia a `exito`.
- [ ] Captura los fallos con `try/catch`: muestra un mensaje comprensible y cambia a `error`, para que no quede cargando indefinidamente.
- [ ] Deshabilita el botón mientras cargas y evita iniciar otra petición si la función se invoca estando en `cargando`.

**Pista:** una respuesta HTTP con error, como 404, no hace que `fetch` entre por sí solo en `catch`; por eso revisas `response.ok`. Consulta [Uso de Fetch · MDN](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch).

**Por qué aquí no usamos `useEffect`:** la petición responde a una pulsación concreta. Llámala desde el manejador del botón. No la ejecutes en el cuerpo del componente ni añadas un efecto que observe los productos.

**Parada:** al pulsar, ves una petición en Network/Red de las herramientas del navegador y los datos llegan al estado.

## 4. Muestra cada situación con claridad

- [ ] **Inicial:** invitación a cargar y botón disponible.
- [ ] **Cargando:** texto «Cargando productos…» y botón deshabilitado. Puedes usar `role="status"` para el mensaje.
- [ ] **Éxito:** tarjetas y número de productos recibidos. Si el array está vacío, muestra «No hay productos disponibles».
- [ ] **Error:** mensaje visible y botón «Reintentar» que utilice la misma función de carga.
- [ ] Después de un éxito, permite repetir la petición con «Volver a cargar». Sustituye la lista; no acumules duplicados.
- [ ] Renderiza los productos con `map` y `key={producto.id}`.
- [ ] Extrae una tarjeta que reciba el producto por props y muestre título, descripción, precio e imagen con texto alternativo.
- [ ] Comprueba que los textos e imágenes se ajustan en móvil. Para el precio, usa un formato consistente; no necesitas implementar conversiones de moneda.

**Parada:** la pantalla distingue «todavía no he pedido datos», «estoy esperando», «ha fallado» y «la respuesta no contiene productos».

## 5. Comprueba casos reales

- [ ] Al abrir o recargar `/catalogo`, vuelve al estado inicial y no hace una petición hasta pulsar.
- [ ] Con conexión, carga y muestra los productos. Al repetir, no aparecen duplicados.
- [ ] Activa una conexión lenta en Network/Red y comprueba el mensaje de carga y el bloqueo del botón.
- [ ] Con la página ya abierta, activa Offline/Sin conexión y pulsa cargar: aparece el error y se puede reintentar.
- [ ] Vuelve a activar la conexión y pulsa «Reintentar»: el error desaparece y se muestran los datos.
- [ ] Prueba temporalmente una ruta inexistente de la API para comprobar el tratamiento de un error HTTP. Restaura después la URL correcta.
- [ ] Para comprobar la lista vacía, sustituye temporalmente el array que pasas al setter por `[]`, manteniendo el estado de éxito. Retira esa simulación al acabar.
- [ ] Prueba el botón con teclado y la página a 375 px y 1280 px.
- [ ] Comprueba que Tareas conserva sus datos y que el Quiz sigue funcionando.
- [ ] Ejecuta `npm run lint` y `npm run build` desde `devquest/`.

**Registro breve:** anota aquí los casos probados, su resultado y cualquier fallo. Restaura la conexión normal y elimina las modificaciones temporales de prueba antes de entregar.

_Pendiente de completar._

## 6. Explica lo nuevo

Responde en el bloque 09 de `APRENDIZAJE.md`, con ejemplos de tu código. Añade comentarios breves donde hayas usado un concepto nuevo; explica el motivo, sin narrar cada línea.

- [ ] Explico la diferencia entre el objeto de respuesta HTTP, el JSON recibido y el array de productos.
- [ ] Explico qué espera cada `await` y cómo puede mostrarse «Cargando» mientras llega la respuesta.
- [ ] Explico por qué compruebo `response.ok` además de usar `catch`.
- [ ] Explico por qué la petición sale del evento y no necesita un efecto en este reto.
- [ ] Explico qué cambia al reintentar y cómo evito duplicar productos.

## Comprueba tu entrega

- [ ] `/catalogo` está integrado en el portal y la navegación.
- [ ] Los productos proceden de una petición real y se muestran mediante un componente con props.
- [ ] Se distinguen los estados inicial, carga, éxito, lista vacía y error.
- [ ] Se puede repetir y reintentar sin solicitudes simultáneas desde el botón ni productos duplicados.
- [ ] Las pruebas del bloque 5 están registradas y las simulaciones retiradas.
- [ ] El cuaderno está respondido y lint/build pasan.

**Alcance de este reto:** solo lectura y carga manual. No añadas todavía búsqueda, paginación, detalle, carrito, autenticación, persistencia ni carga automática. Usa `fetch` del navegador; no necesitas instalar una librería para las peticiones.

**Demostración al tutor:** abre el catálogo, carga los productos, provoca un fallo de conexión y recupérate con «Reintentar». Muestra en Network la petición y explica cómo pasa la respuesta a las tarjetas.

[Volver a la guía](../README.md) · [Reto 08](08-quiz-recorrido.md)
