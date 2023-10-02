/**
 * Makes the specified subtask editable and focuses on it. Also adds editing classes to its container.
 *
 * @function
 * @param {string} subtaskId - The ID of the subtask element to be edited.
 * @returns {void}
 * 
 * @example
 * // Assuming there's a DOM element with the ID "subtask1" and another with the ID "subtask-container-subtask1".
 * editSubtask('subtask1');  // This will make the "subtask1" element editable and add editing classes to its container.
 */
function editSubtask(subtaskId) {
    let subtaskElement = document.getElementById(subtaskId);

    if (subtaskElement) {
        subtaskElement.contentEditable = true;
        subtaskElement.focus();
}

    let subtaskContainer = document.getElementById(`subtask-container-${subtaskId}`);
    if (subtaskContainer) {
        addEditingClasses(subtaskContainer);
    }
}


/**
 * Finishes the editing mode for a given subtask, disables content editing,
 * removes editing-related classes, and saves the edited title.
 *
 * @param {string} subtaskId - The ID of the subtask to finish editing.
 * 
 * @example
 * Assuming there's a subtask with ID "subtask-1" in the DOM.
 * finishEditing('subtask-1');
 */
function finishEditing(subtaskId) {
    let subtaskElement = document.getElementById(subtaskId);

    if (subtaskElement) {
        subtaskElement.contentEditable = false;
    }

    let subtaskContainer = document.getElementById(`subtask-container-${subtaskId}`);
    if (subtaskContainer) {
        removeEditingClasses(subtaskContainer);
    }
    saveEditedTitle(subtaskId);
}


/**
 * Updates the title of a subtask with the given ID.
 * 
 * @function
 * @param {string} subtaskId - The ID of the subtask to be updated.
 * @returns {void}
 * @example
 * 
 * let subtasks = [
 *   {id: 'subtask1', title: 'Original Title'},
 *   ... other subtasks ...
 * ];
 * 
 * saveEditedTitle('subtask1');
 */
function saveEditedTitle(subtaskId) {
    let subtaskElement = document.getElementById(subtaskId);
    let editedTitle = subtaskElement.textContent;

    let editedSubtask = subtasks.find(subtask => subtask.id === subtaskId);

    if (editedSubtask) {
        editedSubtask.title = editedTitle;
    }
}