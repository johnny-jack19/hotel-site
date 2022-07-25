//Tabs---------------------------------------------------------------------------------------------
const todayTab = document.getElementById('today-tab');
const todayPage = document.getElementById('today');
todayTab.addEventListener('click', (e) => {
    openPage.classList.add('hidden');
    todayPage.classList.remove('hidden');
    openPage = todayPage;
});
const calendarTab = document.getElementById('calendar-tab');
const calendarPage = document.getElementById('calendar');
calendarTab.addEventListener('click', (e) => {
    openPage.classList.add('hidden');
    calendarPage.classList.remove('hidden');
    openPage = calendarPage
});
const bookingTab = document.getElementById('booking-tab');
const bookingPage = document.getElementById('booking');
bookingTab.addEventListener('click', (e) => {
    openPage.classList.add('hidden');
    bookingPage.classList.remove('hidden');
    openPage = bookingPage
});
const lookUpTab = document.getElementById('lookup-tab');
const lookUpPage = document.getElementById('look-up');
lookUpTab.addEventListener('click', (e) => {
    openPage.classList.add('hidden');
    lookUpPage.classList.remove('hidden');
    openPage = lookUpPage
});
const contactsTab = document.getElementById('contacts-tab');
const contactsPage = document.getElementById('contacts');
contactsTab.addEventListener('click', (e) => {
    openPage.classList.add('hidden');
    contactsPage.classList.remove('hidden');
    openPage = contactsPage
});
let openPage = todayPage;

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

addToRoomCards();

function addToRoomCards() {
    if(todayOccupied.length !== 0 && todayData.length !== 0) {
        Array.from(roomCards).forEach(room => {
            let isBooked;
            let isOccupied;
            if (todayOccupied[roomIndex[room.id].index] != 0) {
                isOccupied = 'Occupied';
            } else {
                isOccupied = 'Vacant';
            }
            if (todayData[room.id] != 0) {
                isBooked = 'Booked';
            } else {
                isBooked = 'Open';
            }
            room.innerHTML += `<p>${isOccupied}</p><p>${isBooked}</p>`
        });
    } else {
        setTimeout(() => {
            addToRoomCards(), 1000
        });
    }
}
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
        <button class="close" onclick="closeModal()">X</button>
        <h3>Room ${roomIndex[currentRoom].index + 1}</h3>
        <div class="row"><div>Guest:</div><div id="guest-name">${occupiedGuest.name}</div><div id="guest-booking">${todayOccupied[roomIndex[currentRoom].index]}</div></div>
        <div class="row"><div>Booked:</div><div id="booked-name">${bookedGuest.name}</div><div id="booked-booking">${todayData[currentRoom]}</div></div>
        <div class="button-row">
        <button id="check-in-button" onclick="modalCheckIn()">Check In</button>
        <button id="check-out-button" onclick="modalCheckOut()">Check Out</button>
        <button id="book-button" onclick="modalBook()">Book</button>
        </div>
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
        <button class="close" onclick="closeModal()">X</button>
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
    <button class="close" onclick="closeModal()">X</button>
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
        <button class="close" onclick="closeModal()">X</button>
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
    <button class="close" onclick="closeModal()">X</button>
    <div>Task Completed</div>
    `);
}

//Modal > Room > Book------------------------------------------------------------------------------
function modalBook() {
    const customerInfo = {};
    modal.innerHTML = (`
    <button class="close" onclick="closeModal()">X</button>
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

//Modal > Room > Book > Confirm
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
//************************************************************************************************************************************
let calendarVacanies = [];
const calendarDates = document.getElementById('calendar_dates');
const calendarHeader = document.getElementById('calendar_header__month-year');
const months = [ ['July 2022', 31, 5], ['August 2022', 31, 1], ['September 2022', 30, 4], ['October 2022', 31, 6],
['November 2022', 30, 2], ['December 2022', 31, 4], ['January 2023', 31, 0], ['February 2023', 28, 3],
['March 2023', 31, 3], ['April 2023', 30, 6], ['May 2023', 31, 1], ['June 2023', 30, 4], ['July 2023', 31, 6],
['August 2023', 31, 2], ['September 2023', 30, 5], ['October 2023', 31, 0], ['November 2023', 30, 3],
['December 2023', 31, 5], ['January 2024', 31, 1], ['February 2024', 29, 4], ['March 2024', 31, 5],
['April 2024', 30, 1], ['May 2024', 31, 3], ['June 2024', 30, 6], ['July 2024', 31, 1], ['August 2024', 31, 4],
['September 2024', 30, 0], ['October 2024', 31, 2], ['November 2024', 30, 5], ['December 2024', 31, 0]
]
let monthViewed = 0;
let k = 0;
getCalendarData(calendarVacanies);
delayMakeCal();
function delayMakeCal() {
    if (calendarVacanies.length > 0) {
        for (let m = 0; m < 30; m++) {
            makeCal(`month-${m}`, months[m][1], months[m][2])
        }
        calendarHeader.innerText = months[monthViewed][0];
        document.getElementById(`month-${monthViewed}`).classList.remove('hidden');
    } else {
        setTimeout(() => delayMakeCal(), 1000);
    }
}

function makeCal(month, daysInMonth, startDate) {
    const monthSheet = document.createElement('div');
    monthSheet.classList.add('month');
    monthSheet.setAttribute('id', month)
    monthSheet.classList.add('hidden');
    calendarDates.appendChild(monthSheet);
    for (let i = 1; i <= 42; i++) {
        const dateSquare = document.createElement('div');
        dateSquare.classList.add('day');
        if (i < startDate) {
            dateSquare.classList.add('pad-date');
        } else if (i > startDate && i <= daysInMonth + startDate) {
            dateSquare.innerHTML = `<div class="day-number">${i - startDate}</div><div class="day-vacant"><div>Vacant: ${
                6 - calendarVacanies[k]}</div><hr><div>Booked: ${calendarVacanies[k]}</div></div>`;
            k++;
        } else if(startDate + daysInMonth > 35 || i <= 35) {
            dateSquare.classList.add('pad-date');
        }else {
            dateSquare.classList.add('post-pad-date');
        }
        monthSheet.appendChild(dateSquare);
    }

}

function changeMonth(input) {
    document.getElementById(`month-${monthViewed}`).classList.add('hidden');
    if (input === 'forward' && monthViewed < 29) {
        monthViewed++;
    }
    if (input === 'backward' && monthViewed > 0) {
        monthViewed--;
    }
    document.getElementById(`month-${monthViewed}`).classList.remove('hidden');
    calendarHeader.innerText = months[monthViewed][0];
}

// calendarDates.innerHTML = '';
// k = 0;
// for (let m = 0; m < 30; m++) {
//     makeCal(`month-${m}`, months[m][1], months[m][2])
// }
// document.getElementById(`month-${monthViewed}`).classList.remove('hidden');

//*************************************************************************************************************************