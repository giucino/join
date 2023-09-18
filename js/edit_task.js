let selectedPriority = '';
let selectedCategory = '';
let selectedContacts = [];
let subtasks = [];

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


function editTask(id) {
    const slideEditTask = document.getElementById("edit-task-slide");
    slideEditTask.innerHTML = renderEditTask(id);
    closeCard();
    slideCardAnimationEditTask();
    const element = todos[id];
    addSubtaskToEdit(element);
    loadSelectedPriority(element);
    loadRenderAssignedTo(element);
  }
  

async function updateTask(id) {
  const updatedTitle = document.getElementById("edit-task-title").value;
  const updatedDescription = document.getElementById("edit-task-description").value;
  const updatedDueDate = document.getElementById("edit-due-date").value;
  const updatePriority = document.getElementById('edit-priority-choice');

  const element = todos[id];
  element.title = updatedTitle;
  element.description = updatedDescription;
  element.dueDate = updatedDueDate;

  todos[id] = element; 
  await setItem("tasks", JSON.stringify(todos)); 

}

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

function priority(button) {
  resetButtons();
  /* hidePriorityError(); */

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

function highlightButton(button, bgColor, imageSrc) {
  button.classList.add("highlighted");
  button.style.backgroundColor = bgColor;
  let image = button.querySelector(".edit-priority-choice-inner-pic img");
  image.src = imageSrc;
  button.style.color = "white";
}

function addNewSubtask() {
    const subInput = document.getElementById('edit-subtask-input');
    const subInputValue = subInput.value;
    const subtaskContainer = document.getElementById("edit-subtask-add-container");
    
    if (!subInputValue) {
        return;
    }

    subtaskContainer.innerHTML += subtaskToAddHTML(subInputValue);
    subInput.value = '';
}

function addSubtaskToEdit(element) {
  let subtasksHTML = "";
  if (element.subtasks && Array.isArray(element.subtasks)) {
    for (let i = 0; i < element.subtasks.length; i++) {
      const subtask = element.subtasks[i];
      if (subtask.title) {
        subtasksHTML += subtaskToEditHTML(subtask);
      }
    }
    const subtaskContainer = document.getElementById("edit-subtask-add-container");
    subtaskContainer.innerHTML = subtasksHTML;
  }
}


function addToSelectedContacts(element) {
  const assigneds = element.assignedTo;
  
  for (let name of assigneds) {
    const contact = contacts.find(c => `${c.name} ${c.surename}` === name);
    if (contact) {
      selectedContacts.push({
        id: contact.id,
        name: `${contact.name} ${contact.surename}`
      });
    }
  }
  loadDisplayChosenContacts();
}

async function loadRenderAssignedTo(element) {
  let assignedToContainer = document.getElementById('edit-loaded-contacts');
  assignedToContainer.innerHTML = '';
  addToSelectedContacts(element)
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
    
    const isSelected = selectedContacts[contact.id] || false;

    assignedToContainer.innerHTML += renderAssignedToHTML(contact, initials, isSelected);
  }
}

function renderAssignedToHTML (contact, initials, isSelected){
  return /* html */`
    <div class="contact-container ${isSelected ? 'selected' : ''}" onclick="loadToggleContactSelection('${contact.name}', '${contact.surename}')">
        <div class="select-contact">
            <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
            <div class="select-name">${contact.name} ${contact.surename}</div>
        </div>
        <img class="select-icon" id="edit-select-check" src="${isSelected ? 'img/check_contact.png' : 'img/check-button.png'}"  alt="Check Button">
    </div>
  `;
}

/* async function loadRenderAssignedTo(element) {
  let assignedToContainer = document.getElementById('edit-loaded-contacts');
  let htmlString = '';
  addToSelectedContacts(element, contacts, selectedContactsSet);
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let initials = `${contact.name.charAt(0)}${contact.surname.charAt(0)}`.toUpperCase();
    const isSelected = selectedContactsSet.has(contact.id);

    htmlString += renderAssignedToHTML(contact, initials, isSelected);
  }

  assignedToContainer.innerHTML = htmlString;
}

function renderAssignedToHTML (contact, initials, isSelected){
  // Stellen Sie sicher, dass die Daten sicher sind, bevor Sie sie in den DOM einfügen.
  return html`
    <div class="contact-container ${isSelected ? 'selected' : ''}" onclick="loadToggleContactSelection('${contact.name}', '${contact.surname}')">
        <div class="select-contact">
            <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
            <div class="select-name">${contact.name} ${contact.surname}</div>
        </div>
        <img class="select-icon" id="edit-select-check" src="${isSelected ? 'img/check_contact.png' : 'img/check-button.png'}"  alt="Check Button">
    </div>
  `;
} */

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

function loadRenderSearchedContactsHTML(contact, initials, isSelected) {
  return /*html*/`
    <div class="contact-container ${isSelected ? 'selected' : ''}" onclick="loadToggleContactSelection('${contact.name}', '${contact.surename}')">
        <div class="select-contact">
            <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
            <div class="select-name">${contact.name} ${contact.surename}</div>
        </div>
        <img class="select-icon" id="edit-select-check" src="${isSelected ? 'img/check_contact.png' : 'img/check-button.png'}"  alt="Check Button">
    </div>
  `;
}

function loadSearchContacts(query) {
  let filteredContacts = contacts.filter(contact => {
      return (
          contact.name.toLowerCase().startsWith(query.toLowerCase()) ||
          contact.surename.toLowerCase().startsWith(query.toLowerCase())
      );
  });
  loadRenderSearchedContact(filteredContacts);
}

function loadToggleContactSelection(name, surename) {
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
  loadRenderAssignedTo();
  loadSearchedContact(contacts);
  loadDisplayChosenContacts();
}

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

function loadDisplayChosenContacts() {
  let chosenContactsContainer = document.getElementById('edit-chosen-contacts');
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

function loadToggleCategoryContainer() {
  let editSelectText = document.querySelector('.edit-select-text');
  editSelectText.style.display = 'inline';

  let editSelectedCategory = document.getElementById('edit-selected-category-display');
  editSelectedCategory.textContent = '';

  let editCategoryContainer = document.getElementById('edit-loaded-categories');
  let editCategoryDropdown = document.querySelector('.edit-category-dropdown');

  if (editCategoryContainer.style.display === 'block') {
      editCategoryContainer.style.display = 'none';
      editCategoryDropdown.classList.remove('expanded');
  } else {
      editCategoryContainer.style.display = 'block';
      editCategoryDropdown.classList.add('expanded');
      editRenderCategorys();
  }
}

function editRenderCategorys() {
  let editCategoryContainer = document.getElementById('edit-loaded-categories');
  editCategoryContainer.innerHTML = '';

  for (let i = 0; i < categories.length; i++) {
    let category = categories[i].name;

    editCategoryContainer.innerHTML += /* html */`
    <div class="category" onclick="categorySelected('${category}')">${category}</div>
    `;
  }
}
