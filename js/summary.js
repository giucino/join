document.addEventListener('DOMContentLoaded', function() {
  getGreeting('day-time');
  getGreeting('mobile-day-time');
});


function getGreeting(id) {
  const dayTime = document.getElementById(id);
  const currentHour = new Date().getHours();
  const isGuest = isGuestUser();
  
  morning(dayTime, currentHour, isGuest);
  afternoon(dayTime, currentHour, isGuest);
  evening(dayTime, currentHour, isGuest);

  showGreeting(isGuest);
  hideUserName(isGuest);
}

function morning(dayTime, currentHour, isGuest){
  if (currentHour >= 5 && currentHour < 12) {
    if (isGuest) {
      dayTime.innerHTML = "Good morning";
    } else {
      dayTime.innerHTML = "Good morning, ";
    }
  }
}

function afternoon(dayTime, currentHour, isGuest){
  if (currentHour >= 12 && currentHour < 18) {
    if (isGuest) {
      dayTime.innerHTML = "Good afternoon";
    } else {
      dayTime.innerHTML = "Good afternoon, ";
    }
  }
}

function evening(dayTime, currentHour, isGuest){
  if (currentHour >= 18 && currentHour < 24)
    if (isGuest) {
      dayTime.innerHTML = "Good evening";
    } else {
      dayTime.innerHTML = "Good evening, ";
  }
}

  
function toggleActiveClass() {
  const greetingsMobile = document.getElementById('greetings-mobile');
  const mobileContainer = document.getElementById('mobile-container');
  if (window.innerWidth < 1400) {
    greetingsMobile.classList.add('active-mobile');
    setTimeout(() => {
      greetingsMobile.classList.add('d-none');
      mobileContainer.classList.add('d-none');
    }, 4000);
  } else {
    greetingsMobile.classList.remove('active-mobile');
    greetingsMobile.classList.remove('d-none');
    mobileContainer.classList.remove('d-none');
  }
}

toggleActiveClass();

window.addEventListener('resize', toggleActiveClass);

function getLoggedInUserName() {
  let userData = JSON.parse(localStorage.getItem('loggedInUser'));

  if (userData && userData.username) {
    return userData.username;

  } else {
    return '';
  }
}

function isGuestUser() {
  let userName = getLoggedInUserName();
  return !userName;
}

function showGreeting(isGuest) {
  let userName = getLoggedInUserName();
  let userNameDesktop = document.getElementById('user-name');
  let userNameMobile = document.getElementById('user-name-mobile');

  if (!isGuest) {
    if (userNameDesktop) {
      userNameDesktop.textContent = userName;
    }
    if (userNameMobile) {
      userNameMobile.textContent = userName;
    }
  }
}

function hideUserName(isGuest) { 
  const userDesktop = document.getElementById('user-name');
  const userMobile = document.getElementById('user-name-mobile');
  if (isGuestUser(isGuest)) {
    userDesktop.classList.add('d-none');
    userMobile.classList.add('d-none');
  } else{
    userDesktop.classList.remove('d-none');
    userMobile.classList.remove('d-none');
  }  
}