

const addTask = (e) => {
    e.preventDefault();

    let taskName = document.querySelector('#taskName').value;
    let taskDescription = document.querySelector('#taskDesc').value;


    // Validate task name
    if (!taskName || taskName.trim() === "") {
        alert("The task name cannot be empty.");
    } else if (taskName.length < 3 || taskName.length > 50) {
        alert("The task name must be between 3 and 50 characters.");
    } else if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,-]+$/.test(taskName)) {
        alert("The task name contains invalid characters.");
    } else if (/^\s+$/.test(taskName)) {
        alert("The task name cannot be only whitespace.");
    }

    // Validate task description
    if (!taskDescription || taskDescription.trim() === "") {
        alert("The task description cannot be empty.");
    } else if (taskDescription.length < 10 || taskDescription.length > 200) {
        alert("The task description must be between 10 and 200 characters.");
    } else if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,-]+$/.test(taskDescription)) {
        alert("The task description contains invalid characters.");
    } else if (/^\s+$/.test(taskDescription)) {
        alert("The task description cannot be only whitespace.");
    }

    let taskDiv = document.createElement('div');
    taskDiv.classList ='divTask'; 
    let remove = document.createElement('button');
    remove.textContent = 'Remove';
    
    let taskNameP = document.createElement('p');
    taskNameP.textContent = taskName;

    let taskDescP = document.createElement('p');
    taskDescP.textContent = taskDescription;

    taskDiv.appendChild(taskNameP);
    taskDiv.appendChild(taskDescP);
    taskDiv.appendChild(remove);

    document.querySelector('#div4').appendChild(taskDiv);
    form.reset();

    

    function removeTask() {
        this.parentElement.remove();

    }
    remove.addEventListener('click', removeTask)


}
let form = document.querySelector('#form');

form.addEventListener("submit", addTask);

