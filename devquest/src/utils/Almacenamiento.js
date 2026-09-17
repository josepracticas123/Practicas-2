// Clave propia donde guardamos las tareas en localStorage.
const CLAVE_TAREAS = "devquest.tareas.v1";

// Lee las tareas guardadas y devuelve [] si no son utilizables.
export function leerTareasGuardadas() {
  try {
    const tareasGuardadas = localStorage.getItem(CLAVE_TAREAS);
  // Si no existe la clave, empezamos con una lista vacía.
    if (tareasGuardadas === null) {
      return [];
    }
  // JSON.parse convierte el texto guardado en datos de JavaScript.
    const tareasParseadas = JSON.parse(tareasGuardadas);
  // Primero comprobamos que el dato principal sea un array.
    if (!Array.isArray(tareasParseadas)) {
      return [];
    }

    const ids = new Set(); // Set ayuda a detectar ids repetidos.
    // every comprueba que todas las tareas tengan la forma esperada.
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

      if (ids.has(tarea.id)) {
        return false;
      }

      ids.add(tarea.id);
      return true;
    });

    if (!tareasValidas) { // Si una falla, rechazamos toda la lista.
      return [];
    }

    return tareasParseadas;
  } catch (error) { // Controla errores de lectura o de JSON.
    console.error("No se pudieron recuperar las tareas:", error);
    return [];
  }
}
// Convierte y guarda la lista completa de tareas.
export function guardarTareas(tareas) {
  try {
    // JSON.stringify convierte el array en texto para localStorage.
    localStorage.setItem(CLAVE_TAREAS, JSON.stringify(tareas));
  } catch (error) { // Si falla, la app puede seguir usando la memoria.
    console.error("No se pudieron guardar las tareas:", error);
  }
}