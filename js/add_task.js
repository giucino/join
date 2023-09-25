let categories = [
    { "name": "Design" },
    { "name": "Sales" },
    { "name": "Backoffice" },
    { "name": "Marketing" },
    { "name": "Webdesign" },
    { "name": "Tech" }
]


let selectedPriority = '';
let selectedCategory = '';
let selectedContacts = [];
let subtasks = [];


async function initTask() {
    await loadContactsFromStorage();
    await loadTasks();
    await renderAssignedTo();
    renderCategorys();
}


async function loadContactsFromStorage() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


async function loadTasks() {
    try {
        todos = JSON.parse(await getItem('tasks'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


document.getElementById('taskForm').addEventListener('submit', function (event) {
    event.preventDefault();
    createTask();
});


async function createTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;

    if (!title) {
        showTitleInputError();
        return;
    } if (!description) {
        showDescriptionInputError();
        return;
    } if (!dueDate) {
        showDateInputError();
        return;
    } if (!selectedPriority) {
        showPriorityError();
        return;
    } if (!selectedContacts.length) {
        showAssignedContactError();
        return;
    } if (!selectedCategory) {
        showSelectCategoryError();
        return;
    }

    const extractedBgcolors = extractBgcolor(selectedContacts);

    const highestId = todos.reduce((maxId, currentTodo) => {
        return currentTodo.id > maxId ? currentTodo.id : maxId;
    }, 0);

    const newTodoId = highestId + 1;

    const newTodo = {
        id: newTodoId,
        title: title,
        description: description,
        category: selectedCategory,
        status: 'todo',
        priority: selectedPriority,
        dueDate: dueDate,
        assignedTo: selectedContacts,
        bgcolor: extractedBgcolors,
        subtasks: subtasks
    };
    todos.push(newTodo);

    await setItem('tasks', JSON.stringify(todos));
    showCreatedTaskMessage();
    resetTaskForm();
}

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

/**
 * Shows a success message overlay and redirects to the index page.
 */
function showCreatedTaskMessage() {
    document.body.innerHTML += createdTaskTemplate();

    setTimeout(function () {
        let successOverlay = document.getElementById('createTaskOverlay');
        document.body.removeChild(successOverlay);

        window.location.href = 'board.html';
    }, 1600);
}


function showTitleInputError() {
    let titleError = document.getElementById('requiredTitle');
    titleError.style.display = 'block';
    let titleInput = document.querySelector('.add-task-titel-textcontainer');
    titleInput.style.borderColor = '#FF8190';
}


function resetTitleInput() {
    let titleError = document.getElementById('requiredTitle');
    titleError.style.display = 'none';

    let titleInput = document.querySelector('.add-task-titel-textcontainer');
    let input = titleInput.querySelector('.add-task-titel-textfield');

    if (!input.matches(':focus')) {
        titleInput.style.borderColor = '#D1D1D1';
    }
}
let titleInput = document.getElementById('taskTitle');
titleInput.addEventListener('input', resetTitleInput);


function showDescriptionInputError() {
    let descriptionError = document.getElementById('requiredDescription');
    descriptionError.style.display = 'block';
    let descriptionInput = document.querySelector('.add-task-description-textfield');
    descriptionInput.style.borderColor = '#FF8190';
}


function resetDescriptionInput() {
    let descriptionError = document.getElementById('requiredDescription');
    descriptionError.style.display = 'none';

    let descriptionInput = document.querySelector('.add-task-description-textfield');
    descriptionInput.style.borderColor = '#D1D1D1';
}
let descriptionInput = document.getElementById('taskDescription');
descriptionInput.addEventListener('input', resetDescriptionInput);


function showDateInputError() {
    let dateError = document.getElementById('requiredDate');
    dateError.style.display = 'block';
    let dateInput = document.querySelector('.due-date-input-container');
    dateInput.style.borderColor = '#FF8190';
}


function resetDateInput() {
    let dateError = document.getElementById('requiredDate');
    dateError.style.display = 'none';

    let dateInput = document.querySelector('.due-date-input-container');
    let input = dateInput.querySelector('.due-date-textfield');

    if (!input.matches(':focus')) {
        dateInput.style.borderColor = '#D1D1D1';
    }
}
let dateInput = document.getElementById('dueDate');
dateInput.addEventListener('input', resetDateInput);


function showPriorityError() {
    let priorityError = document.getElementById('requiredPriority');
    priorityError.style.display = 'block';
}


function hidePriorityError() {
    let priorityError = document.getElementById('requiredPriority');
    priorityError.style.display = 'none';
}


function showAssignedContactError() {
    let assignedError = document.getElementById('requiredContact');
    assignedError.style.display = 'block';
    let assignedInput = document.querySelector('.assigned-to-choicefield');
    assignedInput.style.borderColor = '#FF8190';
}


function resetAssignedContact() {
    let assignedError = document.getElementById('requiredContact');
    assignedError.style.display = 'none';

    let assignedInput = document.querySelector('.assigned-to-choicefield');
    let input = assignedInput.querySelector('.assigned-select-text');
    if (!input.matches(':focus')) {
        assignedInput.style.borderColor = '#D1D1D1';
    }
}
let assignedDropdown = document.querySelector('.assigned-to-dropdown');
assignedDropdown.addEventListener('click', resetAssignedContact);


function showSelectCategoryError() {
    let assignedError = document.getElementById('requiredCategory');
    assignedError.style.display = 'block';
    let assignedInput = document.querySelector('.category-choicefield');
    assignedInput.style.borderColor = '#FF8190';
}


function resetSelectCategory() {
    let categoryError = document.getElementById('requiredCategory');
    categoryError.style.display = 'none';

    let categoryInput = document.querySelector('.category-choicefield')
    let input = categoryInput.querySelector('.select-text');
    if (!input.matches(':focus')) {
        categoryInput.style.borderColor = '#D1D1D1';
    }
}
let categoryDropdown = document.querySelector('.category-dropdown');
categoryDropdown.addEventListener('click', resetSelectCategory);


function resetTaskForm() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('dueDate').value = '';
    resetButtons();
    resetAssignedToSelection();
    resetCategorySelection();
    resetSubtasks();
}


function resetAssignedToSelection() {
    selectedContacts = {};
    let searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    renderAssignedTo();
    displayChosenContacts();
}


function resetCategorySelection() {
    selectedCategory = '';
    let selectedCategoryDisplay = document.getElementById('selectedCategoryDisplay');
    selectedCategoryDisplay.textContent = '';

    let selectText = document.querySelector('.select-text');
    selectText.style.display = 'inline';
}


function resetSubtasks() {
    subtasks = [];
    let subtasksContainer = document.getElementById('subtask-add-container');
    let subtasksInput = document.getElementById('subtaskInput');
    subtasksContainer.innerHTML = '';
    subtasksInput.value = '';
    closeSubtaskInput();
}


function resetButtons() {
    selectedPriority = '';

    let buttons = document.querySelectorAll('.priority-choice-inner');
    for (let i = 0; i < buttons.length; i++) {
        let btn = buttons[i];
        btn.classList.remove('highlighted');
        btn.style.backgroundColor = '';
        btn.style.color = 'black';

        let originalImage = btn.querySelector('.priority-choice-inner-pic img');
        originalImage.src = './img/' + originalImage.getAttribute('data-image');
    }
}


function priority(button) {
    resetButtons();
    hidePriorityError();

    if (button.id === 'prioUrgent') {
        highlightButton(button, '#FF3D00', './img/prio_high_active.png');
        selectedPriority = 'high';
    } else if (button.id === 'prioMedium') {
        highlightButton(button, '#FFA800', './img/prio_medium_active.png');
        selectedPriority = 'medium';
    } else if (button.id === 'prioLow') {
        highlightButton(button, '#7AE229', './img/prio_low_active.png');
        selectedPriority = 'low';
    }
}


function highlightButton(button, bgColor, imageSrc) {
    button.classList.add('highlighted');
    button.style.backgroundColor = bgColor;
    let image = button.querySelector('.priority-choice-inner-pic img');
    image.src = imageSrc;
    button.style.color = 'white';
}


async function renderAssignedTo() {
    let assignedToContainer = document.getElementById('loadedContacts');
    assignedToContainer.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();

        const isSelected = selectedContacts[contact.id] || false;

        assignedToContainer.innerHTML += /*html*/`
                <div class="contact-container ${isSelected ? 'selected' : ''}" onclick="toggleContactSelection('${contact.name}', '${contact.surename}')">
                    <div class="select-contact">
                        <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
                        <div class="select-name">${contact.name} ${contact.surename}</div>
                    </div>
                    <img class="select-icon" id="selectCheck" src="${isSelected ? 'img/check_contact.png' : 'img/check-button.png'}"  alt="Check Button">
                </div>
            `;
    }
}


function renderSearchedContact(contacts) {
    let assignedToContainer = document.getElementById('loadedContacts');
    assignedToContainer.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
        const isSelected = selectedContacts[contact.id] || false;

        assignedToContainer.innerHTML += renderSearchedContactsHTML(contact, initials, isSelected);
    }
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

function searchContacts(query) {
    let filteredContacts = contacts.filter(contact => {
        return (
            contact.name.toLowerCase().startsWith(query.toLowerCase()) ||
            contact.surename.toLowerCase().startsWith(query.toLowerCase())
        );
    });
    renderSearchedContact(filteredContacts);
}


function toggleContactSelection(name, surename) {
    const contact = contacts.find(c => c.name === name && c.surename === surename);

    if (!contact) {
        return;
    }
    const contactId = contact.id;
    const contactKey = `${contact.name} ${contact.surename}`;

    if (selectedContacts[contactId]) {
        delete selectedContacts[contactId];
    } else {
        selectedContacts[contactId] = contactKey;
    }
    renderAssignedTo();
    renderSearchedContact(contacts);
    displayChosenContacts();
}


function extractBgcolor(selectedContacts) {
    const bgcolors = [];
    for (const contactName of selectedContacts) {
        const foundContact = contacts.find(c => `${c.name} ${c.surename}` === contactName);
        if (foundContact && foundContact.bgcolor) {
            bgcolors.push(foundContact.bgcolor);
        }
    }
    return bgcolors;
}


function toggleAssignedToContainer() {
    let assignedToContainer = document.getElementById('loadedContacts');
    let contactsContainer = document.querySelector('.contacts-container');
    let assignedToDropdown = document.querySelector('.assigned-to-dropdown');

    if (assignedToContainer.style.display === 'block') {
        assignedToContainer.style.display = 'none';
        assignedToDropdown.classList.remove('expanded');
    } else {
        assignedToContainer.style.display = 'block';
        assignedToDropdown.classList.add('expanded');
    }
    contactsContainer.style.display = assignedToContainer.style.display;
}


function displayChosenContacts() {
    let chosenContactsContainer = document.getElementById('chosenContacts');
    chosenContactsContainer.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const isSelected = selectedContacts[contact.id];

        if (isSelected) {
            let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
            chosenContactsContainer.innerHTML += /*html*/`
                <div class="chosen-contact">
                    <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
                </div>
            `;
        }
    }
}


function renderCategorys() {
    let categoryContainer = document.getElementById('loadedCategories');
    categoryContainer.innerHTML = '';

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i].name;
        categoryContainer.innerHTML += `
            <div class="category" onclick="categorySelected('${category}')">${category}</div>
            `;
    }
}


function toggleCategoryContainer() {
    let selectText = document.querySelector('.select-text');
    selectText.style.display = 'inline';

    let selectedCategoryDisplay = document.getElementById('selectedCategoryDisplay');
    selectedCategoryDisplay.textContent = '';

    let categoryContainer = document.getElementById('loadedCategories');
    let categoryDropdown = document.querySelector('.category-dropdown');

    if (categoryContainer.style.display === 'block') {
        categoryContainer.style.display = 'none';
        categoryDropdown.classList.remove('expanded');
    } else {
        categoryContainer.style.display = 'block';
        categoryDropdown.classList.add('expanded');
        renderCategorys();
    }
}


function categorySelected(category) {
    selectedCategory = category;

    let selectedCategoryDisplay = document.getElementById('selectedCategoryDisplay');
    selectedCategoryDisplay.textContent = `${selectedCategory}`;

    let selectText = document.querySelector('.select-text');
    selectText.style.display = 'none';

    let categoryContainer = document.getElementById('loadedCategories');
    categoryContainer.style.display = 'none';

    let categoryDropdown = document.querySelector('.category-dropdown');
    categoryDropdown.classList.remove('expanded');
}


let subtaskIdCounter = 0;

function addSubtask() {
    let subtaskInput = document.querySelector('.new-subtask-textfield');
    let subtaskValue = subtaskInput.value;

    if (!subtaskValue) {
        return;
    }

    subtaskIdCounter++;

    let subtaskId = subtaskIdCounter;

    subtasks.push({
        id: subtaskId,
        title: subtaskValue,
        status: false
    });

    let subtasksContainer = document.getElementById('subtask-add-container');
    subtasksContainer.innerHTML += /*html*/`
        <div class="subtask-container">
            <div class="subtask-item">
                <span class="subtask-dot"></span>           
                <span id="${subtaskId}" class="subtask-value" contenteditable="false">${subtaskValue}</span>
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

    subtaskInput.value = '';
    closeSubtaskInput();
}


function openSubtaskInput() {
    document.querySelector('.open-subtask-button').style.display = 'none';
    document.getElementById('subtaskInput').focus();
    document.getElementById('separator').style.display = 'inline-flex'
    let otherButtons = document.querySelectorAll('.add-subtask-button');
    for (let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].style.display = 'inline-block';
    }
}


function closeSubtaskInput() {
    document.querySelector('.open-subtask-button').style.display = 'inline-block';
    document.querySelector('.new-subtask-textfield').value = '';
    document.getElementById('separator').style.display = 'none'
    let otherButtons = document.querySelectorAll('.add-subtask-button');
    for (let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].style.display = 'none';
    }
}


function deleteSubtask(subtaskId) {
    const indexToDelete = subtasks.findIndex(subtask => subtask.id === subtaskId);

    if (indexToDelete !== -1) {
        subtasks.splice(indexToDelete, 1);

        const subtaskElement = document.getElementById(subtaskId);
        if (subtaskElement) {
            subtaskElement.parentElement.parentElement.remove();
        }
    }
}

// function editSubtask(subtaskId) {
//     let subtaskTitleElement = document.getElementById(subtaskId);

//     subtaskTitleElement.contentEditable = true;

//     // Füge eine CSS-Klasse hinzu, um den editierbaren Zustand anzuzeigen
//     subtaskTitleElement.classList.add('editable-subtask');

//     subtaskTitleElement.focus();

//     let subtaskContainer = document.querySelector("subtask-container");
//     subtaskContainer.classList.add("no-hover");
//     subtaskContainer.style.display = "border-bottom: 1px solid #D1D1D1";

//     let toEditButton = document.querySelector(".edit-subtask-button");
//     let deleteButton = document.querySelector(".delete-subtask-button");
//     let separator = document.querySelector(".separator2");
//     let dot = document.querySelector(".subtask-dot");
//     toEditButton.style.display = "none";
//     deleteButton.style.display = "none";
//     separator.style.display = "none";
//     dot.style.display = "none";

//     let saveButton = document.querySelector(".save-subtask-button");
//     let cancelButton = document.querySelector(".edit-delete-subtask-button");
//     let separator3 = document.querySelector(".separator3");
//     saveButton.style.display = "block";
//     cancelButton.style.display = "block";
//     separator3.style.display = "block";
// }


function editSubtask(subtaskId) {
    let subtaskElement = document.getElementById(subtaskId);
    if (subtaskElement) {
        subtaskElement.contentEditable = true;
    }
    subtaskElement.focus();

    let subtaskContainer = document.querySelector(".subtask-container");
    subtaskContainer.classList.add("no-hover");
    subtaskContainer.style.display = "border-bottom: 1px solid #D1D1D1";

    let editButton = document.querySelector(".edit-subtask-button");
    let deleteButton = document.querySelector(".delete-subtask-button");
    let separator = document.querySelector(".separator2");
    let dot = document.querySelector(".subtask-dot");
    editButton.style.display = "none";
    deleteButton.style.display = "none";
    separator.style.display = "none";
    dot.style.display = "none";

    let saveButton = document.querySelector(".save-subtask-button");
    let cancelButton = document.querySelector(".edit-delete-subtask-button");
    let separator3 = document.querySelector(".separator3");
    saveButton.style.display = "block";
    cancelButton.style.display = "block";
    separator3.style.display = "block";
}


function finishEditing(subtaskId) {
    let subtaskElement = document.getElementById(subtaskId);
    if (subtaskElement) {
        subtaskElement.contentEditable = false;
    }

    let hoverContent = document.querySelector(".subtask-container");
    hoverContent.classList.remove("no-hover");

    let editButton = document.querySelector(".edit-subtask-button");
    let deleteButton = document.querySelector(".delete-subtask-button");
    let separator = document.querySelector(".separator2");
    let dot = document.querySelector(".subtask-dot");
    let saveButton = document.querySelector(".save-subtask-button");
    let cancelButton = document.querySelector(".edit-delete-subtask-button");
    let separator3 = document.querySelector(".separator3");

    hoverContent.addEventListener("mouseenter", () => {
        editButton.style.display = "inline-block";
        deleteButton.style.display = "inline-block";
        separator.style.display = "inline-block";
    });
    hoverContent.addEventListener("mouseleave", () => {
        editButton.style.display = "none";
        deleteButton.style.display = "none";
        separator.style.display = "none";
    });
    dot.style.display = "inline-block";
    saveButton.style.display = "none";
    cancelButton.style.display = "none";
    separator3.style.display = "none";
}


// function saveEditedSubtask(subtaskId) {
//     // Finde das Element, das den bearbeiteten Subtask-Titel darstellt
//     let subtaskTitleElement = document.getElementById(subtaskId);

//     // Deaktiviere die Bearbeitungsfunktion
//     subtaskTitleElement.contentEditable = false;

//     // Entferne die CSS-Klasse, um den editierbaren Zustand anzuzeigen
//     subtaskTitleElement.classList.remove('editable-subtask');

//     // Ändere das Bild zurück auf das Bearbeiten-Symbol
//     let editButton = document.querySelector(`[id="${subtaskId}"] + .hover-content .edit-subtask-button`);
//     editButton.src = "./img/edit_subtask.png";

//     // Aktualisiere den Subtask in deinem Datenmodell (subtasks-Array) mit dem bearbeiteten Titel
//     let editedTitle = subtaskTitleElement.textContent;
//     let editedSubtask = subtasks.find(subtask => subtask.id === parseInt(subtaskId));
//     if (editedSubtask) {
//         editedSubtask.title = editedTitle;
//     }

//     // Füge erneut das Klickereignis für das Bearbeiten hinzu
//     editButton.onclick = function () {
//         editSubtask(subtaskId);
//     };
// }


// function deleteSubtask(event) {
//     let target = event.target;

//     // Überprüfen Sie, ob das angeklickte Element das Bild zum Löschen ist
//     if (target.classList.contains("delete-subtask-button")) {
//         // Das übergeordnete Element des Bildes ist der Container des Subtasks
//         let subtaskContainer = target.closest(".subtask-container");

//         // Wenn ein passender Container gefunden wurde
//         if (subtaskContainer) {
//             // Ermitteln Sie den Index des Containers innerhalb seines Eltern-Elements
//             let index = Array.from(subtaskContainer.parentNode.children).indexOf(subtaskContainer);

//             if (index >= 0) {
//                 // Entfernen Sie den Subtask aus dem Array
//                 subtasks.splice(index, 1);

//                 // Entfernen Sie den Container aus dem DOM
//                 subtaskContainer.parentNode.removeChild(subtaskContainer);
//             }
//         }
//     }
// }


function applyBorderColorOnFocusAndBlur(containerSelector, inputSelector, focusColor, blurColor) {
    const containers = document.querySelectorAll(containerSelector);

    containers.forEach(container => {
        const input = container.querySelector(inputSelector);

        input.addEventListener('focus', () => {
            container.style.borderColor = focusColor;
        });

        input.addEventListener('blur', () => {
            container.style.borderColor = blurColor;
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    applyBorderColorOnFocusAndBlur(
        '.add-task-titel-textcontainer',
        '.add-task-titel-textfield',
        '#4589FF',
        '#D1D1D1'
    );
    // applyBorderColorOnFocusAndBlur(
    //     '.add-task-description-textfield',
    //     '.add-task-description-textfield',
    //     '#4589FF',
    //     '#D1D1D1'
    // );
    applyBorderColorOnFocusAndBlur(
        '.due-date-input-container',
        '.due-date-textfield',
        '#4589FF',
        '#D1D1D1'
    );
    applyBorderColorOnFocusAndBlur(
        '.assigned-to-choicefield',
        '#searchInput',
        '#4589FF',
        '#D1D1D1'
    );
    applyBorderColorOnFocusAndBlur(
        '.add-subtask-input',
        '#subtaskInput',
        '#4589FF',
        '#D1D1D1'
    );
});