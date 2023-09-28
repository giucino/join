let contacts = [
    {
        bgcolor: '#00BEE8',
        id: 0,
        name: 'Anna',
        surename: 'Schmidt',
        email: 'anna.schmidt@example.com',
        telefon: '1234567890'
    },
    {
        bgcolor: '#00BEE8',
        id: 1,
        name: 'Max',
        surename: 'Müller',
        email: 'max.mueller@example.com',
        telefon: '234567890'
    },
    {
        bgcolor: '#1FD7C1',
        id: 2,
        name: 'Sophie',
        surename: 'Wagner',
        email: 'sophie.wagner@example.com',
        telefon: '3456789012'
    },
    {
        bgcolor: '#6E52FF',
        id: 3,
        name: 'Paul',
        surename: 'Becker',
        email: 'paul.becker@example.com',
        telefon: '456789012'
    },
    {
        bgcolor: '#9327FF',
        id: 4,
        name: 'Laura',
        surename: 'Hoffmann',
        email: 'laura.hoffmann@example.com',
        telefon: '567890123'
    },
    {
        bgcolor: '#C3FF2B',
        id: 5,
        name: 'Felix',
        surename: 'Schulz',
        email: 'felix.schulz@example.com',
        telefon: '6789012345'
    },
    {
        bgcolor: '#FFA35E',
        id: 6,
        name: 'Emilia',
        surename: 'Koch',
        email: 'emilia.koch@example.com',
        telefon: '7890123456',
    }
];

let colors = ['#0038FF', '#00BEE8', '#1FD7C1', '#6E52FF', '#9327FF', '#9747FF', '#FC71FF', '#FF4646', '#FF745E', '#FF7A00', '#FFA35E', '#FFBB2B', '#FFC701', '#FFE62B'];

let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

/**
 * main function to initialize the whole site
 */
async function initContact() {
    /* await reloadContacts(); */
    await loadAllContacts();
    sortContacts();
    initLetters();
    await showContacts();
    removeEmptyLetters();
}

/**
 * loads the contacts from the array
 */
async function loadAllContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
        console.log('Contacts:', contacts);
    } catch (e) {
        console.error('Loading error:', e);
    }
}

// let allContacts = [...contacts];
// allContacts = contacts;

// async function reloadContacts() {
//     try {
//         await setItem('contacts', JSON.stringify(contacts));
//         console.log('Contacts:', allContacts);
//     } catch (e) {
//         console.error('Loading error:', e);
//     }
// }

/**
 * sorts the contacts alphabeticly 
 */
function sortContacts() {
    contacts.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

/**
 * render the letters as headers for the contacts
 */
function initLetters() {
    let letterList = document.getElementById('container-letter');
    letterList.innerHTML = '';
    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        letterList.innerHTML += /*html*/ `<div id="container-${letter}" class="container-letter-item">
                <div class="letter-title"> ${letter} </div>
                <div class="letter-title-underline"> </div>
                <div id="container-contact-${letter}" class="container-contacts"></div>
            </div>
            `;
    }
}

/**
 * shows the contacts on the screen
 */
async function showContacts() {
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        if (!contact.bgcolor) {
            contact.bgcolor = getRandomColor();
        }
        let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
        let firstLetter = contact.name.charAt(0).toUpperCase();
        let contactsList = document.getElementById(`container-contact-${firstLetter}`);
        let color = contact.bgcolor;
        contactsList.innerHTML += showContactsHTML(i, color, initials, contact);
    }
}

/**
 * this function counts as a handle clicker to find out if its mobile or for the pc version by comparing the width
 * @param {*} index 
 */
function handleContactClick(index) {
    if (window.innerWidth <= 1200) {
        showContactDetailsMobile(index);
    } else {
        showContactDetails(index);
    }
}

/**
 * this function hides the unused letters of the alphabet that are used as headers
 */
function removeEmptyLetters() {
    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        let contactsList = document.getElementById(`container-contact-${letter}`);
        if (!contactsList.innerHTML.trim()) {
            let letterContainer = document.getElementById(`container-${letter}`);
            letterContainer.style.display = 'none';
        }
    }
}

/**
 * shows the contact details that show up if you press on the contacts
 * makes the contact clickable twice to hide the chosen contact
 * @param {integer} index 
 */
let isContainerVisible = false;
function showContactDetails(index) {
    let detailsContainer = document.getElementById('contact-details');
    let contact = contacts[index];
    // Entferne den ausgewählten Hintergrund von allen Kontakten
    let allContacts = document.querySelectorAll('.contact');
    allContacts.forEach(contactElement => {
        contactElement.classList.remove('contact-selected');
    });
    let selectedContactElement = document.querySelector(`[data-contact-index="${index}"]`);
    if (isContainerVisible && detailsContainer.getAttribute('data-current-index') == index) {
        // Verstecke den Container, wenn er bereits sichtbar ist und der gleiche Kontakt ausgewählt wurde
        detailsContainer.style.display = 'none';
        isContainerVisible = false;
    } else {
        // Zeige den Container an
        let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
        detailsContainer.innerHTML = showContactDetailsHTML(contact, initials, index);
        detailsContainer.style.display = 'inline-flex';
        detailsContainer.setAttribute('data-current-index', index);
        // Füge die Slide-In-Animation nur hinzu, wenn der Container zuvor nicht sichtbar war
        if (!isContainerVisible) {
            detailsContainer.classList.add('slide-in');
        }
        isContainerVisible = true;
        // Füge den ausgewählten Hintergrund nur dem neuen ausgewählten Kontakt hinzu
        selectedContactElement.classList.add('contact-selected');
    }
    // Entferne die Slide-In-Animation nach dem Abspielen, damit sie beim nächsten Mal wieder abgespielt werden kann
    detailsContainer.addEventListener('animationend', function () {
        detailsContainer.classList.remove('slide-in');
    });
}

function showContactDetailsMobile(index) {
    // Verstecken Sie die Kontaktliste und zeigen Sie die Kontaktinformationen an
    document.getElementById('addContactBtn').style.display = 'none';
    document.getElementById('contact-list-container').style.display = 'none';
    let detailsContainer = document.getElementById('contact-details-mobile');
    detailsContainer.style.display = 'block';
    document.querySelector('.container').style.display = 'none';

    // Fügen Sie die Kontaktinformationen in den Container ein
    let contact = contacts[index];
    let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
    detailsContainer.innerHTML = showContactDetailsMobileHTML(contact, initials, index);
}

function showEditContactsButtonsMobile() {
    let elements = document.getElementById('contact-mobile-buttons');
    let header = document.getElementById('contact-detailed-head');
    header.classList.add('hide-it');
    elements.classList.remove('hide-it');
    // Erstellen der unsichtbaren div
    let invisibleDiv = document.createElement('div');
    invisibleDiv.id = 'invisibleDiv';
    invisibleDiv.onclick = closeButtonsMobile;
    // Fügen Sie die unsichtbare div zum DOM hinzu
    document.body.appendChild(invisibleDiv);
}

function returnToContactsMobile() {
    document.querySelector('.contact-details-mobile-class').style.display = 'none'
    document.querySelector('.container').style.display = 'flex';
    document.querySelector('.add-person-button').style.display = 'flex';
}

/**
 * picks a color from the array colors and randomly gives the contact one
 * @returns color rgb
 */
function getRandomColor() {
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

/**
 * opens the screen to add new contacts
 */
function openModal() {
    let modalHTML = generateAddContactModalHTML();
    let modalContainer = document.getElementById("contactModal");
    modalContainer.innerHTML = modalHTML;
    let overlay = document.querySelector(".background-overlay");
    modalContainer.style.display = "flex";
    overlay.style.display = "flex";
    modalContainer.classList.remove('modal-slide-out');
    modalContainer.classList.add('modal-slide-in');
}

/**
 * closes the screen to add new contacts
 */
function closeModal() {
    let modal = document.getElementById("contactModal");
    let overlay = document.querySelector(".background-overlay");  // Verwenden Sie den bereits vorhandenen Overlay
    modal.classList.remove('modal-slide-in');
    modal.classList.add('modal-slide-out');
    overlay.style.display = "none";
    modal.style.display = "none";
}

/**
 * saves new contacts
 * @returns contacts as string in an array
 */
/**
 * saves new contacts
 * @returns contacts as string in an array
 */
async function saveNewContact() {
    let newEmailInput = document.getElementById("newEmail");
    let newTelefonInput = document.getElementById("newTelefon");
    let fullNameInput = document.getElementById("fullName");
    let nameParts = fullNameInput.value.trim().split(' ');
    let newName = nameParts[0]; // Der erste Teil ist der Vorname
    let newSurename = nameParts[1] || ''; // Der zweite Teil ist der Nachname, falls vorhanden
    let newEmail = newEmailInput.value;
    let newTelefon = newTelefonInput.value;
    if (!newName || !newSurename || !newEmail || !newTelefon) {
        alert("Bitte füllen Sie alle Felder aus.");
        return;
    }
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(newEmail)) {
        alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        return;
    }
    let phonePattern = /^[0-9]+$/;
    if (!phonePattern.test(newTelefon)) {
        alert("Bitte geben Sie nur Zahlen in das Telefonnummer-Feld ein.");
        return;
    }
    let maxContactId = Math.max(...contacts.map(contact => contact.id), -1);
    let nextContactId = maxContactId + 1;
    let newContact = {
        bgcolor: getRandomColor(),
        id: nextContactId,
        name: newName,
        surename: newSurename,
        email: newEmail,
        telefon: newTelefon
    };
    contacts.push(newContact);
    await setItem('contacts', JSON.stringify(contacts));
    let modal = document.getElementById("contactModal");
    modal.style.display = "none";
    initContact();
    fullName.value = "";
    newEmailInput.value = "";
    newTelefonInput.value = "";
    console.log('Maximale Kontakt-ID:', maxContactId);
    console.log('Nächste verfügbare Kontakt-ID:', nextContactId);
}

/**
 * function to delete the chosen contact
 * @param {string} index 
 */
async function deleteContact(index) {
    console.log("deleteContact wurde aufgerufen mit Index:", index);
    if (confirm("Möchten Sie diesen Kontakt wirklich löschen?")) {
        contacts.splice(index, 1);
        // IDs neu zuweisen
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

/**
 * function to edit the chosen contact
 * @param {string} index 
 */
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
    console.log('Edited Contact:', contact);
}

/**
 * keeps the contacts up to date
 * @param {string} index 
 * @returns the new contacts saved
 */
/**
 * keeps the contacts up to date
 * @param {string} index 
 * @returns the new contacts saved
 */
async function updateContact(index) {
    let newEmailInput = document.getElementById("editNewEmail");
    let newTelefonInput = document.getElementById("editNewTelefon");
    let fullNameInput = document.getElementById("editFullName");
    let nameParts = fullNameInput.value.trim().split(' ');
    let newName = nameParts[0];
    let newSurename = nameParts[1] || '';
    let newEmail = newEmailInput.value;
    let newTelefon = newTelefonInput.value;
    if (!newName || !newSurename || !newEmail || !newTelefon) {
        alert("Bitte füllen Sie alle Felder aus.");
        return;
    }

    // Überprüfen, ob die E-Mail-Adresse ein gültiges Format hat
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(newEmail)) {
        alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        return;
    }

    if (!/^[0-9]+$/.test(newTelefon)) {
        alert("Bitte geben Sie nur Zahlen in das Telefonnummer-Feld ein.");
        return;
    }
    let originalContact = contacts[index];
    let originalId = originalContact.id;
    let originalBgColor = originalContact.bgcolor;
    contacts[index] = {
        bgcolor: originalBgColor,
        id: originalId,
        name: newName,
        surename: newSurename,
        email: newEmail,
        telefon: newTelefon
    };
    await setItem('contacts', JSON.stringify(contacts));
    closeEditModal();
    initContact();
    showContactDetails(index);
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
    overlay.style.display = "block"; // Zeige den Overlay an
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
    overlay.style.display = "none"; // Verstecke den Overlay 
}

function closeButtonsMobile() {
    let element = document.getElementById('contact-mobile-buttons');
    let header = document.getElementById('contact-detailed-head');
    header.classList.remove('hide-it');
    element.classList.add('hide-it');

    // Entfernen der unsichtbaren div
    let invisibleDiv = document.getElementById('invisibleDiv');
    document.body.removeChild(invisibleDiv);
}

// Verstecke den Modal nach der Animation


// function toggleMenu(event) {
//     let menuItems = document.getElementById("logoutBtn");

//     event.stopPropagation();

//     if (menuItems.style.display === "" || menuItems.style.display === "none") {
//         menuItems.style.display = "flex";
//         menuItems.style.animationName = "slideInFromRight";
//     } else {
//         menuItems.style.animationName = "slideOutToRight";
//         setTimeout(() => {
//             menuItems.style.display = "none";
//         }, 100);
//     }
// }