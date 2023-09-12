/**
 * Slideanimation for the task card.
 */
function slideCardAnimationEditTask() {
  const editTaskSlide = document.getElementById("edit-task-slide");
  const editSlideContainer = document.getElementById("edit-slide-container");
  if (editSlideContainer) {
    editSlideContainer.classList.add("edit-slide-in");
    editTaskSlide.classList.remove("d-none");
    // Fahren Sie mit dem Rest des Codes fort
  } else {
    console.error(
      "Das Element mit der ID 'edit-slide-container' wurde nicht gefunden."
    );
  }
  /*   document.getElementById('edit-task-slide').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('edit-slide-container').classList.add('edit-slide-in');
    }, 100);
    */
}
/* const editTaskSlide = document.getElementById('edit-task-slide');
const editSlideContainer = document.getElementById('edit-slide-container');
if (editSlideContainer) {
    editSlideContainer.classList.add('edit-slide-in');
    editTaskSlide.classList.remove('d-none');
    // Fahren Sie mit dem Rest des Codes fort
} else {
    console.error("Das Element mit der ID 'edit-slide-container' wurde nicht gefunden.");
} */
function editTask(id) {
  const slideEditTask = document.getElementById("edit-task-slide");
  slideEditTask.innerHTML = renderEditTask(id);
  closeCard();
  slideCardAnimationEditTask();

  // Holen Sie sich das 'element' für die Editieransicht
  const element = todos[id];

  // Übergeben Sie 'element' an die 'addSubtaskToEdit' Funktion
  addSubtaskToEdit(element);
}

function renderEditTask(id) {
  const task = todos.find((todo) => todo.id === id);

  const selectedContactsIds = task.assignedTo.map((contact) => contact.id);

  const selectedCategory = task.category;
  const subtasks = task.subtasks;

  return /*html*/ `
        <div id="edit-slide-container" class="edit-slide-container">
            <form id="edit-taskForm" class="edit-task-slide-container">
                <div class="edit-add-task-container">
                    <div class="edit-add-task-container-first">
                        <div class="edit-add-task-container-titel">
                            <div class="edit-add-task-titel-textcontainer">
                                <input id="edit-task-title" class="edit-add-task-titel-textfield" placeholder="Enter a title">
                            </div>
                        </div>
                        <div id="edit-required-title" class="edit-add-task-field-required">
                            This field is required
                        </div>
                    </div>
                    <div class="edit-add-task-container-description">
                        <div class="edit-add-task-description-header">Description</div>
                        <textarea id="edit-task-description" class="edit-add-task-description-textfield"
                            placeholder="Enter a Description" cols="30" rows="4"></textarea>
                        <div id="edit-required-description" class="edit-add-task-field-required">
                            This field is required
                        </div>
                    </div>
                    <div class="edit-due-date-container">
                        <div class="edit-due-date-header">
                            Due date
                        </div>
                        <div class="edit-due-date-input-container">
                            <input id="edit-due-date" class="edit-due-date-textfield" type="date">
                            <!-- <img src="../img/calendar.png" alt="Calendar Icon" class="due-date-calendar-icon"> -->
                        </div>
                        <div id="edit-required-date" class="edit-add-task-field-required">
                            This field is required
                        </div>
                    </div>
                    <div class="edit-add-task-container-priority">
                        <div class="edit-add-task-priority-header">
                        Priority
                        </div>
                    </div>
                    <div class="edit-priority-choice">
                        <button type="button" onclick="priority(this)" id="edit-prio-urgent"
                            class="edit-priority-choice-inner prio-urgent">
                            Urgent
                            <div class="edit-priority-choice-inner-pic">
                                <img src="./img/prio-high.png" id="edit-prio-urgent-img" class="edit-original-image"
                                    data-image="prio-high.png">
                            </div>
                        </button>
                        <button type="button" onclick="priority(this)" id="edit-edit-prio-medium"
                            class="edit-priority-choice-inner prio-medium">
                            Medium
                            <div class="edit-priority-choice-inner-pic">
                                <img src="./img/prio-medium.png" id="edit-prio-medium-img" class="edit-original-image"
                                    data-image="prio-medium.png">
                            </div>
                        </button>
                        <button type="button" onclick="priority(this)" id="edit-prio-low" class="edit-priority-choice-inner prio-low">
                            Low
                            <div class="edit-priority-choice-inner-pic">
                                <img src="./img/prio-low.png" id="edit-prio-low-img" class="edit-original-image"
                                    data-image="prio-low.png">
                            </div>
                        </button>
                    </div>
                    <div id="edit-required-priority" class="edit-add-task-field-required">
                        This field is required
                    </div>
                    <div class="edit-assigned-to-container">
                        <div class="edit-assigned-to-header">
                        Assigned to
                        </div>
                    </div>
                    <div class="edit-assigned-to-choicefield">
                        <div class="edit-assigned-to-dropdown" onclick="toggleAssignedToContainer()">
                            <div class="edit-assigned-dropdown-header">
                                <input oninput="searchContacts(this.value)" id="edit-search-input" class="edit-assigned-select-text"
                                    placeholder="Select contacts to assign" type="text">
                            </div>
                            <div class="edit-assigned-dropdown-arrow"></div>
                        </div>
                    </div>
                    <div id="edit-required-contact" class="edit-add-task-field-required">
                        This field is required
                    </div>
                    <div id="edit-loaded-contacts" class="edit-loaded-contacts"></div>
                    <div id="edit-chosen-contacts" class="edit-chosen-contacts"></div>
                
                    <div class="edit-category-container">
                        <div class="edit-category-header">
                            Category
                        </div>
                    </div>    
                    <div class="edit-category-choicefield">
                        <div class="edit-category-dropdown" onclick="toggleCategoryContainer()">
                            <div class="edit-dropdown-header" id="edit-dropdown-header">
                                <span class="edit-select-text">Select task category</span>
                                <span id="edit-selected-category-display"></span>
                            </div>
                            <div class="edit-dropdown-arrow"></div>
                        </div>
                    </div>
                    <div id="edit-required-category" class="edit-add-task-field-required">
                        This field is required
                    </div>
                    <div id="edit-loaded-categories" class="edit-loaded-categories"></div>
                    
                    <div class="edit-subtasks-container">
                        <div class="edit-subtasks-header">
                            Subtasks
                        </div>
                        <div class="edit-add-subtask-input">
                            <input type="text" id="edit-subtask-input" class="edit-new-subtask-textfield" placeholder="Add new subtask">
                            <img onclick="addSubtask()" class="edit-add-subtask-button" src="./img/subtask.svg">
                        </div>
                        <div id="edit-required-subtask" class="edit-add-task-field-required">
                            This field is required
                        </div>
                        <div id="edit-subtask-add-container" class="edit-subtask-add-container"></div>
                    </div>
                
                    <div class="edit-add-task-buttons">
                        <div class="edit-add-task-buttons-inner">
                            <button type="button" class="edit-button-clear">
                                <div class="edit-button-clear-text">Clear</div>
                                <div class="edit-button-clear-pic"> <img src="./img/cancel-icon.svg"></div>
                            </button>
                            <button type="submit" id="createTaskButton" class="edit-button-create-task">
                                <div class="edit-button-create-task-text">Create Task</div>
                                <div class="edit-button-create-task-pic"><img src="./img/check.svg"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    `;
}

/* function renderEditTask(id) {
    const task = todos.find(todo => todo.id === id);

    // Fülle die Titel-, Beschreibungs- und Fälligkeitsdatumfelder
    const taskTitleInput = document.getElementById('edit-task-title');
    const taskDescriptionTextarea = document.getElementById('edit-task-description');
    const dueDateInput = document.getElementById('edit-due-date');

    taskTitleInput.value = task.title;
    taskDescriptionTextarea.value = task.description;
    dueDateInput.value = task.dueDate;

    // Setze die ausgewählte Priorität
    const priorityButtons = document.querySelectorAll('.priority-choice-inner');
    priorityButtons.forEach(button => {
        if (button.getAttribute('id') === `prio${task.priority}`) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }
    });

    // Fülle die "Assigned to" Container
    const chosenContactsContainer = document.getElementById('edit-chosen-contacts');
    chosenContactsContainer.innerHTML = '';

    task.assignedTo.forEach(contact => {
        const contactDiv = document.createElement('div');
        contactDiv.innerText = contact.name;
        chosenContactsContainer.appendChild(contactDiv);
    });

    // Setze die ausgewählte Kategorie
    const selectedCategoryDisplay = document.getElementById('edit-selected-category-display');
    selectedCategoryDisplay.textContent = task.category;

    // Fülle die Subtask-Liste
    const subtaskAddContainer = document.getElementById('edit-subtask-add-container');
    subtaskAddContainer.innerHTML = '';

    task.subtasks.forEach((subtask, index) => {
        const subtaskDiv = document.createElement('div');
        subtaskDiv.classList.add('subtask-item');
        subtaskDiv.innerHTML = `
            <input type="checkbox" class="subtask-checkbox" id="subtaskCheckbox${index}" ${subtask.status ? 'checked' : ''}>
            <label for="subtaskCheckbox${index}" class="subtask-label">${subtask.title}</label>
        `;
        subtaskAddContainer.appendChild(subtaskDiv);
    });

    return html`
        <div id="edit-slide-container" class="edit-slide-container">
            <form id="edit-taskForm" class="edit-task-slide-container">
                <div class="add-task-container">
                    <div class="add-task-container-first">
                        <div class="add-task-container-titel">
                            <div class="add-task-titel-textcontainer">
                                <input id="edit-task-title" class="add-task-titel-textfield" placeholder="Enter a title">
                            </div>
                            <div id="edit-required-title" class="add-task-field-required">
                                This field is required
                            </div>
                        </div>
                        <div class="add-task-container-description">
                            <div class="add-task-description-header">Description</div>
                            <textarea id="edit-task-description" class="add-task-description-textfield"
                                placeholder="Enter a Description" cols="30" rows="4"></textarea>
                            <div id="edit-required-description" class="add-task-field-required">
                                This field is required
                            </div>
                        </div>
                        <div class="due-date-container">
                            <div class="due-date-header">
                                Due date
                            </div>
                            <div class="due-date-input-container">
                                <input id="edit-due-date" class="due-date-textfield" type="date">
                                <!-- <img src="../img/calendar.png" alt="Calendar Icon" class="due-date-calendar-icon"> -->
                            </div>
                            <div id="edit-required-date" class="add-task-field-required">
                                This field is required
                            </div>
                        </div>
                    </div>
                    <div class="add-task-container-priority">
                        <div class="add-task-priority-header">
                            Priority
                        </div>
                        <div class="priority-choice">
                            <button type="button" onclick="priority(this)" id="edit-prio-urgent"
                                class="priority-choice-inner prio-urgent">
                                Urgent
                                <div class="priority-choice-inner-pic">
                                    <img src="./img/prio-high.png" id="edit-prio-urgent-img" class="original-image"
                                        data-image="prio-high.png">
                                </div>
                            </button>
                            <button type="button" onclick="priority(this)" id="edit-prio-medium"
                                class="priority-choice-inner prio-medium">
                                Medium
                                <div class="priority-choice-inner-pic">
                                    <img src="./img/prio-medium.png" id="edit-prio-medium-img" class="original-image"
                                        data-image="prio-medium.png">
                                </div>
                            </button>
                            <button type="button" onclick="priority(this)" id="edit-prio-low" class="priority-choice-inner prio-low">
                                Low
                                <div class="priority-choice-inner-pic">
                                    <img src="./img/prio-low.png" id="edit-prio-low-img" class="original-image"
                                        data-image="prio-low.png">
                                </div>
                            </button>
                        </div>
                        <div id="edit-required-priority" class="add-task-field-required">
                            This field is required
                        </div>
                    </div>
                    <div class="assigned-to-container">
                        <div class="assigned-to-header">
                            Assigned to
                        </div>
                        <div class="assigned-to-choicefield">
                            <div class="assigned-to-dropdown" onclick="toggleAssignedToContainer()">
                                <div class="assigned-dropdown-header">
                                    <input oninput="searchContacts(this.value)" id="edit-search-input" class="assigned-select-text"
                                        placeholder="Select contacts to assign" type="text">
                                </div>
                                <div class="assigned-dropdown-arrow"></div>
                            </div>
                        </div>
                        <div id="edit-required-contact" class="add-task-field-required">
                            This field is required
                        </div>
                        <div id="-edit-loaded-contacts" class="loaded-contacts"></div>
                        <div id="edit-chosen-contacts" class="chosen-contacts"></div>
                    </div>
                    <div class="category-container">
                        <div class="category-header">
                            Category
                        </div>
                        <div class="category-choicefield">
                            <div class="category-dropdown" onclick="toggleCategoryContainer()">
                                <div class="dropdown-header" id="edit-dropdown-header">
                                    <span class="select-text">Select task category</span>
                                    <span id="edit-selected-category-display"></span>
                                </div>
                                <div class="dropdown-arrow"></div>
                            </div>
                        </div>
                        <div id="edit-required-category" class="add-task-field-required">
                            This field is required
                        </div>
                        <div id="edit-loaded-categories" class="loaded-categories"></div>
                    </div>
                    <div class="subtasks-container">
                        <div class="subtasks-header">
                            Subtasks
                        </div>
                        <div class="add-subtask-input">
                            <input type="text" id="edit-subtask-input" class="new-subtask-textfield" placeholder="Add new subtask">
                            <img onclick="addSubtask()" class="add-subtask-button" src="./img/subtask.svg">
                        </div>
                        <div id="edit-required-subtask" class="add-task-field-required">
                            This field is required
                        </div>
                        <div id="edit-subtask-add-container" class="subtask-add-container"></div>
                    </div>
                </div>
                <div class="add-task-buttons">
                    <div class="add-task-buttons-inner">
                        <button type="button" class="button-clear">
                            <div class="button-clear-text">Clear</div>
                            <div class="button-clear-pic"> <img src="./img/cancel-icon.svg"></div>
                        </button>
                        <button type="submit" id="createTaskButton" class="button-create-task">
                            <div class="button-create-task-text">Create Task</div>
                            <div class="button-create-task-pic"><img src="./img/check.svg"></div>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `;
}
 */

async function updateTask(id) {
  const updatedTitle = document.getElementById("edit-task-title").value;
  const updatedDescription = document.getElementById("edit-task-description").value;
  const updatedDueDate = document.getElementById("edit-due-date").value;

  const element = todos[id];
  element.title = updatedTitle;
  element.description = updatedDescription;
  element.dueDate = updatedDueDate;

  // Stellen Sie sicher, dass die Priorität, zugewiesenen Kontakte und Kategorie ebenfalls aktualisiert werden
  // (Sie müssen diese Teile entsprechend ergänzen, je nachdem, wie diese Daten aktualisiert werden sollen)

  todos[id] = element; // Aktualisieren Sie den Datensatz mit den aktualisierten Daten
  await setItem("tasks", JSON.stringify(todos)); // Speichern Sie den Datensatz

  // Führen Sie die Aktualisierung der Anzeige durch, um die Änderungen anzuzeigen
  // (Sie müssen diese Aktualisierung entsprechend implementieren)
}

function priority(button) {
  resetButtons();
  /* hidePriorityError(); */

  if (button.id === "prioUrgent") {
    highlightButton(button, "#FF3D00", "./img/prio_high_active.png");
    selectedPriority = "high";
  } else if (button.id === "prioMedium") {
    highlightButton(button, "#FFA800", "./img/prio_medium_active.png");
    selectedPriority = "medium";
  } else if (button.id === "prioLow") {
    highlightButton(button, "#7AE229", "./img/prio_low_active.png");
    selectedPriority = "low";
  }
}

function resetButtons() {
  selectedPriority = "";

  let buttons = document.querySelectorAll(".priority-choice-inner");
  for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];
    btn.classList.remove("highlighted");
    btn.style.backgroundColor = "";
    btn.style.color = "black";

    let originalImage = btn.querySelector(".priority-choice-inner-pic img");
    originalImage.src = "./img/" + originalImage.getAttribute("data-image");
  }
}

function highlightButton(button, bgColor, imageSrc) {
  button.classList.add("highlighted");
  button.style.backgroundColor = bgColor;
  let image = button.querySelector(".priority-choice-inner-pic img");
  image.src = imageSrc;
  button.style.color = "white";
}

function addSubtaskToEdit(element) {
  let subtasksHTML = "";
  if (element.subtasks && Array.isArray(element.subtasks)) {
    for (let i = 0; i < element.subtasks.length; i++) {
      const subtask = element.subtasks[i];
      if (subtask.title) {
        subtasksHTML += /*html*/ `
                    <div class="task-slide-subtask">
                        ${subtask.title}
                    </div>
                `;
      }
    }
    // Fügen Sie subtasksHTML in das entsprechende HTML-Element ein
    const subtaskContainer = document.getElementById("edit-subtask-add-container");
    subtaskContainer.innerHTML = subtasksHTML;
    // Hier können Sie auch andere notwendige Aktualisierungen durchführen
  }
}
