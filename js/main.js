let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &gender=lego&noinfo &nat=US,dk,fr,gb`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

function updateModal(employeeIndex){
    let employee = employees[employeeIndex]
    date = new Date(employee.dob.date);
            
    const modalHTML = 
    `
    <div class="text-container">
            <img class="avatar" src="${employee.picture.large}" alt""> 
            <div class="name">${employee.name.first} ${employee.name.last}</div>
            <div class="email">${employee.email}</div> 
            <div class="city">${employee.location.city}</div>
            <hr>
            <div class="phone">${employee.phone}</div>
            <div class="address">${employee.location.street.number}, ${employee.location.street.name}</div>
            <div class="birthdate">Birthday: ${date.getMonth()}/${date.getDay()}/${date.getYear()}</div>
        </div>
    `;
    modalContainer.innerHTML = modalHTML;
}

fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

function displayEmployees(employeeData){
    cardsHTML = "";
    employees = employeeData;

    employeeData.forEach((employee, index) => {
         cardsHTML +=`<div class="card" data-index="${index}">
                        <img class="avatar" src="${employee.picture.large}" alt""> 
                        <div class="name">${employee.name.first} ${employee.name.last} </div>
                        <div class="email">${employee.email}</div>
                        <div class="city">${employee.location.city}</div>
                    </div>`
        
    });
    document.querySelector('.cards').innerHTML = cardsHTML;

    document.querySelectorAll('.card').forEach( function(card){
       
        card.addEventListener('click', e => {
        
            let clickedCard = e.target.closest('.card');
        
            let selectedIndex = parseInt(clickedCard.dataset.index);
            
            updateModal(selectedIndex);
            
            overlay.classList.remove("hidden");
            
            
            
        })
    })
  
}

// MODAL SWITCH //

currentPage = 0;

function nextPage(){
    if(currentPage < employees.length- 1 ){
      currentPage += 1;
    } else {currentPage = 0}

    updateModal(currentPage);
  }
  
function prevPage(){
    if(currentPage >= 1){
      currentPage -= 1; 
    } else {currentPage = employees.length- 1}
    
    updateModal(currentPage);
}
document.querySelector('.arrow-left').addEventListener('click', prevPage);
document.querySelector('.arrow-right').addEventListener('click', nextPage);

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});


// SEARCH FILTER // 

let card = document.querySelector(".card");
let cards = document.querySelector(".cards");

cards.classList.remove("hidden");
card.classList.remove("hidden");

search.addEventListener('keyup', (event) => {
        
    let input = document.querySelector("#search").value; 

    for (i = 0; i < employees.length ; i++) {
        employee = employees[i];
        targetEmployeeCard = document.querySelector(`[data-index="${i}"]`);
        if ( employee.name.first.toLowerCase().includes(input.toLowerCase())){
            targetEmployeeCard.classList.remove("hidden");
        }else {
            targetEmployeeCard.classList.add("hidden");
        }
    }
});

    






    
