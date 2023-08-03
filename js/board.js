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
    'status': 'inprogress'
}, {
    'id': 6,
    'title': 'Einkaufen',
    'category': 'Tech',
    'status': 'done'
}
];

let currentDraggedElement;

function updateHTML() {
    todo();
    inProgress();
    feedback();
    done();    
}

function todo() {
    let todo = todos.filter(t => t['status'] == 'todo');
    document.getElementById('todo').innerHTML = '';
    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        document.getElementById('todo').innerHTML += generateTodoHTML(element);
    }
}

function inProgress(){
    let inProgress = todos.filter(t => t['status'] == 'inprogress');
    document.getElementById('in-progress').innerHTML = '';
    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('in-progress').innerHTML += generateTodoHTML(element);
    }
}

function feedback(){
    let feedback = todos.filter(t => t['status'] == 'feedback');
    document.getElementById('feedback').innerHTML = '';
    for (let index = 0; index < feedback.length; index++) {
        const element = feedback[index];
        document.getElementById('feedback').innerHTML += generateTodoHTML(element);
    }
}

function done(){
    let done = todos.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';
    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }
}


function startDragging(id) {
    currentDraggedElement = id;
}

function generateTodoHTML(element) {
    return /*html*/`
    <div draggable="true" ondragstart="startDragging(${element['id']})" class="content-container">
        <div class="content-container-inner">
            <div class="category">${element.category}</div>
            <div class="title-content">
                <div class="title">${element.title}</div>
                <div class="content">Modify the contents of the main website...</div>
            </div>
            <div class="subtasks-container">
                <div class="progress-bar-container">
                    <div class="progress-bar"></div>
                </div>
                <div class="subtasks">1/2 Subtasks</div>
            </div>
            <div class="prio-container">
                <div class="user-container">
                    <div class="user-marked blue">SM</div>
                    <div class="user-marked media negativ-gap">EF</div>
                </div>
                <div class="prio-icon"><img src="./img/prio-low.png" alt=""></div>
            </div>
        </div>
    </div>`;

   // return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">${element['title']}</div>`;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    todos[currentDraggedElement]['status'] = status;
    updateHTML();
}

