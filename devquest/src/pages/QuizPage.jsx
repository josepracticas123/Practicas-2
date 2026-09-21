import preguntas from "../data/Preguntas";
import { useState } from "react";
import QuizQuestions from "../components/QuizQuestions";

function QuizPage() {
    // Índice de la pregunta que estamos mostrando.
    const [indicePregunta, setIndicePregunta] = useState(0);

    // ID de la opción seleccionada en la pregunta actual.
    const [seleccionadaId, setSeleccionadaId] = useState(null);

    // Respuestas que ya han sido confirmadas.
    // Cada clave es el ID de una pregunta y su valor es el ID de la opción elegida.
    const [respuestasConfirmadas, setRespuestasConfirmadas] = useState({});
    //Obtenemos la pregunta que corresponde al indice actual.
    const preguntaActual = preguntas[indicePregunta];

    // Marca la respuesta como comprobada.
    const comprobarRespuesta = (event) => {
        event.preventDefault();

        //Guardamos la opción elegida usando el ID de la pregunta
        setRespuestasConfirmadas((respuestasAnteriores) => ({
            ...respuestasAnteriores, // Copiamos todas las respuestas que ya tenia el objeto.
            [preguntaActual.id]: seleccionadaId,
        }));

    };

    return (
        <section className="px-6 py-20 text-white">
            <h1 className="mb-8 text-center text-4xl font-bold">
                Quiz de React
            </h1>

            <form
                onSubmit={comprobarRespuesta}
                className="mx-auto w-full max-w-2xl px-4 sm:px-0"
            >
                {/* Pasamos al componente hijo los datos y acciones que necesita para mostrar la pregunta. */}
                <QuizQuestions
                    pregunta={preguntaActual}
                    seleccionadaId={seleccionadaId}
                    onSeleccionar={setSeleccionadaId}
                    comprobada={comprobada}
                />

                {/* Mostramos un mensaje indicando si la respuesta es correcta o incorrecta. */}
                {comprobada && (
                    <div
                        className={`mt-6 rounded-lg border p-4 text-center font-semibold ${esCorrecta
                            ? "border-green-500 bg-green-500/10 text-green-400"
                            : "border-red-500 bg-red-500/10 text-red-400"
                            }`}
                    >
                        {/* Mostramos un texto diferente según el resultado. */}
                        <p>
                            {esCorrecta ? "¡Correcto!" : "Incorrecto"}
                        </p>
                    </div>
                )}

                {/* Solo mostramos este bloque si la respuesta ya ha sido comprobada
                    y además la respuesta del usuario es incorrecta. */}
                {comprobada && !esCorrecta && (
                    // Si se cumplen las dos condiciones, mostramos este párrafo.
                    <p className="mt-4">
                        {/* Texto que verá el usuario. */}
                        Respuesta correcta:{" "}

                        {
                            // Buscamos dentro del array de opciones
                            // cuál es la opción que tiene el ID de la respuesta correcta.
                            preguntaActual.opciones.find(

                                // Recorremos cada opción del array.
                                (opcion) =>

                                    // Comprobamos si el ID de esta opción
                                    // coincide con el ID de la respuesta correcta.
                                    opcion.id === preguntaActual.respuestaCorrectaId

                                // Cuando encuentra la opción que coincide,
                                // .find() devuelve ese objeto de opción.
                            )?.texto
                        }
                    </p>
                )}

                {/* Mostramos la explicación después de comprobar la respuesta. */}
                {comprobada && (
                    <div className="mt-4 rounded-lg bg-gray-700 p-4 text-gray-200">
                        {/* Título de la explicación. */}
                        <p className="mb-1 font-semibold text-white">
                            Explicación
                        </p>

                        {/* Mostramos el texto de la explicación. */}
                        <p>
                            {preguntaActual.explicacion}
                        </p>
                    </div>
                )}

                {/* Botón que dispara el onSubmit. */}
                <button
                    type="submit"
                    disabled={seleccionadaId === null || comprobada}
                    className="mt-6 rounded-lg bg-slate-600 px-5 py-3 font-semibold text-white transition hover:bg-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Comprobar respuesta
                </button>
            </form>
        </section>
    );
}

export default QuizPage;

