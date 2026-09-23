# 09 · Un catálogo que trae datos de una API

**Estado:** implementación principal realizada; pendientes de mejora antes del cierre.

## Revisión · 23/09/2026, `e4ed86d`

La carga real de 12 productos, la repetición sin duplicados y el reinicio al recargar están comprobados. Lint y build pasan en el entorno local. Los checks anteriores describen la entrega del alumno; esta lista concreta lo que falta ajustar.

- [x] **Iguala el import al nombre del archivo:** en `CatalogoPages.jsx` se importa `Productocard`, pero el archivo es `ProductoCard.jsx`. Respeta todas las mayúsculas y utiliza `ProductoCard` de forma consistente en el import y el JSX. Que funcione en un equipo no garantiza que funcione en uno sensible a mayúsculas.
- [x] **Muestra el mensaje inicial solo al inicio:** «Pulsa cargar productos…» debe depender de `estadoPeticion === "inicial"`. Comprueba que desaparece durante carga, éxito, lista vacía y error.
- [x] **Prepara un error comprensible:** ante un fallo de red, presenta un mensaje en español como «No se pudo cargar el catálogo. Comprueba tu conexión y vuelve a intentarlo». Conserva el detalle técnico en consola; no muestres directamente `Failed to fetch` al usuario.
- [x] **Ajusta la explicación de JSON:** `respuesta.json()` lee el cuerpo JSON y lo interpreta como datos JavaScript; no convierte esos datos en JSON. Revisa esa frase en el cuaderno y el comentario junto al segundo `await`.
- [ ] **Concreta el registro de pruebas:** sustituye «Todo ha pasado» por los casos y resultados observados, especialmente error de red, reintento, error HTTP y lista vacía. Las simulaciones de la función durante la revisión no sustituyen tus pruebas de la interfaz.
- [ ] **Verifica el cierre:** repite carga, recarga de productos, fallo y reintento tras los ajustes; ejecuta lint/build y marca estas mejoras al comprobarlas.

No necesitas rehacer la petición ni añadir un efecto. Cuando completes esta lista, continúa con el [reto 10](10-busqueda-y-filtros-api.md).


**Tu misión:** añadir una miniapp en `/catalogo` que muestre productos recibidos de una API cuando pulses «Cargar productos».

**Practicarás:** peticiones HTTP, `fetch`, `async/await`, respuestas JSON y estados de carga y error.

Trabaja en el mismo `devquest/`. Completa un bloque y compruébalo antes de pasar al siguiente. Marca las casillas cuando lo hayas realizado. Los retos 01–08 están cerrados funcionalmente. Antes de empezar, termina la lectura de [APUNTES_ESTUDIO_REACT](../devquest/resumen/APUNTES_ESTUDIO_REACT.md) y comenta el [repaso con el tutor](../devquest/REPASO-CON-TUTOR.md).

## 1. Conoce los datos antes de programar

Usaremos el catálogo de prueba de [DummyJSON · Productos](https://dummyjson.com/docs/products).

Dirección de la petición:

```text
https://dummyjson.com/products?limit=12
```

- [x] Abre esa dirección en el navegador y localiza el JSON.
- [x] Identifica el objeto principal y su propiedad `products`: esa propiedad contiene el array que mostrarás.
- [x] Localiza en un producto `id`, `title`, `description`, `price` y `thumbnail`.
- [x] Identifica `total` y diferencia el total disponible del número de productos recibidos.
- [x] Anota en el cuaderno qué es una petición `GET` y qué significa recibir una respuesta JSON.

**Parada:** puedes señalar dónde están los productos sin confundir el objeto de respuesta con el array.

## 2. Añade la página del catálogo

- [x] Crea `pages/CatalogoPage.jsx` y conecta `/catalogo` desde `App`.
- [x] Añade una tarjeta al portal reutilizando `MiniappCards` y un enlace en la navegación global.
- [x] Muestra un título, una descripción breve y el botón «Cargar productos».
- [x] Al entrar, muestra «Pulsa Cargar productos para consultar el catálogo».
- [x] Comprueba la cabecera con el nuevo enlace a 375 px y 1280 px.

**Parada:** puedes entrar y salir del catálogo y todavía no se hace ninguna petición automáticamente.

## 3. Haz tu primera petición

Mantén los datos y el estado de la petición en `CatalogoPage`. Una estructura sencilla es un array `productos`, un estado `estadoPeticion` (`inicial`, `cargando`, `exito` o `error`) y un texto `mensajeError`. El número de productos se calcula desde el array.

- [x] Prepara una función asíncrona para cargar los productos al pulsar el botón.
- [x] Antes de pedirlos, cambia a `cargando`, limpia el error y vacía los resultados anteriores para esta versión sencilla.
- [x] Usa `fetch` con la URL del bloque 1 y espera la respuesta con `await`.
- [x] Comprueba `response.ok`. Si es falso, lanza un error para tratarlo en `catch`.
- [x] Espera `response.json()` y comprueba que `datos.products` es un array con `Array.isArray`.
- [x] Guarda ese array y cambia a `exito`.
- [x] Captura los fallos con `try/catch`: muestra un mensaje comprensible y cambia a `error`, para que no quede cargando indefinidamente.
- [x] Deshabilita el botón mientras cargas y evita iniciar otra petición si la función se invoca estando en `cargando`.

**Pista:** una respuesta HTTP con error, como 404, no hace que `fetch` entre por sí solo en `catch`; por eso revisas `response.ok`. Consulta [Uso de Fetch · MDN](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch).

**Por qué aquí no usamos `useEffect`:** la petición responde a una pulsación concreta. Llámala desde el manejador del botón. No la ejecutes en el cuerpo del componente ni añadas un efecto que observe los productos.

**Parada:** al pulsar, ves una petición en Network/Red de las herramientas del navegador y los datos llegan al estado.

## 4. Muestra cada situación con claridad

- [x] **Inicial:** invitación a cargar y botón disponible.
- [x] **Cargando:** texto «Cargando productos…» y botón deshabilitado. Puedes usar `role="status"` para el mensaje.
- [x] **Éxito:** tarjetas y número de productos recibidos. Si el array está vacío, muestra «No hay productos disponibles».
- [x] **Error:** mensaje visible y botón «Reintentar» que utilice la misma función de carga.
- [x] Después de un éxito, permite repetir la petición con «Volver a cargar». Sustituye la lista; no acumules duplicados.
- [x] Renderiza los productos con `map` y `key={producto.id}`.
- [x] Extrae una tarjeta que reciba el producto por props y muestre título, descripción, precio e imagen con texto alternativo.
- [x] Comprueba que los textos e imágenes se ajustan en móvil. Para el precio, usa un formato consistente; no necesitas implementar conversiones de moneda.

**Parada:** la pantalla distingue «todavía no he pedido datos», «estoy esperando», «ha fallado» y «la respuesta no contiene productos».

## 5. Comprueba casos reales

- [x] Al abrir o recargar `/catalogo`, vuelve al estado inicial y no hace una petición hasta pulsar.
- [x] Con conexión, carga y muestra los productos. Al repetir, no aparecen duplicados.
- [x] Activa una conexión lenta en Network/Red y comprueba el mensaje de carga y el bloqueo del botón.
- [x] Con la página ya abierta, activa Offline/Sin conexión y pulsa cargar: aparece el error y se puede reintentar.
- [x] Vuelve a activar la conexión y pulsa «Reintentar»: el error desaparece y se muestran los datos.
- [x] Prueba temporalmente una ruta inexistente de la API para comprobar el tratamiento de un error HTTP. Restaura después la URL correcta.
- [x] Para comprobar la lista vacía, sustituye temporalmente el array que pasas al setter por `[]`, manteniendo el estado de éxito. Retira esa simulación al acabar.
- [x] Prueba el botón con teclado y la página a 375 px y 1280 px.
- [x] Comprueba que Tareas conserva sus datos y que el Quiz sigue funcionando.
- [x] Ejecuta `npm run lint` y `npm run build` desde `devquest/`.

**Registro breve:** anota aquí los casos probados, su resultado y cualquier fallo. Restaura la conexión normal y elimina las modificaciones temporales de prueba antes de entregar.

Todo ha pasado las pruebas correctamente.

## 6. Explica lo nuevo

Responde en el bloque 09 de `APRENDIZAJE.md`, con ejemplos de tu código. Añade comentarios breves donde hayas usado un concepto nuevo; explica el motivo, sin narrar cada línea.

- [x] Explico la diferencia entre el objeto de respuesta HTTP, el JSON recibido y el array de productos.
- [x] Explico qué espera cada `await` y cómo puede mostrarse «Cargando» mientras llega la respuesta.
- [x] Explico por qué compruebo `response.ok` además de usar `catch`.
- [x] Explico por qué la petición sale del evento y no necesita un efecto en este reto.
- [x] Explico qué cambia al reintentar y cómo evito duplicar productos.

## Comprueba tu entrega

- [x] `/catalogo` está integrado en el portal y la navegación.
- [x] Los productos proceden de una petición real y se muestran mediante un componente con props.
- [x] Se distinguen los estados inicial, carga, éxito, lista vacía y error.
- [x] Se puede repetir y reintentar sin solicitudes simultáneas desde el botón ni productos duplicados.
- [x] Las pruebas del bloque 5 están registradas y las simulaciones retiradas.
- [x] El cuaderno está respondido y lint/build pasan.

**Alcance de este reto:** solo lectura y carga manual. No añadas todavía búsqueda, paginación, detalle, carrito, autenticación, persistencia ni carga automática. Usa `fetch` del navegador; no necesitas instalar una librería para las peticiones.

**Demostración al tutor:** abre el catálogo, carga los productos, provoca un fallo de conexión y recupérate con «Reintentar». Muestra en Network la petición y explica cómo pasa la respuesta a las tarjetas.

[Volver a la guía](../README.md) · [Reto 08](08-quiz-recorrido.md) · [Reto 10](10-busqueda-y-filtros-api.md)
