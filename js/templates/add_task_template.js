// let categories = [
//     { "name": "Design" },
//     { "name": "Sales" },
//     { "name": "Backoffice" },
//     { "name": "Marketing" },
//     { "name": "Webdesign" },
//     { "name": "Tech" }
// ]


// let selectedPriority = '';
// let selectedCategory = '';
// let selectedContacts = [];
// let subtasks = [];


async function initAddTask() {
    await addLoadContactsFromStorage();
    await addLoadTasks();
}


async function addLoadContactsFromStorage() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


async function addLoadTasks() {
    try {
        todos = JSON.parse(await getItem('tasks'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


document.getElementById('taskFormSlider').addEventListener('submit', function (event) {
        event.preventDefault();
        addCreateTask();
    
});


async function addCreateTask() {
    const title = document.getElementById('addTaskTitle').value;
    const description = document.getElementById('addTaskDescription').value;
    const dueDate = document.getElementById('addDueDate').value;

    if (!title) {
        addShowTitleInputError();
        return;
    } if (!description) {
        addShowDescriptionInputError();
        return;
    } if (!dueDate) {
        addShowDateInputError();
        return;
    } if (!selectedPriority) {
        addShowPriorityError();
        return;
    } if (!selectedContacts.length) {
        addShowAssignedContactError();
        return;
    } if (!selectedCategory) {
        addShowSelectCategoryError();
        return;
    }

    const extractedBgcolors = addExtractBgcolor(selectedContacts);

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
    addShowCreatedTaskMessage();
    addResetTaskForm();
}


function addTask() {
    let modal = document.getElementById('taskFormSlider');
    modal.innerHTML = renderAddTask();
    modal.style.display = "block";
    modal.classList.remove('edditModal-slide-out');
    modal.classList.add('edditModal-slide-in');
    let overlay = document.querySelector(".background-overlay");
    overlay.style.display = "block";
}


function closeAddTaskModal() {
    let modal = document.getElementById("taskFormSlider");    
    modal.innerHTML = '';
    modal.style.display = "none";
    modal.classList.remove('edditModal-slide-in');
    modal.classList.add('edditModal-slide-out');
    let overlay = document.querySelector(".background-overlay");
    overlay.style.display = "none";
}


/**
 * Creates a success message template.
 * @returns {string} - The HTML template for a success message overlay.
 */
function addCreatedTaskTemplate() {
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
function addShowCreatedTaskMessage() {
    document.body.innerHTML += addCreatedTaskTemplate();

    setTimeout(function () {
        let successOverlay = document.getElementById('createTaskOverlay');
        document.body.removeChild(successOverlay);

    }, 1600);
}


function addShowTitleInputError() {
    let titleError = document.getElementById('addRequiredTitle');
    titleError.style.display = 'block';
    let titleInput = document.querySelector('.add-task-titel-textcontainer');
    titleInput.style.borderColor = '#FF8190';
}


function addResetTitleInput() {
    let titleError = document.getElementById('addRequiredTitle');
    titleError.style.display = 'none';

    let titleInput = document.querySelector('.add-task-titel-textcontainer');
    let input = titleInput.querySelector('.add-task-titel-textfield');

    if (!input.matches(':focus')) {
        titleInput.style.borderColor = '#D1D1D1';
    }
}
// let titleInput = document.getElementById('addTaskTitle');
// titleInput.addEventListener('input', addResetTitleInput);
document.body.addEventListener('input', function (event) {
    if (event.target.id === 'addTaskTitle') {
        addResetTitleInput();
    }
});



function addShowDescriptionInputError() {
    let descriptionError = document.getElementById('addRequiredDescription');
    descriptionError.style.display = 'block';
    let descriptionInput = document.querySelector('.add-task-description-textfield');
    descriptionInput.style.borderColor = '#FF8190';
}


function addResetDescriptionInput() {
    let descriptionError = document.getElementById('addRequiredDescription');
    descriptionError.style.display = 'none';

    let descriptionInput = document.querySelector('.add-task-description-textfield');
    descriptionInput.style.borderColor = '#D1D1D1';
}
// let descriptionInput = document.getElementById('addTaskDescription');
// descriptionInput.addEventListener('input', addResetDescriptionInput);
document.body.addEventListener('input', function (event) {
    if (event.target.id === 'addTaskDescription') {
        addResetDescriptionInput();
    }
});



function addShowDateInputError() {
    let dateError = document.getElementById('addRequiredDate');
    dateError.style.display = 'block';
    let dateInput = document.querySelector('.due-date-input-container');
    dateInput.style.borderColor = '#FF8190';
}


function addResetDateInput() {
    let dateError = document.getElementById('addRequiredDate');
    dateError.style.display = 'none';

    let dateInput = document.querySelector('.due-date-input-container');
    let input = dateInput.querySelector('.due-date-textfield');

    if (!input.matches(':focus')) {
        dateInput.style.borderColor = '#D1D1D1';
    }
}
// let dateInput = document.getElementById('addDueDate');
// dateInput.addEventListener('input', addResetDateInput);
document.body.addEventListener('input', function (event) {
    if (event.target.id === 'addDueDate') {
        addResetDateInput();
    }
});



function addShowPriorityError() {
    let priorityError = document.getElementById('addRequiredPriority');
    priorityError.style.display = 'block';
}


function addHidePriorityError() {
    let priorityError = document.getElementById('addRequiredPriority');
    priorityError.style.display = 'none';
}


function addShowAssignedContactError() {
    let assignedError = document.getElementById('addRequiredContact');
    assignedError.style.display = 'block';
    let assignedInput = document.querySelector('.add-assigned-to-choicefield');
    assignedInput.style.borderColor = '#FF8190';
}


function addResetAssignedContact() {
    let assignedError = document.getElementById('addRequiredContact');
    assignedError.style.display = 'none';

    let assignedInput = document.querySelector('.add-assigned-to-choicefield');
    let input = assignedInput.querySelector('.assigned-select-text');
    if (!input.matches(':focus')) {
        assignedInput.style.borderColor = '#D1D1D1';
    }
}
// let assignedDropdown = document.querySelector('.assigned-to-dropdown');
// assignedDropdown.addEventListener('click', addResetAssignedContact);
document.body.addEventListener('click', function (event) {
    if (event.target.classList.contains('assigned-to-dropdown')) {
        addResetAssignedContact();
    }
});


function addShowSelectCategoryError() {
    let assignedError = document.getElementById('addRequiredCategory');
    assignedError.style.display = 'block';
    let assignedInput = document.querySelector('.category-choicefield');
    assignedInput.style.borderColor = '#FF8190';
}


function addResetSelectCategory() {
    let categoryError = document.getElementById('addRequiredCategory');
    categoryError.style.display = 'none';

    let categoryInput = document.querySelector('.category-choicefield')
    let input = categoryInput.querySelector('.select-text');
    if (!input.matches(':focus')) {
        categoryInput.style.borderColor = '#D1D1D1';
    }
}
// let categoryDropdown = document.querySelector('.category-dropdown');
// categoryDropdown.addEventListener('click', addResetSelectCategory);
document.body.addEventListener('click', function (event) {
    if (event.target.classList.contains('category-dropdown')) {
        addResetSelectCategory();
    }
});



function addResetTaskForm() {
    document.getElementById('addTaskTitle').value = '';
    document.getElementById('addTaskDescription').value = '';
    document.getElementById('addDueDate').value = '';
    addResetButtons();
    addResetAssignedToSelection();
    addResetCategorySelection();
    addResetSubtasks();
}


function addResetAssignedToSelection() {
    selectedContacts = {};
    let searchInput = document.getElementById('addSearchInput');
    searchInput.value = '';
    addRenderAssignedTo();
    addDisplayChosenContacts();
}


function addResetCategorySelection() {
    selectedCategory = '';
    let selectedCategoryDisplay = document.getElementById('addSelectedCategoryDisplay');
    selectedCategoryDisplay.textContent = '';

    let selectText = document.querySelector('.select-text');
    selectText.style.display = 'inline';
}


function addResetSubtasks() {
    subtasks = [];
    let subtasksContainer = document.getElementById('addSubtask-add-container');
    let subtasksInput = document.getElementById('addSubtaskInput');
    subtasksContainer.innerHTML = '';
    subtasksInput.value = '';
    addCloseSubtaskInput();
}


function addResetButtons() {
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


function addPriority(button) {
    addResetButtons();
    addHidePriorityError();

    if (button.id === 'addPrioUrgent') {
        addHighlightButton(button, '#FF3D00', './img/prio_high_active.png');
        selectedPriority = 'high';
    } else if (button.id === 'addPrioMedium') {
        addHighlightButton(button, '#FFA800', './img/prio_medium_active.png');
        selectedPriority = 'medium';
    } else if (button.id === 'addPrioLow') {
        addHighlightButton(button, '#7AE229', './img/prio_low_active.png');
        selectedPriority = 'low';
    }
}


function addHighlightButton(button, bgColor, imageSrc) {
    button.classList.add('highlighted');
    button.style.backgroundColor = bgColor;
    let image = button.querySelector('.priority-choice-inner-pic img');
    image.src = imageSrc;
    button.style.color = 'white';
}


async function addRenderAssignedTo() {
    let assignedToContainer = document.getElementById('addLoadedContacts');
    assignedToContainer.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();

        const isSelected = selectedContacts[contact.id] || false;

        assignedToContainer.innerHTML += /*html*/`
                <div class="contact-container ${isSelected ? 'selected' : ''}" onclick="addToggleContactSelection('${contact.name}', '${contact.surename}')">
                    <div class="select-contact">
                        <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
                        <div class="select-name">${contact.name} ${contact.surename}</div>
                    </div>
                    <img class="select-icon" id="selectCheck" src="${isSelected ? 'img/check_contact.png' : 'img/check-button.png'}"  alt="Check Button">
                </div>
            `;
    }
}
// document.addEventListener('DOMContentLoaded', async function () {
//     await addRenderAssignedTo(); // Hier wird die Funktion aufgerufen, nachdem das DOM vollständig geladen wurde.
// });




function addRenderSearchedContact(contacts) {
    let assignedToContainer = document.getElementById('addLoadedContacts');
    assignedToContainer.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
        const isSelected = selectedContacts[contact.id] || false;

        assignedToContainer.innerHTML += /*html*/`
            <div class="contact-container ${isSelected ? 'selected' : ''}" onclick="addToggleContactSelection('${contact.name}', '${contact.surename}')">
                <div class="select-contact">
                    <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
                    <div class="select-name">${contact.name} ${contact.surename}</div>
                </div>
                <img class="select-icon" id="selectCheck" src="${isSelected ? 'img/check_contact.png' : 'img/check-button.png'}"  alt="Check Button">
            </div>
        `;
    }
}


function addSearchContacts(query) {
    let filteredContacts = contacts.filter(contact => {
        return (
            contact.name.toLowerCase().startsWith(query.toLowerCase()) ||
            contact.surename.toLowerCase().startsWith(query.toLowerCase())
        );
    });
    addRenderSearchedContact(filteredContacts);
}


function addToggleContactSelection(name, surename) {
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
    addRenderAssignedTo();
    addRenderSearchedContact(contacts);
    addDisplayChosenContacts();
}


function addExtractBgcolor(selectedContacts) {
    const bgcolors = [];
    for (const contactName of selectedContacts) {
        const foundContact = contacts.find(c => `${c.name} ${c.surename}` === contactName);
        if (foundContact && foundContact.bgcolor) {
            bgcolors.push(foundContact.bgcolor);
        }
    }
    return bgcolors;
}


function addToggleAssignedToContainer() {
    let assignedToContainer = document.getElementById('addLoadedContacts');
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
    addRenderAssignedTo();
}


function addDisplayChosenContacts() {
    let chosenContactsContainer = document.getElementById('addChosenContacts');
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


function addRenderCategorys() {
    let categoryContainer = document.getElementById('addLoadedCategories');
    categoryContainer.innerHTML = '';

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i].name;
        categoryContainer.innerHTML += `
            <div class="category" onclick="addCategorySelected('${category}')">${category}</div>
            `;
    }
}


function addToggleCategoryContainer() {
    let selectText = document.querySelector('.select-text');
    selectText.style.display = 'inline';

    let selectedCategoryDisplay = document.getElementById('addSelectedCategoryDisplay');
    selectedCategoryDisplay.textContent = '';

    let categoryContainer = document.getElementById('addLoadedCategories');
    let categoryDropdown = document.querySelector('.category-dropdown');

    if (categoryContainer.style.display === 'block') {
        categoryContainer.style.display = 'none';
        categoryDropdown.classList.remove('expanded');
    } else {
        categoryContainer.style.display = 'block';
        categoryDropdown.classList.add('expanded');
        addRenderCategorys();
    }
}


function addCategorySelected(category) {
    selectedCategory = category;

    let selectedCategoryDisplay = document.getElementById('addSelectedCategoryDisplay');
    selectedCategoryDisplay.textContent = `${selectedCategory}`;

    let selectText = document.querySelector('.select-text');
    selectText.style.display = 'none';

    let categoryContainer = document.getElementById('addLoadedCategories');
    categoryContainer.style.display = 'none';

    let categoryDropdown = document.querySelector('.category-dropdown');
    categoryDropdown.classList.remove('expanded');
}


let subtaskIdCounter = 0;

function addAddSubtask() {
    let subtaskInput = document.querySelector('.new-subtask-textfield');
    let subtaskValue = subtaskInput.value;

    if (!subtaskValue) {
        return;
    }

    subtaskIdCounter++;

    let subtaskId = 'subtask-' + subtaskIdCounter;

    subtasks.push({
        id: subtaskId,
        title: subtaskValue,
        status: false
    });

    let subtasksContainer = document.getElementById('addSubtask-add-container');
    subtasksContainer.innerHTML += /*html*/`
        <div class="subtask-container">
            <div class="subtask-item">
                <span class="subtask-dot"></span>           
                <span id="${subtaskId}" class="subtask-value">${subtaskValue}</span>
            </div>
            <div class="hover-content">
                <img onclick="editSubtask()" src="./img/edit_subtask.png" class="edit-subtask-button">
                <span class="separator2" id="addSeparator2">|</span> 
                <img onclick="addDeleteSubtask('${subtaskId}')" data-subtask-id="${subtaskId}" src="./img/delete_subtask.png" class="delete-subtask-button">
                <!-- <img onclick="addDeleteSubtask(event)" src="./img/delete_subtask.png" class="delete-subtask-button"> -->
            </div>
        </div>
    `;

    subtaskInput.value = '';
    addCloseSubtaskInput();
}


function addOpenSubtaskInput() {
    document.querySelector('.open-subtask-button').style.display = 'none';
    document.getElementById('addSubtaskInput').focus();
    document.getElementById('addSeparator').style.display = 'inline-flex'
    let otherButtons = document.querySelectorAll('.add-subtask-button');
    for (let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].style.display = 'inline-block';
    }
}


function addCloseSubtaskInput() {
    document.querySelector('.open-subtask-button').style.display = 'inline-block';
    document.querySelector('.new-subtask-textfield').value = '';
    document.getElementById('addSeparator').style.display = 'none'
    let otherButtons = document.querySelectorAll('.add-subtask-button');
    for (let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].style.display = 'none';
    }
}


function addDeleteSubtask(subtaskId) {
    const indexToDelete = subtasks.findIndex(subtask => subtask.id === subtaskId);

    if (indexToDelete !== -1) {
        subtasks.splice(indexToDelete, 1);

        const subtaskElement = document.getElementById(subtaskId);
        if (subtaskElement) {
            subtaskElement.parentElement.parentElement.remove();
        }
    }
}


// function addDeleteSubtask(event) {
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


function addApplyBorderColorOnFocusAndBlur(containerSelector, inputSelector, focusColor, blurColor) {
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
    addApplyBorderColorOnFocusAndBlur(
        '.add-task-titel-textcontainer',
        '.add-task-titel-textfield',
        '#4589FF',
        '#D1D1D1'
    );
    // addApplyBorderColorOnFocusAndBlur(
    //     '.add-task-description-textfield',
    //     '.add-task-description-textfield',
    //     '#4589FF',
    //     '#D1D1D1'
    // );
    addApplyBorderColorOnFocusAndBlur(
        '.due-date-input-container',
        '.due-date-textfield',
        '#4589FF',
        '#D1D1D1'
    );
    addApplyBorderColorOnFocusAndBlur(
        '.add-assigned-to-choicefield',
        '#addSearchInput',
        '#4589FF',
        '#D1D1D1'
    );
    addApplyBorderColorOnFocusAndBlur(
        '.add-subtask-input',
        '#addSubtaskInput',
        '#4589FF',
        '#D1D1D1'
    );
});


function renderAddTask() {
    return /* html */ `
<div class="float-add-task-container">
    <div class="header">
        <h1 class="title-add-task">Add Task</h1>
        <img class="close-add-task" onclick="closeAddTaskModal()" src="./img/close_subtask.png" alt="Close Task">
    </div>
    <div class="add-task-content">
        <div class="add-task-container-first">
            <div class="add-task-container-titel">
                <div class="add-task-titel-textcontainer">
                    <input id="addTaskTitle" class="add-task-titel-textfield" placeholder="Enter a title">
                </div>
                <div id="addRequiredTitle" class="add-task-field-required">
                    This field is required
                </div>
            </div>
            <div class="add-task-container-description">
                <div class="add-task-description-header">Description</div>
                <textarea id="addTaskDescription" class="add-task-description-textfield"
                    placeholder="Enter a Description" cols="30" rows="4"></textarea>
                <div id="addRequiredDescription" class="add-task-field-required">
                    This field is required
                </div>
            </div>
            <div class="due-date-container">
                <div class="due-date-header">
                    Due date
                </div>
                <div class="due-date-input-container">
                    <input id="addDueDate" class="due-date-textfield" type="date">
                </div>
                <div id="addRequiredDate" class="add-task-field-required">
                    This field is required
                </div>
            </div>
        </div>
        <div class="add-task-container-priority">
            <div class="add-task-priority-header">
                Priority
            </div>
            <div class="priority-choice">
                <button type="button" onclick="addPriority(this)" id="addPrioUrgent"
                    class="priority-choice-inner prio-urgent">
                    Urgent
                    <div class="priority-choice-inner-pic">
                        <img src="./img/prio-high.png" id="addPrioUrgentImg" class="original-image"
                            data-image="prio-high.png">
                    </div>
                </button>
                <button type="button" onclick="addPriority(this)" id="addPrioMedium"
                    class="priority-choice-inner prio-medium">
                    Medium
                    <div class="priority-choice-inner-pic">
                        <img src="./img/prio-medium.png" id="addPrioMediumImg" class="original-image"
                            data-image="prio-medium.png">
                    </div>
                </button>
                <button type="button" onclick="addPriority(this)" id="addPrioLow"
                    class="priority-choice-inner prio-low">
                    Low
                    <div class="priority-choice-inner-pic">
                        <img src="./img/prio-low.png" id="addPrioLowImg" class="original-image"
                            data-image="prio-low.png">
                    </div>
                </button>
            </div>
            <div id="addRequiredPriority" class="add-task-field-required">
                This field is required
            </div>
        </div>
        <div class="assigned-to-container">
            <div class="assigned-to-header">
                Assigned to
            </div>
            <div class="assigned-to-choicefield" id="add-assigned-to-choicefield">
                <div class="assigned-to-dropdown" onclick="addToggleAssignedToContainer()">
                    <div class="assigned-dropdown-header">
                        <input oninput="addSearchContacts(this.value)" id="addSearchInput" class="assigned-select-text"
                            placeholder="Select contacts to assign" type="text">
                    </div>
                    <div class="assigned-dropdown-arrow"></div>
                </div>
            </div>
            <div id="addRequiredContact" class="add-task-field-required">
                This field is required
            </div>
            <div class="contacts-container">
                <div id="addLoadedContacts" class="loaded-contacts">
                </div>
                <button id="addContactBtn" onclick="openModal()" class="add-person-btn" type="button">
                    Add new contact
                    <img src="./img/person_add.svg" class="button-icon">
                </button>
            </div>
            <div id="addChosenContacts" class="chosen-contacts"></div>
        </div>
        <div class="category-container">
            <div class="category-header">
                Category
            </div>
            <div class="category-choicefield">
                <div class="category-dropdown" onclick="addToggleCategoryContainer()">
                    <div class="dropdown-header" id="addDropdownHeader">
                        <span class="select-text">Select task category</span>
                        <span id="addSelectedCategoryDisplay"></span>
                    </div>
                    <div class="dropdown-arrow"></div>
                </div>
            </div>
            <div id="addRequiredCategory" class="add-task-field-required">
                This field is required
            </div>
            <div id="addLoadedCategories" class="loaded-categories"></div>
        </div>
        <div class="subtasks-container">
            <div class="subtasks-header">
                Subtasks
            </div>
            <div class="add-subtask-input">
                <input onclick="addOpenSubtaskInput()" type="text" id="addSubtaskInput" class="new-subtask-textfield"
                    placeholder="Add new subtask">
                <img onclick="addOpenSubtaskInput()" class="open-subtask-button" src="./img/open_subtask.png">
                <img onclick="addCloseSubtaskInput()" class="add-subtask-button hidden" id="addCloseSubtask"
                    src="./img/close_subtask.png">
                <span class="separator" id="addSeparator">|</span>
                <img onclick="addAddSubtask()" class="add-subtask-button hidden" id="addAddNewSubtask"
                    src="./img/add_subtask.png">
            </div>
            <div id="addSubtask-add-container" class="subtask-add-container"></div>
        </div>
    </div>
    <div class="add-task-bottom-container">
        <button type="submit" id="addCreateTaskButton" class="button-create-task">
            Create Task
            <img class="button-create-task-pic" src="./img/check.svg">
        </button>
    </div>
</div>
    `;
}