let contacts = [];

let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let colors = ['#000000', '#1FD7C1', '#462F8A', '#6E52FF', '#9327FF', '#FC71FF', '#FF4646', '#FF4646', '#FF7A00', '#FFBB2B'];
/**
 * main function to initialize the whole site
 */
async function initContact() {
    sortContacts();
    initLetters();
    await loadAllContacts();
    loadContacts();
    await saveContacts(contacts);
    removeEmptyLetters();
}

/**
 * save the array contacts in the background
 * @param {string} contacts 
 */
async function saveContacts(contacts) {
    try {
        await setItem('contacts', JSON.stringify(contacts));
        console.log('Kontakte wurden erfolgreich gespeichert.');
    } catch (error) {
        console.error('Fehler beim Speichern der Kontakte:', error);
    }
}

/**
 * render the letters as headers for the contacts
 */

function initLetters() {
    let letterList = document.getElementById('container-letter');
    letterList.innerHTML = '';
    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        letterList.innerHTML += `
            <div id="container-${letter}" class="container-letter-item">
                <div class="letter-title"> ${letter} </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="400" height="2" viewBox="0 0 353 2" fill="none">
                <path d="M0.5 1H352.5" stroke="#D1D1D1" stroke-linecap="round"/>
                </svg>
                <div id="container-contact-${letter}" class="container-contacts"></div>
            </div>
            `;
    }
}

/**
 * load the contacts from the array
 */
async function loadContacts() {
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        // add the bgcolor attribute to the contacts if not existent
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

/**
 * save the contacts in the array
 */
async function loadAllContacts() {
    try {
        contacts = JSON.parse(await getItem('contacts'));
        console.log('Contacts:', contacts);
    } catch (e) {
        console.error('Loading error:', e);
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

var modal = document.getElementById("myModal");
var btn = document.getElementById("addContactBtn");
var span = document.getElementsByClassName("close")[0];
var saveBtn = document.getElementById("saveContactBtn");

/**
 * shows the contact details that show up if you press on the contacts
 * @param {integer} index 
 */
function showContactDetails(index) {
    let contact = contacts[index];
    let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
    let detailsContainer = document.getElementById('contact-details');
    detailsContainer.innerHTML = `
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
        </div>`;
    detailsContainer.style.display = 'inline-flex'; 
    // highlight the chosen container
    let allContacts = document.querySelectorAll('.contact');
    allContacts.forEach(contactElement => {
        contactElement.classList.remove('contact-selected');
    });
    let selectedContactElement = document.querySelector(`[data-contact-index="${index}"]`);
    selectedContactElement.classList.add('contact-selected');
}

/**
 * opens the screen to add new contacts
 */
function openModal() {
    var modal = document.getElementById("contactModal");
    modal.style.display = "block";
}
/**
 * closes the screen to add new contacts
 */
function closeModal() {
    var modal = document.getElementById("contactModal");
    modal.style.display = "none";
}

// Finde die höchste ID im vorhandenen Kontakte-Array


// Setze die Anfangs-ID für neue Kontakte auf die nächste verfügbare ID


/**
 * saves new contacts
 * @returns contacts as string in an array
 */
async function saveNewContact() {
    let newEmailInput = document.getElementById("newEmail");
    let newTelefonInput = document.getElementById("newTelefon");
    let maxContactId = contacts.length;
    console.log("Max Contact ID:", maxContactId);  // Debugging
    let nextContactId = maxContactId + 1;
    console.log("Next Contact ID:", nextContactId);  // Debugging
    let fullNameInput = document.getElementById("fullName");
    let nameParts = fullNameInput.value.trim().split(' ');
    let newName = nameParts[0]; // Der erste Teil ist der Vorname
    let newSurename = nameParts[1] || ''; // Der zweite Teil ist der Nachname, falls vorhanden
    let newEmail = newEmailInput.value;
    let newTelefon = newTelefonInput.value;
    // checks if the fields are not empty
    if (!newName || !newSurename || !newEmail || !newTelefon) {
        alert("Bitte füllen Sie alle Felder aus.");
        return;
    }
    // checks if the email is valid
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(newEmail)) {
        alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        return;
    }
    // Optional: checks if the phone Number is valid
    // Example: 123-456-7890
    let phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    if (!phonePattern.test(newTelefon)) {
        alert("Bitte geben Sie eine gültige Telefonnummer im Format 123-456-7890 ein.");
        return;
    }
    console.log("Saving new contact with ID:", nextContactId); 
    let newContact = {
        id: nextContactId,
        name: newName,
        surename: newSurename,
        email: newEmail,
        telefon: newTelefon
    };

    contacts.push(newContact);
    await setItem('contacts', JSON.stringify(contacts));
    var modal = document.getElementById("contactModal");
    modal.style.display = "none";
    initContact(); // Kontaktliste aktualisieren

    // Eingabefelder leeren
    fullName.value = "";
    newEmailInput.value = "";
    newTelefonInput.value = "";
    nextContactId++;
    console.log("Incrementing nextContactId");  // Debugging
    
}

/**
 * picks a color from the array colors and randomly gives the contact one
 * @returns 
 */
function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

/**
 * function to delete the chosen contact
 * @param {string} index 
 */
async function deleteContact(index) {
    if (confirm("Möchten Sie diesen Kontakt wirklich löschen?")) {
        contacts.splice(index, 1);
        await setItem('contacts', JSON.stringify(contacts));
        initContact(); // Aktualisieren Sie die Kontaktliste nach dem Löschen
    }
}

/**
 * function to edit the chosen contact
 * @param {string} index 
 */
function editContact(index) {
    document.getElementById('contact-details').style.display = 'none';  
    let contact = contacts[index];
    document.getElementById("fullName").value = `${contact.name} ${contact.surename}`;
    document.getElementById("newEmail").value = contact.email;
    document.getElementById("newTelefon").value = contact.telefon;
    openModal();
    saveContactBtn.onclick = function () {
        updateContact(index);
    }
}

/**
 * keeps the contacts up to date
 * @param {string} index 
 * @returns the new contacts saved
 */
async function updateContact(index) {
    let newEmailInput = document.getElementById("newEmail");
    let newTelefonInput = document.getElementById("newTelefon");
    let fullNameInput = document.getElementById("fullName");
    let nameParts = fullNameInput.value.trim().split(' ');
    let newName = nameParts[0];
    let newSurename = nameParts[1] || '';
    let newEmail = newEmailInput.value;
    let newTelefon = newTelefonInput.value;
    // Überprüfen, ob die Felder nicht leer sind
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
    // Optional: Überprüfen Sie, ob die Telefonnummer ein gültiges Format hat
    // Zum Beispiel: 123-456-7890
    let phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    if (!phonePattern.test(newTelefon)) {
        alert("Bitte geben Sie eine gültige Telefonnummer im Format 123-456-7890 ein.");
        return;
    }
    contacts[index] = {
        id: nextContactId,
        name: newName,
        surename: newSurename,
        email: newEmail,
        telefon: newTelefon
    };

    await setItem('contacts', JSON.stringify(contacts));
    closeModal();
    initContact(); // Aktualisieren Sie die Kontaktliste nach dem Speichern
}
