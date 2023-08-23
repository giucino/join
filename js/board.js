let todos = [{
    'id': '',
    'title': 'Putzen',
    'category': 'Design',
    'status': 'todo',
    'priority': 'low'
}, {
    'id': '',
    'title': 'Kochen',
    'category': 'Sales',
    'status': 'todo',
    'priority': 'high',
    'dueDate': '2023-08-28'
}, {
    'id': '',
    'title': 'Einkaufen',
    'category': 'Tech',
    'status': 'todo',
    'priority': 'medium'
}, {
    'id': '',
    'title': 'Einkaufen',
    'category': 'Tech',
    'status': 'feedback',
    'dueDate': '2023-10-28',
    'priority': 'low'
}, {
    'id': '',
    'title': 'Putzen',
    'category': 'Sales',
    'status': 'todo',
    'priority': 'medium'
}, {
    'id': '',
    'title': 'Einkaufen',
    'category': 'Backoffice',
    'status': 'feedback',
    'priority': 'low'
}, {
    'id': '',
    'title': 'Einkaufen',
    'category': 'Tech',
    'status': 'done',
    'priority': 'high'
}
]; 
/* let todos = []; */
console.log(todos);
async function pushData(){
    await setItem('tasks', JSON.stringify(todos));
}


async function loadData(){
    const getTodos = await getItem('tasks');
    todos = JSON.parse(getTodos);
    console.log(todos);
}

let currentDraggedElement;
let currentFilter = '';

/**
 * Update the HTML for all task categories.
 * Calls functions to update HTML for each category.
 */
async function updateHTML() {
    loadData();
    pushData();
    todo();
    inProgress();
    feedback();
    done();    
    noTasks()
}

function getIndex(){
    let index = todos;
    for (let i = 0; i < index.length; i++) {
        const element = index[i];       
    }
}

/**
 * Update the HTML for the "Todo" category based on the current filter.
 */
function todo() {
    let filteredTodo = todos.filter(task => task['status'] === 'todo' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const todoContainer = document.getElementById('todo');
    todoContainer.innerHTML = '';

    for (let i = 0; i < filteredTodo.length; i++) {
        const todo = filteredTodo[i];
    }
    if (filteredTodo.length === 0) {
        todoContainer.innerHTML += noTasks();
    } else {
        filteredTodo.forEach((task, i) => {
            todoContainer.innerHTML += generateTodoHTML(task, i);
        });
    }
}

/**
 * Update the HTML for the "In Progress" category based on the current filter.
 */
function inProgress(){
    let filteredInProgress = todos.filter(task => task['status'] === 'inprogress' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const inProgressContainer = document.getElementById('in-progress');
    inProgressContainer.innerHTML = '';

    for (let i = 0; i < filteredInProgress.length; i++) {
        const progress = filteredInProgress[i];
    }
    if (filteredInProgress.length === 0) {
        inProgressContainer.innerHTML += noTasks();
    } else {
        filteredInProgress.forEach((task, i) => {
            inProgressContainer.innerHTML += generateTodoHTML(task, i);
        });
    }
}

/**
 * Update the HTML for the "Feedback" category based on the current filter.
 */
function feedback(){
    let filteredFeedback = todos.filter(task => task['status'] === 'feedback' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const feedbackContainer = document.getElementById('feedback');
    feedbackContainer.innerHTML = '';

    for (let i = 0; i < filteredFeedback.length; i++) {
        const feedback = filteredFeedback[i];
    }
    if (filteredFeedback.length === 0) {
        feedbackContainer.innerHTML += noTasks();
    } else {
        filteredFeedback.forEach((task, i) => {
            feedbackContainer.innerHTML += generateTodoHTML(task, i);
        });
    }
}

/**
 * Update the HTML for the "Done" category based on the current filter.
 */
function done(){
    let filteredDone = todos.filter(task => task['status'] === 'done' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const doneContainer = document.getElementById('done');
    doneContainer.innerHTML = '';

    for (let i = 0; i < filteredDone.length; i++) {
        const done = filteredDone[i];
    }
    if (filteredDone.length === 0) {
        doneContainer.innerHTML += noTasks();
    } else {
        filteredDone.forEach((task, i) => {
            doneContainer.innerHTML += generateTodoHTML(task, i);
        });
    }
}

/**
 * Generate HTML for the "No Tasks" message.
 * @returns {string} HTML markup for no tasks message.
 */
function noTasks(){
    return /*html*/`
        <div class="no-tasks-to-do">
            <div class="no-tasks-to-do-text">No Tasks to do</div>
        </div>`;
}

/**
 * Set the currently dragged element.
 * @param {number} id - The id of the element being dragged.
 */
function startDragging(id) {
    currentDraggedElement = id;
    console.log(currentDraggedElement);
}

/**
 * Generate HTML markup for a task element.
 * @param {Task} element - The task object to generate HTML for.
 * @returns {string} HTML markup for the task element.
 */
function generateTodoHTML(element, i) {
    const priorityImageSrc = setPriorityImage(element.priority);
    return /*html*/`
    <div id="board-card" onclick="slideCard(${i})" draggable="true" ondragstart="startDragging(${i})" class="content-container">
        <div class="content-container-inner">
            <div class="category">${element.category}</div>
            <div class="title-content">
                <div class="title">${element.title}</div>
                <div id="description" class="content">${element.description}</div>
            </div>
            <div class="subtasks-container">
                <div class="progress-bar-container">
                    <div class="progress-bar"></div>
                </div>
                <div class="subtasks">1/2 Subtasks</div>
            </div>
            <div class="prio-container">
                <div class="user-container-board">
                    <div id="assigned-to" class="user-marked blue">${element.assignedTo}</div>
                    <div class="user-marked media negativ-gap">EF</div>
                </div>
                <div class="prio-icon"><img src="${priorityImageSrc}" alt=""></div>
            </div>
        </div>
    </div>`;
}

function setPriorityImage(priority) {
    let imageSrc = '';
    if (priority === 'low') {
        imageSrc = './img/prio-low.png';
    } else if (priority === 'medium') {
        imageSrc = './img/prio-medium.png';
    } else if (priority === 'high') {
        imageSrc = './img/prio-high.png';
    }
    return imageSrc;
}

/**
 * Allow dropping elements on drop zones.
 * @param {Event} ev - The dragover event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Move a task to a specified status.
 * @param {string} status - The status to move the task to.
 */
function moveTo(status) {
    todos[currentDraggedElement].status = status;
    console.log(todos[currentDraggedElement].status);
    updateHTML();
    pushData();
}

/**
 * Filter tasks based on a search term and status.
 * @param {string} searchTerm - The search term to filter tasks.
 * @param {string} status - The status to filter tasks.
 * @returns {Task[]} Array of filtered tasks.
 */
function filterTasks(searchTerm, status) {
    let filteredTasks = todos.filter(task => {
        return task.status === status && (task.title.includes(searchTerm) || task.category.includes(searchTerm));
    });
    return filteredTasks;
}

/**
 * Set the current filter based on input value.
 */
function setFilter() {
    let searchText = document.getElementById('input-field');
    currentFilter = searchText.value.toLowerCase();
    searchText.value = '';
    updateHTML();
}

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input-field');
    const inputBtn = document.getElementById('search');

    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            inputBtn.click();
        }
    });
});
/**
 * Close the task card.
 */
function closeCard(){    
    document.getElementById('slide-container').classList.remove('slide-in');
    setTimeout(() => {
        document.getElementById('task-slide').classList.add('d-none');
    }, 800);
}

/**
 * Slideanimation for the task card.
 */
function slideCardAnimation(){
    document.getElementById('task-slide').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('slide-container').classList.add('slide-in');
    }, 100);   
}

/**
 * Slide open the task card.
 */
function slideCard(element, i){
    const slideCard = document.getElementById('task-slide');
    slideCard.innerHTML = renderSlideCard(element, i);
    slideCardAnimation();
}

/**
 * Generate HTML markup for the task slide card.
 * @returns {string} HTML markup for the task slide card.
 */
function renderSlideCard(element, i){
    return /*html*/ `
        <div id="slide-container" class="slide-container">
        <div id="task-slide-container" class="task-slide-container">
            <div class="task-slide-headline">
                <div class="task-slide-headline-left"><span class="task-slide-category">User Story</span></div>
                <div id="task-slide-close" onclick="closeCard()" class="task-slide-headline-right"><img src="./img/close.png" alt="Schließen"></div>
            </div>
            <span id="task-slide-title" class="task-slide-title">Kochwelt Page & Recipe Recommender</span>
            <span id="task-slide-description" class="task-slide-description">Build start page with recipe recommendation.</span>
            <div class="task-slide-due-date-container">
                <span class="task-slide-due-date">Due date: </span>
                <span id="task-slide-due-date" class="task-slide-due-date-date">10/05/2023</span>
            </div>
            <div class="task-slide-prio-container">
                <span class="task-slide-prio-text">Priority: </span>
                <div class="task-slide-prio-text-img">
                    <span class="task-slide-prio-text-">Medium</span>
                    <img id="task-slide-prio-img" src="./img/prio-medium.png" alt="">
                </div>
            </div>
            <div class="task-slide-assigned-container">
                <span class="task-slide-assigned-test">Assigned To:</span>
                <div class="task-slide-assigned-user-container">
                    <div class="task-slide-assigned-user-contact">
                        <div class="task-slide-assigned-user">
                            <div class="user-marked blue">SM</div>
                            <span class="task-slide-assigned-user-name">Sofia Müller</span>
                        </div>
                        <button class="task-slide-btn" type="checkbox" disabled></button>
                    </div>
                </div>
            </div>
            <div class="task-slide-subtasks-container">
                <span class="task-slide-subtasks-text">Subtasks</span>
                <div class="task-slide-subtasks-tasks">
                    <div class="task-slide-subtask">
                        <input class="task-slide-subtask-btn" type="checkbox">
                        <span class="task-slide-subtask-text">Implement Recipe Recommendation</span>
                    </div>
                    <div class="task-slide-subtask">
                        <input class="task-slide-subtask-btn" type="checkbox">
                        <span class="task-slide-subtask-text">Start Page Layout</span>
                    </div>
                </div>
            </div>
            <div class="task-slide-delete-edit-container">
                <div class="task-slide-delete">
                    <img class="task-slide-delete-edit-img" src="./img/delete.png" alt="">
                    <span class="task-slide-delete-text">Delete</span>
                </div>
                <div class="task-slide-placeholder"></div>
                <div class="task-slide-edit">
                    <img class="task-slide-delete-edit-img" src="./img/edit.png" alt="">
                    <span class="task-slide-edit-text">Edit</span>
                </div>
            </div>
        </div>
    </div>
    `
}