function añadirTarea(text, fecha = null) {
    const taskList = document.getElementById('taskLista');
    const li = document.createElement('li');

    if (!fecha) {
        const fechaCreacion = new Date();
        fecha = fechaCreacion.toLocaleDateString() + ' ' + fechaCreacion.toLocaleTimeString();
    }

    li.textContent = `${text} (Creada el: ${fecha})`;
    li.setAttribute('data-fecha', fecha);

    const borrarBtn = document.createElement('button');
    borrarBtn.textContent = 'Eliminar';
    borrarBtn.classList.add('borrar');

    borrarBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        guardarTareas();
    });

    li.appendChild(borrarBtn);
    taskList.appendChild(li);
}

function guardarTareas() {
    const tareas = [];
    document.querySelectorAll('#taskLista li').forEach(li => {
        const texto = li.firstChild.textContent.split(' (Creada el: ')[0].trim();
        const fecha = li.getAttribute('data-fecha');
        tareas.push({texto, fecha});
    });
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarTareas() {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareasGuardadas.forEach(tarea => añadirTarea(tarea.texto, tarea.fecha));
}