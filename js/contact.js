let contacts = [
    {
        bgcolor: '#C888B0',
        id: 0,
        name: 'Anna',
        surename: 'Schmidt',
        email: 'anna.schmidt@example.com',
        telefon: '1234567890'
    },
    {
        bgcolor: '#133465',
        id: 1,
        name: 'Max',
        surename: 'Müller',
        email: 'max.mueller@example.com',
        telefon: '234567890'
    },
    {
        bgcolor: '#F68997',
        id: 2,
        name: 'Sophie',
        surename: 'Wagner',
        email: 'sophie.wagner@example.com',
        telefon: '3456789012'
    },
    {
        bgcolor: '#8595D2',
        id: 3,
        name: 'Paul',
        surename: 'Becker',
        email: 'paul.becker@example.com',
        telefon: '456789012'
    },
    {
        bgcolor: '#037E49',
        id: 4,
        name: 'Laura',
        surename: 'Hoffmann',
        email: 'laura.hoffmann@example.com',
        telefon: '567890123'
    },
    {
        bgcolor: '#51C3C9',
        id: 5,
        name: 'Felix',
        surename: 'Schulz',
        email: 'felix.schulz@example.com',
        telefon: '6789012345'
    },
    {
        bgcolor: '#0206C3',
        id: 6,
        name: 'Emilia',
        surename: 'Koch',
        email: 'emilia.koch@example.com',
        telefon: '7890123456',
    }
];


let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


async function initContact() {
    await loadAllContacts();
    // await reloadContacts();
    sortContacts();
    initLetters();
    showContacts();
    removeEmptyLetters();
}


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
//         allContacts = JSON.parse(await getItem('contacts'));
//         console.log('Contacts:', allContacts);
//     } catch (e) {
//         console.error('Loading error:', e);
//     }
// }


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


function initLetters() {
    let letterList = document.getElementById('container-letter');
    letterList.innerHTML = '';

    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];

        letterList.innerHTML += /*html*/ `<div id="container-${letter}" class="container-letter-item">
                <div class="letter-title"> ${letter} </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="400" height="2" viewBox="0 0 353 2" fill="none">
                <path d="M0.5 1H352.5" stroke="#D1D1D1" stroke-linecap="round"/>
                </svg>
                <div id="container-contact-${letter}" class="container-contacts"></div>
            </div>
            `;
    }
}


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

        contactsList.innerHTML += `
        <div class="contact" data-contact-index="${i}" onclick="showContactDetails(${i})">
            <div class="initial" style="background-color: ${color}">${initials}</div>
            <div class="container-name-email">
                <div class="name">${contact.name} ${contact.surename}</div>
                <div class="email">${contact.email}</div>
            </div>
        </div>`;
    }
}


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


function showContactDetails(index) {
    let contact = contacts[index];
    let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
    let detailsContainer = document.getElementById('contact-details');
    detailsContainer.innerHTML = /*html*/`
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
    detailsContainer.style.display = 'inline-flex';

    let allContacts = document.querySelectorAll('.contact');
    allContacts.forEach(contactElement => {
        contactElement.classList.remove('contact-selected');
    });
    let selectedContactElement = document.querySelector(`[data-contact-index="${index}"]`);
    selectedContactElement.classList.add('contact-selected');
}


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function openModal() {
    let modal = document.getElementById("contactModal");
    modal.style.display = "block";
}


function closeModal() {
    let modal = document.getElementById("contactModal");
    modal.style.display = "none";
}


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



async function deleteContact(index) {
    console.log("deleteContact wurde aufgerufen mit Index:", index);
    if (confirm("Möchten Sie diesen Kontakt wirklich löschen?")) {
        contacts.splice(index, 1);
        await setItem('contacts', JSON.stringify(contacts));
        let detailsContainer = document.getElementById('contact-details');
        detailsContainer.innerHTML = '';
        closeEditModal();
        initContact();
    }
}


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


function generateEditContactModal(index) {
    let contact = contacts[index];
    let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
    let editContainer = document.getElementById('editModal');

    editContainer.innerHTML = /*html*/`
        <div class="edit-content" data-index="${index}">
            <div class="edit-content-top">
                <div onclick="closeEditModal()"><img class="close" src="./img/close_contact.png" alt="Close Modal"></div>
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
                            <div class="button-clear-pic"> <img src="./img/cancel-icon.svg"></div>
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


function openEditModal() {
    let modal = document.getElementById("editModal");
    modal.style.display = "block";
}


function closeEditModal() {
    let modal = document.getElementById("editModal");
    modal.style.display = "none";
}