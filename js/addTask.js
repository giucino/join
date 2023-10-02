/**
 * Initializes the task by loading contacts, tasks, assigned names, and categories.
 * This function performs asynchronous operations to fetch and render necessary data.
 *
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves once all initialization steps are complete.
 * @throws {Error} Throws an error if any of the asynchronous operations fail.
 */
async function initTask() {
    await loadContactsFromStorage();
    await loadTasks();
    await renderAssignedTo();
    renderCategorys();
}


/**
 * Asynchronously loads contacts from storage.
 * Parses the stored JSON data for 'contacts' key and assigns it to the contacts variable.
 * Logs an error to the console if any exception occurs during the loading or parsing process.
 * 
 * @async
 * @function
 * @throws {Error} Throws an error if there's an issue loading or parsing the 'contacts' data.
 * @returns {void}
 */
async function loadContactsFromStorage() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * Asynchronously loads tasks from backend.
 *
 * @async
 * @function
 * @throws {Error} When there's an issue parsing the tasks from JSON.
 * @returns {void}
 */
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

/**
 * Asynchronously creates a task using the values from the provided input fields.
 * Before initializing the task, it validates the input values.
 * 
 * @async
 * @function
 * @throws Will throw an error if the input validation fails.
 * 
 * @example
 * createTask().then(() => {
 *     console.log('Task created successfully!');
 * }).catch((error) => {
 *     console.error(`Failed to create task: ${error.message}`);
 * });
 */
async function createTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;
    validateInput(title, description, dueDate);
    initTask();
}


/**
 * Validates the provided input values for title, description, and dueDate.
 * Shows appropriate error messages if any of the values are missing.
 * If all values are valid, it triggers validation for selections.
 *
 * @param {string} title - The title of the task or item.
 * @param {string} description - The description or details of the task.
 * @param {string} dueDate - The due date for the task in a specified format (e.g., 'YYYY-MM-DD').
 * 
 * @returns {void}
 */
function validateInput(title, description, dueDate) {
    if (!title) {
        showTitleInputError();
        return;
    } if (!description) {
        showDescriptionInputError();
        return;
    } if (!dueDate) {
        showDateInputError();
        return;
    }
    validateSelections(title, description, dueDate);
}


/**
 * Validates the selections and calls appropriate error methods if selections are invalid.
 * If all selections are valid, it processes the input.
 * 
 * @param {string} title - The title of the item.
 * @param {string} description - The description of the item.
 * @param {string|Date} dueDate - The due date of the item. Can be a string representation of a date or a Date object.
 * 
 * @returns {void} 
 */
function validateSelections(title, description, dueDate) {
    if (!selectedPriority) {
        showPriorityError();
        return;
    } if (!selectedCategory) {
        showSelectCategoryError();
        return;
    }
    processValidInput(title, description, dueDate);
}


/**
 * Processes and adds a valid todo item to the list.
 *
 * @param {string} title - Title of the new todo.
 * @param {string} description - Description of the new todo.
 * @param {Date|string} dueDate - Due date of the new todo. Can be a Date object or a string representation.
 * 
 * @returns {void}
 *
 * @example
 * processValidInput('Finish Assignment', 'Complete the math assignment by end of the week', '2023-10-07');
 *
 * @throws {Error} If any required parameter is not provided or invalid.
 *
 * @todo Implement validation checks for each parameter.
 * @todo Decouple the function for better modularity.
 *
 * @see {@link extractBgcolor} for details on how background colors are determined.
 * @see {@link completeTaskCreation} to understand the post-todo-creation process.
 *
 * Note: The function has dependencies on multiple external variables and functions like `todos`, `selectedCategory`, `extractBgcolor`, etc. It's recommended to decouple these dependencies for more reusable and testable code.
 */
function processValidInput(title, description, dueDate) {
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
    completeTaskCreation();
}


/**
 * Completes the task creation by storing the tasks and showing relevant messages.
 * @async
 * @function
 * @returns {Promise<void>} Resolves when the task is successfully saved and relevant actions are taken.
 * @throws {Error} Throws an error if there's a problem during task creation completion.
 */
async function completeTaskCreation() {
    await setItem('tasks', JSON.stringify(todos));
    showCreatedTaskMessage();
    resetTaskForm();
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


/**
 * Searches through the list of contacts for matches based on the given query.
 * Filters contacts whose name or surname starts with the provided query.
 *
 * @function
 * @param {string} query - The search term to match against contact names and surnames.
 * @returns {void} - This function does not return anything; it invokes `renderSearchedContact` with the filtered results.
 * @example
 * Assume `contacts` is a global array containing contact objects with `name` and `surname` properties.
 * searchContacts('John'); // will call `renderSearchedContact` with all contacts named John or with a surname starting with John.
 *
 * @throws {TypeError} - If the contacts array or its individual items do not have the expected structure, the function might throw.
 * (Note: The actual function provided does not have explicit error handling, so this is a speculative error type.)
 */
function searchContacts(query) {
    let filteredContacts = contacts.filter(contact => {
        return (
            contact.name.toLowerCase().startsWith(query.toLowerCase()) ||
            contact.surename.toLowerCase().startsWith(query.toLowerCase())
        );
    });
    renderSearchedContact(filteredContacts);
}

/**
 * Toggles the selection state of a contact in the list based on their name and surname.
 *
 * @param {string} name - The first name of the contact.
 * @param {string} surename - The surname of the contact.
 * 
 * @returns {void} No return value.
 * 
 * @example
 * Assuming there's a contact {id: 1, name: 'John', surename: 'Doe'} in the `contacts` array
 * toggleContactSelection('John', 'Doe');
 * 
 * @todo
 * - Ensure contacts and selectedContacts are globally available or passed as arguments.
 * - It seems `delete selectedContacts[contactId];` is called twice, might be an error.
 * - It might be more efficient to pass an ID rather than name and surname.
 */
function toggleContactSelection(name, surename) {
    const contact = contacts.find(c => c.name === name && c.surename === surename);

    if (!contact) {
        return;
    }
    const contactId = contact.id;
    const contactKey = `${contact.name} ${contact.surename}`;

    if (selectedContacts[contactId]) {
        delete selectedContacts[contactId];
        delete selectedContacts[contactId];
    } else {
        selectedContacts[contactId] = contactKey;
    }
    renderAssignedTo();
    renderSearchedContact(contacts);
    displayChosenContacts();
}


/**
 * Extracts background colors from the provided list of selected contact names.
 * 
 * @param {string[]} selectedContacts - An array of contact names, where each name is in the format "name surename".
 * @returns {string[]} - An array of background colors corresponding to the provided contact names.
 * 
 * @example
 * const contacts = [
 *    { name: 'John', surename: 'Doe', bgcolor: '#ff0000' },
 *    { name: 'Jane', surename: 'Doe', bgcolor: '#00ff00' }
 * ];
 * 
 * extractBgcolor(['John Doe', 'Jane Doe']); // returns ['#ff0000', '#00ff00']
 * 
 * @note
 * The contacts variable is not passed as an argument, so it should be in the scope of this function or be globally available.
 */
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


/**
 * Adds a subtask based on the input from the '.new-subtask-textfield' element.
 * If the input is empty or just whitespace, the function returns without adding a subtask.
 * Otherwise, a new subtask is created with a unique ID and added to the subtask container.
 * After adding the subtask, the input field is cleared and closed.
 */
function addSubtask() {
    let subtaskInput = document.querySelector('.new-subtask-textfield');
    let subtaskValue = subtaskInput.value.trim();

    if (!subtaskValue) {
        return;
    }
    subtaskIdCounter++;

    let subtaskId = 'subtask-' + subtaskIdCounter;

    addSubtaskToContainer(subtaskId, subtaskValue);
    subtaskInput.value = '';
    closeSubtaskInput();
}


/**
 * Handles the input event for a subtask. If the user presses 'Enter' on an input
 * element with the 'new-subtask-textfield' class, it will prevent the default behavior,
 * add a new subtask, and remove focus from the active element.
 * 
 * @param {Event} event - The event object triggered by the input action.
 */
function handleSubtaskInput(event) {
    if (event.key === 'Enter' && event.target.classList.contains('new-subtask-textfield')) {
        event.preventDefault();
        addSubtask();
        document.activeElement.blur();
    }
}
let subtaskInput = document.querySelector('.new-subtask-textfield');
subtaskInput.addEventListener('keypress', handleSubtaskInput);


/**
 * Adds a subtask to the global subtasks array and appends its HTML representation
 * to the subtask container in the DOM.
 *
 * @param {number|string} subtaskId - The unique identifier for the subtask.
 * @param {string} subtaskValue - The title or value of the subtask.
 *
 * @returns {void}
 */
function addSubtaskToContainer(subtaskId, subtaskValue) {
    subtasks.push({
        id: subtaskId,
        title: subtaskValue,
        status: false
    });
    let subtasksContainer = document.getElementById('subtask-add-container');
    subtasksContainer.innerHTML += createSubtaskHTML(subtaskId, subtaskValue);
}


/**
 * Deletes a subtask with the given ID from the subtasks array and removes its corresponding element from the DOM.
 *
 * @function
 * @param {string|number} subtaskId - The ID of the subtask to delete.
 * @throws Will throw an error if `subtasks` is not defined in the scope.
 */
function deleteSubtask(subtaskId) {
    let indexToDelete = subtasks.findIndex(subtask => subtask.id === subtaskId);

    if (indexToDelete !== -1) {
        subtasks.splice(indexToDelete, 1);

        let subtaskElement = document.getElementById(subtaskId);
        if (subtaskElement) {
            subtaskElement.parentElement.parentElement.remove();
        }
    }
}