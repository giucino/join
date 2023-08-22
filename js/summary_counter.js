async function count() {
    await loadData();
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
    console.log(counter);
    console.log(counter.priority);
    console.log(counter.dueDate);
}

function countUrgent() {
    const countUrgentElement = document.getElementById('urgent-task');
    const deadline = document.getElementById('deadline');
    countUrgentElement.innerHTML = counter.priority;
    deadline.innerHTML = counter.dueDate;
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