let isChecked = false;


/**
 * Initializes the registration process by loading user data.
 */
async function initRegister() {
    await loadUsers();
}


/**
 * Loads users from storage
 * @returns {Promise<void>} - A promise that resolves once the user data is loaded.
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
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
 * Registers a new user storing the user's information in the "users" array.
 * @returns {Promise<void>} - A Promise that resolves once the user registration process is completed.
 */
async function signUpUser() {
    let username = document.getElementById('username').value;
    let initials = extractInitials(username);

    let passWord = getPasswordInputValue();
    let confirmPassword = getConfirmPasswordInputValue();

    resetSignUpFormStyle();

    if (passWord !== confirmPassword) {
        showPasswordMatchError();
        return;
    }
    if (!isChecked) {
        return;
    }
    users.push({
        username: username,
        email: email.value,
        password: password.value,
        initials: initials
    });
    await setItem('users', JSON.stringify(users));
    showSuccessMessageAndRedirect();
    resetForm();
}


/**
 * This function extracts initials from a username.
 * @param {string} username - The username from which initials are extracted.
 * @returns {string} - The extracted initials in uppercase letters.
 */
function extractInitials(username) {
    let nameParts = username.trim().split(' ');
    let initials = '';

    for (let i = 0; i < nameParts.length; i++) {
        let part = nameParts[i];
        if (part) {
            initials += part.charAt(0).toUpperCase();
        }
    }
    return initials;
}