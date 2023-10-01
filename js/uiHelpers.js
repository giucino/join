/**
 * Marks the active link in the navigation based on the current URL.
 */
function markDesktopLink() {
    let currentURL = window.location.href;
    let links = document.querySelectorAll('.links');

    links.forEach(link => {
        if (currentURL.includes(link.href)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
document.addEventListener('DOMContentLoaded', markDesktopLink);


/**
 * Adjusts the mobile navigation links images based on the current screen width.
 */
function markMobileLink() {
    let screenWidth = window.innerWidth;
    let links = document.querySelectorAll('.links');

    if (screenWidth < 1024) {
        for (let i = 0; i < links.length; i++) {
            let link = links[i];
            let image = link.querySelector('img');
            let isActive = link.classList.contains('active');

            if (isActive) {
                if (link.id === 'summary-link') {
                    image.src = 'img/summary_mobile.png';
                } else if (link.id === 'add_task-link') {
                    image.src = 'img/edit_square_mobile.png';
                } else if (link.id === 'board-link') {
                    image.src = 'img/board_sidebar_mobile.png';
                } else if (link.id === 'contact-link') {
                    image.src = 'img/contacts_mobile.png';
                }
            } else {
                if (link.id === 'summary-link') {
                    image.src = 'img/summary.png';
                } else if (link.id === 'add_task-link') {
                    image.src = 'img/edit_square.png';
                } else if (link.id === 'board-link') {
                    image.src = 'img/board_sidebar.png';
                } else if (link.id === 'contact-link') {
                    image.src = 'img/contacts.png';
                }
            }
        }
    }
}

window.addEventListener('resize', markMobileLink);


/**
 * Toggles the display of a menu.
 * @param {Event} event - The event triggered by the toggle action.
 */
function toggleMenu(event) {
    let menuItems = document.getElementById("logoutBtn");

    event.stopPropagation();

    if (menuItems.style.display === "" || menuItems.style.display === "none") {
        menuItems.style.display = "flex";
        menuItems.style.animationName = "slideInFromRight";
    } else {
        menuItems.style.animationName = "slideOutToRight";
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
    let menuItems = document.getElementById("logoutBtn");
    let clickedElement = event.target;

    if (!menuItems.contains(clickedElement) || clickedElement.classList.contains("nav-link")) {
        menuItems.style.animationName = "slideOutToRight";
        setTimeout(() => {
            menuItems.style.display = "none";
        }, 100);
    }
}

document.addEventListener("click", closeMenuOnClickAndOutside);


/**
 * Logs the user out by clearing stored data and redirecting to the login page.
 */
function logOut() {
    let loggedInUserJSON = localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
        let loggedInUser = JSON.parse(loggedInUserJSON);
        if (!loggedInUser.rememberStatus) {
            localStorage.clear();
        }
    }
    window.location.replace('index.html');
}


/**
 * Retrieves the user's initials from local storage.
 * @returns {string} - User's initials or 'G' if not available.
 */
function getInitials() {
    let userData = JSON.parse(localStorage.getItem('loggedInUser'));

    if (userData && userData.initials) {
        return userData.initials;

    } else {
        return 'G';
    }
}


/**
 * Displays the user's initials in the designated HTML element.
 */
function showLoggedInUserInitials() {
    let loggedInUserData = getInitials();
    let initials = document.getElementById('initials');

    if (initials) {
        initials.textContent = loggedInUserData;
    }
}