let todos = [{
    'id': 0,
    'title': 'Putzen',
    'description': 'Alles was das Herz begehrt',
    'category': 'Design',
    'status': 'todo',
    'priority': 'low',
    'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
    'subtasks': [
        { 'title': 'teste das mal', 'done': false },
        { 'title': 'erledigt', 'done': false }]
}, {
    'id': 1,
    'title': 'Kochen',
    'description': 'Alles was das Herz begehrt',
    'category': 'Sales',
    'status': 'todo',
    'priority': 'high',
    'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
    'dueDate': '2023-08-28',
    'subtasks': [
        { 'title': 'teste das mal', 'done': false },
        { 'title': 'erledigt', 'done': false }]
}, {
    'id': 2,
    'title': 'Waschen',
    'description': 'Alles was das Herz begehrt',
    'category': 'Tech',
    'status': 'todo',
    'priority': 'medium',
    'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
    'subtasks': [
        { 'title': 'teste das mal', 'done': false },
        { 'title': 'erledigt', 'done': false }]
}, {
    'id': 3,
    'title': 'Saugen',
    'description': 'Alles was das Herz begehrt',
    'category': 'Tech',
    'status': 'feedback',
    'dueDate': '2023-10-28',
    'priority': 'low',
    'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
    'subtasks': [
        { 'title': 'teste das mal', 'done': false },
        { 'title': 'erledigt', 'done': false }]
}, {
    'id': 4,
    'title': 'Schlafen',
    'description': 'Alles was das Herz begehrt',
    'category': 'Sales',
    'status': 'todo',
    'priority': 'medium',
    'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
    'subtasks': [
        { 'title': 'teste das mal', 'done': false },
        { 'title': 'erledigt', 'done': false }]
}, {
    'id': 5,
    'title': 'Einkaufen',
    'description': 'Alles was das Herz begehrt',
    'category': 'Backoffice',
    'status': 'feedback',
    'priority': 'low',
    'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
    'subtasks': [
        { 'title': 'teste das mal', 'done': false },
        { 'title': 'erledigt', 'done': false }]
}, {
    'id': 6,
    'title': 'Tanzen',
    'description': 'Alles was das Herz begehrt',
    'category': 'Tech',
    'status': 'done',
    'priority': 'high',
    'assignedTo': ['Anna Schmidt', 'Emilia Koch'],
    'subtasks': [
        { 'title': 'teste das mal', 'done': false },
        { 'title': 'erledigt', 'done': false }]
}
];


let task = {
    'id': "",
    "title": "",
    "description": "",
    "category": "",
    "status": "",
    "priority": "",
    "due_date": "",
    "assignedTo": [],
    "subtasks": {
        "name": [],
        "status": []
    }
};

/**
 * Renders the assignees in the detail view.
 * @param {object} task the task whose information should be rendered
 */
function boardDetailViewAssignees(task) {

    let container = document.getElementById('board-detail-view-assignees');
    container.innerHTML = 'Assigned to:';

    for (let i = 0; i < task.assigned_to.length; i++) {
        const assignee = task.assigned_to[i];

        container.innerHTML += /*html*/ `
        
        <div>
            ${htmlTemplateAssigneeIcon(assignee)}
            ${assignee}
        </div> `;
    }
}


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
    noTasks();
}


pushData();
async function pushData() {
    await setItem('tasks', JSON.stringify(todos));
}


async function loadData() {
    const getTodos = await getItem('tasks');
    todos = JSON.parse(getTodos);
    /* for (let i = 0; i < todos.length; i++) {
        const element = todos[i];
    } */
}

let currentDraggedElement;
let currentFilter = '';


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
function inProgress() {
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
function feedback() {
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
function done() {
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
function noTasks() {
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
    const priorityImageSrc = setPriorityImage(element.priority);
    return /*html*/`
    <div id="board-card${element.id}" onclick="slideCard(${element.id})" draggable="true" ondragstart="startDragging(${element.id})" class="content-container">
        <div class="content-container-inner">
            <div class="category">${element.category}</div>
            <div class="title-content">
                <div class="title">${element.title}</div>
                <div id="description" class="content">${element.description}</div>
            </div>
            <div class="subtasks-container">
                <div class="progress-bar-container">
                    <div class="progress-bar" id="progress-bar${element.id}"></div>
                </div>
                <div class="subtasks"><span id="number-tasks">0 </span>/ <span id="all-tasks">0 </span>Subtasks</div>
            </div>
            <div class="prio-container">
                <div class="user-container-board">
                    <div id="assigned-to" class="user-marked blue">${element.assignedTo}</div>
                    <div class="user-marked media negativ-gap">${element.assignedTo}</div>
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

document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('input-field');
    const inputBtn = document.getElementById('search');

    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            inputBtn.click();
        }
    });
});
/**
 * Close the task card.
 */
function closeCard() {
    document.getElementById('slide-container').classList.remove('slide-in');
    setTimeout(() => {
        document.getElementById('task-slide').classList.add('d-none');
    }, 800);
}

/**
 * Slideanimation for the task card.
 */
function slideCardAnimation() {
    document.getElementById('task-slide').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('slide-container').classList.add('slide-in');
    }, 100);
}

/**
 * Slide open the task card.
 */
function slideCard(id) {
    const slideCard = document.getElementById('task-slide');
    slideCard.innerHTML = renderSlideCard(id);
    slideCardAnimation();
}

/**
 * Generate HTML markup for the task slide card.
 * @returns {string} HTML markup for the task slide card.
 */
function renderSlideCard(id) {
    const element = todos[id];
    const priorityImageSrc = setPriorityImage(element.priority);
    // const subtasksHTML = generateSubtasksHTML(element.subtasks, element.id);
    return /*html*/ `
        <div id="slide-container" class="slide-container">
        <div id="task-slide-container${element.id}" class="task-slide-container">
            <div class="task-slide-headline">
                <div class="task-slide-headline-left"><span class="task-slide-category">${element.category}</span></div>
                <div id="task-slide-close" onclick="closeCard(${element.id}), loadData()" class="task-slide-headline-right"><img src="./img/close.png" alt="Schließen"></div>
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
                    <span onclick="editTask(${element.id})" class="task-slide-edit-text">Edit</span>
                </div>
            </div>
        </div>
    </div>
    `
}

//${subtasksHTML}

function deleteTask(id) {
    console.log(id);
    const indexToDelete = todos.findIndex(task => task.id === id);
    todos.splice(indexToDelete, 1);
    closeCard();
    pushData();
    loadData();
    updateHTML();
}