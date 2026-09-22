import preguntas from "../data/Preguntas";
import { useState } from "react";
import QuizQuestions from "../components/QuizQuestions";
import QuizResult from "../components/QuizResult";

// QuizPage es el componente padre del recorrido completo del quiz.
// Aquí viven los estados principales, las funciones que los modifican y la
// decisión de mostrar el hijo QuizQuestions o el hijo QuizResult.
// QuizQuestions y QuizResult son hermanos: ninguno de los dos es hijo del otro.
function QuizPage() {
    // Guarda la posición de la pregunta que se está mostrando.
    // Lo modifica siguientePregunta, verResultado y volverAJugar.
    // De este estado depende qué pregunta se envía a QuizQuestions y cuándo
    // se termina el quiz.
    const [indicePregunta, setIndicePregunta] = useState(0);

    // Guarda el ID de la opción que el usuario ha seleccionado en la pregunta actual.
    // QuizQuestions avisa de los cambios mediante onSeleccionar, que en realidad
    // es esta función setSeleccionadaId.
    const [seleccionadaId, setSeleccionadaId] = useState(null);

    // Guarda las respuestas que ya se han confirmado.
    // Cada clave es el ID de una pregunta y su valor es el ID de la opción elegida.
    // Se conserva durante todo el quiz para poder calcular y mostrar el resultado final.
    const [respuestasConfirmadas, setRespuestasConfirmadas] = useState({});

    // Comprueba y guarda la respuesta de la pregunta actual.
    // Se ejecuta cuando el formulario se envía al pulsar "Comprobar respuesta".
    // Modifica respuestasConfirmadas, pero no cambia de pregunta.
    const comprobarRespuesta = (event) => {
        event.preventDefault();

        // No hacemos nada si todavía no se ha elegido una opción o si esta
        // pregunta ya fue comprobada. Así se evita responder dos veces.
        if (seleccionadaId === null || comprobada) {
            return;
        }

        // Conservamos las respuestas anteriores y añadimos la respuesta actual.
        // Por ejemplo: pregunta 1 -> opción 3, pregunta 2 -> opción 5 y
        // pregunta 3 -> opción 2 se mantienen juntas en el mismo objeto.
        setRespuestasConfirmadas((respuestasAnteriores) => ({
            // Copiamos las respuestas anteriores para no perderlas.
            ...respuestasAnteriores,
            // La clave es la pregunta actual y el valor es la opción elegida.
            [preguntaActual.id]: seleccionadaId,
        }));

    };

    // Avanza a la siguiente pregunta y limpia solo la selección visible actual.
    // respuestasConfirmadas no se limpia porque necesitamos conservar todas las
    // respuestas para enseñarlas y contarlas en QuizResult.
    const siguientePregunta = () => {
        setIndicePregunta((indiceAnterior) => indiceAnterior + 1);
        setSeleccionadaId(null);
    }

    // Indica si la pregunta que se muestra es la última del array.
    const esUltimaPregunta = indicePregunta === preguntas.length - 1;

    // Lleva el índice hasta el final para que QuizPage muestre el resultado.
    // Se ejecuta al pulsar "Ver resultado" en la última pregunta.
    const verResultado = () => {
        setIndicePregunta(preguntas.length);

    }

    // Reinicia todos los estados para comenzar un quiz nuevo desde el principio.
    // Se ejecuta cuando QuizResult llama a la función recibida en onVolverAJugar.
    const volverAJugar = () => {
        setIndicePregunta(0);
        setSeleccionadaId(null);
        setRespuestasConfirmadas({});


    };

    if (indicePregunta >= preguntas.length) {
        return (
            <QuizResult
                preguntas={preguntas}
                respuestasConfirmadas={respuestasConfirmadas}
                onVolverAJugar={volverAJugar}
            />
        );
    }

    // Cuando ya no quedan preguntas, el padre deja de mostrar QuizQuestions
    // y muestra a su otro hijo, QuizResult. Los dos componentes se relacionan
    // a través de QuizPage, que decide cuál se renderiza en cada momento.
    // QuizResult recibe las preguntas, las respuestas guardadas y la función
    // volverAJugar para que pueda reiniciar el quiz desde su botón.
    // Obtenemos la pregunta que corresponde al índice actual.
    const preguntaActual = preguntas[indicePregunta];

    // Comprueba si la pregunta actual ya tiene una respuesta guardada.
    // Si es true, se muestran los resultados de esa pregunta y se bloquean
    // sus radios para que el usuario no pueda responderla otra vez.
    const comprobada =
        respuestasConfirmadas[preguntaActual.id] !== undefined;

    // Compara la opción elegida con el ID de la respuesta correcta para
    // mostrar el mensaje de acierto o error después de comprobarla.
    const esCorrecta =
        seleccionadaId === preguntaActual.respuestaCorrectaId;



    return (
        <section className="px-6 py-20 text-white">
            <h1 className="mb-8 text-center text-4xl font-bold">
                Quiz de React
            </h1>
            {/* Indica la pregunta actual y cuántas preguntas tiene el quiz. */}
            <p className="mb-6 text-center text-lg">
                Pregunta {indicePregunta + 1} de {preguntas.length}
            </p>

            <form
                onSubmit={comprobarRespuesta}
                className="mx-auto w-full max-w-2xl px-4 sm:px-0"
            >
                {/* QuizQuestions es hijo de QuizPage. Le pasamos sus props:
                                        - pregunta: la pregunta actual y sus opciones.
                                        - seleccionadaId: el ID de la opción seleccionada.
                                        - onSeleccionar: la función del padre que actualiza ese ID;
                                            aquí es setSeleccionadaId.
                                        - comprobada: indica si la respuesta ya fue confirmada.
                                        El hijo usa estos datos para mostrar la pregunta y avisar
                                        al padre cuando el usuario elige una opción. */}
                <QuizQuestions
                    pregunta={preguntaActual}
                    seleccionadaId={seleccionadaId}
                    onSeleccionar={setSeleccionadaId}
                    comprobada={comprobada}
                />

                {/* Después de confirmar, mostramos si la respuesta es correcta
                    o incorrecta según el valor calculado en esCorrecta. */}
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

                {/* Solo mostramos la respuesta correcta cuando ya se comprobó
                    la respuesta y el usuario se equivocó. */}
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

                {/* Mostramos la explicación de la pregunta después de comprobarla. */}
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
                {/* Se evita confirmar dos vees comprobando si la pregunta ya tiene una respuesta en 
                respuestasConfirmadas.
                 Además, se deshabilitan las opciones y desaparece el boton de comprobar */}
                {!comprobada && (
                    <button
                        type="submit"
                        disabled={seleccionadaId === null || comprobada}
                        className="mt-6 rounded-lg bg-slate-600 px-5 py-3 font-semibold text-white transition hover:bg-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Comprobar respuesta
                    </button>

                )}
                {/* Cuando la respuesta está comprobada y aún quedan preguntas,
                    permitimos avanzar con siguientePregunta. */}
                {comprobada && !esUltimaPregunta && (
                    <button
                        type="button"
                        onClick={siguientePregunta}
                        className="mt-6 rounded-lg bg-slate-600 px-5 py-3 font-semibold text-white transition hover:bg-slate-500"
                    >
                        Siguiente pregunta
                    </button>
                )}
                {/* En la última pregunta, verResultado cambia el índice al final
                    y provoca que se renderice el hermano QuizResult. */}
                {comprobada && esUltimaPregunta && (
                    <button
                        type="button"
                        onClick={verResultado}
                        className="mt-6 rounded-lg bg-slate-600 px-5 py-3 font-semibold text-white transition hover:bg-slate-500"
                    >
                        Ver resultado
                    </button>


                )}

            </form>
        </section>
    );
}

export default QuizPage;

