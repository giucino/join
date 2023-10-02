/**
 * Initializes the addition of tasks by loading contacts from storage
 * and loading tasks asynchronously.
 * @async
 * @function initAddTask
 * @returns {Promise<void>} A promise that resolves when tasks are loaded.
 */
async function initAddTask() {
    await addLoadContactsFromStorage();
    await addLoadTasks();
}


/**
 * Asynchronously loads contacts data from storage and assigns it to the 'contacts' variable.
 * @async
 * @function
 * @throws {Error} Throws an error if there's an issue parsing or loading the data.
 * @example
 * try {
 *   await addLoadContactsFromStorage();
 *   Access the 'contacts' variable with the loaded data here.
 * } catch (error) {
 *   console.error('Loading error:', error);
 * }
 */
async function addLoadContactsFromStorage() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * Asynchronously loads tasks from local storage and populates the 'todos' array.
 * If loading fails, it logs an error message to the console.
 * @async
 * @function addLoadTasks
 * @throws {Error} If there is an issue with parsing the stored tasks.
 */
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


/**
 * Asynchronously adds a new task with the provided title, description, and due date.
 * Retrieves input values from HTML elements with specific IDs and validates them.
 * @async
 * @function addCreateTask
 * @returns {void}
 */
async function addCreateTask() {
    const title = document.getElementById('addTaskTitle').value;
    const description = document.getElementById('addTaskDescription').value;
    const dueDate = document.getElementById('addDueDate').value;
    addValidateInput(title, description, dueDate);
}


/**
 * Validates the input values for title, description, and due date.
 * If any of these values are missing, it shows corresponding input errors.
 * @param {string} title - The title input value.
 * @param {string} description - The description input value.
 * @param {string} dueDate - The due date input value.
 */
function addValidateInput(title, description, dueDate) {
    if (!title) {
        addShowTitleInputError();
        return;
    } if (!description) {
        addShowDescriptionInputError();
        return;
    } if (!dueDate) {
        addShowDateInputError();
        return;
    }
    addValidateSelections(title, description, dueDate);
}


/**
 * Validates user selections for a task before processing the input.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {Date} dueDate - The due date for the task.
 * @throws {Error} Throws an error if priority or category is not selected.
 */
function addValidateSelections(title, description, dueDate) {
    if (!selectedPriority) {
        addShowPriorityError();
        return;
    } if (!selectedCategory) {
        addShowSelectCategoryError();
        return;
    }
    processValidInput(title, description, dueDate);
}


/**
 * Processes valid input and adds a new todo item to the 'todos' array.
 * @param {string} title - The title of the todo item.
 * @param {string} description - The description of the todo item.
 * @param {string} dueDate - The due date for the todo item.
 */
function processValidInput(title, description, dueDate) {
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
    addCompleteTaskCreation();
}


/**
 * Completes the task creation process by performing the following steps:
 * 1. Persists the updated 'tasks' to local storage.
 * 2. Displays a message indicating that the task has been created.
 * 3. Resets the task creation form.
 * 4. Sets a timeout to close the add task modal after 1.6 seconds.
 * 5. Updates the HTML to reflect the changes.
 * @async
 * @function addCompleteTaskCreation
 * @throws {Error} Throws an error if an error occurs during local storage operation.
 */
async function addCompleteTaskCreation() {
    await setItem('tasks', JSON.stringify(todos));
    addShowCreatedTaskMessage();
    addResetTaskForm();

    setTimeout(function () {
        closeAddTaskModal();
    }, 1600);
    updateHTML();
}


/**
 * Opens a task form for adding a new task. The behavior depends on the window width:
 * - If the window width is greater than or equal to 768 pixels, it displays a modal with a task form.
 * - If the window width is less than 768 pixels, it redirects to the 'addTask.html' page.
 * @function
 * @throws {Error} If the 'taskFormSlider' element is not found in the DOM.
 */
function addTask() {
    if (window.innerWidth >= 768) {
        let modal = document.getElementById('taskFormSlider');
        modal.innerHTML = renderAddTask();
        modal.style.display = "block";
        modal.classList.remove('edditModal-slide-out');
        modal.classList.add('edditModal-slide-in');
        let overlay = document.querySelector(".background-overlay");
        overlay.style.display = "block";
    } else {
        window.location.href = 'addTask.html';
    }
}



/**
 * Closes the add task modal and hides the overlay.
 */
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
 * Shows a success message overlay and redirects to the index page.
 */
function addShowCreatedTaskMessage() {
    document.body.innerHTML += addCreatedTaskTemplate();

    setTimeout(function () {
        let successOverlay = document.getElementById('addCreateTaskOverlay');
        document.body.removeChild(successOverlay);

    }, 1600);
}


/**
 * Filters the contacts list based on a query and renders the matching contacts.
 * @param {string} query - The search query to filter contacts by.
 */
function addSearchContacts(query) {
    let filteredContacts = contacts.filter(contact => {
        return (
            contact.name.toLowerCase().startsWith(query.toLowerCase()) ||
            contact.surename.toLowerCase().startsWith(query.toLowerCase())
        );
    });
    addRenderSearchedContact(filteredContacts);
}


/**
 * Toggles the selection of a contact based on their name and surename.
 * @param {string} name - The name of the contact to toggle.
 * @param {string} surename - The surename of the contact to toggle.
 */
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


/**
 * Extracts the background colors from an array of selected contact names.
 * @param {string[]} selectedContacts - An array of contact names to extract background colors from.
 * @returns {string[]} An array of background colors corresponding to the selected contact names.
 */
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


/**
 * Adds a new subtask to the container.
 * This function retrieves the value from the new subtask input field, trims it, and
 * adds it to the subtask container with a generated subtask ID. If the input is empty,
 * it does nothing.
 * @function
 * @returns {void}
 */
function addAddSubtask() {
    let subtaskInput = document.querySelector('.new-subtask-textfield');
    let subtaskValue = subtaskInput.value.trim();

    if (!subtaskValue) {
        return;
    }
    subtaskIdCounter++;

    let subtaskId = 'subtask-' + subtaskIdCounter;

    addAddSubtaskToContainer(subtaskId, subtaskValue);
    subtaskInput.value = '';
    addCloseSubtaskInput();
}


/**
 * Handles the 'Enter' key press event for a text input field with the class 'new-subtask-textfield'.
 * @param {Event} event - The keyboard event object.
 */
function addHandleSubtaskInput(event) {
    if (event.key === 'Enter' && event.target.classList.contains('new-subtask-textfield')) {
        event.preventDefault();
        addAddSubtask();
        document.activeElement.blur();
    }
}
document.addEventListener('keypress', addHandleSubtaskInput);

/**
 * Adds a new subtask to a container and updates the DOM with the new subtask HTML.
 * @param {string} subtaskId - The unique identifier for the subtask.
 * @param {string} subtaskValue - The title or content of the subtask.
 */
function addAddSubtaskToContainer(subtaskId, subtaskValue) {
    subtasks.push({
        id: subtaskId,
        title: subtaskValue,
        status: false
    });
    let subtasksContainer = document.getElementById('addSubtask-add-container');
    subtasksContainer.innerHTML += addCreateSubtaskHTML(subtaskId, subtaskValue);
}


/**
 * Removes a subtask from the subtasks array and the corresponding HTML element from the DOM.
 * @param {string} subtaskId - The ID of the subtask to be deleted.
 */
function addDeleteSubtask(subtaskId) {
    const indexToDelete = subtasks.findIndex(subtask => subtask.id === subtaskId);

    if (indexToDelete !== -1) {
        subtasks.splice(indexToDelete, 1);

        let subtaskElement = document.getElementById(subtaskId);
        if (subtaskElement) {
            subtaskElement.parentElement.parentElement.remove();
        }
    }
}


/**
 * Enables editing mode for a subtask element identified by its ID.
 * This function sets the `contentEditable` property of the subtask element to true,
 * allowing the user to edit its content, and gives it focus for immediate editing.
 * @param {string} subtaskId - The ID of the subtask element to be edited.
 */
function addEditSubtask(subtaskId) {
    let subtaskElement = document.getElementById(subtaskId);

    if (subtaskElement) {
        subtaskElement.contentEditable = true;
        subtaskElement.focus();
    }
    let subtaskContainer = document.getElementById(`add-subtask-container-${subtaskId}`);
    if (subtaskContainer) {
        addAddEditingClasses(subtaskContainer);
    }
}


/**
 * Disables content editing for a subtask element and performs necessary cleanup actions.
 * @param {string} subtaskId - The ID of the subtask element to finish editing.
 */
function addFinishEditing(subtaskId) {
    let subtaskElement = document.getElementById(subtaskId);

    if (subtaskElement) {
        subtaskElement.contentEditable = false;
    }

    let subtaskContainer = document.getElementById(`add-subtask-container-${subtaskId}`);
    if (subtaskContainer) {
        addRemoveEditingClasses(subtaskContainer);
    }
    addSaveEditedTitle(subtaskId);
}


/**
 * Updates the title of a subtask based on user-edited content and saves it.
 * @param {string} subtaskId - The unique identifier of the subtask to update.
 */
function addSaveEditedTitle(subtaskId) {
    let subtaskElement = document.getElementById(subtaskId);
    let editedTitle = subtaskElement.textContent;

    let editedSubtask = subtasks.find(subtask => subtask.id === subtaskId);

    if (editedSubtask) {
        editedSubtask.title = editedTitle;
    }
}