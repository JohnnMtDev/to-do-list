// Selección de elementos del DOM con tipado
var form = document.querySelector('#form');
var taskContainer = document.querySelector('#div4');
var taskDesc = document.querySelector('#taskDesc'); // Asegúrate de tener un input con id="taskDesc"
/* ---------- LOCAL STORAGE HELPERS ---------- */
var getTasks = function () {
    var tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
};
var saveTasks = function (tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
/* ---------- CREATE TASK ---------- */
var createTaskElement = function (task) {
    var taskDiv = document.createElement('div');
    taskDiv.className = 'divTask';
    var taskText = document.createElement('p');
    taskText.textContent = task.text;
    var actions = document.createElement('div');
    actions.className = 'task-actions';
    var checkIcon = document.createElement('i');
    checkIcon.className = "bi bi-check-circle ".concat(task.completed ? 'check-icon' : '');
    var deleteIcon = document.createElement('i');
    deleteIcon.className = 'bi bi-trash delete-icon';
    if (task.completed) {
        taskDiv.style.backgroundColor = '#fff092';
    }
    /* EVENTS */
    checkIcon.addEventListener('click', function () {
        task.completed = !task.completed;
        taskDiv.style.backgroundColor = task.completed ? '#fff092' : '';
        saveTasks(getTasks().map(function (t) { return t.id === task.id ? task : t; }));
    });
    deleteIcon.addEventListener('click', function () {
        saveTasks(getTasks().filter(function (t) { return t.id !== task.id; }));
        taskDiv.remove();
    });
    actions.appendChild(checkIcon);
    actions.appendChild(deleteIcon);
    taskDiv.appendChild(taskText);
    taskDiv.appendChild(actions);
    return taskDiv;
};
/* ---------- ADD TASK ---------- */
var addTask = function (e) {
    e.preventDefault();
    var taskDescription = taskDesc.value.trim();
    if (taskDescription.length < 10 || taskDescription.length > 200) {
        alert('Task must be between 10 and 200 characters');
        return;
    }
    var newTask = {
        id: Date.now(),
        text: taskDescription,
        completed: false
    };
    var tasks = getTasks();
    tasks.push(newTask);
    saveTasks(tasks);
    taskContainer.appendChild(createTaskElement(newTask));
    form.reset();
};
/* ---------- LOAD ---------- */
form.addEventListener('submit', addTask);
getTasks().forEach(function (task) { return taskContainer.appendChild(createTaskElement(task)); });
