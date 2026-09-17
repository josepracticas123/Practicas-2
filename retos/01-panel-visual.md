# 01 · Diseña tu panel

**Tu misión:** construir la primera pantalla de tu propia plataforma de retos. Al terminar tendrás algo que enseñar, aunque todavía no tenga interactividad.

**Antes:** completa el paso 0 del README. **Aprenderás:** JSX, estructura HTML, clases CSS y diseño adaptable.

## Lo que debe verse

- Cabecera con el nombre de la aplicación y una frase de bienvenida.
- Resumen de progreso: de momento un texto fijo, «0 de 1 completados».
- Zona principal con una tarjeta para este reto: «01 · Mi panel».
- La tarjeta tendrá número, título, descripción corta, categoría «Interfaz» y estado «Pendiente».
- Un botón «Abrir reto» deshabilitado en la tarjeta: en esta maqueta no realiza ninguna acción.

Esquema orientativo; puedes darle tu propio estilo:

```text
┌────────────────────────────────────────────────────┐
│ DevQuest                     Mi ruta de aprendizaje │
│ Pequeños pasos, proyectos reales                     │
├────────────────────────────────────────────────────┤
│ Mi progreso: 0 de 1 completados                │
│                                                    │
│ [01 · Mi panel]                                     │
│ Interfaz · Pendiente                               │
│ Diseña la pantalla de tu plataforma de retos.        │
│ [Abrir reto · deshabilitado]                        │
│                                                    │
└────────────────────────────────────────────────────┘
```

En móvil, la tarjeta debe ajustarse al espacio disponible. La prioridad es que se lea bien.

## Paso a paso

1. Dibuja en papel dónde pondrás cabecera, progreso y tarjeta.
2. Construye una cabecera con `header`, un `main` y una tarjeta con `article`. Usa un solo `h1` y un `h2` para el título de la tarjeta.
3. Dale estilo a esa tarjeta: espacio interior, borde, fondo y separación entre textos.
4. Añade el resumen de progreso con el texto fijo indicado. No necesitas calcularlo.
5. Organiza las zonas de la página con Grid o Flexbox y ajusta el diseño para móvil.
6. Revisa los estilos iniciales de Vite si centran toda la página o limitan su anchura de forma inesperada.

## Comprueba tu entrega

Revisión del 16/09/2026 sobre `742f6b7`. Se ha consultado también la primera maqueta (`61214e5`) para distinguir lo realizado de lo que cambió al pasar al reto 02. `[x]` significa comprobado; los puntos sin marcar incluyen su motivo.

- [x] Están la cabecera, el resumen y la tarjeta del panel. **Verificado en la maqueta inicial.** El resumen y la tarjeta original se sustituyeron al evolucionar al reto 02; no hay que recuperarlos.
- [x] A 375 px y a 1280 px de ancho se lee todo sin desplazamiento horizontal. **Comprobado en navegador sobre la aplicación actual**, con las tareas de prueba del reto 02.
- [x] El estado se entiende por su texto, además de su color. La maqueta inicial mostraba «Pendiente»; la app actual identifica las secciones y muestra mensajes explicativos.
- [ ] El botón está realmente deshabilitado con `disabled`. **No se implementó en la maqueta revisada. Ya no aplica al alcance actual:** el botón ahora añade tareas y debe estar operativo. No hay que deshabilitarlo para cerrar este punto antiguo.
- [x] Ya no aparecen los logos ni el contador de la plantilla de Vite.
- [x] Puedes explicar qué hace una clase CSS y qué parte pinta `App`. **Pendiente de explicación al tutor.** El cuaderno todavía no contiene sus respuestas.

La base visual está realizada y ha evolucionado. Queda validar la comprensión; el requisito antiguo de `disabled` se conserva como registro, no como una corrección a aplicar a la app actual.

## Pistas, si las necesitas

- Usa `className` para asignar clases en JSX.
- Primero consigue que una tarjeta se vea bien; después trabaja la distribución.
- Evita alturas fijas para tarjetas con texto y anchos fijos que no quepan en móvil.

## Documentación

- [JSX · React](https://es.react.dev/learn/writing-markup-with-jsx).
- [CSS Grid · MDN](https://developer.mozilla.org/es/docs/Web/CSS/CSS_grid_layout).
- [Media queries · MDN](https://developer.mozilla.org/es/docs/Web/CSS/CSS_media_queries/Using_media_queries).

**Extra opcional:** crea variables CSS para colores y espacios.

**Para explicar al tutor:** ¿qué cambiarías si una descripción tuviera el doble de longitud?

---

[Volver a la guía de inicio](../README.md)
