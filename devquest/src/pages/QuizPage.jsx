import preguntas from "../data/Preguntas";
import { useState } from "react";
import QuizQuestions from "../components/QuizQuestions";

function QuizPage() {
    // Guardamos el id de la opción que el usuario seleccione.
    // Empieza en null porque todavía no hay ninguna seleccionada.
    const [seleccionadaId, setSeleccionadaId] = useState(null);

    // Estado que indica si la respuesta ya ha sido comprobada.
    const [comprobada, setComprobada] = useState(false);

    // Estado que guarda si la respuesta comprobada es correcta.
    const [esCorrecta, setEsCorrecta] = useState(null);

    // Marca la respuesta como comprobada.
    const comprobarRespuesta = (event) => {
        event.preventDefault();

        // Comparamos la opción que ha seleccionado el usuario
        // con el ID de la respuesta correcta.
        const resultado =
            seleccionadaId === preguntas[0].respuestaCorrectaId;

        // Guardamos si la respuesta es correcta o incorrecta.
        setEsCorrecta(resultado);

        // Indicamos que la respuesta ya ha sido comprobada.
        setComprobada(true);
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
                    pregunta={preguntas[0]}
                    seleccionadaId={seleccionadaId}
                    onSeleccionar={setSeleccionadaId}
                    comprobada={comprobada}
                />

                {/* Mostramos un mensaje indicando si la respuesta es correcta o incorrecta. */}
                {comprobada && (
                    <div
                        className={`mt-6 rounded-lg border p-4 text-center font-semibold ${
                            esCorrecta
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
                            preguntas[0].opciones.find(

                                // Recorremos cada opción del array.
                                (opcion) =>

                                    // Comprobamos si el ID de esta opción
                                    // coincide con el ID de la respuesta correcta.
                                    opcion.id === preguntas[0].respuestaCorrectaId

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
                            {preguntas[0].explicacion}
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

