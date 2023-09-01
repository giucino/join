let categories = [
    { "name": "Design" },
    { "name": "Sales" },
    { "name": "Backoffice" },
    { "name": "Marketing" },
    { "name": "Webdesign" },
    { "name": "Tech" }
]
let task = {
    'id': "",
    "title": "",
    "description": "",
    "category": "",
    "status": "",
    "priority": "",
    "due_date": "",
    "assignedTo": [],
    "subtasks": {
        "name": [],
        "status": []
    }
};
let todos = [];
let selectedPriority = '';
let selectedCategory = '';
let selectedContacts = [];
let contactsRendered = false;

async function initTask() {
    await loadContactsFromStorage();
    await loadTasks();
    await renderAssignedTo();
    renderCategorys();
}


/**
 * 
 */
async function loadContactsFromStorage() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
        console.log('Loaded contacts:', contacts);
    } catch (e) {
        console.error('Loading error:', e);
    }
}


async function loadTasks() {
    try {
        todos = JSON.parse(await getItem('tasks'));
        console.log('Tasks:', todos);
    } catch (e) {
        console.error('Loading error:', e);
    }
}


async function createTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const dueDate = document.getElementById('dueDate').value;

    if (!title || !description) {
        alert('Bitte füllen Sie alle erforderlichen Felder aus.');
        return;
    }

    const highestId = todos.reduce((maxId, task) => {
        return task.id > maxId ? task.id : maxId;
    }, 0);

    const newTaskId = highestId + 1;

    const newTask = {
        id: newTaskId,
        title: title,
        description: description,
        category: selectedCategory,
        priority: selectedPriority,
        dueDate: dueDate,
        assignedTo: selectedContacts
    };
    todos.push(newTask);
    await setItem('tasks', JSON.stringify(todos));
    console.log('Aufgabe hinzugefügt:', newTask);
}





function priority(button) {
    resetButtons();
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
    console.log('Ausgewählte ID:', button.id);
    console.log('Ausgewählte Priorität:', selectedPriority);
}


function resetButtons() {
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

            const isSelected = selectedContacts[contact.id] || false;

            assignedToContainer.innerHTML += /*html*/`
                <div class="contact-container ${isSelected ? 'selected' : ''}" onclick="toggleContactSelection(${contact.id})">
                    <div class="select-contact">
                        <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
                        <div class="select-name">${contact.name} ${contact.surename}</div>
                    </div>
                    <img class="select-icon" id="selectCheck" src="${isSelected ? 'img/check_contact.png' : 'img/check-button.png'}"  alt="Check Button">
                </div>
            `;
        }   
    }


function renderSearchedContact(contacts) {
    let assignedToContainer = document.getElementById('loadedContacts');
    assignedToContainer.innerHTML = '';

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
        const isSelected = selectedContacts[contact.id] || false;

        assignedToContainer.innerHTML += /*html*/`
            <div class="contact-container ${isSelected ? 'selected' : ''}" onclick="toggleContactSelection(${contact.id})">
                <div class="select-contact">
                    <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
                    <div class="select-name">${contact.name} ${contact.surename}</div>
                </div>
                <img class="select-icon" id="selectCheck" src="${isSelected ? 'img/check_contact.png' : 'img/check-button.png'}"  alt="Check Button">
            </div>
        `;
    }
    console.log('Render Searched Contact:', contacts);
}


function searchContacts(query) {
    let filteredContacts = contacts.filter(contact => {
        return (
            contact.name.toLowerCase().startsWith(query.toLowerCase()) ||
            contact.surename.toLowerCase().startsWith(query.toLowerCase())
        );
    });
    renderSearchedContact(filteredContacts);
    console.log('Filtered Contact:', filteredContacts);
}


function toggleContactSelection(contactId) {
    if (selectedContacts[contactId]) {
        delete selectedContacts[contactId];
    } else {
        selectedContacts[contactId] = true;
    }

    renderAssignedTo();
    renderSearchedContact(contacts);
    displayChosenContacts();
    console.log('Ausgewählte/r Kontakt/e:', selectedContacts);
}

function toggleAssignedToContainer() {
    let assignedSelectText = document.querySelector('.assigned-select-text');
    assignedSelectText.style.display = 'inline';

    let assignedToContainer = document.getElementById('loadedContacts');
    let assignedToDropdown = document.querySelector('.assigned-to-dropdown');

    if (assignedToContainer.style.display === 'block') {
        assignedToContainer.style.display = 'none';
        assignedToDropdown.classList.remove('expanded');
    } else {
        assignedToContainer.style.display = 'block';
        assignedToDropdown.classList.add('expanded');
    }
}
/**
 * this function displays
 */
function displayChosenContacts() {
    let chosenContactsContainer = document.getElementById('chosenContacts');
    chosenContactsContainer.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        const isSelected = selectedContacts[contact.id];
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
 * this function renders the categorys
 */
function renderCategorys() {
    let categoryContainer = document.getElementById('loadedCategories');
    categoryContainer.innerHTML = '';
    for (let i = 0; i < categories.length; i++) {
        let category = categories[i].name;
        categoryContainer.innerHTML += `
            <div class="category" onclick="categorySelected('${category}')">${category}</div>
            `;
    }
}
/**
 * this function lets you toggle the drop down menu for the category container
 */
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
    } else {
        categoryContainer.style.display = 'block';
        categoryDropdown.classList.add('expanded');
        renderCategorys();
    }
}
/**
 * this function lets you select one category from the drop down menu
 * @param {string} category 
 */
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
}


function addSubtask() {
    const subtaskInput = document.querySelector('.new-subtask-textfield');
    const subtaskValue = subtaskInput.value;

    if (!subtaskValue) {
        alert('Bitte geben Sie eine Unteraufgabe ein.');
        return;
    }

    // Unteraufgabe zur Liste hinzufügen (mit innerHTML)
    const subtasksContainer = document.querySelector('.subtasks-container');
    const newSubtask = document.createElement('div');
    newSubtask.innerHTML = `
        <div class="subtask-item">
            <span class="subtask-dot"></span>           
            <span>${subtaskValue}</span>
        </div>
    `;
    subtasksContainer.appendChild(newSubtask);

    subtaskInput.value = '';
    console.log('Unteraufgabe hinzugefügt:', subtaskValue);
}