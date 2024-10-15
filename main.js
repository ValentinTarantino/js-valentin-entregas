document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('boton').addEventListener('click', () => {
        const taskInput = document.getElementById('tareaNueva');
        const taskTexto = taskInput.value.trim();

        if (taskTexto !== "") {
            añadirTarea(taskTexto);
            guardarTareas();
            taskInput.value = '';
        }
    });

    cargarTareas();
});