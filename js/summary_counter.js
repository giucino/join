async function count() {
    await loadData();
    countUrgent();
    countBoard()
    countTodo();
    countInProgress();
    countFeedback();
    countDone();
}

let counter = [];

async function loadData(){
    const getTodos = await getItem('tasks');
    counter = JSON.parse(getTodos);
}

function loadDueDate(dueDateString) {
    const dueDate = new Date(dueDateString);
    const day = dueDate.getDate(); 
    const month = dueDate.getMonth(); 
    const year = dueDate.getFullYear(); 
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];    
    const formattedMonth = monthNames[month];
    return `${formattedMonth} ${day}, ${year}`;
}

function findNearestDueDate() {
    const now = new Date().getTime();
    let nearestDueDate = null;
    for (const task of counter) {
        if (task.dueDate) {
            const taskDueDate = new Date(task.dueDate).getTime();
            if (!nearestDueDate || Math.abs(taskDueDate - now) < Math.abs(nearestDueDate - now)) {
                nearestDueDate = taskDueDate;
            }
        }
    }
    return nearestDueDate ? new Date(nearestDueDate) : null;
}

function renderDueDate() {
    const deadlineElement = document.getElementById('deadline');
    const nearestDueDate = findNearestDueDate();
    if (nearestDueDate) {
        const formattedDueDate = loadDueDate(nearestDueDate);
        deadlineElement.innerHTML = formattedDueDate;
    } else {
        deadlineElement.innerHTML = "No Due Date"; 
    }
}

function countUrgent() {
    const urgent = counter.filter(item => item.priority === 'high').length;
    const countUrgentElement = document.getElementById('urgent-task');
    countUrgentElement.innerHTML = urgent;
    renderDueDate();
}

function countBoard() {
    const todoCountElement = document.getElementById('board-task');
    todoCountElement.innerHTML = counter.length; 
}

function countTodo(){
    const todoCount = counter.filter(item => item.status === 'todo').length;
    const todoCountElement = document.getElementById('todo-task');
    todoCountElement.innerHTML = todoCount; 
}

function countInProgress(){
    const inProgressCount = counter.filter(item => item.status === 'inprogress').length;
    const inProgressElement = document.getElementById('in-progress-task');
    inProgressElement.innerHTML = inProgressCount; 
}

function countFeedback(){
    const feedbackCount = counter.filter(item => item.status === 'feedback').length;
    const feedbackCountElement = document.getElementById('feedback-task');
    feedbackCountElement.innerHTML = feedbackCount; 
}

function countDone(){
    const doneCount = counter.filter(item => item.status === 'done').length;
    const doneCountElement = document.getElementById('done-task');
    doneCountElement.innerHTML = doneCount; 
}