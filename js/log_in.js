let users = [];
let formSubmitted = false;
let rememberLogIn = false;


async function initLogIn() {
    await loadUsers();
}


async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


// Überprüft Anmeldeinformationen und leitet weiter
document.getElementById('logInForm').addEventListener('submit', function (event) {
    event.preventDefault();
    formSubmitted = true;
    handleLogIn()
}
);


// Funktion zum Überprüfen der Anmeldeinformationen
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


function saveLoggedInUserData(userData) {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
}


function addLoginButtonListener() {
    let loginButton = document.getElementById('loginBtn');
    loginButton.addEventListener('click', handleLogIn);
}