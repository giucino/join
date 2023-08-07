// document.getElementById('resetPasswordForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const email = document.getElementById('email').value;

//     // Überprüfen, ob die E-Mail im Local Storage vorhanden ist
//     const usersData = JSON.parse(localStorage.getItem('usersData')) || [];
//     const user = usersData.find(u => u.email === email);

//     if (user) {
//         // Weiterleitung auf die "reset.html" Seite, wenn die E-Mail-Adresse im Local Storage vorhanden ist
//         window.location.href = 'reset.html';
//     } else {
//         alert('Die E-Mail-Adresse wurde nicht gefunden.');
//     }
// });
