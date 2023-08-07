let users = [];
let passwordMatchError = document.getElementById('passwordMatchError');



async function initRegister() {
    await loadUsers();
}


async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


document.getElementById('signUpForm').addEventListener('submit', function (event) {
    event.preventDefault();
    signUpUser();
});


async function signUpUser() {
    let passWord = getPasswordInputValue();
    let confirmPassword = getConfirmPasswordInputValue();

    resetSignUpFormStyle();

    if (passWord !== confirmPassword) {
        showPasswordMatchError();
        return;
    }
    if (!isChecked) {
        // Wenn privacyCheck nicht aktiviert ist (Bild ist check-button.png), beende die Funktion
        return;
    }
    users.push({
        name: username.value,
        email: email.value,
        password: passWord.value,
    });
    await setItem('users', JSON.stringify(users));
    showSuccessMessageAndRedirect();
    resetForm();
}


function getPasswordInputValue() {
    let passwordInput = document.getElementById('password');
    return passwordInput.value;
}


function getConfirmPasswordInputValue() {
    let confirmPasswordInput = document.getElementById('confirmPassword');
    return confirmPasswordInput.value;
}


function resetSignUpFormStyle() {
    let signUpInfoBoxes = document.querySelectorAll('.sign-up-info-box');
    signUpInfoBoxes.forEach(box => {
        box.style.borderColor = '#D1D1D1';
    });
    passwordMatchError.style.display = 'none';
}


function showPasswordMatchError() {
    passwordMatchError.style.display = 'block';
    let signUpInfoBoxes = document.querySelectorAll('.sign-up-info-box');
    let lastSignUpInfoBox = signUpInfoBoxes[signUpInfoBoxes.length - 1];
    lastSignUpInfoBox.style.borderColor = '#FF8190';
}


function onChangeConfirmPassword() {
    passwordMatchError.style.display = 'none';
}
let confirmPassword = document.getElementById('confirmPassword');
confirmPassword.addEventListener('input', onChangeConfirmPassword);


function resetForm() {
    username.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
}


function addFocusBlurEvents() {
    let signUpInfoBoxes = document.querySelectorAll('.sign-up-info-box');
    signUpInfoBoxes.forEach(box => {
        let input = box.querySelector('.sign-up-text-input');

        input.addEventListener('focus', () => {
            box.style.borderColor = '#4589FF';
        });

        input.addEventListener('blur', () => {
            box.style.borderColor = '#D1D1D1';
        });
    });
}
document.addEventListener('DOMContentLoaded', addFocusBlurEvents);


let privacyCheck = document.getElementById('privacyCheck');
privacyCheck.addEventListener('click', togglePrivacyCheck);

let isChecked = false; // Variable, um den Zustand des Check-Bildes zu verfolgen

function togglePrivacyCheck() {
    isChecked = !isChecked;
    updateRegisterButtonState();

    if (isChecked) {
        // Ändere das Bild zu 'checked.png', wenn es zuvor auf 'check-button.png' geklickt wurde
        privacyCheck.src = 'img/checked.png';
        // Ändere den Hover-Effekt, wenn das Bild auf 'checked.png' gewechselt wird
        privacyCheck.removeEventListener('mouseenter', applyHoverCheckedBackground);
        privacyCheck.removeEventListener('mouseleave', removeHoverCheckedBackground);
        privacyCheck.addEventListener('mouseenter', applyHoverCheckedBackground);
        privacyCheck.addEventListener('mouseleave', removeHoverCheckedBackground);
    } else {
        // Ändere das Bild zu 'check-button.png', wenn es zuvor auf 'checked.png' geklickt wurde
        privacyCheck.src = 'img/check-button.png';
        // Ändere den Hover-Effekt, wenn das Bild auf 'check-button.png' gewechselt wird
        privacyCheck.removeEventListener('mouseenter', applyHoverCheckedBackground);
        privacyCheck.removeEventListener('mouseleave', removeHoverCheckedBackground);
        privacyCheck.addEventListener('mouseenter', applyHoverButtonBackground);
        privacyCheck.addEventListener('mouseleave', removeHoverButtonBackground);
    }
}


// Anpassung des Hover-Effekts auf 'hover_checked.png', wenn das Bild 'checked.png' ist
function applyHoverCheckedBackground() {
    privacyCheck.style.backgroundImage = 'url(../img/hover_checked.png)';
}


// Anpassung des Hover-Effekts auf 'check-button-hover.png', wenn das Bild 'checked.png' ist
function applyHoverButtonBackground() {
    privacyCheck.style.backgroundImage = 'url(../img/check-button-hover.png)';
}


// Entfernen des angepassten Hover-Effekts, wenn das Bild 'checked.png' ist
function removeHoverCheckedBackground() {
    privacyCheck.style.backgroundImage = 'none';
}


// Entfernen des angepassten Hover-Effekts, wenn das Bild 'check-button.png' ist
function removeHoverButtonBackground() {
    privacyCheck.style.backgroundImage = 'none';
}


function updateRegisterButtonState() {
    if (isChecked) {
        // Wenn der privacyCheck aktiviert ist, wird der registerBtn aktiviert
        registerBtn.disabled = false;
        privacyCheck.removeEventListener('mouseenter', applyHoverCheckedBackground);
        privacyCheck.removeEventListener('mouseleave', removeHoverCheckedBackground);
    } else {
        // Wenn der privacyCheck nicht aktiviert ist, wird der registerBtn deaktiviert
        registerBtn.disabled = true;
        privacyCheck.addEventListener('mouseenter', applyHoverCheckedBackground);
        privacyCheck.addEventListener('mouseleave', removeHoverCheckedBackground);
    }
}


let passwordInput = document.getElementById('password');
let passwordIcon = document.getElementById('passwordIcon');

let confirmPasswordInput = document.getElementById('confirmPassword');
let confirmPasswordIcon = document.getElementById('confirmPasswordIcon');


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


// Event Listener für die Eingabe in das Bestätigungs-Passwort-Feld
confirmPasswordInput.addEventListener('input', function () {
    if (confirmPasswordInput.value.length > 0) {
        confirmPasswordIcon.src = confirmPasswordInput.type === 'password' ? 'img/visibility_off.png' : 'img/visibility.png';
    } else {
        confirmPasswordIcon.src = 'img/lock.png';
    }
});


// Event Listener für das Klicken auf das Bestätigungs-Passwort-Sichtbarkeits-Icon
confirmPasswordIcon.addEventListener('click', function () {
    if (confirmPasswordInput.type === 'password') {
        confirmPasswordInput.type = 'text';
        confirmPasswordIcon.src = 'img/visibility.png';
    } else {
        confirmPasswordInput.type = 'password';
        confirmPasswordIcon.src = 'img/visibility_off.png';
    }
});


function createSuccessMessageTemplate() {
    return /*html*/ `
        <div id="successOverlay" class="overlay">
            <div class="success-message">
                <p>You Signed Up successfully</p>
            </div>
        </div>
    `;
}


function showSuccessMessageAndRedirect() {
    document.body.innerHTML += createSuccessMessageTemplate();

    setTimeout(function () {
        let successOverlay = document.getElementById('successOverlay');
        document.body.removeChild(successOverlay);

        window.location.href = 'index.html';
    }, 800);
}
