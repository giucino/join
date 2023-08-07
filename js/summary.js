function getGreeting() {
    const dayTime = document.getElementById('day-time');
    dayTime.innerHTML = '';
    const currentHour = new Date().getHours();

  
    if (currentHour >= 5 && currentHour < 12) {
      return dayTime.innerHTML = "Good morning, ";
    } else if (currentHour >= 12 && currentHour < 18) {
      return dayTime.innerHTML = "Good afternoon, ";
    } else {
      return dayTime.innerHTML = "Good evening, ";
    }
  }
  
  
