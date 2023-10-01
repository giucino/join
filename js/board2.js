/**
 * Filter tasks based on a search term and status.
 * @param {string} searchTerm - The search term to filter tasks.
 * @param {string} status - The status to filter tasks.
 * @returns {Task[]} Array of filtered tasks.
 */
function filterTasks(searchTerm, status) {
    let filteredTasks = todos.filter((task) => {
        return (
            task.status === status &&
            (task.title.includes(searchTerm) || task.category.includes(searchTerm))
        );
    });
    return filteredTasks;
}


/**
 * Set the current filter based on the value in the input field and refresh the UI.
 */
function setFilter() {
    let searchText = document.getElementById("input-field");
    currentFilter = searchText.value.toLowerCase();
    searchText.value = "";
    updateHTML();
}


/**
 * Event listeners for the DOMContentLoaded event.
 */
document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("input-field");
    const inputBtn = document.getElementById("search");
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            inputBtn.click();
        }
    });
});


/**
 * Close the task card with a slide out animation.
 */
function closeCard() {
    document.getElementById("slide-container").classList.remove("slide-in-board");
    setTimeout(() => {
        document.getElementById("task-slide").classList.add("d-none");
        document.getElementById("noscroll").classList.remove("noscroll");
    }, 800);
}


/**
 * Triggers the slide in animation for the task card.
 */
function slideCardAnimation() {
    document.getElementById("task-slide").classList.remove("d-none");
    setTimeout(() => {
        document.getElementById("slide-container").classList.add("slide-in-board");
    }, 50);
}


/**
 * Render and slide open the task card.
 * @param {number} id - ID of the task to render in the card.
 */
function slideCard(id) {
    const slideCard = document.getElementById("task-slide");
    slideCard.innerHTML = renderSlideCard(id);
    slideCardAnimation();
    document.getElementById("noscroll").classList.add("noscroll");
}


/**
 * Generates the HTML markup for the slide card.
 * @param {number} id - ID of the task to generate markup for.
 * @returns {string} HTML markup for the slide card.
 */
function renderSlideCard(id) {
    const element = todos[id];
    const priorityImageSrc = setPriorityImage(element.priority);
    assignedToHTML = renderSlideAssigned(element);
    subtasksHTML = renderSlideSubtask(element, id);
    const generateSlideHTML = renderSlideCardHTML(
        element,
        priorityImageSrc,
        assignedToHTML,
        subtasksHTML
    );
    return generateSlideHTML;
}


/**
 * Remove a task from the 'todos' list and update the UI.
 * @param {number} id - ID of the task to delete.
 */
function deleteTask(id) {
    const indexToDelete = todos.findIndex((task) => task.id === id);
    if (indexToDelete === -1) {
        return;
    }
    todos.splice(indexToDelete, 1);
    deleteCard(id);
    updateIDs();
    closeCard();
    pushData();
    loadData();
    updateHTML();
}

function updateIDs() {
    for (let i = 0; i < todos.length; i++) {
        todos[i].id = i + 1;
        todos[i].id = i;
    }
}


function deleteCard(id) {
    const elementToRemove = document.getElementById(`board-card${id}`);
    if (elementToRemove) {
        elementToRemove.remove();
    }
}

/**
 * Updates the status of a specific subtask and pushes the updated data.
 * 
 * @async
 * @param {number} taskId - ID of the task.
 * @param {number} subtaskIndex - Index of the subtask to be updated.
 * @param {boolean} isChecked - New status of the subtask.
 */
async function updateSubtaskStatus(taskId, subtaskIndex, isChecked) {
    if (taskId >= 0 && taskId < todos.length && subtaskIndex >= 0 && subtaskIndex < todos[taskId].subtasks.length) {
        todos[taskId].subtasks[subtaskIndex].status = isChecked;
        renderSlideCard(taskId);
        updateProgressBar(taskId);
        await pushData();
    }
}


/**
 * Updates the progress bar based on completed subtasks.
 * 
 * @param {number} taskId - ID of the task.
 */
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


/**
 * Renders the assigned users and their initials.
 * 
 * @param {Object} element - Task element containing assigned users.
 * @returns {string} HTML string of rendered users.
 */
function renderAssigned(element) {
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


/**
 * Generates HTML for a specific assigned user.
 * 
 * @param {string} additionalClass - Additional CSS class for the user.
 * @param {string} bgcolor - Background color for the user's badge.
 * @param {string} initials - Initials of the assigned user.
 * @returns {string} HTML string for the assigned user.
 */
function generateAssignedHTML(additionalClass, bgcolor, initials) {
    return /* html */`
        <div class="user-marked media ${additionalClass}" style="background-color: ${bgcolor}">
            ${initials}
        </div>
    `;
}


/**
 * Generates the HTML representation of a subtask and counts completed subtasks.
 * @param {Object} element - The parent task containing subtasks.
 * @returns {Object} An object containing the generated HTML and the count of completed subtasks.
 */
function renderSubtask(element) {
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
    return completedTasksCount;
}


/**
 * Generates the HTML representation of a single subtask.
 * @param {Object} subtask - The subtask data.
 * @returns {string} The generated HTML for the subtask.
 */
function generateSubtaskHTML(subtask) {
    return /*html*/`
        <div class="task-slide-subtask">
            <input type="checkbox" ${subtask.status ? 'checked' : ''} disabled>
            <label>${subtask.title}</label>
        </div>
    `;
}


/**
 * Generates the HTML representation of a progress bar.
 * @param {Object} element - The task or entity the progress bar is associated with.
 * @param {number} progress - The current progress percentage.
 * @returns {string} The generated HTML for the progress bar.
 */
function progressBarHTML(element, progress) {
    return /*html*/`
        <div class="progress-bar" id="progress-bar${element.id}" style="width: ${progress}%;"></div>
    `;
}


/**
 * Generates the HTML representation showing the number of completed tasks.
 * @param {number} completedTasksCount - Count of completed tasks.
 * @returns {string} The generated HTML showing the number of completed tasks.
 */
function numberTasksHTML(completedTasksCount) {
    return /*html*/`
        <span id="number-tasks">${completedTasksCount}</span>
    `;
}


/**
 * Generates the HTML representation showing the total number of tasks.
 * @param {number} allTasksCount - Total count of tasks.
 * @returns {string} The generated HTML showing the total number of tasks.
 */
function allTasksHTML(allTasksCount) {
    return /*html*/`
        <span id="all-tasks">${allTasksCount}</span>
    `;
}


/**
 * Gets the background color based on the category.
 * 
 * @param {string} category - The category of the task.
 * @returns {string} The background color for the category.
 */
function getCategoryBackgroundColor(category) {
    switch (category) {
        case 'User Story':
            return '#FF7A00';
        case 'Technical Task':
            return '#0038FF';
        default:
            return ''; // Default background color (if any)
    }
}


function getSubtasksDisplayStyle(allTasksCount) {
    return allTasksCount === 0 ? 'none' : 'block';
}


/**
 * Generates the HTML for a given task element.
 *
 * @param {Object} element - The task element containing its details.
 * @param {string} priorityImageSrc - The source URL for the priority image.
 * @param {string} assignedToHTML - The HTML string representing assigned users.
 * @param {string} progressBar - The HTML string representing the task's progress bar.
 * @param {string} numberTasks - The count of completed tasks.
 * @param {string} allTasks - The total count of tasks.
 * @returns {string} The generated HTML string.
 */
function generateTasksHTML(element, priorityImageSrc, assignedToHTML, progressBar, numberTasks, allTasks, allTasksCount) {
    const backgroundColor = getCategoryBackgroundColor(element.category);
    return /*html*/`
    <div id="${element.id}" onclick="slideCard(${element.id})" draggable="true" ondragstart="startDragging(${element.id})" class="content-container task-touch">
        <div class="content-container-inner">
            <div class="board-category" style="background-color: ${backgroundColor};">${element.category}</div>
            <div class="title-content">
                <div class="title">${element.title}</div>
                <div id="description" class="content">${element.description}</div>
            </div>
            <div id="subtasks-board" class="board-subtasks-container" style="display: ${getSubtasksDisplayStyle(allTasksCount)};">
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


/**
 * Renders the assigned users for a task in the slide view.
 *
 * @param {Object} element - The task element containing its details.
 * @returns {string} The generated HTML string for assigned users.
 */
function renderSlideAssigned(element) {
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


/**
 * Renders the HTML for an assigned user in the slide view.
 *
 * @param {string} initials - The initials of the assigned user.
 * @param {string} name - The full name of the assigned user.
 * @param {string} bgcolor - The background color for the user mark.
 * @returns {string} The generated HTML string for an assigned user.
 */
function renderSlideAssignedHTML(initials, name, bgcolor) {
    return /*html*/`
        <div class="task-slide-assigned-user">
            <div class="user-marked blue" style="background-color: ${bgcolor}">${initials}</div>
            <span class="task-slide-assigned-user-name">${name}</span>
        </div>
    `;
}


/**
 * Renders the subtasks for a task in the slide view.
 *
 * @param {Object} element - The task element containing its details.
 * @param {number} id - The ID of the task element.
 * @returns {string} The generated HTML string for subtasks.
 */
function renderSlideSubtask(element, id) {
    let subtasksHTML = '';
    if (element.subtasks && Array.isArray(element.subtasks)) {
        for (let i = 0; i < element.subtasks.length; i++) {
            const subtask = element.subtasks[i];
            if (subtask.title) {
                subtasksHTML += renderSlideSubtaskHTML(subtask, i, id);
                updateHTML();
            };
        }
    }
    return subtasksHTML;
}


/**
 * Renders the HTML for a subtask in the slide view.
 *
 * @param {Object} subtask - The subtask details.
 * @param {number} i - The index of the subtask.
 * @param {number} id - The ID of the parent task element.
 * @returns {string} The generated HTML string for a subtask.
 */
function renderSlideSubtaskHTML(subtask, i, id) {
    return /*html*/`
        <div class="task-slide-subtask">
            <input type="checkbox" id="subtaskCheckbox${i}" ${subtask.status ? 'checked' : ''} onchange="updateSubtaskStatus(${id}, ${i}, this.checked)">
            <label for="subtaskCheckbox${i}">${subtask.title}</label>
        </div>
    `;
}