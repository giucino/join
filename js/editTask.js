let selectedPriority = '';
let selectedCategory = '';
let selectedContacts = [];
let subtasks = [];
let updatedSubtasks = [];
let subtaskCounter = 0;
let currentTaskId;

/**
 * Slideanimation for the task card.
 */
function slideCardAnimationEditTask() {
  const editTaskSlide = document.getElementById("edit-task-slide");
  const editSlideContainer = document.getElementById("edit-slide-container");
  if (editSlideContainer) {
    editSlideContainer.classList.add("edit-slide-in");
    editTaskSlide.classList.remove("d-none");
  } else {
    console.error(
      "Das Element mit der ID 'edit-slide-container' wurde nicht gefunden."
    );
  }
}


/** 
 * Starts the task editing process by rendering the task and starting the slide animation.
 * @param {number} id - The ID of the task to be edited.
 */
function editTask(id) {
  const slideEditTask = document.getElementById("task-slide");
  slideEditTask.innerHTML = renderEditTask(id);
  slideCardAnimationEditTask();
  const element = todos[id];
  currentTaskId = id;
  addSubtaskToEdit(element);
  loadSelectedPriority(element);
  loadDisplayChosenContacts();
  addToSelectedContacts(element);
  loadRenderCategory(element);
}


/** 
 * Saves the edited task by overwriting its properties and updating the local storage.
 * @param {number} id - The ID of the task being saved.
 * @async
 */
async function saveEditedTask(id) {
  const element = todos[id];
  const currentStatus = element.status;

  element.title = document.getElementById("edit-task-title").value;
  element.description = document.getElementById("edit-task-description").value;
  element.dueDate = document.getElementById("edit-due-date").value;
  element.status = currentStatus;
  element.category = selectedCategory; // assuming selectedCategory is defined somewhere
  element.priority = selectedPriority; // assuming selectedPriority is defined somewhere
  element.assignedTo = selectedContacts.filter(contact => contact !== undefined); // assuming selectedContacts is defined somewhere

  element.subtasks = updatedSubtasks;
  element.id = element.id;
  todos[id] = element;

  await setItem("tasks", JSON.stringify(todos));
  openEditedTask(element.id);
  updatedSubtasks = [];
}

/**
 * Opens the edited task by rendering the slide card based on the given task id.
 * It also makes the slide card visible and adjusts the relevant container styles.
 *
 * @param {string|number} id - The ID of the task to be opened.
 */
function openEditedTask(id) {
  const slideCard = document.getElementById('task-slide');
  slideCard.innerHTML = renderSlideCard(id);
  document.getElementById('task-slide').classList.remove('d-none');
  document.getElementById('slide-container').classList.add('open-task');  
  
}

/**
 * Loads and highlights the priority of a given task in the UI.
 * The function resets other buttons, identifies the task priority, and then
 * sets the highlight for the respective priority button.
 *
 * @param {Object} task - The task object.
 * @param {string} task.priority - The priority of the task ("high", "medium", or "low").
 */
function loadSelectedPriority(task) {
    const selectedPrio = task.priority;
    let button;
    resetButtons();

    if (selectedPrio === "high") {
        button = document.getElementById("edit-prio-urgent");
        highlightButton(button, "#FF3D00", "./img/prio_high_active.png");
        selectedPriority = "high";
    } else if (selectedPrio === "medium") {
        button = document.getElementById("edit-prio-medium");
        highlightButton(button, "#FFA800", "./img/prio_medium_active.png");
        selectedPriority = "medium";
    } else if (selectedPrio === "low") {
        button = document.getElementById("edit-prio-low");
        highlightButton(button, "#7AE229", "./img/prio_low_active.png");
        selectedPriority = "low";
    }
}

/**
 * Sets the priority based on the clicked button.
 * The function resets other buttons and then sets the highlight for the respective priority button.
 *
 * @param {HTMLElement} button - The clicked priority button.
 */
function priority(button) {
  resetButtons();

  if (button.id === "edit-prio-urgent") {
    highlightButton(button, "#FF3D00", "./img/prio_high_active.png");
    selectedPriority = "high";
  } else if (button.id === "edit-prio-medium") {
    highlightButton(button, "#FFA800", "./img/prio_medium_active.png");
    selectedPriority = "medium";
  } else if (button.id === "edit-prio-low") {
    highlightButton(button, "#7AE229", "./img/prio_low_active.png");
    selectedPriority = "low";
  }
}

/** 
 * Resets the style of the priority buttons to their default state.
 */
function resetButtons() {
  selectedPriority = "";

  let buttons = document.querySelectorAll(".edit-priority-choice-inner");
  for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    btn.classList.remove("highlighted");
    btn.style.backgroundColor = "";
    btn.style.color = "black";

    let originalImage = btn.querySelector(".edit-priority-choice-inner-pic img");
    originalImage.src = "./img/" + originalImage.getAttribute("data-image");
  }
}

/**
 * Highlights a given button by changing its background color, image source, and text color.
 *
 * @param {HTMLElement} button - The button to be highlighted.
 * @param {string} bgColor - The desired background color for the button.
 * @param {string} imageSrc - The source URL for the image to be displayed inside the button.
 */
function highlightButton(button, bgColor, imageSrc) {
  button.classList.add("highlighted");
  button.style.backgroundColor = bgColor;
  let image = button.querySelector(".edit-priority-choice-inner-pic img");
  image.src = imageSrc;
  button.style.color = "white";
}

/** 
 * Adds a new subtask to the UI based on the value of the input field.
 */
function addNewSubtask(task) {
  const subInput = document.getElementById('edit-subtask-input');
  const subInputValue = subInput.value;
  const subtaskContainer = document.getElementById("edit-subtask-add-container");

  // Nutzen Sie den Zähler für die ID und inkrementieren Sie ihn
  subtaskContainer.innerHTML += subtaskToAddHTML(subInputValue, subtaskCounter++, task);
  subInput.value = '';
}

function subtaskToAddHTML(subInputValue, i, task) {
  return /*html*/ `
        <div id="subtask-container-${i}" class="edit-subtask-container">
            <div class="edit-subtask-item">
                <span id="editDot" class="edit-subtask-dot"></span>           
                <span id="${i}" class="edit-subtask-value" data-subtask-id="${i}" contenteditable="false" value="${subInputValue}">${subInputValue}</span>
            </div>
            <div class="hover-content">
                <img onclick="editEditedSubtask(${i})" data-subtask-id="${i}" src="./img/edit_subtask.png" class="edit-edit-subtask-button">
                <span class="separator2" id="separator2">|</span> 
                <img onclick="deleteEditSubtask(${i})" data-subtask-id="${i}" src="./img/delete_subtask.png" class="edit-delete-subtask-button">
                <!-- <img onclick="deleteSubtask(event)" src="./img/delete_subtask.png" class="delete-subtask-button"> -->
            </div>
            <img onclick="deleteEditedSubtask(${i})" data-subtask-id="${i}" src="./img/delete_subtask.png" class="edit-edit-delete-subtask-button">
            <span class="separator3" id="separator3">|</span> 
            <img onclick="finishEditing(${i})" data-subtask-id="${i}" src="./img/add_subtask.png" class="edit-save-subtask-button">
        </div>
    `;
}

/** 
 * Renders subtasks of a given task for editing.
 * @param {Object} element - The task object containing subtasks.
 */
function addSubtaskToEdit(element) {
  let subtasksHTML = "";
  if (element.subtasks && Array.isArray(element.subtasks)) {
    for (let i = 0; i < element.subtasks.length; i++) {
      const subtask = element.subtasks[i];
      if (subtask.title) {
        subtasksHTML += subtaskToEditHTML(subtask, subtaskCounter++);
      }
    }
    const subtaskContainer = document.getElementById("edit-subtask-add-container");
    subtaskContainer.innerHTML = subtasksHTML;
  }
}

/**
 * Adds contacts to the selected contacts based on the given element's assigned contacts.
 * @param {Object} element - The element containing assigned contacts.
 */
function addToSelectedContacts(element) {
  const assigneds = element.assignedTo;
  
  for (let name of assigneds) {
    const contact = contacts.find(c => `${c.name} ${c.surename}` === name);
    if (contact) {
      if (!selectedContacts[contact.id]) {
        selectedContacts[contact.id] = `${contact.name} ${contact.surename}`;
      }
    }
  }
  loadRenderAssignedTo(selectedContacts);
  loadDisplayChosenContacts();
}

/**
 * Asynchronously renders the selected contacts to the UI.
 * @param {Object} selectedContacts - The list of selected contacts.
 */
async function loadRenderAssignedTo(selectedContacts) {
  let assignedToContainer = document.getElementById('edit-loaded-contacts');
  assignedToContainer.innerHTML = '';
  
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
    
    const isSelected = selectedContacts[contact.id] || false;

    assignedToContainer.innerHTML += renderAssignedToHTML(contact, initials, isSelected);
  }
}

/**
 * Renders the HTML for a given contact, including initials and selected state.
 * @param {Object} contact - The contact to render.
 * @param {string} initials - The initials of the contact.
 * @param {boolean} isSelected - Whether the contact is selected or not.
 * @returns {string} The HTML representation of the contact.
 */
function renderAssignedToHTML (contact, initials, isSelected){
  return /* html */`
    <div class="contact-container ${isSelected ? 'selected' : ''}" onclick="toggleContactSelection('${contact.name}', '${contact.surename}')">
        <div class="select-contact">
            <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
            <div class="select-name">${contact.name} ${contact.surename}</div>
        </div>
        <img class="select-icon" id="edit-select-check" src="${isSelected ? 'img/check_contact.png' : 'img/check-button.png'}"  alt="Check Button">
    </div>
  `;
}

/**
 * Renders the searched contacts to the UI.
 * @param {Array} contacts - The list of contacts to render.
 */
function loadSearchedContact(contacts) {
  let loadAssignedToContainer = document.getElementById('edit-loaded-contacts');
  loadAssignedToContainer.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
      const isSelected = selectedContacts[contact.id] || false;

      loadAssignedToContainer.innerHTML += loadRenderSearchedContactsHTML(contact, initials, isSelected);
  }
}

/**
 * Renders the HTML for a given searched contact, including initials and selected state.
 * @param {Object} contact - The contact to render.
 * @param {string} initials - The initials of the contact.
 * @param {boolean} isSelected - Whether the contact is selected or not.
 * @returns {string} The HTML representation of the contact.
 */
function loadRenderSearchedContactsHTML(contact, initials, isSelected) {
  return /*html*/`
    <div class="contact-container ${isSelected ? 'selected' : ''}" onclick="toggleContactSelection('${contact.name}', '${contact.surename}')">
        <div class="select-contact">
            <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
            <div class="select-name">${contact.name} ${contact.surename}</div>
        </div>
        <img class="select-icon" id="edit-select-check" src="${isSelected ? 'img/check_contact.png' : 'img/check-button.png'}"  alt="Check Button">
    </div>
  `;
}

/** 
 * Search and display contacts based on a given query.
 * @param {string} query - The query string to search for.
 */
function loadSearchContacts(query) {
  let filteredContacts = contacts.filter(contact => {
      return (
          contact.name.toLowerCase().startsWith(query.toLowerCase()) ||
          contact.surename.toLowerCase().startsWith(query.toLowerCase())
      );
  });
  loadSearchedContact(filteredContacts);
}

function loadToggleContactSelection(name, surename) {
  const contact = contacts.find(c => c.name === name && c.surename === surename);

  if (!contact) {
      return;
  }

  if (selectedContacts[contact.id]) {
    delete selectedContacts[contact.id];
  } else {
    selectedContacts[contact.id] = `${contact.name} ${contact.surename}`;
  }

  loadRenderAssignedTo(selectedContacts);
  loadSearchedContact(contacts);
  renderDisplayChosenContacts();
}

/** 
 * Toggles the selection state of a given contact.
 * @param {string} name - The first name of the contact.
 * @param {string} surename - The surname of the contact.
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
  } else {
      selectedContacts[contactId] = contactKey;
  }
  loadRenderAssignedTo(selectedContacts);
  loadSearchedContact(contacts);
  renderDisplayChosenContacts();
}

/**
 * Toggles the display of the 'edit-loaded-contacts' container.
 * Also manages the display state and class of related elements.
 * 
 * @function
 * @name loadToggleAssignedToContainer
 * @returns {void} Does not return any value.
 */
function loadToggleAssignedToContainer() {
  let assignedToContainer = document.getElementById('edit-loaded-contacts');
  let contactsContainer = document.querySelector('.edit-contacts-container');
  let assignedToDropdown = document.querySelector('.edit-assigned-to-dropdown');

  if (assignedToContainer.style.display === 'block') {
      assignedToContainer.style.display = 'none';
      assignedToDropdown.classList.remove('expanded');
  } else {
      assignedToContainer.style.display = 'block';
      assignedToDropdown.classList.add('expanded');
  }
  contactsContainer.style.display = assignedToContainer.style.display;
}
