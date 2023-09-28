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


function changeTextAreaBorderOnFocusBlurInput(textarea) {
    textarea.addEventListener('focus', () => {
        textarea.style.border = '1px solid #4589FF';
    });

    textarea.addEventListener('blur', () => {
        textarea.style.border = '1px solid #D1D1D1';
    });

    textarea.addEventListener('input', () => {
        textarea.style.border = '1px solid #4589FF';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let textarea = document.getElementById('taskDescription');
    changeTextAreaBorderOnFocusBlurInput(textarea);
});


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
        let isSelected = selectedContacts[contact.id] || false;

        assignedToContainer.innerHTML += renderAssignedToHTML(contact, initials, isSelected);
    }
}


function renderSearchedContact(contacts) {
    let assignedToContainer = document.getElementById('loadedContacts');
    assignedToContainer.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
        let isSelected = selectedContacts[contact.id] || false;

        assignedToContainer.innerHTML += renderSearchedContactsHTML(contact, initials, isSelected);
    }
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
        let contact = contacts[i];
        let isSelected = selectedContacts[contact.id];

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
        let category = categories[i].categoryName;
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
        categoryDropdown.style.borderBottom = "1px solid #D1D1D1";

    } else {
        categoryContainer.style.display = 'block';
        categoryDropdown.classList.add('expanded');
        categoryDropdown.style.borderBottom = "1px solid #4589FF";
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
    categoryDropdown.style.borderBottom = "1px solid #D1D1D1";;
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


function addEditingClasses(container) {
    container.classList.add("editing-mode");
    container.classList.add("no-hover");
    container.style.borderBottom = "1px solid #4589FF";

    let dot = container.querySelector(".subtask-dot");
    let saveButton = container.querySelector(".save-subtask-button");
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


function removeEditingClasses(container) {
    container.classList.remove("editing-mode");
    container.classList.remove("no-hover");
    container.style.borderBottom = "";

    let dot = container.querySelector(".subtask-dot");
    let saveButton = container.querySelector(".save-subtask-button");
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