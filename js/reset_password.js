/**
 * Handles the click event when the "Forgot Password" link is clicked.
 * Hides the index container, applies background color, and shows the forgot password content.
 */
function handleForgotPasswordClick() {
    hideIndexContainer();
    applyBackgroundColor();
    showForgotContent();
}


/**
 * Adds a click event listener to the "Forgot Password" link.
 */
let forgotPasswordLink = document.querySelector('.forgot-password-link');
forgotPasswordLink.addEventListener('click', handleForgotPasswordClick);


/**
 * Hides the index container element.
 */
function hideIndexContainer() {
    let indexContainer = document.querySelector('.index-container');
    indexContainer.style.display = 'none';
}


/**
 * Applies a background color to the body element.
 */
function applyBackgroundColor() {
    document.body.style.background = '#4589FF';
}


/**
 * Displays the forgot password content, generating and inserting the necessary HTML.
 */
function showForgotContent() {
    let forgotContent = document.getElementById('forgot-content');
    if (forgotContent) {
        forgotContent.innerHTML = generateForgotContent();
        forgotContent.style.display = 'flex';
        addBlurEvents();
    }
}


/**
 * Adds blur event listeners to email input sections.
 * Changes the border color of the input section when focused and blurred.
 */
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


/**
 * Displays the reset content, creates and shows the success overlay.
 */
function showForgotRedirect() {
    showResetContent('forgot-content', 'reset-content');
    createAndShowSuccessOverlay();
}


/**
 * Creates and displays the success overlay for the forgot password process.
 * The overlay is removed after a delay.
 */
function createAndShowSuccessOverlay() {
    document.body.innerHTML += createForgotTemplate();
    setTimeout(removeSuccessOverlay, 1600);
}


/**
 * Removes the success overlay from the document body.
 */
function removeSuccessOverlay() {
    let successOverlay = document.getElementById('forgotOverlay');
    document.body.removeChild(successOverlay);
}


/**
 * Displays the reset content, hiding the specified element and showing the reset content.
 * @param {string} hideId - The id of the element to hide.
 * @param {string} showId - The id of the element to show.
 */
function showResetContent(hideId, showId) {
    let forgotContainer = document.getElementById(hideId);
    let resetContent = document.getElementById(showId);

    forgotContainer.style.display = 'none';
    resetContent.innerHTML = generateResetContent();
    resetContent.style.display = 'flex';
    addBlurrEvents();
}


/**
 * Adds blur event listeners to email input sections.
 * Changes the border color of the input section when focused and blurred.
 */
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


/**
 * Displays the reset redirect, showing a success overlay and redirecting to the index page after a delay.
 */
function showResetRedirect() {
    document.body.innerHTML += createResetTemplate();

    setTimeout(function () {
        let successOverlay = document.getElementById('resetOverlay');
        document.body.removeChild(successOverlay);

        window.location.href = 'index.html';
    }, 1600);
}