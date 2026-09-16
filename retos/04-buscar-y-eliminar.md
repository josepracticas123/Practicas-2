# 04 · Busca y elimina tareas

**Tu misión:** encontrar una tarea dentro de la sección activa y eliminar exactamente la que elijas.

**Antes:** termina el [reto 03](03-completar-y-recuperar.md). **Practicarás:** input controlado, filtros combinados, datos calculados y eliminación por identificador.

Trabaja en dos bloques: primero búsqueda; después eliminación. Conserva las acciones de completar y recuperar.

## 1. Añade una búsqueda con una regla clara

1. Muestra un input con etiqueta visible «Buscar tareas» en Pendientes y Finalizadas. En Inicio no hace falta.
2. Guarda el texto de búsqueda en estado, por ejemplo en `App`.
3. Conserva la búsqueda al cambiar entre secciones: el mismo texto se aplica a la sección activa. Si pasas por Inicio, se conserva también al volver.
4. Añade un botón «Limpiar búsqueda» que deje el input vacío.

**Parada:** puedes escribir, cambiar de sección y limpiar. La búsqueda y el texto para crear una tarea deben ser estados distintos.

## 2. Filtra sin perder tareas

Parte de la lista de la sección activa, que ya calculabas en el reto 03. Aplica un segundo filtro: conserva las tareas cuyo `texto` contenga lo escrito.

- Ignora mayúsculas y espacios al principio o al final de la búsqueda.
- Una búsqueda vacía o formada solo por espacios muestra todas las tareas de esa sección.
- No hace falta ignorar tildes en este ejercicio.
- Calcula los resultados a partir del array original y de la búsqueda. No sustituyas `tareas` por el resultado de buscar.

**Pistas:** `trim()`, `toLowerCase()` e `includes()` pueden ayudarte. La búsqueda solo cambia qué se ve; no modifica ni elimina datos. No necesitas un efecto para guardar otra copia de los resultados.

## 3. Explica lo que se está mostrando

Mantén el total de la sección antes de aplicar la búsqueda. Añade un resumen como «Mostrando 1 de 3 tareas pendientes».

Distingue estas situaciones, comprobándolas en este orden:

| Situación | Qué mostrar |
| --- | --- |
| La sección no contiene tareas | Su mensaje de lista vacía y total 0. |
| La sección contiene tareas, pero ninguna coincide | «No hay resultados para esta búsqueda» y la opción de limpiarla. |
| Hay coincidencias | La lista filtrada y el resumen de resultados. |

Al completar o recuperar una tarea mientras buscas, debe desaparecer de la sección actual y actualizar los contadores. Si coincide con la búsqueda en la otra sección, podrás verla allí.

## 4. Elimina una tarea concreta

Añade «Eliminar» junto a cada tarea visible, tanto en Pendientes como en Finalizadas. En esta app de prácticas, el botón elimina directamente esa tarea; no necesitas un modal de confirmación.

La función recibe su `id` y actualiza el array completo `tareas`, conservando todos los objetos cuyo identificador sea distinto. No borres por texto ni por posición en la lista filtrada.

**Parada:** crea dos tareas iguales, elimina una y comprueba que queda la otra. Después busca una tarea situada en medio de una lista y elimínala: las tareas ocultas por la búsqueda deben seguir existiendo.

Al borrar, recalcula tanto el total de la sección como las coincidencias. Eliminar la última coincidencia puede mostrar «No hay resultados»; eliminar la última tarea de la sección debe mostrar el mensaje de lista vacía.

## 5. Explica y prueba

Comenta la diferencia entre filtrar para mostrar y filtrar para eliminar, y por qué la acción recibe un identificador. Completa las preguntas del reto 04 en [tu cuaderno](../devquest/APRENDIZAJE.md).

No necesitas persistencia, backend, nuevas rutas ni librerías. Recargar la página puede vaciar las tareas, igual que antes.

## Comprueba tu entrega

- [ ] El buscador tiene etiqueta visible y su valor se conserva al navegar.
- [ ] Buscar `REACT` y ` react ` encuentra las mismas tareas que `react`.
- [ ] Una búsqueda de solo espacios muestra toda la sección; limpiar restaura su lista completa.
- [ ] La búsqueda se aplica solo a la sección activa, respetando el estado de las tareas.
- [ ] Se distingue sección vacía de búsqueda sin coincidencias.
- [ ] El resumen diferencia resultados visibles y total de la sección.
- [ ] Completar y recuperar siguen funcionando mientras hay una búsqueda activa.
- [ ] Se puede eliminar desde Pendientes y desde Finalizadas.
- [ ] Eliminar una de dos tareas iguales conserva la otra.
- [ ] Eliminar un resultado filtrado no borra las tareas ocultas por la búsqueda.
- [ ] Eliminar la última coincidencia y la última tarea produce el mensaje correcto en cada caso.
- [ ] Buscador y botones funcionan con teclado, con foco visible, y siguen siendo legibles en móvil.
- [ ] Los comentarios y el cuaderno explican por qué buscar no debe modificar el array original.
- [ ] `npm run lint` y `npm run build` pasan desde `devquest/`.

## Prueba final guiada

1. Crea «Leer React» dos veces y «Practicar CSS» una vez: 3 pendientes.
2. Completa una «Leer React»: 2 pendientes y 1 finalizada.
3. Busca ` REACT ` en Pendientes: 1 resultado de 2 tareas pendientes.
4. Elimina ese resultado: 0 resultados de 1 pendiente; aparece «No hay resultados».
5. Limpia la búsqueda: sigue ahí «Practicar CSS».
6. En Finalizadas, elimina la otra «Leer React»: total 0 y mensaje de sección vacía.

## Documentación

- [Actualizar arrays: eliminar elementos · React](https://es.react.dev/learn/updating-arrays-in-state).
- [Elegir la estructura del estado · React](https://es.react.dev/learn/choosing-the-state-structure).
- [String.includes · MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/includes).

[Volver a la guía](../README.md)
