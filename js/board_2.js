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

