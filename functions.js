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
    borrarBtn.textContent = 'X';
    borrarBtn.classList.add('borrar');
    borrarBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        Toastify({
            text: "¡Tarea completada!",
            duration: 3000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
        guardarTareas();
        console.log(`Tarea completada: ${text}`);
    });
    li.appendChild(borrarBtn);
    taskList.appendChild(li);
    console.log(`Añadiendo tarea: ${text} - ${fecha}`);
}

function guardarTareas() {
    const tareas = [];
    document.querySelectorAll('#taskLista li').forEach(li => {
        const texto = li.firstChild.textContent.split(' (Creada el: ')[0].trim();
        const fecha = li.getAttribute('data-fecha');
        tareas.push({ texto, fecha });
    });
    localStorage.setItem('tareas', JSON.stringify(tareas));
    console.log('Tareas guardadas:', tareas);
}

function cargarTareas() {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
    tareasGuardadas.forEach(tarea => añadirTarea(tarea.texto || 'Tarea sin título', tarea.fecha));
    console.log('Tareas cargadas:', tareasGuardadas);
}

function obtenerTareasLocales() {
    return JSON.parse(localStorage.getItem('tareas')) || [];
}

async function obtenerTareas() {
    const tareasLocales = obtenerTareasLocales();
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const tareasAPI = await response.json();
        const tareasNuevas = tareasAPI.filter(tareaAPI =>
            !tareasLocales.some(tareaLocal =>
                tareaLocal.texto === (tareaAPI.title || 'Tarea sin título') ||
                tareaLocal.fecha === tareaAPI.fecha
            )
        );
        console.log('Tareas de la API:', tareasNuevas);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
    }
}