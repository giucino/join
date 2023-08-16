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


function markMobileLink() {
    let screenWidth = window.innerWidth;
    let links = document.querySelectorAll('.links');

    if (screenWidth < 767) {
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


function getInitials() {
    let userData = JSON.parse(localStorage.getItem('loggedInUser'));

    if (userData && userData.initials) {
        return userData.initials;

    } else {
        return 'G';
    }
}


function showLoggedInUserInitials() {
    let loggedInUserData = getInitials();
    let initials = document.getElementById('initials');

    if (initials) {
        initials.textContent = loggedInUserData;
    }
}