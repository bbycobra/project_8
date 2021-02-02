let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &gender=lego&noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

function displayEmployees(employeeData){
    cardsHTML = "";
    employeeData.forEach((employee, index) => {
         cardsHTML +=`<div class="card data-index="${index}">
                        <img class="avatar" src="${employee.picture.large}" alt""> 
                        <div class="name">${employee.name.first} ${employee.name.last} </div>
                        <div class="email">${employee.email}</div>
                        <div class="city">${employee.location.city}</div>
                    </div>`
        
    });
    document.querySelector('.cards').innerHTML = cardsHTML;
}

// function displayModal(index) {

//     let { name, dob, phone, email, location: { city, street, state, postcode
//     }, picture } = employee[index];
//     let date = new Date(dob.date);
    
//     const modalHTML = `
//         <img class="avatar" src="${employee.picture.large}" />
//         <div class="name">${employee.name.first} ${employee.name.last}</div>
//         <div class="email">${employee.email}</div>
//         <div class="address">${employee.city}</div>
//         <p>${employee.phone}</p>
//         <p class="address">${employee.street}, ${employee.state} ${employee.postcode}</p>
//         <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
//     `;
//     overlay.classList.remove("hidden");
//     modalContainer.innerHTML = modalHTML;
// }

// gridContainer.addEventListener('click', e => {
//     if (e.target !== gridContainer) {
//     const cards = e.target.closest(".cards");
//     const index = cards.getAttribute('data-index');
//     displayModal(index);
//     }
// });

// modalClose.addEventListener('click', () => {
//     overlay.classList.add("hidden");
// });
    
    

    
