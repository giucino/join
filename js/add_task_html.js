/**
 * Creates a success message template.
 * @returns {string} - The HTML template for a success message overlay.
 */
function createdTaskTemplate() {
    return /*html*/ `
        <div id="createTaskOverlay" class="task-overlay">
            <div class="task-success-message">
                <p>Task added to board</p>
                <img class="send-check" src="../img/added_task.png" alt="">
            </div>
        </div>
    `;
}


function renderAssignedToHTML(contact, initials, isSelected) {
    return /*html*/`
        <div class="contact-container ${isSelected ? 'selected' : ''}" onclick="toggleContactSelection('${contact.name}', '${contact.surename}')">
            <div class="select-contact">
                <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
                <div class="select-name">${contact.name} ${contact.surename}</div>
            </div>
            <img class="select-icon" id="selectCheck" src="${isSelected ? 'img/check_contact.png' : 'img/check-button.png'}"  alt="Check Button">
        </div>
    `;
}


function renderSearchedContactsHTML(contact, initials, isSelected) {
    return /*html*/`
        <div class="contact-container ${isSelected ? 'selected' : ''}" onclick="toggleContactSelection('${contact.name}', '${contact.surename}')">
            <div class="select-contact">
                <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
                <div class="select-name">${contact.name} ${contact.surename}</div>
            </div>
            <img class="select-icon" id="selectCheck" src="${isSelected ? 'img/check_contact.png' : 'img/check-button.png'}"  alt="Check Button">
        </div>
    `;
}


function createSubtaskHTML(subtaskId, subtaskValue) {
    return /*html*/`
        <div id="subtask-container-${subtaskId}" class="subtask-container">
            <div class="subtask-item">
                <span class="subtask-dot"></span>           
                <span id="${subtaskId}" data-subtask-id="${subtaskId}" class="subtask-value" contenteditable="false">${subtaskValue}</span>
            </div>
            <div class="hover-content">
                <img onclick="editSubtask('${subtaskId}')" src="./img/edit_subtask.png" class="edit-subtask-button">
                <span class="separator2" id="separator2">|</span> 
                <img onclick="deleteSubtask('${subtaskId}')" data-subtask-id="${subtaskId}" src="./img/delete_subtask.png" class="delete-subtask-button">
                <!-- <img onclick="deleteSubtask(event)" src="./img/delete_subtask.png" class="delete-subtask-button"> --> 
            </div>
            <img onclick="deleteSubtask('${subtaskId}')" data-subtask-id="${subtaskId}" src="./img/delete_subtask.png" class="edit-delete-subtask-button">
            <span class="separator3" id="separator3">|</span> 
            <img onclick="finishEditing('${subtaskId}')" src="./img/add_subtask.png" class="save-subtask-button">
        </div>
    `;
}