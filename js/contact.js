let colors = ['#0038FF', '#00BEE8', '#1FD7C1', '#6E52FF', '#9327FF', '#9747FF', '#FC71FF', '#FF4646', '#FF745E', '#FF7A00', '#FFA35E', '#FFBB2B', '#FFC701', '#FFE62B'];

let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


/**
 * main function to initialize the whole site
 */
async function initContact() {
    // await reloadContacts();
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
    } catch (e) {
        console.error('Loading error:', e);
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


/**
 * render the letters as headers for the contacts
 */
function initLetters() {
    let letterList = document.getElementById('container-letter');
    if (!letterList) {
        console.error("Element 'container-letter' not found.");
        return;
    }
    letterList.innerHTML = '';
    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        letterList.innerHTML += generateLetterListHTML(letter);
    }
}


/**
 * this function loads the logged in user from backend
 * @returns logged in user
 */
function getLoggedInUserData() {
    return JSON.parse(localStorage.getItem('loggedInUser')) || {};
}


/**
 * this function shows the contacts rendered
 */
async function showContacts() {
    let loggedInUserData = getLoggedInUserData();
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        if (!contact.bgcolor) {
            contact.bgcolor = getRandomColor();
        }
        let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
        let firstLetter = contact.name.charAt(0).toUpperCase();
        let contactsList = document.getElementById(`container-contact-${firstLetter}`);
        let color = contact.bgcolor;
        let isCurrentUser = loggedInUserData && contact.email === loggedInUserData.email;
        contactsList.innerHTML += showContactsHTML(i, color, initials, contact, isCurrentUser);
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
    let allContacts = document.querySelectorAll('.contact');
    allContacts.forEach(contactElement => {
        contactElement.classList.remove('contact-selected');
    });
    let selectedContactElement = document.querySelector(`[data-contact-index="${index}"]`);
    if (isContainerVisible && detailsContainer.getAttribute('data-current-index') == index) {
        detailsContainer.style.display = 'none';
        isContainerVisible = false;
    } else {
        let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
        detailsContainer.innerHTML = showContactDetailsHTML(contact, initials, index);
        detailsContainer.style.display = 'inline-flex';
        detailsContainer.setAttribute('data-current-index', index);
        if (!isContainerVisible) {
            detailsContainer.classList.add('slide-in');
        }
        isContainerVisible = true;
        selectedContactElement.classList.add('contact-selected');
    }
    detailsContainer.addEventListener('animationend', function () {
        detailsContainer.classList.remove('slide-in');
    });
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
    let overlay = document.querySelector(".background-overlay");
    modal.classList.remove('modal-slide-in');
    modal.classList.add('modal-slide-out');
    overlay.style.display = "none";
}


/**
 * this funktion saves new contacts in the contacts array
 * @returns contact
 */
async function saveNewContact() {
    let newEmailInput = document.getElementById("newEmail");
    let newTelefonInput = document.getElementById("newTelefon");
    let fullNameInput = document.getElementById("fullName");
    let nameValidationResult = validateNameParts(fullNameInput);
    let newName = nameValidationResult.newName;
    let newSurename = nameValidationResult.newSurename;
    let newEmail = newEmailInput.value;
    let newTelefon = newTelefonInput.value;
    let isValidContactFields = validateContactFields(newName, newSurename, newEmail, newTelefon);
    if (!isValidContactFields) {
        return;
    }
    let newContact = createNewContactObject(newName, newSurename, newEmail, newTelefon);
    saveContact(newContact);
    clearFormFields(fullNameInput, newEmailInput, newTelefonInput);
    showContactAdded();
}


/**
 * this funtion validates the written name for new contacts
 * @param {*} fullNameInput 
 * @returns 
 */
function validateNameParts(fullNameInput) {
    let nameParts = extractNameParts(fullNameInput.value);
    let newName = nameParts.newName;
    let newSurename = nameParts.newSurename || '';
    return { newName, newSurename };
}


function extractNameParts(fullName) {
    let nameParts = fullName.trim().split(' ');
    return { newName: nameParts[0], newSurename: nameParts[1] };
}


function validateContactFields(newName, newSurename, newEmail, newTelefon) {
    if (!areAllFieldsFilled(newName, newSurename, newEmail, newTelefon)) {
        alert("Bitte füllen Sie alle Felder aus.");
        return false;
    }
    if (!isValidEmail(newEmail)) {
        alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        return false;
    }
    if (!isValidPhoneNumber(newTelefon)) {
        alert("Bitte geben Sie nur Zahlen in das Telefonnummer-Feld ein.");
        return false;
    }
    return true;
}


function areAllFieldsFilled(newName, newSurename, newEmail, newTelefon) {
    return newName && newSurename && newEmail && newTelefon;
}


function isValidEmail(email) {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
}


function isValidPhoneNumber(phone) {
    let phonePattern = /^[0-9]+$/;
    return phonePattern.test(phone);
}


function clearFormFields(fullNameInput, newEmailInput, newTelefonInput) {
    fullNameInput.value = "";
    newEmailInput.value = "";
    newTelefonInput.value = "";
}


function createNewContactObject(newName, newSurename, newEmail, newTelefon) {
    let maxContactId = Math.max(...contacts.map(contact => contact.id), -1);
    let nextContactId = maxContactId + 1;
    return {
        bgcolor: getRandomColor(),
        id: nextContactId,
        name: newName,
        surename: newSurename,
        email: newEmail,
        telefon: newTelefon
    };
}


async function saveContact(newContact) {
    contacts.push(newContact);
    await setItem('contacts', JSON.stringify(contacts));
    closeModal();
    initContact();
}


async function updateContact(index) {
    let newEmailInput = document.getElementById("editNewEmail");
    let newTelefonInput = document.getElementById("editNewTelefon");
    let fullNameInput = document.getElementById("editFullName");
    let nameValidationResult = validateNameParts(fullNameInput);
    let newName = nameValidationResult.newName;
    let newSurename = nameValidationResult.newSurename;
    let newEmail = newEmailInput.value;
    let newTelefon = newTelefonInput.value;
    let isValidContactFields = validateContactFields(newName, newSurename, newEmail, newTelefon);
    if (!isValidContactFields) {
        return;
    }
    let originalContact = contacts[index];
    let updatedContact = createUpdatedContactObject(originalContact, newName, newSurename, newEmail, newTelefon);

    updateAndSaveContact(index, updatedContact);
}


function createUpdatedContactObject(originalContact, newName, newSurename, newEmail, newTelefon) {
    return {
        bgcolor: originalContact.bgcolor,
        id: originalContact.id,
        name: newName,
        surename: newSurename,
        email: newEmail,
        telefon: newTelefon,
        password: originalContact.password
    };
}


async function updateAndSaveContact(index, updatedContact) {
    contacts[index] = updatedContact;
    await setItem('contacts', JSON.stringify(contacts));
    closeEditModal();
    initContact();
    showContactDetails(index);
}