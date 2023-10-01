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
            (task.title.charAt(0).toLowerCase() === searchTerm.toLowerCase() ||
                task.category.charAt(0).toLowerCase() === searchTerm.toLowerCase())
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
    updateHTML();
}


document.addEventListener("DOMContentLoaded", function () {
    let input = document.getElementById("input-field");
    let resetButton = document.getElementById("reset-search");

    input.addEventListener("input", function () {
        let searchValue = input.value.trim().toLowerCase();
        if (searchValue !== "") {
            setFilter();
            resetButton.style.display = "block";
        } 
        else {
            setFilter();
            resetButton.style.display = "none";
        }
    });

    let inputBtn = document.getElementById("search");
    inputBtn.addEventListener("click", function () {
        let searchValue = input.value.trim().toLowerCase();
        if (searchValue !== "") {
            setFilter();
            resetButton.style.display = "block";
        } else {
            setFilter();
            resetButton.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    function handleResetButtonClick() {
        let searchText = document.getElementById("input-field");
        searchText.value = "";  
        resetButton.style.display = "none";
        setFilter(); 
    }

    let resetButton = document.getElementById("reset-search");
    resetButton.addEventListener("click", handleResetButtonClick);
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


/**
 * Updates the 'id' property for each item in the 'todos' array.
 * @example
 * Assuming todos = [{id: 0}, {id: 1}]
 * updateIDs();
 * todos will be: [{id: 0}, {id: 1}]
 * @returns {void}
 */
function updateIDs() {
    for (let i = 0; i < todos.length; i++) {
        todos[i].id = i + 1;
        todos[i].id = i;
    }
}


/**
 * Deletes the specified card element from the document based on the provided ID.
 * 
 * @param {string|number} id - The ID of the card element to be removed.
 */
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


/**
 * Returns the appropriate display style based on the count of all tasks.
 * @param {number} allTasksCount - The total number of tasks.
 * @returns {string} - Returns 'none' if there are no tasks, otherwise 'block'.
 */
function getSubtasksDisplayStyle(allTasksCount) {
    return allTasksCount === 0 ? 'none' : 'block';
}


/**
 * Renders the assigned users for a task in the slide view.
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