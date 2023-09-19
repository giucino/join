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
    slideCardAnimationEditTask();
    const element = todos[id];
    addSubtaskToEdit(element);
    loadSelectedPriority(element);
    loadDisplayChosenContacts();
    addToSelectedContacts(element);
  }
  

  async function saveEditedTask(id) {
    const element = todos[id];
    element.title = document.getElementById("edit-task-title").value;
    element.description = document.getElementById("edit-task-description").value;
    element.dueDate = document.getElementById("edit-due-date").value;
    element.category = selectedCategory;
    element.priority = selectedPriority;
    element.assignedTo = selectedContacts.map(contact => contact.name);
    element.subtasks = subtasks;
  
    todos[id] = element;
  
    await setItem("tasks", JSON.stringify(todos));
    editTaskSlide.classList.add("d-none");
    updateHTML();
    slideCard(id);
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
      if (!selectedContacts[contact.id]) {
        selectedContacts[contact.id] = `${contact.name} ${contact.surename}`;
      }
    }
  }
  loadRenderAssignedTo(selectedContacts);
  loadDisplayChosenContacts();
}

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
    <div class="contact-container ${isSelected ? 'selected' : ''}" onclick="toggleContactSelection('${contact.name}', '${contact.surename}')">
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

function renderDisplayChosenContacts() {
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

function loadDisplayChosenContacts() {
  const chosenContactsContainer = document.getElementById('edit-chosen-contacts');
  let htmlContent = '';

  for (const id in selectedContacts) {
    if (selectedContacts.hasOwnProperty(id)) {
      const contactName = selectedContacts[id];
      const contact = contacts.find(c => c.id === parseInt(id));
      if (contact) {
        const initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
        htmlContent += /*html*/`
          <div class="chosen-contact">
              <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
          </div>
        `;
      }
    }
  }

  chosenContactsContainer.innerHTML = htmlContent;
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

function categorySelected(category) {
  selectedCategory = category;

  let selectedCategoryDisplay = document.getElementById('edit-selected-category-display');
  selectedCategoryDisplay.textContent = `${selectedCategory}`;

  let selectText = document.querySelector('.edit-select-text');
  selectText.style.display = 'none';

  let categoryContainer = document.getElementById('edit-loaded-categories');
  categoryContainer.style.display = 'none';

  let categoryDropdown = document.querySelector('.edit-category-dropdown');
  categoryDropdown.classList.remove('expanded');
}

