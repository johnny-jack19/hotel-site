//Varibles for today
const roomIndex = {'room-1': 0,'room-2': 1,'room-3': 2,'room-4': 3,'room-5': 4,'room-6': 5,}
const todayBooked = [];
const todayOccupied = [];
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
let customerInfo = {};
const roomCards = document.getElementsByClassName('room-card');

//Modal
const modal = document.getElementById('modal');

function closeModal() {
    modal.classList.add('hidden');
    customerInfo = {};
}
//Today calls
getToday(todayBooked);
getOccupied(todayOccupied);

//Today functions
function expandCard() {
    //modal.innerText = this.id;
    const occupiedGuest = {};
    const bookedGuest = {};
    return new Promise((resolve, reject) => {
        return resolve(getCustomerInfo(occupiedGuest, todayOccupied[roomIndex[this.id]]));
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            return resolve(getCustomerInfo(bookedGuest, todayBooked[roomIndex[this.id]]));
        })
    })
    .then(() => {setTimeout(() => 
        modal.innerHTML = (`
        <button onclick="closeModal()">X</button>
        <h3>Room ${roomIndex[this.id] + 1}</h3>
        <div class="row"><div>Guest:</div><div id="guest-name">${occupiedGuest.name}</div><div id="guest-booking">${todayOccupied[roomIndex[this.id]]}</div></div>
        <div class="row"><div>Booked:</div><div id="booked-name">${bookedGuest.name}</div><div id="booked-booking">${todayBooked[roomIndex[this.id]]}</div></div>
        <button onclick="modalCheckIn()">Check In</button>
        <button onclick="modalCheckOut()">Check Out</button>
        <button onclick="modalBook()">Book</button>
        `), 1000);
    })
    .then(() => {setTimeout(() => 
        modal.classList.remove('hidden'), 1000);
    });
}

function modalCheckIn() {
    const roomBooking = document.getElementById('booked-booking').innerText;
    return new Promise((resolve, reject) => {
        return resolve(getCustomerInfo(customerInfo, roomBooking));
    })
    .then(() => {setTimeout(() => 
        modal.innerHTML = (`
        <button onclick="closeModal()">X</button>
        <h3>Room ${customerInfo.room} Booking</h3>
        <div>Name: </div><div>${customerInfo.name}</div>
        <div>Address: </div><div>${customerInfo.address}</div>
        <div>Email: </div><div>${customerInfo.email}</div>
        <div>Check-In Date: </div><div>${customerInfo['check-in']}</div>
        <div>Check-Out Date: </div><div>${customerInfo['check-out']}</div>
        <div>Cost: </div><div>${customerInfo['total-cost']}</div>
        <button onclick="checkIn()">Confirm</button>
        `), 1000);});
    //Set occupied table to booking id
}

function modalCheckOut() {
    const roomGuest = document.getElementById('guest-booking').innerText;
    return new Promise((resolve, reject) => {
        return resolve(getCustomerInfo(customerInfo, roomGuest));
    })
    .then(() => {setTimeout(() => 
        modal.innerHTML = (`
        <button onclick="closeModal()">X</button>
        <h3>Room ${customerInfo.room} Booking</h3>
        <div>Name: </div><div>${customerInfo.name}</div>
        <div>Address: </div><div>${customerInfo.address}</div>
        <div>Email: </div><div>${customerInfo.email}</div>
        <div>Check-In Date: </div><div>${customerInfo['check-in']}</div>
        <div>Check-Out Date: </div><div>${customerInfo['check-out']}</div>
        <div>Cost: </div><div>${customerInfo['total-cost']}</div>
        <button onclick="checkOut()">Confirm</button>
        `), 1000);});
}

function modalBook() {
    //Get room
    //Make form
    //Add data from form
    //formatDay(today);
    //formatDay(tomorrow);
}


Array.from(roomCards).forEach(room => {
    room.addEventListener('click', expandCard);
});