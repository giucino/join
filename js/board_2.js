const subtasksContainer = document.getElementById("subtasksContainer");

todos.forEach(todo => {
    const todoSubtasksHTML = generateSubtasksHTML(todo.subtasks, todo.id);
    subtasksContainer.innerHTML += todoSubtasksHTML;
});

function generateSubtasksHTML(subtasks, todoId) {
    let subtasksHTML = '';    
    subtasks.forEach((subtask, index) => {
        const checkedAttribute = subtask.done ? 'checked' : '';
        const subtaskHTML = /*html*/`
            <div class="task-slide-subtask">
                <input class="task-slide-subtask-btn" type="checkbox" id="check-box${index}" data-todo-id="${todoId}" data-subtask-index="${index}" ${checkedAttribute} onclick="updateSubtask(this)">
                <span class="task-slide-subtask-text">${subtask.title}</span>
            </div>
        `;
        subtasksHTML += subtaskHTML;
    });    
    return subtasksHTML;
}

function updateSubtask(checkbox) {
    const todoId = parseInt(checkbox.getAttribute('data-todo-id'));
    const subtaskIndex = parseInt(checkbox.getAttribute('data-subtask-index'));
    todos[todoId].subtasks[subtaskIndex].done = checkbox.checked;
    console.log(todos); 
    pushData();
    updateProgressBar(todoId);
}

function updateProgressBar(todoId) {
    const progressBar = document.getElementById(`progress-bar${todoId}`);
    const subtasks = todos[todoId].subtasks;
    
    const doneSubtasks = subtasks.filter(subtask => subtask.done).length;
    const progressPercentage = (doneSubtasks / subtasks.length) * 100;

    progressBar.style.width = `${progressPercentage}%`;
}

