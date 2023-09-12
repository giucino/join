// const subtasksContainer = document.getElementById("subtasksContainer");

// todos.forEach(todo => {
//     const todoSubtasksHTML = generateSubtasksHTML(todo.subtasks, todo.id);
//     subtasksContainer.innerHTML += todoSubtasksHTML;
// });

// function generateSubtasksHTML(subtasks, todoId) {
//     let subtasksHTML = '';    
//     subtasks.forEach((subtask, index) => {
//         const checkedAttribute = subtask.done ? 'checked' : '';
//         const subtaskHTML = /*html*/`
//             <div class="task-slide-subtask">
//                 <input class="task-slide-subtask-btn" type="checkbox" id="check-box${index}" data-todo-id="${todoId}" data-subtask-index="${index}" ${checkedAttribute} onclick="updateSubtask(this)">
//                 <span class="task-slide-subtask-text">${subtask.title}</span>
//             </div>
//         `;
//         subtasksHTML += subtaskHTML;
//     });    
//     return subtasksHTML;
// }

// function renderSubtasks(todoId) {
//     const subtasksContainer = document.getElementById("subtasksContainer");

//     if (subtasksContainer) {
//         const todo = todos.find(todo => todo.id === todoId);

//         if (todo && Array.isArray(todo.subtasks)) {
//             let subtasksHTML = '';

//             todo.subtasks.forEach((subtask, index) => {
//                 const checkedAttribute = subtask.done ? 'checked' : '';
//                 const subtaskHTML = /*html*/`
//                     <div class="task-slide-subtask">
//                         <input class="task-slide-subtask-btn" type="checkbox" id="check-box${index}" data-todo-id="${todoId}" data-subtask-index="${index}" ${checkedAttribute} onclick="updateSubtask(this)">
//                         <span class="task-slide-subtask-text">${subtask.title}</span>
//                     </div>
//                 `;
//                 subtasksHTML += subtaskHTML;
//             });

//             subtasksContainer.innerHTML = subtasksHTML;
//         }
//     }
// }


async function updateSubtaskStatus(taskId, subtaskIndex, isChecked) {
    if (taskId >= 0 && taskId < todos.length && subtaskIndex >= 0 && subtaskIndex < todos[taskId].subtasks.length) {
        todos[taskId].subtasks[subtaskIndex].status = isChecked;
        renderSlideCard(taskId);
        updateProgressBar(taskId);
        await pushData();
    }
}

function updateProgressBar(taskId) {
    const task = todos[taskId];
    const progressBar = document.getElementById(`progress-bar${task.id}`);
    const allTasksCount = task.subtasks.length;
    const completedTasksCount = task.subtasks.filter(subtask => subtask.status).length;
    const progress = (completedTasksCount / allTasksCount) * 100;
    progressBar.style.width = `${progress}%`;
    const numberTasks = document.getElementById('number-tasks');
    const allTasks = document.getElementById('all-tasks');
    numberTasks.innerHTML = '';
    numberTasks.innerHTML = completedTasksCount;
    allTasks.innerHTML = '';
    allTasks.innerHTML = allTasksCount;
}

/* function updateProgressBar(todoId) {
    const progressBar = document.getElementById(`progress-bar${todoId}`);
    const subtasks = todos[todoId].subtasks;
    
    const doneSubtasks = subtasks.filter(subtask => subtask.status).length;
    const progressPercentage = (doneSubtasks / subtasks.length) * 100;

    progressBar.style.width = `${progressPercentage}%`;
}
 */



