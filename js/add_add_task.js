let subtaskIdCounter = 0;


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
    addValidateInput(title, description, dueDate);
}

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


function addValidateSelections(title, description, dueDate) {
    if (!selectedPriority) {
        addShowPriorityError();
        return;
    } if (!selectedContacts.length) {
        addShowAssignedContactError();
        return;
    } if (!selectedCategory) {
        addShowSelectCategoryError();
        return;
    }
    processValidInput(title, description, dueDate);
}


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


async function addCompleteTaskCreation() {
    await setItem('tasks', JSON.stringify(todos));
    addShowCreatedTaskMessage();
    addResetTaskForm();

    setTimeout(function () {
        closeAddTaskModal();
    }, 1600);
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
 * Shows a success message overlay and redirects to the index page.
 */
function addShowCreatedTaskMessage() {
    document.body.innerHTML += addCreatedTaskTemplate();

    setTimeout(function () {
        let successOverlay = document.getElementById('addCreateTaskOverlay');
        document.body.removeChild(successOverlay);

    }, 1600);
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


function addAddSubtask() {
    let subtaskInput = document.querySelector('.new-subtask-textfield');
    let subtaskValue = subtaskInput.value;

    if (!subtaskValue) {
        return;
    }
    subtaskIdCounter++;

    let subtaskId = 'subtask-' + subtaskIdCounter;

    addAddSubtaskToContainer(subtaskId, subtaskValue);
    subtaskInput.value = '';
    addCloseSubtaskInput();
}


function addAddSubtaskToContainer(subtaskId, subtaskValue) {
    subtasks.push({
        id: subtaskId,
        title: subtaskValue,
        status: false
    });
    let subtasksContainer = document.getElementById('addSubtask-add-container');
    subtasksContainer.innerHTML += addCreateSubtaskHTML(subtaskId, subtaskValue);
}


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
 * 
 * @param {*} subtaskId 
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
 * 
 * @param {*} subtaskId 
 */
function addSaveEditedTitle(subtaskId) {
    let subtaskElement = document.getElementById(subtaskId);
    let editedTitle = subtaskElement.textContent;

    let editedSubtask = subtasks.find(subtask => subtask.id === subtaskId);

    if (editedSubtask) {
        editedSubtask.title = editedTitle;
    }
}