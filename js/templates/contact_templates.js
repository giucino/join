function showContactDetailsHTML(contact, initials, index) {
    return `
    <div class="contact-detailed-container">
        <div class="contact-detailed-top">
            <div>
                <div class="initial-big" style="background-color: ${contact.bgcolor || getRandomColor()}">
                    ${initials}
                </div>
            </div>
            <div class="contact-detailed-mid">
                <div class="contact-detailed-name">${contact.name} ${contact.surename}</div>
                <div class="contact-detailed-edit-delete">
                    <div class="contact-detailed-images" onclick="editContact(${index})"><img src="./img/edit.png">Edit</div>
                    <div class="contact-detailed-images" onclick="deleteContact(${index})"><img src="./img/delete.png">Delete</div>
                </div>
            </div>
        </div>
        <div class="contact-detailed-information"> Contact Information </div>             
            <div class="contact-detailed-text">Email: </div> <div class="email"> ${contact.email}</div>
            <div class="contact-detailed-text">Telefon: </div> <div class="phone"> ${contact.telefon}</div> 
    </div>
    `;
}

function showContactDetailsMobileHTML(contact, initials, index) {
    return `
    <div class="contact-detailed-container">
        <div class="contact-detailed-top">
            <div>
                <div class="initial-big" style="background-color: ${contact.bgcolor || getRandomColor()}">
                    ${initials}
                </div>
            </div>
            <div class="contact-detailed-mid">
                <div class="contact-detailed-name">${contact.name} ${contact.surename}</div>
            </div>
        </div>
        <div class="contact-detailed-information"> Contact Information </div>             
            <div class="contact-detailed-text">Email: </div> <div class="email"> ${contact.email}</div>
            <div class="contact-detailed-text">Telefon: </div> <div class="phone"> ${contact.telefon}</div> 
        </div>    
            <div class="contact-detailed-mobile-return" onclick="returnToContactsMobile()"><img src="./img/arrow-left-line.png">
        </div> 
        <div id="contact-detailed-head" onclick="showEditContactsButtonsMobile()">
            <div class="contact-detailed-images-head"><img src="./img/more_vert.svg"></div>
        </div>
        <div id="contact-mobile-buttons" class="contact-detailed-mobile-buttons, hide-it">
            <div id="contact-detailed-button-edit" class="contact-detailed-images-mobile" onclick="editContact(${index})"><img src="./img/edit.png">Edit</div>
            <div id="contact-detailed-button-delete" class="contact-detailed-images-mobile" onclick="deleteContact(${index})"><img src="./img/delete.png">Delete</div>
        </div>
        <div class="add-Contact-Mobile-button">
            <div> </div>
        </div>
    `;
}

function showContactsHTML(i, color, initials, contact) {
    return /*html*/ `
        <div class="contact" data-contact-index="${i}" onclick="handleContactClick(${i})">
            <div class="initial" style="background-color: ${color}">${initials}</div>
            <div class="container-name-email">
                <div class="name">${contact.name} ${contact.surename}</div>
                <div class="email">${contact.email}</div>
            </div>
        </div>`;
}


function generateAddContactModalHTML() {
    return /*html*/ `
    <div class="modal-content">
            <div class="modal-content-top">
                <div id="closeContactModalBtn" onclick="closeModal()"><img class="close" src="./img/close_contact.png"
                        alt="Close Modal"></div>
                <div class="modal-logo"><img src="./img/join_logo.png"></div>
                <div class="modal-headline">Add contact</div>
                <div class="modal-text">Tasks are better with a team!</div>
            </div>
            <div class="modal-input-container">
                <div class="modal-input-img">
                    <img src="./img/person_add.png">
                </div>
                <div class="modal-input-row">
                    <div class="modal-input-frame">
                        <input class="modal-input-field" required type="text" id="fullName" placeholder="Name">
                        <img class="modal-input-icon" src="img/person.png" alt="Name">
                    </div>

                    <div class="modal-input-frame">
                        <input class="modal-input-field" required type="email" id="newEmail" name="email"
                            autocomplete="email" placeholder="Email">
                        <img class="modal-input-icon" src="img/mail.png" alt="Email">
                    </div>
                    <div class="modal-input-frame">
                        <input class="modal-input-field" required type="email" id="newTelefon" placeholder="Phone">
                        <img class="modal-input-icon" src="img/call.svg" alt="Phone">
                    </div>
                </div>
                <div class="add-contact-buttons">
                    <div class="add-contact-buttons-inner">
                        <button onclick="closeModal()" type="button" class="button-clear">
                            Cancel
                            <img class="button-clear-pic" src="./img/cancel-icon.svg">
                        </button>
                        <button onclick="saveNewContact()" type="submit" id="saveContactBtn" class="button-create-task">
                            Create contact
                            <img class="button-create-task-pic" src="./img/check.svg">
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
}


function generateEditContactModalHTML(index, initials, contact) {
    return /*html*/ `
 <div class="edit-content" data-index="${index}">
     <div class="edit-content-top">
         <div id="closeEditModalBtn" onclick="closeEditModal()"><img class="close" src="./img/close_contact.png" alt="Close Modal"></div>
         <div class="modal-logo"><img src="./img/join_logo.png"></div>
         <div class="modal-headline">Edit contact</div>
     </div>
     <div class="modal-input-container">
         <div class="initial-big" style="background-color: ${contact.bgcolor}">
             ${initials}
         </div>
         <div class="modal-input-row">
             <div class="modal-input-frame">
                     <input class="modal-input-field" required type="text" id="editFullName" placeholder="Name">
                     <img class="modal-input-icon" src="img/person.png" alt="Name"> 
             </div>
             <div class="modal-input-frame">
                 <input class="modal-input-field" required type="email" id="editNewEmail" name="email" autocomplete="email"
                     placeholder="Email">
                 <img class="modal-input-icon" src="img/mail.png" alt="Email">
             </div>
             <div class="modal-input-frame">
                 <input class="modal-input-field" required type="email" id="editNewTelefon" placeholder="Phone">
                 <img class="modal-input-icon" src="img/call.svg" alt="Phone">
             </div>
         </div>
         <div class="add-contact-buttons">
             <div class="add-contact-buttons-inner">
                 <button onclick="deleteContact(${index})" class="button-clear">
                     <div class="button-clear-text">Delete</div>
                 </button>
                 <button id="updateContactBtn" class="button-create-task" onclick="updateContact()">
                     <div class="button-create-task-text">Save</div>
                     <div class="button-create-task-pic"> <img src="./img/check.svg"></div>
                 </button>
             </div>
         </div>
     </div>
 </div>
`;
}

function generateEditContactMobileHTML(index, initials, contact) {
    return /*html*/`
    <div class="edit-content" data-index="${index}">
        <div class="edit-content-top">
            <div id="closeEditModalBtn" onclick="closeEditModal()"><img class="close" src="./img/close_contact.png" alt="Close Modal"></div>
            <div class="modal-logo"><img src="./img/join_logo.png"></div>
            <div class="modal-headline">Edit contact</div>
        </div>
        <div class="modal-input-container">
            <div class="initial-big" style="background-color: ${contact.bgcolor}">
                ${initials}
            </div>
            <div class="modal-input-row">
                <div class="modal-input-frame">
                        <input class="modal-input-field" required type="text" id="editFullName" placeholder="Name">
                        <img class="modal-input-icon" src="img/person.png" alt="Name"> 
                </div>
                <div class="modal-input-frame">
                    <input class="modal-input-field" required type="email" id="editNewEmail" name="email" autocomplete="email"
                        placeholder="Email">
                    <img class="modal-input-icon" src="img/mail.png" alt="Email">
                </div>
                <div class="modal-input-frame">
                    <input class="modal-input-field" required type="email" id="editNewTelefon" placeholder="Phone">
                    <img class="modal-input-icon" src="img/call.svg" alt="Phone">
                </div>
            </div>
            <div class="add-contact-buttons">
                <div class="add-contact-buttons-inner">
                    <button onclick="deleteContact(${index})" class="button-clear">
                        <div class="button-clear-text">Delete</div>
                    </button>
                    <button id="updateContactBtn" class="button-create-task" onclick="updateContact()">
                        <div class="button-create-task-text">Save</div>
                        <div class="button-create-task-pic"> <img src="./img/check.svg"></div>
                    </button>
                </div>
            </div>
        </div>
    </div>
   `;
}