let users = [];
let formSubmitted = false;
let passwordMatchError = document.getElementById('passwordMatchError');


async function initLogIn() {
    await loadUsers();
    handleLogIn();
    addLoginButtonListener();
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


// Setzt Eingabefelder zurück
function resetForm() {
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');

    emailInput.value = '';
    passwordInput.value = '';
}


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


// Funktion zum Behandeln des Anmeldevorgangs
// function handleLogIn() {
//     let emailInput = document.getElementById('email');
//     let passwordInput = document.getElementById('password');

//     let email = emailInput.value;
//     let password = passwordInput.value;

//     if (!email || !password) {
//         return;
//     }

//     let isLoggedIn = logIn(email, password);

//     let signUpInfoBoxes = document.querySelectorAll('.log-in-info-box');
//     signUpInfoBoxes.forEach(box => {
//         box.style.borderColor = '#D1D1D1';
//     });
//     passwordMatchError.style.display = 'none';

//     if (isLoggedIn) {
//         window.location.href = 'summary.html';
//         resetForm();
//     } else {
//         passwordMatchError.style.display = 'block';
//         let lastSignUpInfoBox = signUpInfoBoxes[signUpInfoBoxes.length - 1];
//         lastSignUpInfoBox.style.borderColor = '#FF8190';
//     }
// }

// // Füge einen Event Listener für den Login-Button hinzu
// let loginButton = document.getElementById('loginBtn');
// loginButton.addEventListener('click', handleLogIn);


function handleLogIn() {
    let email = getEmailInputValue();
    let password = getPasswordInputValue();

    if (!email || !password) {
        return;
    }
    let isLoggedIn = logIn(email, password);

    resetFormStyle();

    if (isLoggedIn) {
        window.location.href = 'summary.html';
        resetForm();
    } else {
        showPasswordMatchError();
    }
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
    let passwordInput = document.getElementById('password');
    return passwordInput.value;
}


function resetFormStyle() {
    let signUpInfoBoxes = document.querySelectorAll('.log-in-info-box');
    signUpInfoBoxes.forEach(box => {
        box.style.borderColor = '#D1D1D1';
    });
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


function onChangeConfirmPassword() {
    passwordMatchError.style.display = 'none';
}
let confirmPassword = document.getElementById('password');
confirmPassword.addEventListener('input', onChangeConfirmPassword);


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


let passwordInput = document.getElementById('password');
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


let rememberCheck = document.getElementById('rememberCheck');
rememberCheck.addEventListener('click', togglerememberCheck);

let isChecked = false; // Variable, um den Zustand des Check-Bildes zu verfolgen

function togglerememberCheck() {
    isChecked = !isChecked;

    if (isChecked) {
        // Ändere das Bild zu 'checked.png', wenn es zuvor auf 'check-button.png' geklickt wurde
        rememberCheck.src = 'img/checked.png';
        // Ändere den Hover-Effekt, wenn das Bild auf 'checked.png' gewechselt wird
        rememberCheck.removeEventListener('mouseenter', applyHoverCheckedBackground);
        rememberCheck.removeEventListener('mouseleave', removeHoverCheckedBackground);
        rememberCheck.addEventListener('mouseenter', applyHoverCheckedBackground);
        rememberCheck.addEventListener('mouseleave', removeHoverCheckedBackground);
    } else {
        // Ändere das Bild zu 'check-button.png', wenn es zuvor auf 'checked.png' geklickt wurde
        rememberCheck.src = 'img/check-button.png';
        // Ändere den Hover-Effekt, wenn das Bild auf 'check-button.png' gewechselt wird
        rememberCheck.removeEventListener('mouseenter', applyHoverCheckedBackground);
        rememberCheck.removeEventListener('mouseleave', removeHoverCheckedBackground);
        rememberCheck.addEventListener('mouseenter', applyHoverButtonBackground);
        rememberCheck.addEventListener('mouseleave', removeHoverButtonBackground);
    }
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