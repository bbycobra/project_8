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
            
            let employee = employees[selectedIndex]

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

            overlay.classList.remove("hidden");
            modalContainer.innerHTML = modalHTML;
            
        })
    })
}

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});
    



    
    

    
