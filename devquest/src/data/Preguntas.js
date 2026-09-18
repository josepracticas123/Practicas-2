const preguntas = [
    {
        id: "p1",
        enunciado: "¿Para qué sirven las props en React?",
        opciones: [
            {
                id: "p1-01",
                texto: "Para pasar datos de un componente a otro"
            },
            {
                id: "p1-02",
                texto: "Para guardar datos en localStorage"

            },
            {
                id: "p1-03",
                texto: "Para crear rutas entre páginas"
            },

        ],
        respuestaCorrectaId: "p1-01",
        explicacion: "Las props permiten pasar datos desde un componente padre a un componente hijo."
    },
    {
        id: "p2",
        enunciado: "¿Para qué sirve useState en React?",
        opciones: [
            {
                id: "p2-01",
                texto: "Para crear una ruta"
            },
            {
                id: "p2-02",
                texto: "Para guardar y actualizar información que puede cambiar en un componente"

            },
            {
                id: "p2-03",
                texto: "Para escribir estilos CSS"
            },

        ],
        respuestaCorrectaId: "p2-02",
        explicacion: "useState permite que un componente guarde información y se vuelva a renderizar cuando esa información cambia."
    },
    {
        id: "p3",
        enunciado: "¿Por qué usamos una key estable al renderizar una lista en React?",
        opciones: [
            {
                id: "p3-01",
                texto: "Para que React pueda identificar cada elemento de la lista"
            },
            {
                id: "p3-02",
                texto: "Para guardar los elementos en localStorage"
            },
            {
                id: "p3-03",
                texto: "Para cambiar automáticamente el texto"
            },

        ],
        respuestaCorrectaId: "p3-01",
        explicacion: "Una key estable ayuda a React a identificar cada elemento de una lista y gestionar correctamente sus cambios."
    },

    {
        id: "p4",
        enunciado: "¿Qué permite hacer el renderizado condicional en React?",
        opciones: [
            {
                id: "p4-01",
                texto: "Guardar información después de cerrar la página"
            },
            {
                id: "p4-02",
                texto: "Mostrar diferentes elementos según una condición"

            },
            {
                id: "p4-03",
                texto: "Crear automáticamente nuevos componentes"
            },

        ],
        respuestaCorrectaId: "p4-02",
        explicacion:  "El renderizado condicional permite decidir qué elementos mostrar dependiendo del estado o de una condición."
    },
    {
        id: "p5",
        enunciado:  "¿Para qué sirve la persistencia de datos en una aplicación?",
        opciones: [
            {
                id: "p5-01",
                texto: "Para que los datos puedan conservarse después de recargar la página"
            },
            {
                id: "p5-02",
                texto: "Para cambiar el color de los botones"

            },
            {
                id: "p5-03",
                texto: "Para crear componentes hijos"
            },

        ],
        respuestaCorrectaId: "p5-01",
        explicacion:"La persistencia permite conservar datos para recuperarlos posteriormente, por ejemplo después de recargar la página."
    }
];

export default preguntas;