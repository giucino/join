/**
 * Displays the details of a selected contact in mobile view.
 * @param {number} index - The index of the selected contact.
 */
function showContactDetailsMobile(index) {
    document.getElementById('addContactBtn').style.display = 'none';
    document.getElementById('contact-list-container').style.display = 'none';
    let detailsContainer = document.getElementById('contact-details-mobile');
    detailsContainer.style.display = 'block';
    document.querySelector('.container').style.display = 'none';
    let contact = contacts[index];
    let initials = `${contact.name.charAt(0)}${contact.surname.charAt(0)}`.toUpperCase();
    detailsContainer.innerHTML = showContactDetailsMobileHTML(contact, initials, index);
}


/**
 * Toggles the display of a menu.
 * @param {Event} event - The event triggered by the toggle action.
 */
function toggleMenus(event) {
    let menuItems = document.getElementById("contact-mobile-buttons");

    event.stopPropagation();

    if (menuItems.style.display === "" || menuItems.style.display === "none") {
        menuItems.style.display = "flex";
        menuItems.style.animationName = "slideFromRight";
    } else {
        menuItems.style.animationName = "slideOutRight";
        setTimeout(() => {
            menuItems.style.display = "none";
        }, 100);
    }
}


/**
 * Closes the menu when clicking outside of it or on certain navigation links.
 * @param {Event} event - The event triggered by the click action.
 */
function closeMenuOnClickAndOutside(event) {
    let menuItems = document.getElementById("contact-mobile-buttons");
    let clickedElement = event.target;

    if (menuItems && !menuItems.contains(clickedElement)) {
        menuItems.style.animationName = "slideOutRight";
        setTimeout(() => {
            menuItems.style.display = "none";
        }, 100);
    }
}
document.addEventListener("click", closeMenuOnClickAndOutside);


/**
 * Returns to the main contacts view in mobile mode.
 */
function returnToContactsMobile() {
    document.querySelector('.contact-details-mobile-class').style.display = 'none'
    document.querySelector('.container').style.display = 'flex';
    document.querySelector('.add-person-button').style.display = 'flex';
}