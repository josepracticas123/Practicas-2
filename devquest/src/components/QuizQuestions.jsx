
// QuizQuestions es hijo de QuizPage. QuizResult también es hijo de QuizPage;
// por eso QuizQuestions y QuizResult son hermanos y no se renderizan uno dentro
// del otro. Este componente muestra la pregunta actual y sus opciones.
// Recibe datos y funciones del padre mediante props.
function QuizQuestions({
    // Contiene el enunciado de la pregunta actual y sus opciones.
    pregunta,
    // Contiene el ID de la opción que está seleccionada.
    seleccionadaId,
    // Es una función del padre que el hijo puede llamar para avisar de una selección.
    onSeleccionar,
    // Indica si la respuesta ya fue confirmada en QuizPage.
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
            {/* Recorremos y mostramos cada opción de la pregunta actual. */}
            {pregunta.opciones.map((opcion) => (
                <li key={opcion.id}>
                    <label
                        htmlFor={opcion.id}
                        className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg bg-gray-700 p-3 text-sm hover:bg-gray-600 sm:p-4 sm:text-base"
                    >
                        {/* El padre controla seleccionadaId y lo recibimos por props.
                            Después de confirmar, comprobada es true y disabled
                            impide cambiar la respuesta de esta pregunta.
                            Cuando el usuario elige un radio, el hijo llama a
                            onSeleccionar con el ID de esa opción. Esta prop
                            es realmente setSeleccionadaId, una función del
                            padre QuizPage. Así el hijo avisa al padre, el
                            padre actualiza su estado y React vuelve a renderizar
                            este componente con el nuevo seleccionadaId. */}
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