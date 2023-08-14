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

function initContact(){
    initLetters();
    initContacts();
    displayInitials();
}

function initLetters(){
    let letterList = document.getElementById('container-letter');
    letterList.innerHTML = '';

    for (let i = 0; i < letters.length; i++) {
        let letter = letters[i];
        
        letterList.innerHTML += `
        <div>
            <div> ${letter} </div>
        </div>
        `;
    }
}

function initContacts() {
    let contactsList = document.getElementById('container-contact');
    contactsList.innerHTML = ``;

    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();

        contactsList.innerHTML += `
          <div class="contact">
            <div id="initial-list" class="initial">${initials}</div>
            <div class="name">${contact.name} ${contact.surename}</div>
            <div class="email">${contact.email}</div>
            <div class="phone">${contact.telefon}</div>
          </div>
          `;
    }
}

function displayInitials() {
    let initialsList = document.getElementById('initials-list');
  
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
  
      initialsList.innerHTML += `
        <div class="initial">
            ${initials}
        </div>
      `;
    }
  }
  