# 14 · Recorre el catálogo por páginas

**Estado:** por empezar. **Antes:** termina las comprobaciones del 13.

**Tu misión:** recorrer más de los primeros 12 productos sin descargar todo el catálogo. Añadirás «Anterior» y «Siguiente», manteniendo la búsqueda o categoría aplicada.

Practicarás paginación en el servidor, estado mínimo, valores calculados y coordinación entre los controles existentes. Mantén la carga manual del catálogo: los botones y el formulario inician sus peticiones. Este reto no necesita añadir otro `useEffect`.

## 1. Entiende qué pide cada página

Lee [Limit and skip · DummyJSON](https://dummyjson.com/docs/products). Mantén un tamaño fijo de 12 productos.

| Página | `limit` | `skip` |
| --- | --- | --- |
| 1 | 12 | 0 |
| 2 | 12 | 12 |
| 3 | 12 | 24 |

- [x] Inspecciona dos respuestas en Network y compara IDs, `total`, `skip` y `limit`.
- [x] Explica qué significa `skip`: cantidad de resultados que se omiten, no número de página.
- [x] Usa `skip = (pagina - 1) * 12` para construir la consulta.
- [x] Calcula el número de páginas con `Math.ceil(total / 12)`. No fijes el total a mano ni uses `productos.length` como total del servidor.

## 2. Añade los controles al listado general

Puntos de partida: `src/pages/CatalogoPages.jsx` coordina la consulta y `src/components/ListaProductos.jsx` muestra el listado. Puedes extraer un componente pequeño para los controles si facilita su lectura.

- [x] Añade «Anterior», «Siguiente» y un texto «Página X de Y» cuando haya resultados.
- [x] Guarda la página que necesitas y calcula los valores derivados. No mantengas en estados separados página, desplazamiento y número de páginas si puedes deducirlos.
- [x] Envía `limit` y `skip` al servidor. Sustituye las tarjetas con la respuesta; no acumules páginas ni descargues todo para hacer `slice`.
- [x] Deshabilita «Anterior» en la primera página y «Siguiente» en la última.
- [x] Bloquea los controles durante la carga y durante las operaciones que ya bloquean el catálogo: apertura de edición, edición abierta, guardado y eliminación en curso.
- [x] Evita también peticiones duplicadas desde los manejadores, como haces con las operaciones actuales.
- [x] Con cero resultados muestra el mensaje vacío y oculta los controles. No muestres «Página 1 de 0».

**Parada:** puedes avanzar y retroceder por el listado general; en Network cambia `skip` y en pantalla cambian los productos.

## 3. Conserva la consulta aplicada

En tu código ya existen campos del formulario y `consultaAplicada`. Amplía ese recorrido: paginar debe usar la búsqueda que produjo los resultados, aunque el usuario esté escribiendo otra cosa.

- [x] Añade paginación a «Texto» y «Categoría», además de «Todos».
- [x] Conserva `q` al avanzar en una búsqueda y la categoría en su ruta al avanzar por una categoría. Sigue codificando sus valores correctamente.
- [x] Al enviar una nueva consulta, empieza en página 1. «Mostrar todos» también reinicia a página 1.
- [x] Editar campos sin pulsar «Consultar» no cambia el listado ni el filtro usado por «Siguiente».
- [x] Pasa explícitamente la página objetivo a la función que consulta. No hagas `setPagina(2)` y esperes leer `2` inmediatamente de la variable del render actual.
- [x] Guarda la consulta intentada completa, incluida su página o URL, para poder reintentar exactamente la petición fallida.

Ejemplos de peticiones para comparar con Network:

```text
/products?limit=12&skip=12
/products/search?q=phone&limit=12&skip=12
/products/category/smartphones?limit=12&skip=12
```

Los modos siguen siendo excluyentes. No combines búsqueda de texto y categoría.

## 4. Mantén una pantalla coherente si algo falla

- [x] Conserva el comportamiento actual de vaciar las tarjetas al comenzar la carga. Durante carga o error, oculta la paginación para no mostrar números como si ya hubiera resultados confirmados.
- [x] Si falla la página 2, muestra el error. «Reintentar» vuelve a pedir la página 2 de la misma consulta, aunque hayas cambiado los campos del formulario.
- [x] Al tener éxito, el indicador, los productos y el total corresponden a la misma respuesta.
- [x] Un PUT modifica solo la tarjeta correspondiente en la página actual.
- [x] Un DELETE simulado quita su tarjeta, pero no reduce el total del servidor ni recalcula las páginas usando el número de tarjetas que quedan.
- [x] Comprueba que un nuevo GET puede recuperar un producto eliminado o su título original. Es el comportamiento simulado de DummyJSON; no intentes corregirlo guardando una copia completa del catálogo.

## 5. Pruebas de cierre

- [x] Listado general: primera página → segunda → primera, comprobando los IDs y las URLs.
- [x] Última página: puede tener menos de 12 elementos y «Siguiente» queda deshabilitado. Para probarla sin muchos clics puedes reducir temporalmente el recorrido con un tamaño de página mayor; devuelve el tamaño a 12 y comprueba el cálculo final.
- [x] Búsqueda con suficientes resultados: avanza manteniendo el texto aplicado. Si el ejemplo no tiene más de 12 resultados, elige otro que sí los tenga.
- [x] Categoría: respeta su total; si cabe en una página, no permite avanzar.
- [x] Desde página 2, envía una búsqueda diferente: empieza en página 1.
- [x] Cambia el formulario sin consultar y pulsa «Siguiente»: sigue la consulta aplicada anterior.
- [x] Sin conexión, intenta avanzar; recupera la conexión y reintenta. Se solicita la misma página que falló.
- [x] Cero resultados: mensaje vacío sin paginación incoherente.
- [x] Edición y eliminación siguen funcionando con los bloqueos anteriores; prueba también «Ver detalle» del reto 13.
- [x] Revisa teclado, móvil y escritorio; ejecuta lint y build.
- [x] Completa el bloque 14 de [APRENDIZAJE](../devquest/APRENDIZAJE.md) y registra tres pruebas con sus resultados reales.
- [x] Comprueba el cambio en Preview y prepara la entrega hacia `main` con el tutor; verifica producción después del despliegue.

**Alcance:** dos botones, tamaño fijo y filtros existentes. No añadas scroll infinito, números de página clicables, caché, búsqueda automática ni conservación de filtros al salir del catálogo.

**Terminado cuando:** puedes recorrer los resultados del servidor sin perder la consulta aplicada y reintentar la página exacta que falló.

Referencias: [elegir la estructura del estado · React](https://es.react.dev/learn/choosing-the-state-structure), [el estado como instantánea · React](https://es.react.dev/learn/state-as-a-snapshot), [URLSearchParams · MDN](https://developer.mozilla.org/es/docs/Web/API/URLSearchParams).

[Guía](../README.md) · [Reto 13](13-detalle-producto-y-efectos.md)
