let users = [];
let formSubmitted = false;
let rememberLogIn = false;


/**
 * Initializes the login process by loading user data.
 */
async function initLogIn() {
    await loadUsers();
}


/**
 * Loads users from storage
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * Listens for the form submission event and handles login process.
 */
document.getElementById('logInForm').addEventListener('submit', function (event) {
    event.preventDefault();
    formSubmitted = true;
    handleLogIn()
}
);


/**
 * Attempts to log in the user with the email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {boolean} - Returns true if the login is successful, false otherwise.
 */
function logIn(email, password) {
    let isLoggedIn = false;
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.email === email && user.password === password) {
            isLoggedIn = true;
            break;
        }
    }
    if (!isLoggedIn && formSubmitted) {
        shakePasswordInput();
    }
    formSubmitted = false;
    return isLoggedIn;
}


/**
 * Handles the user login process.
 * @returns {void}
 */
function handleLogIn() {
    let email = getEmailInputValue();
    let password = getPasswordInputValue();

    if (!email || !password) {
        return;
    }

    let isLoggedIn = logIn(email, password);

    if (isLoggedIn) {
        let loggedInUser = users.find(user => user.email === email && user.password === password);

        if (loggedInUser) {
            let initials = extractInitials(loggedInUser.username);

            let userData = {
                email: loggedInUser.email,
                username: loggedInUser.username,
                password: loggedInUser.password,
                initials: initials,
                rememberStatus: rememberLogIn
            };
            saveLoggedInUserData(userData);
            window.location.href = 'summary.html';
        }
    } else {
        resetFormStyle();
        showPasswordMatchError();
    }
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


/**
 * Saves the logged-in user data to the browser's local storage.
 * @param {Object} userData - The user data to be saved.
 */
function saveLoggedInUserData(userData) {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
}


/**
 * Adds a click event listener to the login button.
 */
function addLoginButtonListener() {
    let loginButton = document.getElementById('loginBtn');
    loginButton.addEventListener('click', handleLogIn);
}