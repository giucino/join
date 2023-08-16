let isChecked = false; // Variable, um den Zustand des Check-Bildes zu verfolgen


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
    let username = document.getElementById('username').value;
    let initials = extractInitials(username);

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
        username: username,
        email: email.value,
        password: password.value,
        initials: initials
    });
    await setItem('users', JSON.stringify(users));
    showSuccessMessageAndRedirect();
    resetForm();
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