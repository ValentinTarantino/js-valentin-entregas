function tareaNueva(texto, fecha = null, prioridad = "media") {
    const listaTareas = document.getElementById("listaTareas");
    if (!fecha) {
        const fechaCreacion = new Date();
        fecha =
            fechaCreacion.toLocaleDateString() +
            " " +
            fechaCreacion.toLocaleTimeString();
    }
    const li = document.createElement("li");
    li.textContent = `${texto} (Creada el: ${fecha}, Prioridad: ${prioridad})`;
    li.setAttribute("data-fecha", fecha);
    li.setAttribute("data-prioridad", prioridad);

    const completarBtn = document.createElement("button");
    completarBtn.textContent = "Completar";
    completarBtn.addEventListener("click", () => {
        moverACompletadas(texto, fecha);
        listaTareas.removeChild(li);
        guardarTareas();
    });

    li.appendChild(completarBtn);
    listaTareas.appendChild(li);

    ordenarTareasPorPrioridad();
}

function ordenarTareasPorPrioridad() {
    const listaTareas = document.getElementById("listaTareas");
    const tareas = Array.from(listaTareas.children);

    tareas.sort((a, b) => {
        const prioridades = { alta: 1, media: 2, baja: 3 };
        return (
            prioridades[a.getAttribute("data-prioridad")] -
            prioridades[b.getAttribute("data-prioridad")]
        );
    });

    listaTareas.innerHTML = "";
    tareas.forEach((tarea) => listaTareas.appendChild(tarea));
}

function moverACompletadas(texto, fecha) {
    const listaTareasCompletadas = document.getElementById(
        "listaTareasCompletadas"
    );
    const li = document.createElement("li");
    const fechaCompletado = new Date().toLocaleString();
    li.textContent = `${texto} (Completada el: ${fechaCompletado})`;
    li.setAttribute("data-fecha-completado", fechaCompletado);
    listaTareasCompletadas.appendChild(li);
    guardarTareasCompletadas();
    Toastify({
        text: "Tarea completada",
        duration: 3000,
        style: { background: "linear-gradient(to right, #00b09b, #96c93d)" },
    }).showToast();
}

function guardarTareas() {
    const tareas = [];
    document.querySelectorAll("#listaTareas li").forEach((li) => {
        const texto = li.firstChild.textContent.split(" (Creada el: ")[0].trim();
        const fecha = li.getAttribute("data-fecha");
        const prioridad = li.getAttribute("data-prioridad");
        tareas.push({ texto, fecha, prioridad });
    });
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargarTareas() {
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareasGuardadas.sort((a, b) => {
        const prioridades = { alta: 1, media: 2, baja: 3 };
        return prioridades[a.prioridad] - prioridades[b.prioridad];
    });
    tareasGuardadas.forEach((tarea) =>
        tareaNueva(tarea.texto, tarea.fecha, tarea.prioridad)
    );
}

function guardarTareasCompletadas() {
    const tareasCompletadas = [];
    document.querySelectorAll("#listaTareasCompletadas li").forEach((li) => {
        tareasCompletadas.push(li.textContent);
    });
    localStorage.setItem("tareasCompletadas", JSON.stringify(tareasCompletadas));
}

function cargarTareasCompletadas() {
    const tareasGuardadas =
        JSON.parse(localStorage.getItem("tareasCompletadas")) || [];
    const listaTareasCompletadas = document.getElementById(
        "listaTareasCompletadas"
    );
    tareasGuardadas.forEach((tarea) => {
        const li = document.createElement("li");
        li.textContent = tarea;
        listaTareasCompletadas.appendChild(li);
    });
}

async function obtenerTareasDesdeJSON() {
    const tareasLocales = JSON.parse(localStorage.getItem("tareas")) || [];
    if (tareasLocales.length > 0) return;

    try {
        const response = await fetch("./tareas.json");
        const tareasJSON = await response.json();
        tareasJSON.forEach((tarea) =>
            tareaNueva(tarea.texto, tarea.fecha, tarea.prioridad)
        );
        guardarTareas();
    } catch (error) {
        console.error("Error al cargar tareas desde JSON:", error);
    }
}
