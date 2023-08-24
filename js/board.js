let todos = [{
    'id': 0,
    'title': 'Putzen',
    'category': 'Design',
    'status': 'todo',
    'priority': 'low',
    'subtasks': [
        { 'title': 'teste das mal', 'done': false},
        {'title': 'erledigt', 'done': false}]
}, {
    'id': 1,
    'title': 'Kochen',
    'category': 'Sales',
    'status': 'todo',
    'priority': 'high',
    'dueDate': '2023-08-28',
    'subtasks': [
        { 'title': 'teste das mal', 'done': false},
        {'title': 'erledigt', 'done': false}]
}, {
    'id': 2,
    'title': 'Waschen',
    'category': 'Tech',
    'status': 'todo',
    'priority': 'medium',
    'subtasks': [
        { 'title': 'teste das mal', 'done': false},
        {'title': 'erledigt', 'done': false}]
}, {
    'id': 3,
    'title': 'Saugen',
    'category': 'Tech',
    'status': 'feedback',
    'dueDate': '2023-10-28',
    'priority': 'low',
    'subtasks': [
        { 'title': 'teste das mal', 'done': false},
        {'title': 'erledigt', 'done': false}]
}, {
    'id': 4,
    'title': 'Schlafen',
    'category': 'Sales',
    'status': 'todo',
    'priority': 'medium',
    'subtasks': [
        { 'title': 'teste das mal', 'done': false},
        {'title': 'erledigt', 'done': false}]
}, {
    'id': 5,
    'title': 'Einkaufen',
    'category': 'Backoffice',
    'status': 'feedback',
    'priority': 'low',
    'subtasks': [
        { 'title': 'teste das mal', 'done': false},
        {'title': 'erledigt', 'done': false}]
}, {
    'id': 6,
    'title': 'Tanzen',
    'category': 'Tech',
    'status': 'done',
    'priority': 'high',
    'subtasks': [
        { 'title': 'teste das mal', 'done': false},
        {'title': 'erledigt', 'done': false}]
}
]; 
pushData();
async function pushData(){
    await setItem('tasks', JSON.stringify(todos));
}

let index;
let element;
let subtask;
let subtaskIndex;

async function loadData() {
    const getTodos = await getItem('tasks');
    todos = JSON.parse(getTodos);
    for (let i = 0; i < todos.length; i++) {
        index = i;
        element = todos[i];
        console.log('Index:', index, 'Element:', element);
        
        for (let j = 0; j < element.subtasks.length; j++) {
            subtask = element.subtasks[j];
            subtaskIndex = j;
            console.log(`  Subtask ${subtaskIndex}: ${subtask.title}, Done: ${subtask.done}`);
        }
    }
}

let currentDraggedElement;
let currentFilter = '';

/**
 * Update the HTML for all task categories.
 * Calls functions to update HTML for each category.
 */
async function updateHTML() {
    /* await pushData(); */
    await loadData();
    todo();
    inProgress();
    feedback();
    done();    
    noTasks()
}

/**
 * Update the HTML for the "Todo" category based on the current filter.
 */
function todo() {
    let filteredTodo = todos.filter(task => task['status'] === 'todo' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const todoContainer = document.getElementById('todo');
    todoContainer.innerHTML = '';
    if (filteredTodo.length === 0) {
        todoContainer.innerHTML += noTasks();
    } else {
        filteredTodo.forEach(task => {
            todoContainer.innerHTML += generateTasksHTML(task);
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
    if (filteredInProgress.length === 0) {
        inProgressContainer.innerHTML += noTasks();
    } else {
        filteredInProgress.forEach(task => {
            inProgressContainer.innerHTML += generateTasksHTML(task);
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
    if (filteredFeedback.length === 0) {
        feedbackContainer.innerHTML += noTasks();
    } else {
        filteredFeedback.forEach(task => {
            feedbackContainer.innerHTML += generateTasksHTML(task);
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
    if (filteredDone.length === 0) {
        doneContainer.innerHTML += noTasks();
    } else {
        filteredDone.forEach(task => {
            doneContainer.innerHTML += generateTasksHTML(task);
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
 * Generate HTML markup for a task element.
 * @param {Task} element - The task object to generate HTML for.
 * @returns {string} HTML markup for the task element.
 */
function generateTasksHTML(element) {
    /* const element = todos[`${id}`]; */
    const priorityImageSrc = setPriorityImage(element.priority);
    return /*html*/`
    <div id="board-card" onclick="slideCard(${element.id})" draggable="true" ondragstart="startDragging(${element.id})" class="content-container">
        <div class="content-container-inner">
            <div class="category">${element.category}</div>
            <div class="title-content">
                <div class="title">${element.title}${element.id}</div>
                <div id="description" class="content">${element.description}</div>
            </div>
            <div class="subtasks-container">
                <div class="progress-bar-container">
                    <div class="progress-bar" id="progress-bar"></div>
                </div>
                <div class="subtasks"><span id="number-tasks">0 </span>/ <span id="all-tasks">0 </span>Subtasks</div>
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
 * Set the currently dragged element.
 * @param {number} id - The id of the element being dragged.
 */
function startDragging(id) {
    currentDraggedElement = id;
    console.log(currentDraggedElement);
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
    pushData();
    loadData();
    updateHTML();
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
function slideCard(id){
    const slideCard = document.getElementById('task-slide');
    slideCard.innerHTML = renderSlideCard(id);
    slideCardAnimation();
}

/**
 * Generate HTML markup for the task slide card.
 * @returns {string} HTML markup for the task slide card.
 */
function renderSlideCard(id){
    const element = todos[id];
    console.log(element);
    const priorityImageSrc = setPriorityImage(element.priority);
    const subtasksHTML = generateSubtasksHTML(subtask, subtaskIndex);
    return /*html*/ `
        <div id="slide-container" class="slide-container">
        <div id="task-slide-container" class="task-slide-container">
            <div class="task-slide-headline">
                <div class="task-slide-headline-left"><span class="task-slide-category">${element.category}</span></div>
                <div id="task-slide-close" onclick="closeCard()" class="task-slide-headline-right"><img src="./img/close.png" alt="Schließen"></div>
            </div>
            <span id="task-slide-title" class="task-slide-title">${element.title}</span>
            <span id="task-slide-description" class="task-slide-description">${element.description}</span>
            <div class="task-slide-due-date-container">
                <span class="task-slide-due-date">Due date: </span>
                <span id="task-slide-due-date" class="task-slide-due-date-date">${element.dueDate}</span>
            </div>
            <div class="task-slide-prio-container">
                <span class="task-slide-prio-text">Priority: </span>
                <div class="task-slide-prio-text-img">
                    <span class="task-slide-prio-text-">Medium</span>
                    <img id="task-slide-prio-img" src="${priorityImageSrc}" alt="">
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
                <div class="task-slide-subtasks-tasks" id="subtasksContainer">
                ${subtasksHTML}
                </div>
            </div>
            <div class="task-slide-delete-edit-container">
                <div class="task-slide-delete">
                    <img class="task-slide-delete-edit-img" src="./img/delete.png" alt="">
                    <span onclick="deleteTask(${element.id})" class="task-slide-delete-text">Delete</span>
                </div>
                <div class="task-slide-placeholder"></div>
                <div class="task-slide-edit">
                    <img class="task-slide-delete-edit-img" src="./img/edit.png" alt="">
                    <span onclick="editTask(${element})" class="task-slide-edit-text">Edit</span>
                </div>
            </div>
        </div>
    </div>
    `
}

function deleteTask(id) {
    console.log(id);
    const indexToDelete = todos.findIndex(task => task.id === id); 
    todos.splice(indexToDelete, 1);
    closeCard();
    pushData();
    loadData();
    updateHTML();
}