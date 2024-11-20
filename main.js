document.addEventListener("DOMContentLoaded", () => {
    const botonAñadir = document.getElementById("boton");
    const borrarCompletadas = document.getElementById("borrarCompletadas");

    botonAñadir.addEventListener("click", () => {
        const taskInput = document.getElementById("nuevaTarea");
        const texto = taskInput.value.trim();
        if (!texto) {
            Toastify({
                text: "No se puede añadir una tarea vacía",
                duration: 3000,
                style: { background: "linear-gradient(to right, #d9534f, #c9302c)" },
            }).showToast();
            return;
        }

        const prioridad = document.getElementById("prioridad").value;
        tareaNueva(texto, null, prioridad);
        guardarTareas();
        taskInput.value = "";
    });

    borrarCompletadas.addEventListener("click", () => {
        const listaTareasCompletadas = document.getElementById("listaTareasCompletadas");
        if (listaTareasCompletadas.children.length === 0) {
            Toastify({
                text: "No hay tareas para eliminar",
                duration: 3000,
                style: { background: "linear-gradient(to right, #d9534f, #c9302c)" },
            }).showToast();
        } else {
            listaTareasCompletadas.innerHTML = "";
            localStorage.removeItem("tareasCompletadas");
            Toastify({
                text: "Todas las tareas completadas fueron eliminadas",
                duration: 3000,
                style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
            }).showToast();
        }
    });

    cargarTareas();
    cargarTareasCompletadas();
    obtenerTareasDesdeJSON();
});
