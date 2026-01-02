

const addTask = (e) => {
    e.preventDefault();

    
    let taskDescription = document.querySelector('#taskDesc').value;


   
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
    let chekTask = document.createElement('input');
    chekTask.type = 'checkbox';
    

    let taskDescP = document.createElement('p');
    taskDescP.textContent = taskDescription;

   
    taskDiv.appendChild(taskDescP);
    taskDiv.appendChild(chekTask)
    taskDiv.appendChild(remove);

    document.querySelector('#div4').appendChild(taskDiv);
    form.reset();

    

    function removeTask() {
        this.parentElement.remove();

    }
    remove.addEventListener('click', removeTask);

    chekTask.addEventListener('change', ()=>{
        taskDiv.style.backgroundColor = chekTask.checked ? '#fff092' : ''
    })


}
let form = document.querySelector('#form');

form.addEventListener("submit", addTask);

