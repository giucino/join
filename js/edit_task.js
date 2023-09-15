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
  }
  

async function updateTask(id) {
  const updatedTitle = document.getElementById("edit-task-title").value;
  const updatedDescription = document.getElementById("edit-task-description").value;
  const updatedDueDate = document.getElementById("edit-due-date").value;

  const element = todos[id];
  element.title = updatedTitle;
  element.description = updatedDescription;
  element.dueDate = updatedDueDate;

  todos[id] = element; 
  await setItem("tasks", JSON.stringify(todos)); 

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

