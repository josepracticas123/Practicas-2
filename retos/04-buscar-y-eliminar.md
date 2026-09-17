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

- [x] El buscador tiene etiqueta visible y su valor se conserva al navegar.
- [x] Buscar `REACT` y ` react ` encuentra las mismas tareas que `react`.
- [x] Una búsqueda de solo espacios muestra toda la sección; limpiar restaura su lista completa.
- [x] La búsqueda se aplica solo a la sección activa, respetando el estado de las tareas.
- [x] Se distingue sección vacía de búsqueda sin coincidencias.
- [x] El resumen diferencia resultados visibles y total de la sección.
- [x] Completar y recuperar siguen funcionando mientras hay una búsqueda activa.
- [x] Se puede eliminar desde Pendientes y desde Finalizadas.
- [x] Eliminar una de dos tareas iguales conserva la otra.
- [x] Eliminar un resultado filtrado no borra las tareas ocultas por la búsqueda.
- [x] Eliminar la última coincidencia y la última tarea produce el mensaje correcto en cada caso.
- [x] Buscador y botones funcionan con teclado, con foco visible, y siguen siendo legibles en móvil. **Textos cortos y largos comprobados; desbordamiento corregido en ambas vistas.**
- [x] Los comentarios y el cuaderno explican por qué buscar no debe modificar el array original.
- [x] `npm run lint` y `npm run build` pasan desde `devquest/`.


### Revisión actual · 17/09/2026, `3736740`

La funcionalidad principal está comprobada: completar, recuperar, buscar, limpiar y eliminar por identificador. Las tareas ocultas por el filtro se conservan. Lint y build pasan. También están corregidos el pie al fondo, el log de depuración y las respuestas del cuaderno. No repitas esas correcciones.

### Caso de texto largo: corregido y comprobado

La versión anterior desbordaba a 375 px hasta alcanzar 570 px de contenido. En `3736740` el texto se ajusta y los botones quedan debajo en móvil. Se ha comprobado Pendientes y Finalizadas a 375 px y la presentación en escritorio a 1280 px, sin desplazamiento horizontal. Estos pasos se conservan para repetir la prueba si cambias los estilos:

1. Crea esta tarea de prueba: `https://ejemplo.com/documentacion/proyectos/componentes/renderizado/identificadores`.
2. Abre Pendientes a 375 px de ancho y revisa el texto y ambos botones.
3. Permite partir cadenas largas y que el bloque de texto se ajuste al espacio disponible. Si hace falta, coloca los botones debajo en móvil. Revisa el ancho fijo `w-72` y la fila flex en ambas vistas.
4. No escondas el problema con `overflow-x: hidden`: el contenido debe poder leerse y las acciones seguir accesibles.
5. Completa la tarea y comprueba también Finalizadas; recupérala y vuelve a comprobar Pendientes.
6. Repite a 1280 px y verifica que los textos cortos siguen viéndose bien.

- [x] La tarea larga se lee entera, sin solaparse con los botones ni provocar desplazamiento horizontal en ambas vistas.
- [x] El comportamiento sigue siendo correcto con tareas cortas y al cambiar de tamaño.
- [ ] He mostrado la corrección al tutor y explicado por qué eliminar por identificador no afecta a otras tareas con el mismo texto.

**Reto cerrado técnicamente.** La demostración y explicación personal quedan para el tutor. El 05 también está implementado y revisado; no repitas estas correcciones. Las mejoras de mantenimiento de abajo pueden trabajarse gradualmente.

### Buena práctica: esta búsqueda no necesita `useEffect`

`busqueda` cambia con el input y provoca otro renderizado. En ese renderizado se calculan las listas filtradas a partir de `tareas` y `busqueda`. Esos resultados se pueden calcular directamente: no necesitan otro estado ni un efecto para mantenerlos sincronizados.

Conserva este enfoque. Los efectos sirven para sincronizar con sistemas externos; no hacen falta para filtrar este array local. No añadas `useMemo` sin haber detectado un cálculo costoso. Referencia: [Quizás no necesites un Efecto · React](https://es.react.dev/learn/you-might-not-need-an-effect).

### Mejoras opcionales de mantenimiento

Después del cierre, puedes acordar con el tutor una mejora cada vez:

- Usa márgenes o `gap` para separar bloques, en lugar de `<br/>` después de los títulos y contadores.
- Valora compartir el buscador que ahora repites en Pendientes y Finalizadas; mantén etiquetas asociadas e identificadores únicos.
- Para actualizar tareas a partir de las anteriores, puedes utilizar `setTareas(anteriores => ...)`. El código actual funciona con estos eventos; es una mejora de claridad y robustez, no un fallo reproducido.
- Enter ya funciona mediante `onKeyDown`. Como aprendizaje adicional, puedes centralizar el envío en un `form` con `onSubmit` y un botón de envío.
- Decide si utilizar `views/Inicio.jsx` o retirarlo: el archivo existe, pero `App` renderiza directamente `Article`.

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
