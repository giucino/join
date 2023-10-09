/**
 * Removes editing-related CSS classes and styles from a container element.
 * 
 * @param {HTMLElement} container - The container element to remove classes and styles from.
 */
function addRemoveEditingClasses(container) {
    container.classList.remove("editing-mode");
    container.classList.remove("no-hover");
    container.style.borderBottom = "";

    let dot = container.querySelector(".subtask-dot");
    let saveButton = container.querySelector(".save-subtask-button");
    let cancelButton = container.querySelector(".edit-delete-subtask-button");
    let separator3 = container.querySelector(".separator3");

    if (dot) {
        dot.style.display = "inline-block";
    }

    if (saveButton) {
        saveButton.style.display = "none";
    }

    if (cancelButton) {
        cancelButton.style.display = "none";
    }

    if (separator3) {
        separator3.style.display = "none";
    }
}