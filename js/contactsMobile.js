
function showContactDetailsMobile(index) {
    document.getElementById('addContactBtn').style.display = 'none';
    document.getElementById('contact-list-container').style.display = 'none';
    let detailsContainer = document.getElementById('contact-details-mobile');
    detailsContainer.style.display = 'block';
    document.querySelector('.container').style.display = 'none';

    let contact = contacts[index];
    let initials = `${contact.name.charAt(0)}${contact.surename.charAt(0)}`.toUpperCase();
    detailsContainer.innerHTML = showContactDetailsMobileHTML(contact, initials, index);
}


function showEditContactsButtonsMobile() {
    let elements = document.getElementById('contact-mobile-buttons');
    let header = document.getElementById('contact-detailed-head');
    header.classList.add('hide-it');
    elements.classList.remove('hide-it');
    let invisibleDiv = document.createElement('div');
    invisibleDiv.id = 'invisibleDiv';
    invisibleDiv.onclick = closeButtonsMobile;
    document.body.appendChild(invisibleDiv);
}


function returnToContactsMobile() {
    document.querySelector('.contact-details-mobile-class').style.display = 'none'
    document.querySelector('.container').style.display = 'flex';
    document.querySelector('.add-person-button').style.display = 'flex';
}


function closeButtonsMobile() {
    let element = document.getElementById('contact-mobile-buttons');
    let header = document.getElementById('contact-detailed-head');
    header.classList.remove('hide-it');
    element.classList.add('hide-it');

    let invisibleDiv = document.getElementById('invisibleDiv');
    document.body.removeChild(invisibleDiv);
}