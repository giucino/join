/**
 * Renders and displays the selected contacts.
 */
function renderDisplayChosenContacts() {
    let chosenContactsContainer = document.getElementById('edit-chosen-contacts');
    chosenContactsContainer.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const isSelected = selectedContacts[contact.id];

        if (isSelected) {
            let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
            chosenContactsContainer.innerHTML += renderDisplayChosenContactsHTML(contact, initials);
        }
    }
}

/**
 * Renders the HTML for a chosen contact with its initials.
 * 
 * @function
 * @param {Object} contact - The contact information.
 * @param {string} contact.bgcolor - The background color for the initials div.
 * @param {string} initials - The initials of the contact.
 * @returns {string} - The rendered HTML string.
 */
function renderDisplayChosenContactsHTML(contact, initials) {
    return /*html*/`
        <div class="chosen-contact">
            <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
        </div>
    `;
}

/**
 * Loads and displays the chosen contacts.
 */
function loadDisplayChosenContacts() {
    const chosenContactsContainer = document.getElementById('edit-chosen-contacts');
    let htmlContent = '';

    for (const id in selectedContacts) {
        if (selectedContacts.hasOwnProperty(id)) {
            const contact = contacts.find(c => c.id === parseInt(id));
            if (contact) {
                const initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
                htmlContent += loadDisplayChosenContactsHTML(contact, initials);
            }
        }
    }
    chosenContactsContainer.innerHTML = htmlContent;
}

/**
 * Generiert und gibt einen HTML-String für die Anzeige ausgewählter Kontakte zurück.
 *
 * @param {Object} contact - Das Kontaktobjekt mit notwendigen Informationen.
 * @param {string} contact.bgcolor - Hintergrundfarbe für die Initialen.
 * @param {string} initials - Initialen des Kontakts.
 *
 * @returns {string} HTML-String zur Darstellung des ausgewählten Kontakts.
 */
function loadDisplayChosenContactsHTML(contact, initials) {
    return /*html*/`
        <div class="chosen-contact">
            <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
        </div>
    `;
}

/**
 * Toggles the category container's display status and updates category dropdown's visual state.
 */
function loadToggleCategoryContainer() {
    let editSelectText = document.querySelector('.edit-select-text');
    editSelectText.style.display = 'inline';

    let editSelectedCategory = document.getElementById('edit-selected-category-display');
    editSelectedCategory.textContent = '';

    let editCategoryContainer = document.getElementById('edit-loaded-categories');
    let editCategoryDropdown = document.querySelector('.edit-category-dropdown');

    if (editCategoryContainer.style.display === 'block') {
        editCategoryContainer.style.display = 'none';
        editCategoryDropdown.classList.remove('expanded');
    } else {
        editCategoryContainer.style.display = 'block';
        editCategoryDropdown.classList.add('expanded');
        editRenderCategorys();
    }
}

/**
 * Renders the categories for editing.
 */
function editRenderCategorys() {
    let editCategoryContainer = document.getElementById('edit-loaded-categories');
    editCategoryContainer.innerHTML = '';

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i].name;

        editCategoryContainer.innerHTML += /* html */`
        <div class="category" onclick="categorySelected('${category}')">${category}</div>
        `;
    }
}

/**
 * Loads the provided category into the selected category.
 * @param {Object} element - The element containing category data.
 */
function loadRenderCategory(element) {
    const category = element.category;  
    selectedCategory = category;
}

/**
 * Handles the logic when a category is selected.
 * @param {string} category - The name of the selected category.
 */
function categorySelected(category) {
    selectedCategory = category;

    let selectedCategoryDisplay = document.getElementById('edit-selected-category-display');
    selectedCategoryDisplay.textContent = `${selectedCategory}`;

    let selectText = document.querySelector('.edit-select-text');
    selectText.style.display = 'none';

    let categoryContainer = document.getElementById('edit-loaded-categories');
    categoryContainer.style.display = 'none';

    let categoryDropdown = document.querySelector('.edit-category-dropdown');
    categoryDropdown.classList.remove('expanded');
}

/**
 * Opens the subtask input and updates relevant display elements.
 */
function openSubtaskInput() {
    document.querySelector('.open-subtask-button').style.display = 'none';
    document.getElementById('edit-subtask-input').focus();
    document.getElementById('edit-separator').classList.add('inline-flex');
    let otherButtons = document.querySelectorAll('.add-subtask-button');
    for (let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].style.display = 'inline-block';
    }
}

/**
 * Closes the subtask input and resets the relevant display elements.
 */
function closeSubtaskInput() {
    document.querySelector('.open-subtask-button').style.display = 'inline-block';
    document.querySelector('.new-subtask-textfield').value = '';
    document.getElementById('edit-separator').style.display = 'none'
    let otherButtons = document.querySelectorAll('.add-subtask-button');
    for (let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].style.display = 'none';
    }
}

/**
 * Deletes a subtask based on its ID.
 * @param {number|string} subtaskId - The ID of the subtask to delete.
 */
function deleteEditSubtask(subtaskId) {
    let indexToDelete = subtasks.findIndex(subtask => subtask.id === subtaskId);

    if (indexToDelete !== -1) {
        subtasks.splice(indexToDelete, 1);

        let subtaskElement = document.getElementById(subtaskId);
        if (subtaskElement) {
            subtaskElement.parentElement.parentElement.remove();
        }
    }
}

/**
 * Allows the user to edit a subtask.
 * @param {number} i - The index or unique identifier for the subtask.
 */
function editEditedSubtask(i) {
    let subtaskElement = document.getElementById(i);
    if (subtaskElement) {
        subtaskElement.contentEditable = true;
        subtaskElement.focus();
    }

    let subtaskContainer = document.getElementById(`subtask-container-${i}`);
    if (subtaskContainer) {
        addEditingClasses(subtaskContainer);
    }
}

function addEditingClasses(container) {
    container.classList.add("editing-mode");
    container.classList.add("no-hover");
    container.style.borderBottom = "1px solid #4589FF";

    let dot = container.querySelector(".edit-subtask-dot");
    let saveButton = container.querySelector(".edit-save-subtask-button");
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
    

function finishEditing(i) {
    let subtaskElement = document.getElementById(i);

    if (subtaskElement) {
        subtaskElement.contentEditable = false;
    }
    let subtaskContainer = document.getElementById(`subtask-container-${i}`);

    if (subtaskContainer) {
        removeEditingClasses(subtaskContainer);
    }
    saveEditedTitle();
}

function removeEditingClasses(container) {
    container.classList.remove("editing-mode");
    container.classList.remove("no-hover");
    container.style.borderBottom = "";

    let dot = container.querySelector(".edit-subtask-dot");
    let saveButton = container.querySelector(".edit-save-subtask-button");
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


function saveEditedTitle() {
    let currentTask = todos[currentTaskId];
    console.log("currentTask in saveEditedTitle:", currentTask);
    
    if (!currentTask || !currentTask.subtasks) {
        console.error("currentTask ist nicht definiert oder hat keine subtasks.");
        return;  // Beenden Sie die Funktion frühzeitig
    }
     
    let subtaskElements = document.querySelectorAll('.edit-subtask-value');

    subtaskElements.forEach((element, index) => {
        let editedTitle = element.innerText;

        if (index >= 0 && index < currentTask.subtasks.length) {
            let editedSubtask = currentTask.subtasks[index];
            editedSubtask.title = editedTitle;

            let updatedTitle = {
                title: editedTitle,
                status: false
            };
            updatedSubtasks.push(updatedTitle);
        } else {
            console.error("Subtask mit dem Index", index, "wurde nicht gefunden.");
        }
    });
}