let contacts = [
    {
        name: 'Anna',
        surename: 'Schmidt',
        email: 'anna.schmidt@example.com',
        telefon: '123-456-7890'
    },
    {
        name: 'Max',
        surename: 'Müller',
        email: 'max.mueller@example.com',
        telefon: '234-567-8901'
    },
    {
        name: 'Sophie',
        surename: 'Wagner',
        email: 'sophie.wagner@example.com',
        telefon: '345-678-9012'
    },
    {
        name: 'Paul',
        surename: 'Becker',
        email: 'paul.becker@example.com',
        telefon: '456-789-0123'
    },
    {
        name: 'Laura',
        surename: 'Hoffmann',
        email: 'laura.hoffmann@example.com',
        telefon: '567-890-1234'
    },
    {
        name: 'Felix',
        surename: 'Schulz',
        email: 'felix.schulz@example.com',
        telefon: '678-901-2345'
    },
    {
        name: 'Emilia',
        surename: 'Koch',
        email: 'emilia.koch@example.com',
        telefon: '789-012-3456'
    }
];

let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function initContact() {
    sortContacts();
    initLetters();
    loadContacts();
    removeEmptyLetters();
}

function initLetters() {
    let letterList = document.getElementById('container-letter');
    letterList.innerHTML = '';

    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];

        letterList.innerHTML += `
            <div id="container-${letter}" class="container-letter-item">
                <div class="letter-title"> ${letter} </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="400" height="2" viewBox="0 0 353 2" fill="none">
                <path d="M0.5 1H352.5" stroke="#D1D1D1" stroke-linecap="round"/>
                </svg>
                <div id="container-contact-${letter}" class="container-contacts"></div>
                
            </div>
            `;
    }
}

function loadContacts() {
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        
        // Setze die bgcolor Eigenschaft, falls sie noch nicht existiert
        if (!contact.bgcolor) {
            contact.bgcolor = getRandomColor();
        }

        let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
        let firstLetter = contact.name.charAt(0).toUpperCase();
        let contactsList = document.getElementById(`container-contact-${firstLetter}`);
        let color = contact.bgcolor;

        contactsList.innerHTML += `
          <div class="contact" onclick="showContactDetails(${i})">
            <div class="initial" style="background-color: ${color}">${initials}</div>
            <div class="container-name-email">
                <div class="name">${contact.name} ${contact.surename}</div>
                <div class="email">${contact.email}</div>
            </div>
          </div>
          `;
    }
}

function removeEmptyLetters() {
    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        let contactsList = document.getElementById(`container-contact-${letter}`);

        if (!contactsList.innerHTML.trim()) {
            let letterContainer = document.getElementById(`container-${letter}`);
            letterContainer.style.display = 'none';
        }
    }
}

function sortContacts() {
    contacts.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}
// Modal-Elemente holen
var modal = document.getElementById("myModal");
var btn = document.getElementById("addContactBtn");
var span = document.getElementsByClassName("close")[0];
var saveBtn = document.getElementById("saveContactBtn");

function showContactDetails(index) {
    const contact = contacts[index];
    const initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
    const detailsContainer = document.getElementById('contact-details');
    detailsContainer.innerHTML = `
    <div class="contact-detailed-container">
        <div class="contact-detailed-top">
            <div>
            <div class="initial-big" style="background-color: ${contact.bgcolor || getRandomColor()}">${initials}</div>
            </div>
            <div>
                <div class="contact-detailed-name">${contact.name} ${contact.surename}</div>
                <div class="contact-detailed-edit-delete">
                    <div class="contact-detailed-images"><img src="./img/edit.png">Edit</div>
                    <div class="contact-detailed-images"><img src="./img/delete.png">Delete</div>
                </div>
            </div>
        </div>
        <div>
            <div class="contact-detailed-information"> Contact Information </div>
            <div>Email: </div> <div> ${contact.email}</p>
            <div>Telefon: </div> <div> ${contact.telefon}</p>
        </div>
    </div>
    `;
    detailsContainer.style.display = 'block'; // den Container anzeigen
}

function openModal() {
    var modal = document.getElementById("contactModal");
    modal.style.display = "block";
}
// Modal schließen
function closeModal() {
    var modal = document.getElementById("contactModal");
    modal.style.display = "none";
}

// Modal schließen, wenn außerhalb geklickt wird
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Neuen Kontakt speichern
function saveNewContact() {
    let newNameInput = document.getElementById("newName");
    let newSurenameInput = document.getElementById("newSurename");
    let newEmailInput = document.getElementById("newEmail");
    let newTelefonInput = document.getElementById("newTelefon");

    let newName = newNameInput.value;
    let newSurename = newSurenameInput.value;
    let newEmail = newEmailInput.value;
    let newTelefon = newTelefonInput.value;

    // Überprüfen, ob die Felder nicht leer sind
    if (!newName || !newSurename || !newEmail || !newTelefon) {
        alert("Bitte füllen Sie alle Felder aus.");
        return;
    }

    // Überprüfen, ob die E-Mail-Adresse ein gültiges Format hat
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(newEmail)) {
        alert("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
        return;
    }

    // Optional: Überprüfen Sie, ob die Telefonnummer ein gültiges Format hat
    // Zum Beispiel: 123-456-7890
    let phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    if (!phonePattern.test(newTelefon)) {
        alert("Bitte geben Sie eine gültige Telefonnummer im Format 123-456-7890 ein.");
        return;
    }

    let newContact = {
        name: newName,
        surename: newSurename,
        email: newEmail,
        telefon: newTelefon
    };

    contacts.push(newContact);
    var modal = document.getElementById("contactModal");
    modal.style.display = "none";
    initContact(); // Kontaktliste aktualisieren

    // Eingabefelder leeren
    newNameInput.value = "";
    newSurenameInput.value = "";
    newEmailInput.value = "";
    newTelefonInput.value = "";
}

//Hintergrundfarben für die Initialien generieren
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}