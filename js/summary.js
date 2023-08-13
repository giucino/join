document.addEventListener('DOMContentLoaded', function() {
  getGreeting('day-time');
  getGreeting('mobile-day-time');
});

function getGreeting(id) {
  const dayTime = document.getElementById(id);
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    dayTime.innerHTML = "Good morning, ";    
  } else if (currentHour >= 12 && currentHour < 18) {
    dayTime.innerHTML = "Good afternoon, ";    
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