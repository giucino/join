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


function createResetTemplate() {
    return /*html*/ `
        <div id="resetOverlay" class="overlay">
            <div class="message">
                <p>You reset your password</p>
            </div>
        </div>
    `;
}