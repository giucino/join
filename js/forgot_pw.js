// Funktion, die den Inhalt für die forgot.html Seite generiert
function generateForgotContent() {
    return /*html*/ `<img class="white-small-logo" src="img/join_logo_large.png" alt="Join Logo">
    <form onsubmit="showForgotRedirect()" id="resetPasswordForm" class="forgot-password-container">
        <div class="arrow-container">
            <a href="index.html" class="arrow-left-icon"></a>
        </div>
        <div class="forgot-info-container">
            <div class="forgot-info-title">I forgot my password</div>
            <div class="forgot-info-line"></div>
        </div>
        <div class="forgot-password-info">Don't worry! We will send you an email with the instructions to reset your
            password.</div>

        <div class="email-input-container">
            <div class="email-input-section">
                <div class="email-input-frame">
                    <input id="email" required type="email" class="email-input" placeholder="Email">
                    <img class="email-icon" src="img/mail.png" alt="Email">
                </div>
            </div>
        </div>

        <div class="send-email-container">
            <button class="send-email-btn" id="sendEmailButton">Send me the email</button>
        </div>
    </form>
    `;
}


// Funktion, zum einblenden des forgot-my-password-container
function handleForgotPasswordClick() {
    let indexContainer = document.querySelector('.index-container');
    indexContainer.style.display = 'none';
    document.body.style.background = '#4589FF';

    let forgotContent = document.getElementById('forgot-content');

    if (forgotContent) {
        forgotContent.innerHTML = generateForgotContent();
        forgotContent.style.display = 'flex';
        addBlurEvents();
    }
}

// Füge dem Link einen Eventlistener hinzu, der die Funktion handleForgotPasswordLinkClick aufruft
let forgotPasswordLink = document.querySelector('.forgot-password-link');
forgotPasswordLink.addEventListener('click', handleForgotPasswordClick);


function createForgotTemplate() {
    return /*html*/ `
        <div id="forgotOverlay" class="forgot-overlay">
            <div class="forgot-message">
                <img class="send-check" src="img/send_check.png" alt="">
                <p>An E-Mail has been sent to you</p>
            </div>
        </div>
    `;
}


function addBlurEvents() {
    let signUpInfoBoxes = document.querySelectorAll('.email-input-section');
    signUpInfoBoxes.forEach(box => {
        let input = box.querySelector('.email-input');

        input.addEventListener('focus', () => {
            box.style.borderColor = '#4589FF';
        });

        input.addEventListener('blur', () => {
            box.style.borderColor = '#D1D1D1';
        });
    });
}
document.addEventListener('DOMContentLoaded', addBlurEvents);


function showForgotRedirect() {
    // Erzeuge den Container für die Erfolgsmeldung
    document.body.innerHTML += createForgotTemplate();

    // Zeige die Erfolgsmeldung für eine bestimmte Zeit an (hier 800ms) und blende sie dann aus
    setTimeout(function () {
        let successOverlay = document.getElementById('forgotOverlay');
        document.body.removeChild(successOverlay);

        // Blende den aktuellen Inhalt aus und zeige den anderen Container an
        let forgotContainer = document.getElementById('forgot-content');
        forgotContainer.style.display = 'none';

        let resetContent = document.getElementById('reset-content');
        resetContent.innerHTML = generateResetContent();
        resetContent.style.display = 'flex';
    }, 800);
}


// Funktion, die den Inhalt für die reset.html Seite generiert
function generateResetContent() {
    return /*html*/ `<img class="white-small-logo" src="img/join_logo_large.png" alt="Join Logo">
    <form class="reset-password-container">
        <div class="arrow-container">
            <div class="arrow-left-icon"></div>
        </div>
        <div class="reset-info-container">
            <div class="reset-info-title">Reset your password</div>
            <div class="reset-info-line"></div>
        </div>
        <div class="change-password-info">Change your account password here</div>
        <div class="password-input-container">
            <div class="password-input-frame">
                <div class="password-input-section">
                    <div class="password-input-line">
                        <input id="resetPassword" required type="password" class="password-input" placeholder="New password" autocomplete="current-password" minlength="4">
                    </div>
                </div>
            </div>
            <div class="confirm-password-frame">
                <div class="password-input-section">
                    <div class="password-input-line">
                        <input id="confirmResetPassword" required type="password" class="confirm-password-input" placeholder="Confirm password" autocomplete="current-password" minlength="4">
                    </div>
                </div>
                <div class="password-match-error">Your Passwords don´t match. Try again</div>
            </div>
        </div>
        <div class="continue-btn-container">
            <button id="resetButton" class="continue-btn">Continue</button>
        </div>
    </form>
    `;
}


async function newPassword() {
    let passWord = getPasswordValue();
    let confirmPassword = getConfirmPasswordValue();

    resetFormStyle();

    if (passWord !== confirmPassword) {
        showMatchError();
        return;
    }

    showResetRedirect();
    resetForm();
}


function getPasswordValue() {
    let passwordInput = document.getElementById('resetPassword');
    return passwordInput.value;
}


function getConfirmPasswordValue() {
    let confirmPasswordInput = document.getElementById('confirmResetPassword');
    return confirmPasswordInput.value;
}


function resetFormStyle() {
    let signUpInfoBoxes = document.querySelectorAll('.password-input-frame');
    signUpInfoBoxes.forEach(box => {
        box.style.borderColor = '#D1D1D1';
    });
    passwordMatchError.style.display = 'none';
}


function showMatchError() {
    passwordMatchError.style.display = 'block';
    let signUpInfoBoxes = document.querySelectorAll('.password-input-frame');
    let lastSignUpInfoBox = signUpInfoBoxes[signUpInfoBoxes.length - 1];
    lastSignUpInfoBox.style.borderColor = '#FF8190';
}


function createResetTemplate() {
    return /*html*/ `
        <div id="resetOverlay" class="reset-overlay">
            <div class="reset-message">
                <p>You reset your password</p>
            </div>
        </div>
    `;
}


function showResetRedirect() {
    document.body.innerHTML += createResetTemplate();

    setTimeout(function () {
        let successOverlay = document.getElementById('resetOverlay');
        document.body.removeChild(successOverlay);

        window.location.href = 'index.html';
    }, 800);
}