// Muestra el resultado final del quiz y permite volver a empezar.
// Recibe las preguntas, las respuestas guardadas y la función para reiniciar.
function QuizResult({ preguntas, respuestasConfirmadas, onVolverAJugar }) {
    // filter conserva las preguntas respondidas correctamente.
    // length cuenta cuántas hay para mostrar el total de aciertos.
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
                {/* Creamos un bloque de resultado para cada pregunta. */}
                {preguntas.map((pregunta) => {
                    // Recuperamos la opción que el usuario guardó para esta pregunta.
                    const respuestaUsuarioId =
                        respuestasConfirmadas[pregunta.id];

                    // find busca la opción cuyo ID coincide con la respuesta del usuario.
                    const respuestaUsuario = pregunta.opciones.find(
                        (opcion) => opcion.id === respuestaUsuarioId
                    );

                    // Buscamos en los datos la opción que era correcta.
                    const respuestaCorrecta = pregunta.opciones.find(
                        (opcion) =>
                            opcion.id === pregunta.respuestaCorrectaId
                    );

                    // Comparamos los IDs para saber si la respuesta fue correcta.
                    const esCorrecta =
                        respuestaUsuarioId === pregunta.respuestaCorrectaId;

                    return (
                        <article
                            // El ID estable identifica cada bloque de pregunta en el map.
                            key={pregunta.id}
                            className="rounded-lg bg-gray-800 p-6"
                        >

                            <p className="mb-4">
                                {pregunta.enunciado}
                            </p>

                            {/* El operador ?. evita un error si no se encuentra una opción. */}
                            <p>
                                <strong>Tu respuesta:</strong>{" "}
                                {respuestaUsuario?.texto}
                            </p>

                            <p>
                                <strong>Respuesta correcta:</strong>{" "}
                                {respuestaCorrecta?.texto}
                            </p>

                            {/* El ternario muestra un texto distinto según el resultado. */}
                            <p
                                className={`mt-2 font-semibold ${esCorrecta
                                    ? "text-green-400"
                                    : "text-red-400"
                                    }`}
                            >
                                {esCorrecta ? "Correcta" : "Incorrecta"}
                            </p>

                            {/* Cada pregunta muestra la explicación guardada en sus datos. */}
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
                {/* Al pulsar, ejecutamos la función recibida para reiniciar el quiz. */}
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