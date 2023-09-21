function subtaskToAddHTML(subInputValue) {
    return /*html*/ `
    <div class="edit-subtask-container">
        <div class="edit-subtask-item">
            <span class="edit-subtask-dot"></span>           
            <input class="edit-subtask-value" value="${subInputValue}">
        </div>
    </div>
`;
}

function subtaskToEditHTML(subtask) {
    return /*html*/ `
    <div class="edit-subtask-container">
        <div class="edit-subtask-item">
            <span class="edit-subtask-dot"></span>           
            <input class="edit-subtask-value" value="${subtask.title}">
        </div>
    </div>
`;
}


function renderEditTask(id) {
    const task = todos.find((todo) => todo.id === id);
    

    

    return /* html */ `
        <div id="edit-slide-container" class="edit-slide-container">
            <form id="edit-taskForm" onsubmit="saveEditedTask(${id}); return false;" class="edit-task-slide-container">
                <div class="edit-add-task-container">
                    <div class="edit-add-task-container-first">
                        <div class="edit-add-task-container-titel">
                            <div class="edit-add-task-titel-textcontainer">
                                <input id="edit-task-title" class="edit-add-task-titel-textfield" placeholder="Enter a title" value="${task.title}">
                            </div>
                        </div>
                        <div id="edit-required-title" class="edit-add-task-field-required">
                            This field is required
                        </div>
                    </div>
                    <div class="edit-add-task-container-description">
                        <div class="edit-add-task-description-header">Description</div>
                        <textarea id="edit-task-description" class="edit-add-task-description-textfield"
                            placeholder="Enter a Description" cols="30" rows="4">${task.description}</textarea>
                        <div id="edit-required-description" class="edit-add-task-field-required">
                            This field is required
                        </div>
                    </div>
                    <div class="edit-due-date-container">
                        <div class="edit-due-date-header">
                            Due date
                        </div>
                        <div class="edit-due-date-input-container">
                            <input id="edit-due-date" class="edit-due-date-textfield" type="date" value="${task.dueDate}">
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
                        <button type="button" onclick="priority(this)" id="edit-prio-medium"
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
                        <div class="edit-assigned-to-dropdown" onclick="loadToggleAssignedToContainer()">
                            <div class="edit-assigned-dropdown-header">
                                <input oninput="loadSearchContacts(this.value)" id="edit-search-input" class="edit-assigned-select-text"
                                    placeholder="Select contacts to assign" type="text">
                            </div>
                            <div class="edit-assigned-dropdown-arrow"></div>
                        </div>
                    </div>
                    <div id="edit-required-contact" class="edit-add-task-field-required">
                        This field is required
                    </div>
                    <div class="edit-contacts-container">
                        <div id="edit-loaded-contacts" class="loaded-contacts">
                        </div>
                        <button id="edit-addContactBtn" onclick="openModal()" class="add-person-button">
                            Add new contact
                            <img src="./img/person_add.svg" class="button-icon">
                        </button>
                    </div>
                    <div id="edit-chosen-contacts" class="chosen-contacts"></div>
                    <div class="edit-category-container">
                        <div class="edit-category-header">
                            Category
                        </div>
                    </div>    
                    <div class="edit-category-choicefield">
                        <div class="edit-category-dropdown" onclick="loadToggleCategoryContainer()">
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
                            <img onclick="addNewSubtask()" class="edit-add-subtask-button" src="./img/add_subtask.png">
                        </div>
                        <div id="edit-required-subtask" class="edit-add-task-field-required">
                            This field is required
                        </div>
                        <div id="edit-subtask-add-container" class="edit-subtask-add-container"></div>
                    </div>
                
                    <div class="edit-add-task-buttons">
                        <div class="edit-add-task-buttons-inner">                            
                            <button type="submit" id="createTaskButton" class="edit-button-create-task">
                                <div class="edit-button-create-task-text">Ok</div>
                                <div class="edit-button-create-task-pic"><img src="./img/check.svg"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    `;
}
