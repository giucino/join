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
    let assignedInput = document.querySelector('.assigned-to-choicefield');
    assignedInput.style.borderColor = '#FF8190';
}


function addResetAssignedContact() {
    let assignedError = document.getElementById('addRequiredContact');
    assignedError.style.display = 'none';

    let assignedInput = document.querySelector('.assigned-to-choicefield');
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
    let assignedInput = document.querySelector('.category-dropdown');
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