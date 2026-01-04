const addTask = (e: SubmitEvent) => {
    e.preventDefault();

    const taskInput = document.querySelector('#taskDesc') as HTMLInputElement;
    const taskDescription = taskInput.value.trim();

    // Validaciones
    if (!taskDescription) {
        alert("The task description cannot be empty.");
        return;
    }
    if (taskDescription.length < 10 || taskDescription.length > 200) {
        alert("The task description must be between 10 and 200 characters.");
        return;
    }
    if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,-]+$/.test(taskDescription)) {
        alert("The task description contains invalid characters.");
        return;
    }

    // Crear elementos
    const taskDiv = document.createElement('div');
    taskDiv.className = 'divTask';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';

    const checkTask = document.createElement('input');
    checkTask.type = 'checkbox';

    const taskDescP = document.createElement('p');
    taskDescP.textContent = taskDescription;

    taskDiv.appendChild(taskDescP);
    taskDiv.appendChild(checkTask);
    taskDiv.appendChild(removeBtn);

    // Agregar a la lista
    const taskContainer = document.querySelector('#div4')!;
    taskContainer.appendChild(taskDiv);

    // Reset formulario solo si se agregó la tarea
    (document.querySelector('#form') as HTMLFormElement).reset();

    // Eventos
    removeBtn.addEventListener('click', () => {
        taskDiv.remove();
    });

    checkTask.addEventListener('change', () => {
        taskDiv.style.backgroundColor = checkTask.checked ? '#fff092' : '';
    });
}

const form = document.querySelector('#form') as HTMLFormElement | null;
form.addEventListener("submit", addTask);
if (form) {
    form.addEventListener("submit", addTask);
} else {
    console.error("No se encontró el formulario con id 'form'");
}

