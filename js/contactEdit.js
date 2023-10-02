/**
 * function to edit the chosen contact
 * @param {string} index 
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
}


/**
 * this function generates the left modal that shows up after clicking on edit
 * @param {integer} index 
 */
function generateEditContactModal(index) {
    let contact = contacts[index];
    let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
    let editContainer = document.getElementById('editModal');
    editContainer.innerHTML = generateEditContactModalHTML(index, initials, contact);
}


/**
 * this functions opens the edit modal
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
 * this function closes the edit modal
 */
function closeEditModal() {
    let modal = document.getElementById("editModal");
    let overlay = document.querySelector(".background-overlay");
    modal.classList.remove('editModal-slide-in');
    modal.classList.add('editModal-slide-out');
    overlay.style.display = "none";
}


/**
 * function to delete the chosen contact
 * @param {string} index 
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
    }
}