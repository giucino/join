let resetMatchError = document.getElementById('resetMatchError');


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
function showForgotRedirect(event) {
    createAndShowSuccessOverlay();
    showResetContent('forgot-content', 'reset-content');
    addBlurrEvents();
    event.preventDefault();
}


/**
 * Creates and displays the success overlay for the forgot password process.
 * The overlay is removed after a delay.
 */
function createAndShowSuccessOverlay() {
    document.body.innerHTML += createForgotTemplate();
    setTimeout(removeSuccessOverlay, 1200);
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

    if (resetContent) {
        forgotContainer.style.display = 'none';
        resetContent.innerHTML = generateResetContent();
        resetContent.style.display = 'flex';
    }
}


/**
 * Adds blur event listeners to password input section.
 * Changes the border color of the input section when focused and blurred.
 */
function addBlurrEvents() {
    let signUpInfoBoxe = document.querySelectorAll('.password-input-section');
    signUpInfoBoxe.forEach(box => {
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
    resetButton.disabled = true;
    document.body.innerHTML += createResetTemplate();
    let reset = document.getElementById('reset-content');
        reset.style.display = 'none';

    setTimeout(function () {
        let successOverlay = document.getElementById('resetOverlay');
        document.body.removeChild(successOverlay);


        window.location.href = 'index.html';
    }, 1600);
    // event.preventDefault();
}


/**
 * Event listener function that handles form submission for password reset.
 * Prevents the default form submission, validates the password reset
 * and triggers the appropriate actions based on the form submission.
 *
 * @param {Event} event - The event object triggered by the form submission.
 */
function handlePasswordResetSubmission(event) {
    if (event.target.id === 'resetPasswordReset') {
        event.preventDefault();
        signUpReset();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const resetFormWrapper = document.getElementById('reset-content');
        resetFormWrapper.addEventListener('submit', handlePasswordResetSubmission);
});


/**
 * Resets the password reset form style, checks if passwords match,
 * and triggers appropriate actions based on the outcome.
 * @returns {void}
 */
function signUpReset() {
    let passWord = getPasswordResetValue();
    let confirmPassword = getConfirmPasswordResetValue();

    resetResetStyle();

    if (passWord !== confirmPassword) {
        showResetMatchError();    
        shakeResetPasswordInput();        
        return;
    }
    showResetRedirect();
    resetForm();
}


/**
 * Enables the submit button of a form that was previously disabled.
 */
function resetForm() {
    resetButton.disabled = false;
}


/**
 * Retrieves the value of the password input field.
 * @returns {string} The value of the password input field.
 */
function getPasswordResetValue() {
    let passwordInput = document.getElementById('resetPassword');
    return passwordInput.value;
}


/**
 * Retrieves the value of the confirm password input field.
 * @returns {string} The value of the confirm password input field.
 */
function getConfirmPasswordResetValue() {
    let confirmPasswordInput = document.getElementById('confirmResetPassword');
    return confirmPasswordInput.value;
}


/**
 * Resets the style of the form inputs and hides the password match error message.
 */
function resetResetStyle() {
    let signUpInfoBoxes = document.querySelectorAll('.password-input-section');
    for (let i = 0; i < signUpInfoBoxes.length; i++) {
        if (signUpInfoBoxes[i]) {
            signUpInfoBoxes[i].style.borderColor = '#D1D1D1';
        }
    }
}


/**
 * Displays the password match error message and highlights the last password input section.
 */
function showResetMatchError() {
    // let resetMatchError = document.getElementById('resetMatchError');
    // if (resetMatchError) {
    //     resetMatchError.style.display = 'block';
    // }

    let resetInfoBoxes = document.querySelectorAll('.password-input-section');
    if (resetInfoBoxes.length > 0) {
        let lastresetInfoBox = resetInfoBoxes[resetInfoBoxes.length - 1];
        lastresetInfoBox.style.borderColor = '#FF8190';
    }
}


/**
 * Applies a shake animation to the password input frame element.
 */
function shakeResetPasswordInput() {
    let passwordInput = document.getElementById('password-input-line');
    passwordInput.classList.add('shake-reset-password');

    setTimeout(() => {
        passwordInput.classList.remove('shake-reset-password');
    }, 500);
}


/**
 * Hides the password match error text.
 */
function errorTextReset() {
    console.log("errorTextReset function called");
    let resetMatchError = document.getElementById('resetMatchError');
    if (resetMatchError) {
        resetMatchError.style.display = 'none';
    }
}


/**
 * Adds an input event listener to the confirm password field.
 * The listener triggers the errorTextReset function when user input is detected.
 */
document.addEventListener('DOMContentLoaded', function () {
    let confirmPassword = document.getElementById('confirmResetPassword');
    if (confirmPassword) {
        confirmPassword.addEventListener('input', errorTextReset);
    }
});