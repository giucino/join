let users = [];
let formSubmitted = false;
let rememberLogIn = false;
let passwordMatchError = document.getElementById('passwordMatchError');


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


function getEmailInputValue() {
    let emailInput = document.getElementById('email');
    return emailInput.value;
}


function getPasswordInputValue() {
    let passwordInput = document.getElementById('passwordLogin');
    return passwordInput.value;
}


function resetFormStyle() {
    let signUpInfoBoxes = document.querySelectorAll('.log-in-info-box');
    for (let i = 0; i < signUpInfoBoxes.length; i++) {
        signUpInfoBoxes[i].style.borderColor = '#D1D1D1';
    }
    passwordMatchError.style.display = 'none';
}


function showPasswordMatchError() {
    passwordMatchError.style.display = 'block';
    let signUpInfoBoxes = document.querySelectorAll('.log-in-info-box');
    let lastSignUpInfoBox = signUpInfoBoxes[signUpInfoBoxes.length - 1];
    lastSignUpInfoBox.style.borderColor = '#FF8190';
}


function shakePasswordInput() {
    const passwordInput = document.getElementById('log-in-input-frame');
    passwordInput.classList.add('shake-password');

    setTimeout(() => {
        passwordInput.classList.remove('shake-password');
    }, 500);
}


function errorTextLogIn() {
    passwordMatchError.style.display = 'none';
}
let password = document.getElementById('passwordLogin');
password.addEventListener('input', errorTextLogIn);


function addFocusBlurEvents() {
    let signUpInfoBoxes = document.querySelectorAll('.log-in-info-box');
    signUpInfoBoxes.forEach(box => {
        let input = box.querySelector('.log-in-text-input');

        input.addEventListener('focus', () => {
            box.style.borderColor = '#4589FF';
        });

        input.addEventListener('blur', () => {
            box.style.borderColor = '#D1D1D1';
        });
    });
}
document.addEventListener('DOMContentLoaded', addFocusBlurEvents);


let passwordInput = document.getElementById('passwordLogin');
let passwordIcon = document.getElementById('passwordIcon');

// Event Listener für die Eingabe in das Passwort-Feld
passwordInput.addEventListener('input', function () {
    if (passwordInput.value.length > 0) {
        passwordIcon.src = passwordInput.type === 'password' ? 'img/visibility_off.png' : 'img/visibility.png';
    } else {
        passwordIcon.src = 'img/lock.png';
    }
});


// Event Listener für das Klicken auf das Passwort-Sichtbarkeits-Icon
passwordIcon.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.src = 'img/visibility.png';
    } else {
        passwordInput.type = 'password';
        passwordIcon.src = 'img/visibility_off.png';
    }
});


function togglerememberCheck() {
    rememberLogIn = !rememberLogIn;
    if (rememberLogIn) {
        setCheckedState();
    } else {
        setUncheckedState();
    }
}

const rememberCheck = document.getElementById('rememberCheck');
rememberCheck.addEventListener('click', togglerememberCheck);


// Ändere den Hover-Effekt, wenn das Bild auf 'checked.png' gewechselt wird
function setCheckedState() {
    rememberCheck.src = 'img/checked.png';
    rememberCheck.removeEventListener('mouseenter', applyHoverCheckedBackground);
    rememberCheck.removeEventListener('mouseleave', removeHoverCheckedBackground);
    rememberCheck.addEventListener('mouseenter', applyHoverCheckedBackground);
    rememberCheck.addEventListener('mouseleave', removeHoverCheckedBackground);
}


// Ändere den Hover-Effekt, wenn das Bild auf 'check-button.png' gewechselt wird
function setUncheckedState() {
    rememberCheck.src = 'img/check-button.png';
    rememberCheck.removeEventListener('mouseenter', applyHoverCheckedBackground);
    rememberCheck.removeEventListener('mouseleave', removeHoverCheckedBackground);
    rememberCheck.addEventListener('mouseenter', applyHoverButtonBackground);
    rememberCheck.addEventListener('mouseleave', removeHoverButtonBackground);
}


// Anpassung des Hover-Effekts auf 'hover_checked.png', wenn das Bild 'checked.png' ist
function applyHoverCheckedBackground() {
    rememberCheck.style.backgroundImage = 'url(../img/hover_checked.png)';
}


// Anpassung des Hover-Effekts auf 'check-button-hover.png', wenn das Bild 'checked.png' ist
function applyHoverButtonBackground() {
    rememberCheck.style.backgroundImage = 'url(../img/check-button-hover.png)';
}


// Entfernen des angepassten Hover-Effekts, wenn das Bild 'checked.png' ist
function removeHoverCheckedBackground() {
    rememberCheck.style.backgroundImage = 'none';
}


// Entfernen des angepassten Hover-Effekts, wenn das Bild 'check-button.png' ist
function removeHoverButtonBackground() {
    rememberCheck.style.backgroundImage = 'none';
}


const emailInput = document.getElementById('email');
const passwordInputCheck = document.getElementById('passwordLogin');
const loginButton = document.getElementById('loginBtn');

// Event Listener für den Login-Button
loginButton.addEventListener('click', function () {
    let userEmail = emailInput.value;
    let userPassword = passwordInputCheck.value;
    let rememberStatus = rememberLogIn;

    if (rememberStatus) {
        let userData = {
            email: userEmail,
            password: userPassword,
            rememberStatus: rememberStatus
        };
        saveLoggedInUserData(userData);    }
});


// Funktion zum Füllen der Eingabefelder, wenn Remember-Status beim Laden der Seite true ist
function fillInFromLocalStorage() {
    let localStorageData = localStorage.getItem('loggedInUser');
    if (localStorageData) {
        let userData = JSON.parse(localStorageData);
        if (userData.rememberStatus) {
            emailInput.value = userData.email;
            passwordInputCheck.value = userData.password;
            togglerememberCheck();
        }
    }
}

window.addEventListener('load', fillInFromLocalStorage);