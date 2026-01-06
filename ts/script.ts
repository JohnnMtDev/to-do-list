interface Task {
    id: number;
    text: string;
    completed: boolean;
}

class TaskManager {
    private form: HTMLFormElement;
    private taskContainer: HTMLDivElement;
    private taskDesc: HTMLInputElement;

    constructor(formId: string, containerId: string, inputId: string) {
        const form = document.querySelector<HTMLFormElement>(formId);
        const container = document.querySelector<HTMLDivElement>(containerId);
        const input = document.querySelector<HTMLInputElement>(inputId);

        if (!form || !container || !input) {
            throw new Error('Elementos del DOM no encontrados');
        }

        this.form = form;
        this.taskContainer = container;
        this.taskDesc = input;

        this.loadTasks();
        this.form.addEventListener('submit', (e) => this.addTask(e));
    }

    private getTasks(): Task[] {
        try {
            const tasks = localStorage.getItem('tasks');
            return tasks ? (JSON.parse(tasks) as Task[]) : [];
        } catch {
            return [];
        }
    }

    private saveTasks(tasks: Task[]): void {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch {
            console.error('Error guardando tareas');
        }
    }

    private createTaskElement(task: Task): HTMLDivElement {
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

        if (task.completed) taskDiv.style.backgroundColor = '#fff092';

        checkIcon.addEventListener('click', () => {
            task.completed = !task.completed;
            taskDiv.style.backgroundColor = task.completed ? '#fff092' : '';
            const tasks = this.getTasks().map(t => t.id === task.id ? task : t);
            this.saveTasks(tasks);
        });

        deleteIcon.addEventListener('click', () => {
            const tasks = this.getTasks().filter(t => t.id !== task.id);
            this.saveTasks(tasks);
            taskDiv.remove();
        });

        actions.appendChild(checkIcon);
        actions.appendChild(deleteIcon);

        taskDiv.appendChild(taskText);
        taskDiv.appendChild(actions);

        return taskDiv;
    }

    private addTask(e: Event): void {
        e.preventDefault();

        const taskDescription = this.taskDesc.value.trim();
        if (taskDescription.length < 10 || taskDescription.length > 200) {
            alert('Task must be between 10 and 200 characters');
            return;
        }

        const newTask: Task = {
            id: Date.now(),
            text: taskDescription,
            completed: false
        };

        const tasks = this.getTasks();
        tasks.push(newTask);
        this.saveTasks(tasks);

        this.taskContainer.appendChild(this.createTaskElement(newTask));
        this.form.reset();
    }

    private loadTasks(): void {
        const tasks = this.getTasks();
        tasks.forEach(task => this.taskContainer.appendChild(this.createTaskElement(task)));
    }
}

// Inicialización
new TaskManager('#form', '#div4', '#taskDesc');
