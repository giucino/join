let selectedPriority = '';
let selectedCategory = '';
let selectedContacts = [];
let subtasks = [];
let subtaskIdCounter = 0;


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
    validateInput(title, description, dueDate);
}


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


function validateSelections(title, description, dueDate) {
    if (!selectedPriority) {
        showPriorityError();
        return;
    } if (!selectedContacts.length) {
        showAssignedContactError();
        return;
    } if (!selectedCategory) {
        showSelectCategoryError();
        return;
    }
    processValidInput(title, description, dueDate);
}


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


function addSubtask() {
    let subtaskInput = document.querySelector('.new-subtask-textfield');
    let subtaskValue = subtaskInput.value;

    if (!subtaskValue) {
        return;
    }
    subtaskIdCounter++;

    let subtaskId = 'subtask-' + subtaskIdCounter;

    addSubtaskToContainer(subtaskId, subtaskValue);
    subtaskInput.value = '';
    closeSubtaskInput();
}


function addSubtaskToContainer(subtaskId, subtaskValue) {
    subtasks.push({
        id: subtaskId,
        title: subtaskValue,
        status: false
    });
    let subtasksContainer = document.getElementById('subtask-add-container');
    subtasksContainer.innerHTML += createSubtaskHTML(subtaskId, subtaskValue);
}


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
 * 
 * @param {*} subtaskId 
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
 * 
 * @param {*} subtaskId 
 */
function saveEditedTitle(subtaskId) {
    let subtaskElement = document.getElementById(subtaskId);
    let editedTitle = subtaskElement.textContent;

    let editedSubtask = subtasks.find(subtask => subtask.id === subtaskId);

    if (editedSubtask) {
        editedSubtask.title = editedTitle;
    }
}


// function deleteSubtask(event) {
//     let target = event.target;
//     if (target.classList.contains("delete-subtask-button")) {
        
//         let subtaskContainer = target.closest(".subtask-container");
        
//         if (subtaskContainer) {
            
//             let index = Array.from(subtaskContainer.parentNode.children).indexOf(subtaskContainer);
//             if (index >= 0) {
                
//                 subtasks.splice(index, 1);
                
//                 subtaskContainer.parentNode.removeChild(subtaskContainer);
//             }
//         }
//     }
// }