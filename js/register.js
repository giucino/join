let isChecked = false;


/**
 * Initializes the registration process by loading user data.
 */
async function initRegister() {
    await loadAllContacts();
}


/**
 * 
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
 * Listens for the form submission event and handles registration process.
 */
document.getElementById('signUpForm').addEventListener('submit', function (event) {
    event.preventDefault();
    signUpUser();
});


async function signUpUser() {
    const username = document.getElementById('username').value;
    const passWord = getPasswordInputValue();
    const confirmPassword = getConfirmPasswordInputValue();
    const emailValue = email.value;

    resetSignUpFormStyle();

    if (!validatePasswordMatch(passWord, confirmPassword)) {
        return;
    }

    if (isEmailAlreadyRegistered(emailValue)) {
        showEmailAlreadyRegisteredError();
        return;
    }

    if (!isChecked) {
        return;
    }

    if (!isValidUsername(username)) {
        alert("Ungültiges Namensformat.");
        return;
    }

    let newContact = createNewContact(username, emailValue, passWord);
    saveContact(newContact);
}


function validatePasswordMatch(password, confirmPassword) {
    if (password !== confirmPassword) {
        showPasswordMatchError();
        shakePasswordInput();
        return false;
    }
    return true;
}


/**
 * Checks if the provided email is already registered.
 * @param {string} email - The email to check.
 * @returns {boolean} - Returns true if the email is already registered, false otherwise.
 */
function isEmailAlreadyRegistered(email) {
    return contacts.find(contact => contact.email === email);
}


function isValidUsername(username) {
    return /^[a-zA-Z][^0-9!@#$%^&*(),.?":{}|<>']*$/.test(username);
}


function createNewContact(username, email, password) {
    let maxContactId = Math.max(...contacts.map(contact => contact.id), -1);
    let nextContactId = maxContactId + 1;
    const { newName, newSurename } = extractNameParts(username);

    return {
        bgcolor: getRandomColor(),
        id: nextContactId,
        name: newName,
        surename: newSurename,
        email,
        telefon: '',
        password,
    };
}


function extractNameParts(username) {
    const nameParts = username.trim().split(' ');
    const newName = nameParts[0];
    const newSurename = nameParts[1] || '';
    return { newName, newSurename };
}


/**
 * Saves a contact to the contacts array and updates local storage.
 * @param {Object} newContact - The contact object to save.
 * @returns {Promise<void>}
 */
async function saveContact(newContact) {
    contacts.push(newContact);
    await setItem('contacts', JSON.stringify(contacts));
    showSuccessMessageAndRedirect();
    resetForm();
}


// /**
//  * Handles the user sign-up process. Validates the provided inputs, registers the user if inputs are valid,
//  * and displays relevant error messages if needed.
//  * @returns {Promise<void>} - A Promise that resolves once the user registration process is completed.
//  */
// async function signUpUser() {
//     let username = document.getElementById('username').value;
//     let passWord = getPasswordInputValue();
//     let confirmPassword = getConfirmPasswordInputValue();

//     resetSignUpFormStyle();

//     if (passWord !== confirmPassword) {
//         showPasswordMatchError();
//         shakePasswordInput();
//         return;
//     }

//     let emailValue = email.value;
//     if (isEmailAlreadyRegistered(emailValue)) {
//         showEmailAlreadyRegisteredError();
//         return;
//     }

//     if (!isChecked) {
//         return;
//     }

//     let maxContactId = Math.max(...contacts.map(contact => contact.id), -1);
//     let nextContactId = maxContactId + 1;
//     let nameParts = username.trim().split(' ');
//     let newName = nameParts[0];
//     let newSurename = nameParts[1] || '';

//     let newContact = {
//         bgcolor: getRandomColor(),
//         id: nextContactId,
//         name: newName,
//         surename: newSurename,
//         email: emailValue,
//         telefon: '',
//         password: password.value,
//     };
//     contacts.push(newContact);

//     await setItem('contacts', JSON.stringify(contacts));
//     showSuccessMessageAndRedirect();
//     resetForm();
// }