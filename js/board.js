let todos = [{
    'id': 0,
    'title': 'Putzen',
    'category': 'Design',
    'status': 'todo'
}, {
    'id': 1,
    'title': 'Kochen',
    'category': 'Sales',
    'status': 'todo'
}, {
    'id': 2,
    'title': 'Einkaufen',
    'category': 'Tech',
    'status': 'todo'
}, {
    'id': 3,
    'title': 'Einkaufen',
    'category': 'Tech',
    'status': 'feedback'
}, {
    'id': 4,
    'title': 'Putzen',
    'category': 'Sales',
    'status': 'todo'
}, {
    'id': 5,
    'title': 'Einkaufen',
    'category': 'Backoffice',
    'status': 'feedback'
}, {
    'id': 6,
    'title': 'Einkaufen',
    'category': 'Tech',
    'status': 'done'
}
];

let currentDraggedElement;
let currentFilter = '';

async function updateHTML() {
    todo();
    inProgress();
    feedback();
    done();    
    noTasks()
}

function todo() {
    let filteredTodo = todos.filter(task => task['status'] === 'todo' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const todoContainer = document.getElementById('todo');
    todoContainer.innerHTML = '';

    if (filteredTodo.length === 0) {
        todoContainer.innerHTML += noTasks();
    } else {
        filteredTodo.forEach(task => {
            todoContainer.innerHTML += generateTodoHTML(task);
        });
    }
}

function inProgress(){
    let filteredInProgress = todos.filter(task => task['status'] === 'inprogress' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const inProgressContainer = document.getElementById('in-progress');
    inProgressContainer.innerHTML = '';

    if (filteredInProgress.length === 0) {
        inProgressContainer.innerHTML += noTasks();
    } else {
        filteredInProgress.forEach(task => {
            inProgressContainer.innerHTML += generateTodoHTML(task);
        });
    }
}

function feedback(){
    let filteredFeedback = todos.filter(task => task['status'] === 'feedback' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const feedbackContainer = document.getElementById('feedback');
    feedbackContainer.innerHTML = '';

    if (filteredFeedback.length === 0) {
        feedbackContainer.innerHTML += noTasks();
    } else {
        filteredFeedback.forEach(task => {
            feedbackContainer.innerHTML += generateTodoHTML(task);
        });
    }
}

function done(){
    let filteredDone = todos.filter(task => task['status'] === 'done' && (task.title.toLowerCase().includes(currentFilter) || task.category.toLowerCase().includes(currentFilter)));
    const doneContainer = document.getElementById('done');
    doneContainer.innerHTML = '';

    if (filteredDone.length === 0) {
        doneContainer.innerHTML += noTasks();
    } else {
        filteredDone.forEach(task => {
            doneContainer.innerHTML += generateTodoHTML(task);
        });
    }
}

function noTasks(){
    return /*html*/`
        <div class="no-tasks-to-do">
            <div class="no-tasks-to-do-text">No Tasks to do</div>
        </div>`;
}


function startDragging(id) {
    currentDraggedElement = id;
}

function generateTodoHTML(element) {
    return /*html*/`
    <div id="board-card" onclick="slideCard()" draggable="true" ondragstart="startDragging(${element['id']})" class="content-container">
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
                <div class="prio-icon"><img src="./img/prio-low.png" alt=""></div>
            </div>
        </div>
    </div>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    todos[currentDraggedElement]['status'] = status;
    updateHTML();
}

function filterTasks(searchTerm, status) {
    let filteredTasks = todos.filter(task => {
        return task.status === status && (task.title.includes(searchTerm) || task.category.includes(searchTerm));
    });
    return filteredTasks;
}

function setFilter() {
    let searchText = document.getElementById('input-field');
    currentFilter = searchText.value.toLowerCase();
    updateHTML();
    searchText.value = '';
}

const input = document.getElementById('input-field');
const inputBtn = document.getElementById('search');

input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        inputBtn.click();
    }
});

function closeCard(){    
    document.getElementById('slide-container').classList.remove('slide-in');
    setTimeout(() => {
        document.getElementById('task-slide').classList.add('d-none');
    }, 800);
}

function slideCard(){
    const slideCard = document.getElementById('task-slide');
    slideCard.innerHTML = renderSlideCard();
    document.getElementById('task-slide').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('slide-container').classList.add('slide-in');
    }, 100);    
}

console.log(TOKEN);

async function getItem(key){
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json());
}

function renderSlideCard(){
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