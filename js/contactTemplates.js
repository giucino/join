// function letterListHTML(letter){
//     return `
//     <div id="container-${letter}" class="container-letter-item">
//         <div class="letter-title"> ${letter} </div>
//         <svg xmlns="http://www.w3.org/2000/svg" width="400" height="2" viewBox="0 0 353 2" fill="none">
//         <path d="M0.5 1H352.5" stroke="#D1D1D1" stroke-linecap="round"/>
//         </svg>
//         <div id="container-contact-${letter}" class="container-contacts"></div>
//     </div>
//     `;
// }


// function loadContactsHTML(i, color, initials, contact){
//     return `
//     <div class="contact" data-contact-index="${i}" onclick="showContactDetails(${i})">
//         <div class="initial" style="background-color: ${color}">${initials}</div>
//         <div class="container-name-email">
//             <div class="name">${contact.name} ${contact.surename}</div>
//             <div class="email">${contact.email}</div>
//         </div>
//     </div>`;
// }


// function showContactDetailsHTML(contact, initials, index){
//     return `
//     <div class="contact-detailed-container">
//         <div class="contact-detailed-top">
//             <div>
//                 <div class="initial-big" style="background-color: ${contact.bgcolor || getRandomColor()}">
//                     ${initials}
//                 </div>
//             </div>
//             <div class="contact-detailed-mid">
//                 <div class="contact-detailed-name">${contact.name} ${contact.surename}</div>
//                 <div class="contact-detailed-edit-delete">
//                     <div class="contact-detailed-images" onclick="editContact(${index})"><img src="./img/edit.png">Edit</div>
//                     <div class="contact-detailed-images" onclick="deleteContact(${index})"><img src="./img/delete.png">Delete</div>
//                 </div>
//             </div>
//         </div>
//         <div class="contact-detailed-information"> Contact Information </div>
//             <div class="contact-detailed-text">Email: </div> <div class="email"> ${contact.email}</div>
//             <div class="contact-detailed-text">Telefon: </div> <div class="phone"> ${contact.telefon}</div>
//         </div>`;
// }