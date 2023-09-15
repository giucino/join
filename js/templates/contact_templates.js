function showContactDetailsHTML(contact, initials, index){
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

function generateEditContactModalHTML(index, initials, contact){
 return `
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
