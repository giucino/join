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