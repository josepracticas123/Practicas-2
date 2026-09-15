# 02 · Un panel con dos vistas

**Tu misión:** aprovechar tu práctica del navbar para cambiar entre «Panel» y «Mi lista». La lista de nombres que ya has creado tendrá su propio espacio y conservará sus datos al navegar.

Trabaja sobre tu proyecto actual. Si ya has empezado un navbar, adáptalo: no hace falta repetirlo. Puedes continuar con Tailwind.

**Practicarás:** renderizado condicional, estado, props y callbacks.

## 1. Ordena los detalles de tu lista

Antes del navbar, dedica un bloque corto a revisar `Article.jsx`:

- Corrige el atributo `tipe` del input: debe ser `type`.
- Añade una etiqueta visible «Nombre», asociada al input con `htmlFor` e `id`.
- Cambia «Añadir tarea» por «Añadir nombre» para que los textos sean coherentes.
- Guarda el nombre sin espacios al principio o al final. Ya compruebas `trim()`: piensa qué valor añades realmente al array.
- Separa el número fijo de la tarjeta («01») del total de nombres. El contador de nombres pertenece a «Mi lista».

Comprueba que puedes añadir «Ana» y que un texto compuesto solo por espacios no se añade. Conserva el comportamiento de limpiar el input al añadir un nombre.

## 2. Separa las dos vistas

Dibuja primero qué quedará en cada una:

| Zona | Contenido |
| --- | --- |
| Siempre visible | Cabecera y navbar con «Panel» y «Mi lista». |
| Panel | Resumen fijo y tarjeta visual del panel. |
| Mi lista | Etiqueta, input, botón para añadir, total de nombres y lista. |

Extrae el contenido de la lista a un componente, por ejemplo `NameList`. `Article` puede quedarse como tarjeta visual. Decide nombres que describan lo que hace cada componente; no necesitas carpetas nuevas para cada elemento.

El progreso puede seguir siendo un texto fijo de la maqueta. No tienes que implementar un sistema de retos ni calcular progreso en este ejercicio.

## 3. Haz funcionar el navbar

1. Guarda en `App` un único valor para la vista activa, inicialmente «Panel». Puedes representarlo con `panel` y `names`.
2. Construye el navbar con un elemento `nav` y dos botones `type="button"`.
3. Al pulsar un botón, cambia la vista activa y muestra únicamente su componente mediante una condición en JSX.
4. Destaca la opción activa. Puedes usar `aria-pressed` en los botones, además del estilo visual, para expresar cuál está seleccionado.
5. Si el navbar es un componente separado, pásale la vista activa y una función para solicitar el cambio. Esa función es un callback: el hijo la llama y el padre actualiza su estado.

Utiliza el estado de React para decidir qué contenido existe. No basta con esconder ambas vistas con CSS. Para este ejercicio los botones cambian contenido dentro de la página; no necesitas rutas ni cambiar la URL.

**Parada para comprobar:** cambia de vista varias veces. Solo debe aparecer una a la vez. Comprueba que puedes usar Tab y activar los botones con el teclado, viendo dónde está el foco.

## 4. Muestra un mensaje cuando no hay nombres

En «Mi lista», muestra «Todavía no has añadido nombres» si el array está vacío. Si contiene datos, muestra los nombres y su total.

Elige una condición que puedas explicar. Puedes usar un ternario para elegir entre dos contenidos o `&&` para mostrar un contenido cuando se cumple una condición. No hace falta utilizar todos los formatos.

**Pista:** si usas `&&`, compara explícitamente la longitud. Un cero a la izquierda de `&&` puede acabar apareciendo en pantalla.

## 5. Conserva los nombres al navegar

Añade «Ana» y «Luis», vuelve al panel y abre otra vez la lista. ¿Siguen ahí?

Si el array vive dentro de un componente que deja de renderizarse, su estado se pierde al retirarlo. Antes de cambiar nada, explica qué observas. Después busca un padre que siga montado al navegar: en esta app puede ser `App`. Mueve allí el array de nombres y pasa a la lista los datos y una función para añadirlos.

El texto que aún estás escribiendo puede quedarse dentro del componente de lista: se permite que se reinicie al salir. Los nombres ya añadidos deben conservarse. Recargar la página puede vaciarlos; no necesitas almacenamiento para este reto.

## 6. Explica lo nuevo

Añade comentarios breves, con tus palabras, donde introduzcas el estado de la vista, una condición de renderizado y la decisión de dónde guardar los nombres. Si ya tienes comentarios que lo explican, revísalos en lugar de duplicarlos.

No describas cada etiqueta. Explica la intención y las cosas que has conocido por primera vez. Completa las preguntas de [APRENDIZAJE.md](../devquest/APRENDIZAJE.md) a medida que las entiendas; puedes dejar dudas escritas.

## Comprueba tu entrega

- [ ] Al arrancar se muestra «Panel» y la opción está destacada.
- [ ] El navbar permanece visible y permite mostrar una sola vista cada vez.
- [ ] El input tiene etiqueta visible y el botón dice «Añadir nombre».
- [ ] Un texto vacío o solo con espacios no añade nombres; « Ana » se guarda como «Ana».
- [ ] La lista vacía muestra su mensaje; al añadir un nombre desaparece.
- [ ] Añadir «Ana» y «Luis», cambiar al panel y volver conserva ambos nombres.
- [ ] Cambiar de vista no duplica nombres y el total coincide con la lista.
- [ ] Se puede usar el navbar con teclado y el foco es visible.
- [ ] La pantalla sigue siendo legible en móvil y escritorio.
- [ ] Los comentarios y el cuaderno explican lo nuevo con tus palabras.
- [ ] `npm run lint` y `npm run build` pasan desde `devquest/`.

## Documentación para consultar por bloques

- [Renderizado condicional · React](https://es.react.dev/learn/conditional-rendering).
- [Pasar props a un componente · React](https://es.react.dev/learn/passing-props-to-a-component).
- [Compartir estado entre componentes · React](https://es.react.dev/learn/sharing-state-between-components).
- [Preservar y reiniciar el estado · React](https://es.react.dev/learn/preserving-and-resetting-state).

**Demostración al tutor:** añade dos nombres, cambia de vista, vuelve y explica por qué se conservan. Enseña una condición y un comentario que puedas explicar.

[Volver a la guía](../README.md)
