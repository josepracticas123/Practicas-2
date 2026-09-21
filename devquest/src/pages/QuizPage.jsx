import preguntas from "../data/Preguntas";
import { useState } from "react";
import QuizQuestions from "../components/QuizQuestions";

function QuizPage() {
    // Guardamos el id de la opción que el usuario seleccione.
    // Empieza en null porque todavía no hay ninguna seleccionada.
    const [seleccionadaId, setSeleccionadaId] = useState(null);

    // Estado que indica si la respuesta ya ha sido comprobada.
    const [comprobada, setComprobada] = useState(false);

    // Marca la respuesta como comprobada.
    const comprobarRespuesta = (event) => {
        event.preventDefault();

        // Comparamos la opción que ha seleccionado el usuario
        // con el ID de la respuesta correcta de la pregunta.
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

            <form onSubmit={comprobarRespuesta} className="mx-auto w-full max-w-2xl px-4 sm:px-0">

                {/* Pasamos al componente hijo los datos y acciones que necesita para mostrar la pregunta. */}
                <QuizQuestions
                    pregunta={preguntas[0]}
                    seleccionadaId={seleccionadaId}
                    onSeleccionar={setSeleccionadaId}
                    comprobada={comprobada}
                />
                {/* mensaje de si es correcta o incorrecta la respuesta*/}
                 {comprobada && (
                    <p>{esCorrecta} ? "Correcto!" : "Incorrecto"</p> // Es un operador ternario.
                    )}


                {/* boton que dispara el onsubmit*/}
                <button
                    type="submit">
                    Comprobar respuesta
                </button>

            </form>
        </section>
    );
}

export default QuizPage;