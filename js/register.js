let isChecked = false;


/**
 * Initializes the registration process by loading user data.
 */
async function initRegister() {
    // await loadUsers();
    await loadAllContacts();
}


// /**
//  * Loads users from storage
//  * @returns {Promise<void>} - A promise that resolves once the user data is loaded.
//  */
// async function loadUsers() {
//     try {
//         users = JSON.parse(await getItem('users'));
//         console.log('Users:', users);
//     } catch (e) {
//         console.error('Loading error:', e);
//     }
// }


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


/**
 * Handles the user sign-up process. Validates the provided inputs, registers the user if inputs are valid,
 * and displays relevant error messages if needed.
 * @returns {Promise<void>} - A Promise that resolves once the user registration process is completed.
 */
async function signUpUser() {
    let username = document.getElementById('username').value;
    // let initials = extractInitials(username);
    let passWord = getPasswordInputValue();
    let confirmPassword = getConfirmPasswordInputValue();

    resetSignUpFormStyle();

    if (passWord !== confirmPassword) {
        showPasswordMatchError();
        shakePasswordInput();
        return;
    }

    let emailValue = email.value;
    if (isEmailAlreadyRegistered(emailValue)) {
        showEmailAlreadyRegisteredError();
        return;
    }

    if (!isChecked) {
        return;
    }
    // users.push({
    //     username: username,
    //     email: emailValue,
    //     password: password.value,
    //     initials: initials
    // });

    let maxContactId = Math.max(...contacts.map(contact => contact.id), -1);
    let nextContactId = maxContactId + 1;
    let nameParts = username.trim().split(' ');
    let newName = nameParts[0];
    let newSurename = nameParts[1] || '';

    let newContact = {
        bgcolor: getRandomColor(),
        id: nextContactId,
        name: newName,
        surename: newSurename,
        email: emailValue,
        telefon: '',
        password: password.value,
        // initials: initials    
    };
    contacts.push(newContact);

    // await setItem('users', JSON.stringify(users));
    await setItem('contacts', JSON.stringify(contacts));
    showSuccessMessageAndRedirect();
    resetForm();
}


/**
 * Checks if the provided email is already registered.
 * @param {string} email - The email to check.
 * @returns {boolean} - Returns true if the email is already registered, false otherwise.
 */
function isEmailAlreadyRegistered(email) {
    // return users.find(user => user.email === email);
    return contacts.find(contact => contact.email === email);
}


// /**
//  * This function extracts initials from a username.
//  * @param {string} username - The username from which initials are extracted.
//  * @returns {string} - The extracted initials in uppercase letters.
//  */
// function extractInitials(username) {
//     let nameParts = username.trim().split(' ');
//     let initials = '';

//     for (let i = 0; i < nameParts.length; i++) {
//         let part = nameParts[i];
//         if (part) {
//             initials += part.charAt(0).toUpperCase();
//         }
//     }
//     return initials;
// }


// async function signUpUser() {
//     let username = document.getElementById('username').value;
//     let initials = extractInitials(username);
//     let passWord = getPasswordInputValue();
//     let confirmPassword = getConfirmPasswordInputValue();

//     resetSignUpFormStyle();

//     if (passWord !== confirmPassword) {
//         showPasswordMatchError();
//         shakePasswordInput();
//         return;
//     }

//     let emailValue = email.value;
//     if (isEmailAlreadyRegistered(emailValue) || !isChecked) {
//         if (isEmailAlreadyRegistered(emailValue)) {
//             showEmailAlreadyRegisteredError();
//         }
//         return;
//     }
//     const user = createUserObject(username, emailValue, passWord, initials);
//     await saveUserToBackend(user);

//     showSuccessMessageAndRedirect();
//     resetForm();
// }


// function createUserObject(username, email, password, initials) {
//     return {
//         username: username,
//         email: email,
//         password: password,
//         initials: initials
//     };
// }

// async function saveUserToBackend(user) {
//     users.push(user);
//     await setItem('users', JSON.stringify(users));
// }