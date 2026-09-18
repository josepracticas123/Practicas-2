import preguntas from "../data/Preguntas";
import { useState } from "react";

function QuizPage() {
    // Guardamos el id de la opción que el usuario seleccione.
    // Empieza en null porque todavía no hay ninguna seleccionada.
    const [seleccionadaId, setSeleccionadaId] = useState(null);

    return (
        <section className="px-6 py-20 text-white">
            <h1 className="mb-8 text-center text-4xl font-bold">
                Quiz de React
            </h1>

            <form className="mx-auto w-full max-w-2xl px-4 sm:px-0">
                <fieldset className="rounded-xl bg-gray-800 p-6 sm:p-8">

                    {/* Mostramos el enunciado de la primera pregunta. */}
                    <legend className="relative top-6 w-full text-center text-xl font-bold sm:text-2xl">
                        {preguntas[0].enunciado}
                    </legend>

                    <ul className="mt-6 space-y-3">
                        {/* Recorremos las opciones de la pregunta. */}
                        {preguntas[0].opciones.map((opcion) => (
                            <li key={opcion.id}>
                                <label
                                    htmlFor={opcion.id}
                                    className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg bg-gray-700 p-3 text-sm hover:bg-gray-600 sm:p-4 sm:text-base"
                                >
                                    {/* El estado controla qué opción está seleccionada. */}
                                    <input
                                        id={opcion.id}
                                        type="radio"
                                        name="pregunta"
                                        checked={seleccionadaId === opcion.id}
                                        onChange={() =>
                                            setSeleccionadaId(opcion.id)
                                        }
                                    />

                                    <span>{opcion.texto}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </fieldset>
            </form>
        </section>
    );
}

export default QuizPage;