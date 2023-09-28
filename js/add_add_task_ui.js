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


function addChangeTextAreaBorderOnFocusBlurInput(textarea) {
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

document.addEventListener('input', () => {
    let textarea = document.getElementById('addTaskDescription');
    addChangeTextAreaBorderOnFocusBlurInput(textarea);
});


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
        let isSelected = selectedContacts[contact.id] || false;

        assignedToContainer.innerHTML += addRenderAssignedToHTML(contact, initials, isSelected);
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
        let isSelected = selectedContacts[contact.id] || false;

        assignedToContainer.innerHTML += addRenderSearchedContactsHTML(contact, initials, isSelected);
    }
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


function addRenderCategorys() {
    let categoryContainer = document.getElementById('addLoadedCategories');
    categoryContainer.innerHTML = '';

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i].categoryName;
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
    categoryDropdown.style.borderBottom = "1px solid #D1D1D1";;
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


function addAddEditingClasses(container) {
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


function addRemoveEditingClasses(container) {
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