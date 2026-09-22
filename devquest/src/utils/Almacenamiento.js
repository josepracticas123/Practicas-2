// Clave propia donde guardamos las tareas en localStorage.
const CLAVE_TAREAS = "devquest.tareas.v1";

// Lee la lista real de tareas que TareasPage guardó en localStorage.
// Si los datos no se pueden utilizar, devuelve [] para iniciar el estado vacío.
export function leerTareasGuardadas() {
  try {
    const tareasGuardadas = localStorage.getItem(CLAVE_TAREAS);
    // Si no existe la clave, empezamos con una lista vacía.
    if (tareasGuardadas === null) {
      return [];
    }
    // JSON.parse convierte el texto guardado en datos de JavaScript. Si el texto
    // no es JSON válido, el catch devuelve una lista vacía.
    const tareasParseadas = JSON.parse(tareasGuardadas);
    // Primero comprobamos que el dato principal sea un array de tareas.
    if (!Array.isArray(tareasParseadas)) {
      return [];
    }

    // Guardamos los IDs ya vistos. Set no permite valores repetidos, por lo que
    // sirve para detectar dos tareas guardadas con la misma identidad.
    const ids = new Set();

    // every comprueba que todas las tareas tengan la estructura que usa este
    // proyecto: objeto, id y texto no vacíos, y completada booleana.
    const tareasValidas = tareasParseadas.every((tarea) => {
      if (
        tarea === null ||
        typeof tarea !== "object" ||
        typeof tarea.id !== "string" ||
        tarea.id.trim() === "" ||
        typeof tarea.texto !== "string" ||
        tarea.texto.trim() === "" ||
        typeof tarea.completada !== "boolean"
      ) {
        return false;
      }
      // Si el ID ya apareció, los datos guardados no son válidos. Se rechaza
      // la lista completa para evitar dos tareas con la misma identidad.
      if (ids.has(tarea.id)) {
        return false;
      }

      ids.add(tarea.id);
      return true;
    });

    if (!tareasValidas) {
      // Si una sola tarea falla o hay IDs repetidos, rechazamos toda la lista
      // y el estado inicial será []. No usamos datos parcialmente válidos.
      return [];
    }

    return tareasParseadas;
  } catch (error) {
    // Controla JSON inválido u otro error de lectura. La aplicación continúa
    // con una lista vacía en lugar de romperse al iniciar.
    console.error("No se pudieron recuperar las tareas:", error);
    return [];
  }
}
// Recibe desde TareasPage la lista real completa y la guarda en localStorage.
export function guardarTareas(tareas) {
  try {
    // JSON.stringify convierte el array en texto porque localStorage solo guarda
    // cadenas. También guarda [] cuando se elimina la última tarea.
    localStorage.setItem(CLAVE_TAREAS, JSON.stringify(tareas));
  } catch (error) {
    // Si guardar falla, la app puede seguir usando el estado que tiene en memoria.
    console.error("No se pudieron guardar las tareas:", error);
  }
}