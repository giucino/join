/**
 * Adds editing classes and styles to a given container element.
 * - Adds "editing-mode" and "no-hover" classes.
 * - Updates the border at the bottom of the container.
 * - Adjusts display properties for various child elements of the container such as ".subtask-dot",
 *   ".save-subtask-button", ".edit-delete-subtask-button", and ".separator3".
 * 
 * @param {HTMLElement} container - The container element to modify.
 */

function addEditingClasses(container) {
    container.classList.add("editing-mode");
    container.classList.add("no-hover");
    container.style.borderBottom = "1px solid #4589FF";

    let dot = container.querySelector(".subtask-dot");
    let saveButton = container.querySelector(".save-subtask-button");
    let cancelButton = container.querySelector(".edit-delete-subtask-button");
    let separator3 = container.querySelector(".separator3");

    if (dot) {
        dot.style.display = "none";
    }

    if (saveButton) {
        saveButton.style.display = "block";
    }

    if (cancelButton) {
        cancelButton.style.display = "block";
    }

    if (separator3) {
        separator3.style.display = "block";
    }
}


/**
 * Removes editing-related classes and styles from a given container element.
 *
 * @function
 * @param {HTMLElement} container - The container element to clean up.
 * @returns {void}
 *
 * @example
 * const container = document.querySelector('.some-container');
 * removeEditingClasses(container);
 */
function removeEditingClasses(container) {
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