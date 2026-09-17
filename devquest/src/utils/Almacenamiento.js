//variable qu eusaremos en el local stroage para guardar las tareas
const CLAVE_TAREAS = "devquest.tareas.v1";

// Función para leer las tareas guardadas en el localStorage
export function leerTareasGuardadas() {
  try {
    const tareasGuardadas = localStorage.getItem(CLAVE_TAREAS);
// Si no hay tareas guardadas, devolvemos un array vacío
    if (tareasGuardadas === null) {
      return [];
    }
// Intentamos parsear las tareas guardadas y validarlas
    const tareasParseadas = JSON.parse(tareasGuardadas);
// Validamos que sea un array y que cada tarea tenga las propiedades correctas
    if (!Array.isArray(tareasParseadas)) {
      return [];
    }

    const ids = new Set();
// Validamos que cada tarea tenga las propiedades correctas y que no haya ids duplicados
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

    if (!tareasValidas) {
      return [];
    }

    return tareasParseadas;
  } catch (error) {
    console.error("No se pudieron recuperar las tareas:", error);
    return [];
  }
}
// Función para guardar las tareas en el localStorage
export function guardarTareas(tareas) {
  try {
    localStorage.setItem(CLAVE_TAREAS, JSON.stringify(tareas));
  } catch (error) {
    console.error("No se pudieron guardar las tareas:", error);
  }
}