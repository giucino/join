/**
 * Renders the subtasks for a task in the slide view.
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
 * Generates the overall task HTML representation.
 * @param {Object} element - The task data.
 * @param {string} priorityImageSrc - The source URL of the priority image.
 * @param {string} assignedToHTML - The HTML representation of assigned users.
 * @param {string} progressBar - The HTML representation of the progress bar.
 * @param {string} numberTasks - The HTML representation of the number of tasks.
 * @param {string} allTasks - The HTML representation of all tasks.
 * @returns {string} The generated HTML for the overall task.
 */
function renderSlideCardHTML(
  element,
  priorityImageSrc,
  assignedToHTML,
  subtasksHTML
) {
  const backgroundColor = getCategoryBackgroundColor(element.category);
  return /*html*/ `
    <div id="slide-container" class="slide-container">
        <div id="task-slide-container${element.id}" class="task-slide-container" onclick="event.stopPropagation()">
            <div class="task-slide-headline">
                <div class="task-slide-headline-left" style="background-color: ${backgroundColor};"><span class="task-slide-category">${element.category}</span></div>
                <div id="task-slide-close" onclick="closeCard(${element.id}), loadData()" class="task-slide-headline-right"><img src="./img/close.png" alt="Schließen"></div>
            </div>
            <div class="scroll-slide-container">
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
                        <div class="task-slide-assigned-user-contact">
                            ${assignedToHTML}
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
            </div>
            <div class="task-slide-delete-edit-container">
                <div class="task-slide-delete" onclick="deleteTask(${element.id})">
                    <img class="task-slide-delete-edit-img" src="./img/delete.png" alt="">
                    <span class="task-slide-delete-text">Delete</span>
                </div>
                <div class="task-slide-placeholder"></div>
                <div class="task-slide-edit" onclick="editTask(${element.id})">
                    <img class="task-slide-delete-edit-img" src="./img/edit.png" alt="">
                    <span class="task-slide-edit-text">Edit</span>
                </div>
            </div>
        </div>
    </div>
    
    `;
}
