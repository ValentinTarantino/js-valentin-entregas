document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('boton').addEventListener('click', () => {
        const taskInput = document.getElementById('tareaNueva');
        const taskTexto = taskInput.value.trim();
        Toastify({
            text: "Tarea agregada",
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #36d1dc, #5b86e5)",
            }


        }).showToast();
        if (taskTexto !== "") {
            añadirTarea(taskTexto);
            guardarTareas();
            taskInput.value = '';
        }
    });
});
cargarTareas();
obtenerTareas();
