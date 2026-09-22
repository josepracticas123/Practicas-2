// QuizResult es hijo de QuizPage y se muestra cuando el padre termina el quiz.
// QuizQuestions es su hermano: QuizPage decide cuál de los dos renderiza.
// Este componente recibe por props las preguntas, las respuestas confirmadas
// y una función del padre para volver a empezar.
function QuizResult({ preguntas, respuestasConfirmadas, onVolverAJugar }) {
    // Recorremos todas las preguntas y comparamos la respuesta guardada del
    // usuario con la respuesta correcta. filter conserva solo las coincidencias
    // y length cuenta cuántas respuestas correctas hay.
    const respuestasCorrectas = preguntas.filter(
        (pregunta) =>
            respuestasConfirmadas[pregunta.id] === pregunta.respuestaCorrectaId
    ).length;

    return (
        <section className="px-6 py-20 text-white">
            <h1 className="mb-8 text-center text-4xl font-bold">
                Resultado
            </h1>

            <p className="mb-10 text-center text-xl">
                Has acertado {respuestasCorrectas} de {preguntas.length}
            </p>

            <div className="mx-auto w-full max-w-2xl space-y-6">
                {/* Creamos un bloque de resultado para cada pregunta y mostramos
                    la respuesta guardada, la correcta y su explicación. */}
                {preguntas.map((pregunta) => {
                    // Obtenemos el ID de la respuesta que QuizPage guardó para
                    // esta pregunta dentro de respuestasConfirmadas.
                    const respuestaUsuarioId =
                        respuestasConfirmadas[pregunta.id];

                    // find busca en las opciones la que coincide con la respuesta
                    // elegida por el usuario para poder mostrar su texto.
                    const respuestaUsuario = pregunta.opciones.find(
                        (opcion) => opcion.id === respuestaUsuarioId
                    );

                    // Buscamos la opción correcta para mostrar su texto.
                    const respuestaCorrecta = pregunta.opciones.find(
                        (opcion) =>
                            opcion.id === pregunta.respuestaCorrectaId
                    );

                    // Comparamos el ID elegido con el ID correcto para saber si
                    // esta respuesta fue correcta o incorrecta.
                    const esCorrecta =
                        respuestaUsuarioId === pregunta.respuestaCorrectaId;

                    return (
                        <article
                            // El ID estable identifica cada bloque creado por map.
                            key={pregunta.id}
                            className="rounded-lg bg-gray-800 p-6"
                        >

                            <p className="mb-4">
                                {pregunta.enunciado}
                            </p>

                            {/* ?. permite acceder al texto sin provocar un error
                                si no se encuentra una opción para ese ID. */}
                            <p>
                                <strong>Tu respuesta:</strong>{" "}
                                {respuestaUsuario?.texto}
                            </p>

                            <p>
                                <strong>Respuesta correcta:</strong>{" "}
                                {respuestaCorrecta?.texto}
                            </p>

                            {/* El ternario muestra "Correcta" o "Incorrecta"
                                según el valor de esCorrecta. */}
                            <p
                                className={`mt-2 font-semibold ${esCorrecta
                                    ? "text-green-400"
                                    : "text-red-400"
                                    }`}
                            >
                                {esCorrecta ? "Correcta" : "Incorrecta"}
                            </p>

                            {/* Cada pregunta muestra la explicación que viene en
                                los datos recibidos por el componente. */}
                            <div className="mt-4 rounded-lg bg-gray-700 p-4">
                                <p className="mb-1 font-semibold">
                                    Explicación
                                </p>

                                <p className="text-gray-200">
                                    {pregunta.explicacion}
                                </p>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="mt-8 text-center">
                {/* Este botón está en el hijo. Al pulsarlo ejecuta la función
                    recibida por props; esa función es realmente volverAJugar,
                    que pertenece al padre QuizPage. El padre limpia sus estados
                    y deja el quiz en su estado inicial. */}
                <button
                    type="button"
                    onClick={onVolverAJugar}
                    className="rounded-lg bg-slate-600 px-5 py-3 font-semibold hover:bg-slate-500"
                >
                    Volver a jugar
                </button>
            </div>
        </section>
    );
}

export default QuizResult;