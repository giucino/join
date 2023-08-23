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
    console.log(counter);
    console.log(counter.dueDate);
}

function loadDuDate(dueDateString) {
    const dueDate = new Date(dueDateString);
    const day = dueDate.getDate(); 
    const month = dueDate.getMonth() + 1;
    const year = dueDate.getFullYear(); 
    return `${day}.${month}.${year}`;
}

function countUrgent() {
    const urgent = counter.filter(item => item.priority === 'high').length;
    const countUrgentElement = document.getElementById('urgent-task');
    const deadlineElement = document.getElementById('deadline');
    countUrgentElement.innerHTML = urgent;

    if (counter.length > 0 && counter[0].dueDate) {
        const formattedDueDate = loadDuDate(counter[0].dueDate);
        deadlineElement.innerHTML = formattedDueDate;
    } else {
        deadlineElement.innerHTML = "No Due Date"; // Falls kein Datum vorhanden ist
    }
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