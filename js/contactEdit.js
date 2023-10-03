/**
 * Edits the specified contact.
 * @param {number} index - The index of the contact to edit.
 */
function editContact(index) {
    let contact = contacts[index];
    openEditModal();
    generateEditContactModal(index);
    document.getElementById("editFullName").value = `${contact.name} ${contact.surename}`;
    document.getElementById("editNewEmail").value = contact.email;
    document.getElementById("editNewTelefon").value = contact.telefon;
    const updateContactBtn = document.getElementById("updateContactBtn");
    updateContactBtn.onclick = function () {
        updateContact(index);
    };
    returnToContactsMobile();
}


/**
 * Generates the edit modal for a specific contact.
 * @param {number} index - The index of the contact to edit.
 */
function generateEditContactModal(index) {
    let contact = contacts[index];
    let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
    let editContainer = document.getElementById('editModal');
    editContainer.innerHTML = generateEditContactModalHTML(index, initials, contact);
}


/**
 * Opens the edit modal.
 */
function openEditModal() {
    let modal = document.getElementById("editModal");
    let overlay = document.querySelector(".background-overlay");
    modal.style.display = "flex";
    overlay.style.display = "block";
    modal.classList.remove('editModal-slide-out');
    modal.classList.add('editModal-slide-in');
}


/**
 * Closes the edit modal.
 */
function closeEditModal() {
    let modal = document.getElementById("editModal");
    let overlay = document.querySelector(".background-overlay");
    modal.classList.remove('editModal-slide-in');
    modal.classList.add('editModal-slide-out');
    overlay.style.display = "none";
}


/**
 * Deletes the specified contact after user confirmation.
 * @param {number} index - The index of the contact to delete.
 * @returns {Promise<void>}
 */
async function deleteContact(index) {
    if (confirm("Möchten Sie diesen Kontakt wirklich löschen?")) {
        contacts.splice(index, 1);
        for (let i = 0; i < contacts.length; i++) {
            contacts[i].id = i + 1;
        }
        await setItem('contacts', JSON.stringify(contacts));
        let detailsContainer = document.getElementById('contact-details');
        detailsContainer.innerHTML = '';
        closeEditModal();
        initContact();
        returnToContactsMobile();
    }
}


/**
 * Displays a notification indicating that a contact was successfully added.
 */
function showContactAdded() {
    let contactAddedContainer = document.getElementById('contactAddedContainer');
    contactAddedContainer.innerHTML = /*html*/ `    <div> Contact successfully created </div> 
                                                    <div> <img src="./img/vector.svg"></div> `;
    contactAddedContainer.style.display = 'flex';
    setTimeout(() => {
        contactAddedContainer.classList.add('show');
    }, 10);
    setTimeout(() => {
        contactAddedContainer.classList.remove('show');
        setTimeout(() => {
            contactAddedContainer.style.display = 'none';
        }, 500);
    }, 2000);
}