//Today varibles-----------------------------------------------------------------------------------
const roomIndex = {'room-1': {index: 0,type: 'single-queen'},'room-2': {index: 1,type: 'single-queen'},'room-3': {index: 2,type: 'double-queen'},
'room-4': {index: 3,type: 'double-queen'},'room-5': {index: 4,type: 'single-king'},'room-6': {index: 5,type: 'single-king'}};
const todayOccupied = [];
const todayData = {};
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
let currentRoom = null;
const roomCards = document.getElementsByClassName('room-card');

//Today calls--------------------------------------------------------------------------------------
updateToday();

function updateToday() {
    todayOccupied.length = 0;
    getToday(todayData);
    getOccupied(todayOccupied);
}

Array.from(roomCards).forEach(room => {
    room.addEventListener('click', expandCard);
});
//Today functions
//Modal > Room-------------------------------------------------------------------------------------(Needs row inspect)
function expandCard() {
    currentRoom = this.id;
    const occupiedGuest = {};
    const bookedGuest = {};
    return new Promise((resolve, reject) => {
        return resolve(getCustomerInfo(occupiedGuest, todayOccupied[roomIndex[this.id].index]));
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            return resolve(getCustomerInfo(bookedGuest, todayData[currentRoom]));
        })
    })
    .then(() => {
        modal.innerHTML = 'LOADING';
    })
    .then(() => {setTimeout(() => 
        modal.innerHTML = (`
        <button onclick="closeModal()">X</button>
        <h3>Room ${roomIndex[currentRoom].index + 1}</h3>
        <div class="row"><div>Guest:</div><div id="guest-name">${occupiedGuest.name}</div><div id="guest-booking">${todayOccupied[roomIndex[currentRoom].index]}</div></div>
        <div class="row"><div>Booked:</div><div id="booked-name">${bookedGuest.name}</div><div id="booked-booking">${todayData[currentRoom]}</div></div>
        <button id="check-in-button" onclick="modalCheckIn()">Check In</button>
        <button id="check-out-button" onclick="modalCheckOut()">Check Out</button>
        <button id="book-button" onclick="modalBook()">Book</button>
        `), 1000);
    })
    .then(() => {setTimeout(() =>
        disableButtons(), 1000);
    })
    .then(() => {
        modal.classList.remove('hidden');
    });
}

function disableButtons() {
    if (todayOccupied[roomIndex[currentRoom].index] == 0) {
        document.getElementById('check-out-button').disabled = true;
    }
    if (todayData[currentRoom] == 0 || todayOccupied[roomIndex[currentRoom].index] != 0) {
        document.getElementById('check-in-button').disabled = true;
    }
    if (todayData[currentRoom] != 0) {
        document.getElementById('book-button').disabled = true;
    }
}

//Modal > Room > Check-in--------------------------------------------------------------------------
function modalCheckIn() {
    const customerInfo = {};
    const roomBooking = document.getElementById('booked-booking').innerText;
    return new Promise((resolve, reject) => {
        return resolve(getCustomerInfo(customerInfo, roomBooking));
    })
    .then(() => {
        modal.innerHTML = 'LOADING';
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

//Modal > Room > Check-in > Confirm
function checkIn() {
    updateOccupied(roomIndex[currentRoom].index + 1, todayData[currentRoom]);
    modal.innerHTML = (`
    <button onclick="closeModal()">X</button>
    <div>Task Completed</div>
    `);
}

//Modal > Room > Check-out-------------------------------------------------------------------------
function modalCheckOut() {
    const customerInfo = {};
    const roomGuest = document.getElementById('guest-booking').innerText;
    return new Promise((resolve, reject) => {
        return resolve(getCustomerInfo(customerInfo, roomGuest));
    })
    .then(() => {
        modal.innerHTML = 'LOADING';
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

//Modal > Room > Check-out > Confirm
function checkOut() {
    updateOccupied(roomIndex[currentRoom].index + 1, 0);
    modal.innerHTML = (`
    <button onclick="closeModal()">X</button>
    <div>Task Completed</div>
    `);
}

//Modal > Room > Book------------------------------------------------------------------------------
function modalBook() {
    const customerInfo = {};
    modal.innerHTML = (`
    <form id="modal_book-form">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
        <label for="address">Address</label>
        <input type="text" id="address" name="address" required>
        <label for="card-number">Card Number</label>
        <input type="number" id="card-number" name="card-number" required>
        <label for="cvc">CVC</label>
        <input type="number" id="cvc" name="cvc" required>
        <label for="exp-date">Expiration Date</label>
        <input type="text" id="exp-date" name="exp-date" required>
        <input type="submit">
    </form>
    `);
    document.getElementById("modal_book-form").addEventListener("submit", (e) => {
        getForm(customerInfo, "modal_book-form");
        modal.innerHTML = 'LOADING';
        createCustomerAndBooking(customerInfo);
        e.preventDefault();
    });
}

//Modal > Room > Book > Confirm (Needs to check-in)
function createCustomerAndBooking(customerInfo) {
    const billing = {
        'name': customerInfo.name,
        'email': customerInfo.email,
        'address': customerInfo.address,
        'card-number': customerInfo['card-number'],
        'cvc': customerInfo.cvc,
        'exp-date': customerInfo['exp-date']
    }

    const booking = {
        'name': customerInfo.name,
        'check-in': formatDay(today),
        'check-out': formatDay(tomorrow),
        'number-of-days': 1,
        'room': roomIndex[currentRoom].index + 1,
        'room-cost': todayData[roomIndex[currentRoom].type],
        'total-cost': todayData[roomIndex[currentRoom].type]
    }

    return new Promise((resolve, reject) => {
        return resolve(makeNewCustomer(booking, billing));
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(makeNewBooking(booking)), 1000);
        });
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(addBookingToRooms(`room-${booking.room}`, booking.id, booking['check-in'], booking['check-in'])), 1000);
        });
    })
    .then(() => {
        setTimeout(() => updateOccupied(booking.room, booking.id), 1000);
    })
    .then(() => {
        setTimeout(() => modal.innerHTML = (`
        <button onclick="closeModal()">X</button>
        <div>Task Completed</div>
        `))
    });
}
