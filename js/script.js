const form = document.querySelector('#form');
const taskContainer = document.querySelector('#div4');

/* ---------- LOCAL STORAGE HELPERS ---------- */
const getTasks = () => JSON.parse(localStorage.getItem('tasks')) || [];
const saveTasks = (tasks) => localStorage.setItem('tasks', JSON.stringify(tasks));

/* ---------- CREATE TASK ---------- */
const createTaskElement = (task) => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'divTask';

    const taskText = document.createElement('p');
    taskText.textContent = task.text;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const checkIcon = document.createElement('i');
    checkIcon.className = `bi bi-check-circle ${task.completed ? 'check-icon' : ''}`;

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'bi bi-trash delete-icon';

    if (task.completed) {
        taskDiv.style.backgroundColor = '#fff092';
    }

    /* EVENTS */
    checkIcon.addEventListener('click', () => {
        task.completed = !task.completed;
        taskDiv.style.backgroundColor = task.completed ? '#fff092' : '';
        saveTasks(getTasks().map(t => t.id === task.id ? task : t));
    });

    deleteIcon.addEventListener('click', () => {
        saveTasks(getTasks().filter(t => t.id !== task.id));
        taskDiv.remove();
    });

    actions.appendChild(checkIcon);
    actions.appendChild(deleteIcon);

    taskDiv.appendChild(taskText);
    taskDiv.appendChild(actions);

    return taskDiv;
};

/* ---------- ADD TASK ---------- */
const addTask = (e) => {
    e.preventDefault();

    const taskDescription = taskDesc.value.trim();
    if (taskDescription.length < 10 || taskDescription.length > 200) {
        alert('Task must be between 10 and 200 characters');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskDescription,
        completed: false
    };

    const tasks = getTasks();
    tasks.push(newTask);
    saveTasks(tasks);

    taskContainer.appendChild(createTaskElement(newTask));
    form.reset();
};

/* ---------- LOAD ---------- */
form.addEventListener('submit', addTask);
getTasks().forEach(task => taskContainer.appendChild(createTaskElement(task)));
