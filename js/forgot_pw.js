// Funktion, die den Inhalt für die forgot.html Seite generiert
function generateForgotContent() {
    return /*html*/ `<img class="white-small-logo" src="img/join_logo_large.png" alt="Join Logo">
    <form onsubmit="showForgotRedirect()" id="resetPasswordForm" class="forgot-password-container">
        <section class="arrow-container">
            <a href="index.html" class="arrow-left-icon"></a>
        </section>
        <section class="forgot-info-container">
            <div class="forgot-info-title">I forgot my password</div>
            <div class="forgot-info-line"></div>
        </section>
        <section class="forgot-password-info">Don't worry! We will send you an email with the instructions to reset your
            password.
        </section>

        <section class="email-input-container">
            <div class="email-input-section">
                <div class="email-input-frame">
                    <input id="email" required type="email" class="email-input" placeholder="Email">
                    <img class="email-icon" src="img/mail.png" alt="Email">
                </div>
            </div>
        </section>

        <section class="send-email-container">
            <button class="send-email-btn" id="sendEmailButton">Send me the email</button>
        </section>
    </form>
    `;
}


// Funktion, zum einblenden des forgot-my-password-container
function handleForgotPasswordClick() {
    hideIndexContainer();
    applyBackgroundColor();
    showForgotContent();
}
// Füge dem Link einen Eventlistener hinzu, der die Funktion handleForgotPasswordLinkClick aufruft
let forgotPasswordLink = document.querySelector('.forgot-password-link');
forgotPasswordLink.addEventListener('click', handleForgotPasswordClick);


function hideIndexContainer() {
    let indexContainer = document.querySelector('.index-container');
    indexContainer.style.display = 'none';
}


function applyBackgroundColor() {
    document.body.style.background = '#4589FF';
}


function showForgotContent() {
    let forgotContent = document.getElementById('forgot-content');
    if (forgotContent) {
        forgotContent.innerHTML = generateForgotContent();
        forgotContent.style.display = 'flex';
        addBlurEvents();
    }
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


function createForgotTemplate() {
    return /*html*/ `
        <div id="forgotOverlay" class="overlay">
            <div class="message">
                <img class="send-check" src="img/send_check.png" alt="">
                <p>An E-Mail has been sent to you</p>
            </div>
        </div>
    `;
}


/*============================Reset=============================*/
// Funktion, die den Inhalt für die reset.html Seite generiert
function generateResetContent() {
    return /*html*/ `<img class="white-small-logo" src="img/join_logo_large.png" alt="Join Logo">
    <form onsubmit="showResetRedirect()" class="reset-password-container">
        <section class="arrow-container">
        <a href="index.html" class="arrow-left-icon"></a>
        </section>
        <section class="reset-info-container">
            <div class="reset-info-title">Reset your password</div>
            <div class="reset-info-line"></div>
        </section>
        <section class="change-password-info">Change your account password here</section>
        <section class="password-input-container">
            <div class="password-input-frame">
                <div class="password-input-section">
                    <div class="password-input-line">
                        <input id="resetPassword" required type="text" class="password-input" placeholder="New password" autocomplete="current-password" minlength="4">
                    </div>
                </div>
            </div>
            <div class="confirm-password-frame">
                <div class="password-input-section">
                    <div class="password-input-line">
                        <input id="confirmResetPassword" required type="text" class="password-input" placeholder="Confirm password" autocomplete="current-password" minlength="4">
                    </div>
                </div>
                <div class="password-match-error">Your Passwords don´t match. Try again</div>
            </div>
        </section>
        <section class="continue-btn-container">
            <button id="resetButton" class="continue-btn">Continue</button>
        </section>
    </form>
    `;
}


function showForgotRedirect() {
    createAndShowSuccessOverlay();
    hideAndShowContainers('forgot-content', 'reset-content');
}


function createAndShowSuccessOverlay() {
    document.body.innerHTML += createForgotTemplate();
    setTimeout(removeSuccessOverlay, 1600);
}


function removeSuccessOverlay() {
    let successOverlay = document.getElementById('forgotOverlay');
    document.body.removeChild(successOverlay);
}


function hideAndShowContainers(hideId, showId) {
    let forgotContainer = document.getElementById(hideId);
    let resetContent = document.getElementById(showId);

    forgotContainer.style.display = 'none';
    resetContent.innerHTML = generateResetContent();
    resetContent.style.display = 'flex';
}


// function addBlurrEvents() {
//     let signUpInfoBoxes = document.querySelectorAll('.password-input-section');
//     signUpInfoBoxes.forEach(box => {
//         let input = box.querySelector('.password-input');

//         input.addEventListener('focus', () => {
//             box.style.borderColor = '#4589FF';
//         });

//         input.addEventListener('blur', () => {
//             box.style.borderColor = '#D1D1D1';
//         });
//     });
// }
// document.addEventListener('DOMContentLoaded', addBlurrEvents);


function createResetTemplate() {
    return /*html*/ `
        <div id="resetOverlay" class="overlay">
            <div class="message">
                <p>You reset your password</p>
            </div>
        </div>
    `;
}


function showResetRedirect() {
    document.body.innerHTML += createResetTemplate();
    // let resetContent = document.getElementById('reset-content');
    // resetContent.style.display = 'none';

    setTimeout(function () {
        
        let successOverlay = document.getElementById('resetOverlay');
        document.body.removeChild(successOverlay);

        window.location.href = 'index.html';
    }, 1600);
}