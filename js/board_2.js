const subtasksContainer = document.getElementById("subtasksContainer");

todos.forEach(todo => {
    const todoSubtasksHTML = generateSubtasksHTML(todo.subtasks, todo.id);
    subtasksContainer.innerHTML += todoSubtasksHTML;
});

function generateSubtasksHTML(subtasks, todoId) {
    let subtasksHTML = '';    
    subtasks.forEach((subtask, index) => {
        const checkedAttribute = subtask.done ? 'checked' : ''; // Zustand der Checkbox basierend auf "done" setzen
        const subtaskHTML = /*html*/`
            <div class="task-slide-subtask">
                <input class="task-slide-subtask-btn" type="checkbox" data-todo-id="${todoId}" data-subtask-index="${index}" ${checkedAttribute}>
                <span class="task-slide-subtask-text">${subtask.title}</span>
            </div>
        `;
        subtasksHTML += subtaskHTML;
    });    
    return subtasksHTML;
}

subtasksContainer.addEventListener('change', function(event) {
    if (event.target.classList.contains('task-slide-subtask-btn')) {
        const todoId = parseInt(event.target.getAttribute('data-todo-id'));
        const subtaskIndex = parseInt(event.target.getAttribute('data-subtask-index'));
        todos[todoId].subtasks[subtaskIndex].done = event.target.checked;
        pushData()
    }
});

function updateProgress() {
    let totalSubtasks = 0;
    let completedSubtasks = 0;

    for (const todo of todos) {
        totalSubtasks += todo.subtasks.length;
        for (const subtask of todo.subtasks) {
            if (subtask.done) {
                completedSubtasks++;
            }
        }
    }

    const progressBar = document.getElementById('progress-bar');
    const numberTasks = document.getElementById('number-tasks');
    const allTasks = document.getElementById('all-tasks');

    const progressPercentage = (completedSubtasks / totalSubtasks) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    numberTasks.textContent = completedSubtasks;
    allTasks.textContent = totalSubtasks;
}
updateProgress();
