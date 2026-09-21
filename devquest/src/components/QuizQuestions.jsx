
// Hijo de quizPage y recoge y muestra la pregunta y avisa de la opción seleccionada.
function QuizQuestions({
    pregunta,
    seleccionadaId,
    onSeleccionar,
    comprobada,
}
) {

return(

    <fieldset className="rounded-xl bg-gray-800 p-6 sm:p-8">

        {/* Mostramos el enunciado de la pregunta. */}
        <legend className="relative top-10 w-full text-center text-xl font-bold sm:text-2xl">
            {pregunta.enunciado}
        </legend>

        <ul className="mt-6 space-y-3">
            {/* Recorremos las opciones de la pregunta. */}
            {pregunta.opciones.map((opcion) => (
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
                            onChange={() => onSeleccionar(opcion.id)}
                            disabled = {comprobada}
                        />

                        <span>{opcion.texto}</span>
                    </label>
                </li>
            ))}
        </ul>
    </fieldset>
    )

}
export default QuizQuestions;