var addTask = function (e) {
    e.preventDefault();
    var taskInput = document.querySelector('#taskDesc');
    var taskDescription = taskInput.value.trim();
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
    var taskDiv = document.createElement('div');
    taskDiv.className = 'divTask';
    var removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    var checkTask = document.createElement('input');
    checkTask.type = 'checkbox';
    var taskDescP = document.createElement('p');
    taskDescP.textContent = taskDescription;
    taskDiv.appendChild(taskDescP);
    taskDiv.appendChild(checkTask);
    taskDiv.appendChild(removeBtn);
    // Agregar a la lista
    var taskContainer = document.querySelector('#div4');
    taskContainer.appendChild(taskDiv);
    // Reset formulario solo si se agregó la tarea
    document.querySelector('#form').reset();
    // Eventos
    removeBtn.addEventListener('click', function () {
        taskDiv.remove();
    });
    checkTask.addEventListener('change', function () {
        taskDiv.style.backgroundColor = checkTask.checked ? '#fff092' : '';
    });
};
var form = document.querySelector('#form');
form.addEventListener("submit", addTask);
if (form) {
    form.addEventListener("submit", addTask);
}
else {
    console.error("No se encontró el formulario con id 'form'");
}
