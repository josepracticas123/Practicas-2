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

- [ ] Están la cabecera, el resumen y la tarjeta del panel.
- [ ] A 375 px y a 1280 px de ancho se lee todo sin desplazamiento horizontal.
- [ ] El estado se entiende por su texto, además de su color.
- [ ] El botón está realmente deshabilitado con `disabled`.
- [ ] Ya no aparecen los logos ni el contador de la plantilla de Vite.
- [ ] Puedes explicar qué hace una clase CSS y qué parte pinta `App`.

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
