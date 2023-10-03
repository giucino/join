/**
 * Applies a specified border color to the container element when the input field inside it gains focus,
 * and another color when it loses focus.
 *
 * @param {string} containerSelector - The CSS selector for the container elements.
 * @param {string} inputSelector - The CSS selector for the input elements inside the containers.
 * @param {string} focusColor - The color to be applied to the container when the input gains focus.
 * @param {string} blurColor - The color to be applied to the container when the input loses focus.
 */
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


document.addEventListener('input', (event) => {
    const target = event.target;

    if (target.matches('.add-task-titel-textfield')) {
        addApplyBorderColorOnFocusAndBlur(
            '.add-task-titel-textcontainer',
            '.add-task-titel-textfield',
            '#4589FF',
            '#D1D1D1'
        );
    } else if (target.matches('.due-date-textfield')) {
        addApplyBorderColorOnFocusAndBlur(
            '.due-date-input-container',
            '.due-date-textfield',
            '#4589FF',
            '#D1D1D1'
        );
    } else if (target.matches('#addSubtaskInput')) {
        addApplyBorderColorOnFocusAndBlur(
            '.add-subtask-input',
            '#addSubtaskInput',
            '#4589FF',
            '#D1D1D1'
        );
    }
});


document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('input', (event) => {
        const textarea = event.target;

        if (textarea && textarea.id === 'addTaskDescription') {
            addChangeTextAreaBorderOnFocusBlurInput(textarea);

            textarea.addEventListener('input', () => {
                addChangeTextAreaBorderOnFocusBlurInput(textarea);
            });
        }
    });
});


/**
 * Adds event listeners to change the border color of a textarea on focus, blur, and input events.
 *
 * @param {HTMLTextAreaElement} textarea - The textarea element to which the event listeners will be added.
 * @returns {void}
 */
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


/**
 * Adds a priority to a button element and updates the selectedPriority variable.
 *
 * This function adds visual effects to the specified button based on its ID and sets
 * the selectedPriority variable accordingly.
 *
 * @param {HTMLElement} button - The button element to add priority to.
 */
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


/**
 * Adds highlighting to a button by changing its background color, image source, and text color.
 * @param {HTMLElement} button - The button element to be highlighted.
 * @param {string} bgColor - The background color to set for the button.
 * @param {string} imageSrc - The source URL for the image to be displayed inside the button.
 */
function addHighlightButton(button, bgColor, imageSrc) {
    button.classList.add('highlighted');
    button.style.backgroundColor = bgColor;
    let image = button.querySelector('.priority-choice-inner-pic img');
    image.src = imageSrc;
    button.style.color = 'white';
}


/**
 * Retrieves the data of the currently logged-in user from the browser's localStorage.
 * @returns {Object} The data of the logged-in user as an object, or an empty object if no user is logged in.
 */
function getLoggedInUserData() {
    return JSON.parse(localStorage.getItem('loggedInUser')) || {};
}


/**
 * Asynchronously renders a list of contacts and their assignment status.
 * Clears the content of the 'addLoadedContacts' container and populates it
 * with HTML elements representing the contacts.
 * @async
 * @function
 * @returns {void}
 */
async function addRenderAssignedTo() {
    let loggedInUserData = getLoggedInUserData();

    let assignedToContainer = document.getElementById('addLoadedContacts');
    assignedToContainer.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
        let isSelected = selectedContacts[contact.id] || false;
        let isCurrentUser = loggedInUserData && contact.email === loggedInUserData.email;

        assignedToContainer.innerHTML += addRenderAssignedToHTML(contact, initials, isSelected, isCurrentUser);
    }
}


/**
 * Renders a list of searched contacts and adds them to the specified container element.
 * @param {Array} contacts - An array of contact objects to be rendered.
 */
function addRenderSearchedContact(contacts) {
    let loggedInUserData = getLoggedInUserData();

    let assignedToContainer = document.getElementById('addLoadedContacts');
    assignedToContainer.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
        let isSelected = selectedContacts[contact.id] || false;
        let isCurrentUser = loggedInUserData && contact.email === loggedInUserData.email;

        assignedToContainer.innerHTML += addRenderSearchedContactsHTML(contact, initials, isSelected, isCurrentUser);
    }
}


/**
 * Toggles the visibility of the assignedToContainer and updates the UI accordingly.
 * If the container is currently visible, it hides it and collapses the dropdown.
 * If the container is currently hidden, it shows it and expands the dropdown.
 * Additionally, it synchronizes the visibility of the contactsContainer with the assignedToContainer
 * and calls the 'addRenderAssignedTo' function.
 */
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


/**
 * Updates the chosenContactsContainer with selected contacts.
 * This function iterates through the `contacts` array and checks if each contact
 * is selected based on the `selectedContacts` object. If a contact is selected,
 * it adds a corresponding HTML element to the `chosenContactsContainer` displaying
 * the contact's initials in a colored box.
 * 
 * @function
 */
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


/**
 * Adds and renders categories in the specified container.
 * @memberof window
 * @global
 * @description This function populates the specified container with category elements,
 * each of which can be clicked to trigger the "addCategorySelected" function with the
 * selected category name.
 */
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


/**
 * Toggles the visibility of the category container and manages the category dropdown.
 * If the category container is hidden, it will be displayed along with an expanded dropdown.
 * If the category container is already visible, it will be hidden, and the dropdown will be collapsed.
 * Additionally, it triggers the rendering of categories when expanding the dropdown.
 */
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


/**
 * Sets the selected category and updates the UI accordingly.
 * @param {string} category - The category to be selected.
 * @returns {void}
 */
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


/**
 * Adds an open subtask input field and shows related buttons.
 * This function hides the "open-subtask-button," focuses on the "addSubtaskInput" element,
 * and displays the "addSeparator" and "add-subtask-button" elements.
 */
function addOpenSubtaskInput() {
    document.querySelector('.open-subtask-button').style.display = 'none';
    document.getElementById('addSubtaskInput').focus();
    document.getElementById('addSeparator').style.display = 'inline-flex'
    let otherButtons = document.querySelectorAll('.add-subtask-button');
    for (let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].style.display = 'inline-block';
    }
}


/**
 * Adds a close action to a subtask input section.
 * This function hides the open subtask button, clears the new subtask textfield,
 * resets the border of the add subtask input, hides the separator, and hides
 * other add subtask buttons.
 */
function addCloseSubtaskInput() {
    document.querySelector('.open-subtask-button').style.display = 'inline-block';
    document.querySelector('.new-subtask-textfield').value = '';
    document.querySelector('.add-subtask-input').style.borderBottom = "1px solid #D1D1D1";
    document.getElementById('addSeparator').style.display = 'none'
    let otherButtons = document.querySelectorAll('.add-subtask-button');
    for (let i = 0; i < otherButtons.length; i++) {
        otherButtons[i].style.display = 'none';
    }
}


/**
 * Adds editing-related CSS classes and styles to a given container element.
 * @param {HTMLElement} container - The container element to which editing classes and styles will be added.
 */
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


/**
 * Removes editing-related CSS classes and styles from a container element.
 * @param {HTMLElement} container - The container element to remove classes and styles from.
 */
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