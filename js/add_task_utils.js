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
    let assignedInput = document.querySelector('.category-dropdown');
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