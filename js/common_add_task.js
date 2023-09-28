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
let subtaskIdCounter = 0;


async function initTask() {
    await loadContactsFromStorage();
    await loadTasks();
    // await renderAssignedTo();
    // renderCategorys();
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

async function addCreateTaskLogic() {
    {
        const title = document.querySelector('.add-task-titel-textfield').value;
        const description = document.querySelector('.add-task-description-textfield').value;
        const dueDate = document.querySelector('.due-date-textfield').value;
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
}