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

function renderAssigned(element){
    let assignedToHTML = '';
    const filteredAssignedTo = element.assignedTo.filter(name => name !== undefined);
    const bgcolors = element.bgcolor || [];

    let leftPosition = -7;
    for (let i = 0; i < filteredAssignedTo.length; i++) {
        const name = filteredAssignedTo[i];
        const bgcolor = bgcolors[i] || '';

        if (name) {
            const initials = extractInitials(name);
            const additionalClass = `negativ-gap-${leftPosition}`;
            leftPosition -= 7;
            assignedToHTML += generateAssignedHTML(additionalClass, bgcolor, initials);
        }
    }
    return assignedToHTML;
}

function generateAssignedHTML(additionalClass, bgcolor, initials){
    return /* html */`
        <div class="user-marked media ${additionalClass}" style="background-color: ${bgcolor}">
            ${initials}
        </div>
    `;
}

function renderSubtask(element){
    let subtasksHTML;
    let completedTasksCount = 0;

    if (element.subtasks && Array.isArray(element.subtasks)) {
        for (const subtask of element.subtasks) {
            if (subtask.title) {
                subtasksHTML += generateSubtaskHTML(subtask);
                if (subtask.status) {
                    completedTasksCount++;
                };
            }

        }

    }
    return { subtasksHTML, completedTasksCount };
}

function generateSubtaskHTML(subtask){
    return /*html*/`
        <div class="task-slide-subtask">
            <input type="checkbox" ${subtask.status ? 'checked' : ''} disabled>
            <label>${subtask.title}</label>
        </div>
    `;
}

function progressBarHTML(element, progress){
    return /*html*/`
        <div class="progress-bar" id="progress-bar${element.id}" style="width: ${progress}%;"></div>
    `;
}

function numberTasksHTML(completedTasksCount){
    return /*html*/`
        <span id="number-tasks">${completedTasksCount}</span>
    `;
}

function allTasksHTML(allTasksCount){
    return /*html*/`
        <span id="all-tasks">${allTasksCount}</span>
    `;
}

function generateTasksHTML(element, priorityImageSrc, assignedToHTML, progressBar, numberTasks, allTasks){
    return /*html*/`
    <div id="${element.id}" onclick="slideCard(${element.id})" draggable="true" ondragstart="startDragging(${element.id})" class="content-container task-touch">
        <div class="content-container-inner">
            <div class="board-category">${element.category}</div>
            <div class="title-content">
                <div class="title">${element.title}</div>
                <div id="description" class="content">${element.description}</div>
            </div>
            <div class="board-subtasks-container">
                <div class="progress-bar-container">
                    ${progressBar}
                </div>
                <div class="subtasks">${numberTasks} / ${allTasks} Subtasks</div>
            </div>
            <div class="prio-container">
                <div id="assigned-to" class="user-container-board">
                    ${assignedToHTML}
                </div>
                <div class="prio-icon"><img src="${priorityImageSrc}" alt=""></div>
            </div>
        </div>
    </div>`;
}

function renderSlideAssigned(element){
    let assignedToHTML = '';
    const filteredAssignedTo = element.assignedTo.filter(name => name !== null);
    const bgcolors = element.bgcolor || [];
    for (let i = 0; i < filteredAssignedTo.length; i++) {
        const name = filteredAssignedTo[i];
        const bgcolor = bgcolors[i] || '';
        if (name) {
            const initials = extractInitials(name);
            assignedToHTML += renderSlideAssignedHTML(initials, name, bgcolor);
        }
    }
    return assignedToHTML;
}

function renderSlideAssignedHTML(initials, name, bgcolor){
    return /*html*/`
        <div class="task-slide-assigned-user">
            <div class="user-marked blue" style="background-color: ${bgcolor}">${initials}</div>
            <span class="task-slide-assigned-user-name">${name}</span>
        </div>
    `;
}

function renderSlideSubtask(element, id){
    let subtasksHTML = '';
    if (element.subtasks && Array.isArray(element.subtasks)) {
        for (let i = 0; i < element.subtasks.length; i++) {
            const subtask = element.subtasks[i];
            if (subtask.title) {
                subtasksHTML += renderSlideSubtaskHTML(subtask, i, id);
                updateHTML()
            };
        }
    }
    return subtasksHTML;
}

function renderSlideSubtaskHTML(subtask, i, id){
    return /*html*/`
        <div class="task-slide-subtask">
            <input type="checkbox" id="subtaskCheckbox${i}" ${subtask.status ? 'checked' : ''} onchange="updateSubtaskStatus(${id}, ${i}, this.checked)">
            <label for="subtaskCheckbox${i}">${subtask.title}</label>
        </div>
    `;
}

function renderSlideCardHTML(element, priorityImageSrc, assignedToHTML, subtasksHTML){
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
                <span class="task-slide-prio-text-">${element.priority}</span>
                <img id="task-slide-prio-img" src="${priorityImageSrc}" alt="">
            </div>
        </div>
        <div class="task-slide-assigned-container">
            <span class="task-slide-assigned-test">Assigned To:</span>
            <div class="task-slide-assigned-user-container">
            <div class="task-slide-assigned-user-container">
        <div class="task-slide-assigned-user-contact">
            ${assignedToHTML}
            <button class="task-slide-btn" type="checkbox" disabled></button>
        </div>
    </div>
    <div>
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
                    <span onclick="editTask(${element.id})" class="task-slide-edit-text">Edit</span>
                </div>
            </div>
        </div>
    </div>
    `;
}