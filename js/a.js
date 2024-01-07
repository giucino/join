// editTaskanimation.js line 328
// /**
//  * Toggles the selection of a contact based on the given name and surname. If the contact is already selected,
//  * it will be removed from the selection; otherwise, it will be added to the selection. After toggling the contact
//  * selection, various rendering functions are called to update the UI.
//  * @param {string} name - The first name of the contact to be toggled.
//  * @param {string} surname - The surname of the contact to be toggled.
//  * @see loadRenderAssignedTo
//  * @see loadSearchedContact
//  * @see renderDisplayChosenContacts
//  */
// function loadToggleContactSelection(name, surname) {
//   const contact = contacts.find(c => c.name === name && c.surname === surname);

//   if (!contact) {
//     return;
//   }

//   if (selectedContacts[contact.id]) {
//     delete selectedContacts[contact.id];
//   } else {
//     selectedContacts[contact.id] = `${contact.name} ${contact.surname}`;
//   }
//   loadRenderAssignedTo(selectedContacts);
//   loadSearchedContact(contacts);
//   renderDisplayChosenContacts();
// }


// addTaskTemplate.js line 15
// /**
//  * Renders an assigned contact as an HTML element.
//  * @param {Object} contact - The contact to render.
//  * @param {string} contact.name - The first name of the contact.
//  * @param {string} contact.surname - The surname/last name of the contact.
//  * @param {string} contact.bgcolor - The background color for the initials container.
//  * @param {string} initials - The initials of the contact.
//  * @param {boolean} isSelected - A flag indicating if the contact is currently selected.
//  * @param {boolean} isCurrentUser - A flag indicating if the contact is the current user.
//  * @returns {string} - Returns the rendered HTML string.
//  * @example
//  * const contact = { name: 'John', surname: 'Doe', bgcolor: '#fafafa' };
//  * const htmlString = renderAssignedToHTML(contact, 'JD', true, false);
//  */
// function renderAssignedToHTML(contact, initials, isSelected, isCurrentUser) {
//     let userMarker = isCurrentUser ? " (you)" : "";

//     return /*html*/`
//         <div class="contact-container ${isSelected ? 'selected' : ''}" onclick="toggleContactSelection('${contact.name}', '${contact.surname}')">
//             <div class="select-contact">
//                 <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
//                 <div class="select-name">${contact.name} ${contact.surname}${userMarker}</div>
//             </div>
//             <img class="select-icon" id="selectCheck" src="${isSelected ? 'img/check_contact.png' : 'img/check-button.png'}"  alt="Check Button">
//         </div>
//     `;
// }


//taskTemplate.js line 158
// /**
//  * Renders a contact as HTML with optional selection and current user indicator.
//  * @param {object} contact - The contact object with properties like name, surname, and bgcolor.
//  * @param {string} initials - The initials to display.
//  * @param {boolean} isSelected - Whether the contact is selected.
//  * @param {boolean} isCurrentUser - Whether the contact is the current user.
//  * @returns {string} The HTML representation of the contact with optional selection and user indicator.
//  */
// function addRenderAssignedToHTML(contact, initials, isSelected, isCurrentUser) {
//     let userMarker = isCurrentUser ? " (you)" : "";

//     return /*html*/`
//         <div class="contact-container ${isSelected ? 'selected' : ''}" onclick="addToggleContactSelection('${contact.name}', '${contact.surname}')">
//             <div class="select-contact">
//                 <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
//                 <div class="select-name">${contact.name} ${contact.surname}${userMarker}</div>
//             </div>
//             <img class="select-icon" id="addSelectCheck" src="${isSelected ? 'img/check_contact.png' : 'img/check-button.png'}"  alt="Check Button">
//         </div>
//     `;
// }



//taskUiManager.js line 168
// /**
//  * Event listener for the 'DOMContentLoaded' event.
//  * Sets the default task priority to 'Medium' once the HTML document is fully loaded and parsed.
//  */
// document.addEventListener('click', function() {
//     let mediumPriorityButton = document.getElementById('addPrioMedium');
//     addPriority(mediumPriorityButton);
// });


//taskUiManager line 243
/**
 * Event handler for the global click event.
 * Closes contact-related dropdowns and containers if the click is outside
 * the assigned-to-choicefield and contact containers.
 * */
// document.addEventListener('click', function (event) {
//     let assignedToContainer = document.querySelector('.assigned-to-choicefield');
//     let isClickInside = assignedToContainer.contains(event.target);
//     let isContact = event.target.closest('.contact-container');

//     if (!isClickInside && !isContact) {
//         let loadedContacts = document.getElementById('addLoadedContacts');
//         let contactsContainer = document.querySelector('.contacts-container');
//         let assignedToDropdown = document.querySelector('.assigned-to-dropdown');

//         loadedContacts.style.display = 'none';
//         assignedToDropdown.classList.remove('expanded');
//         contactsContainer.style.display = 'none';
//     }
// });


//editTaskRenderAndLoad.js line 77
// /**
//  * Loads and displays the chosen contacts.
//  */
// function loadDisplayChosenContacts() {
//     const chosenContactsContainer = document.getElementById('edit-chosen-contacts');
//     let htmlContent = '';

//     for (let id in selectedContacts) {
//         if (selectedContacts.hasOwnProperty(id)) {
//             let contact = contacts.find(c => c.id === parseInt(id));
//             if (contact) {
//                 let initials = `${contact.name.charAt(0)}${contact.surname.charAt(0)}`.toUpperCase();
//                 htmlContent += loadDisplayChosenContactsHTML(contact, initials);
//             }
//         }
//     }
//     chosenContactsContainer.innerHTML = htmlContent;
// }


// /**
//  * Generiert und gibt einen HTML-String für die Anzeige ausgewählter Kontakte zurück.
//  * @param {Object} contact - Das Kontaktobjekt mit notwendigen Informationen.
//  * @param {string} contact.bgcolor - Hintergrundfarbe für die Initialen.
//  * @param {string} initials - Initialen des Kontakts.
//  */
// function loadDisplayChosenContactsHTML(contact, initials) {
//     return /*html*/`
//         <div class="chosen">
//             <div class="initial" style="background-color: ${contact.bgcolor}">${initials}</div>
//         </div>
//     `;
// }
