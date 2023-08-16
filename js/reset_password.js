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


/*============================Reset=============================*/
function showForgotRedirect() {
    showResetContent('forgot-content', 'reset-content');
    createAndShowSuccessOverlay();
}


function createAndShowSuccessOverlay() {
    document.body.innerHTML += createForgotTemplate();
    setTimeout(removeSuccessOverlay, 1600);
}


function removeSuccessOverlay() {
    let successOverlay = document.getElementById('forgotOverlay');
    document.body.removeChild(successOverlay);
}


function showResetContent(hideId, showId) {
    let forgotContainer = document.getElementById(hideId);
    let resetContent = document.getElementById(showId);

    forgotContainer.style.display = 'none';
    resetContent.innerHTML = generateResetContent();
    resetContent.style.display = 'flex';
    addBlurrEvents();
}


function addBlurrEvents() {
    let signUpInfoBoxes = document.querySelectorAll('.password-input-section');
    signUpInfoBoxes.forEach(box => {
        let input = box.querySelector('.password-input');

        input.addEventListener('focus', () => {
            box.style.borderColor = '#4589FF';
        });

        input.addEventListener('blur', () => {
            box.style.borderColor = '#D1D1D1';
        });
    });
}
document.addEventListener('DOMContentLoaded', addBlurrEvents);


function showResetRedirect() {
    document.body.innerHTML += createResetTemplate();

    setTimeout(function () {
        let successOverlay = document.getElementById('resetOverlay');
        document.body.removeChild(successOverlay);

        window.location.href = 'index.html';
    }, 1600);
}