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
const overlay = document.getElementById('overlay');

//Today calls--------------------------------------------------------------------------------------
updateToday();

function updateToday() {
    todayOccupied.length = 0;
    getToday(todayData);
    getOccupied(todayOccupied);
    addToRoomCards();
    overlay.classList.add('hidden');
}

Array.from(roomCards).forEach(room => {
    room.addEventListener('click', expandCard);
});


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
            room.innerHTML = `<h3>Room ${roomIndex[room.id].index + 1}</h3><p>${isOccupied}</p><p>${isBooked}</p>`
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
    overlay.classList.remove('hidden');
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
        modal.innerHTML = (`
        <h3>Room ${roomIndex[currentRoom].index + 1}</h3>
        <p class="loading">LOADING...</p>
        `);
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
        document.getElementById('check-out-button').classList.add('hidden');
    }
    if (todayData[currentRoom] == 0 || todayOccupied[roomIndex[currentRoom].index] != 0) {
        document.getElementById('check-in-button').disabled = true;
        document.getElementById('check-in-button').classList.add('hidden');
    }
    if (todayData[currentRoom] != 0) {
        document.getElementById('book-button').disabled = true;
        document.getElementById('book-button').classList.add('hidden');
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
        modal.innerHTML = (`
        <h3>Room ${roomIndex[currentRoom].index + 1}</h3>
        <p class="loading">LOADING...</p>
        `);
    })
    .then(() => {setTimeout(() => 
        modal.innerHTML = (`
        <button class="close" onclick="closeModal()">X</button>
        <h3>Room ${roomIndex[currentRoom].index + 1}</h3>
        <div class="customer-info-row">
            <div>Name: ${customerInfo.name}</div>
            <div>Address: ${customerInfo.address}</div>
        </div>
        <div class="customer-info-row">
            <div>Email: ${customerInfo.email}</div>
            <div>Cost: $${customerInfo['total-cost'].toFixed(2)}</div>
        </div>
        <div class="customer-info-row">
            <div>Check-In Date: ${customerInfo['check-in']}</div>
            <div>Check-Out Date: ${customerInfo['check-out']}</div>
        </div>
        <button onclick="checkIn()" class="customer-info-button">Confirm</button>
        `), 1000);});
    //Set occupied table to booking id
}

//Modal > Room > Check-in > Confirm
function checkIn() {
    updateOccupied(roomIndex[currentRoom].index + 1, todayData[currentRoom]);
    modal.innerHTML = (`
    <button class="close" onclick="closeModal()">X</button>
    <h3>Room ${roomIndex[currentRoom].index + 1}</h3>
    <p class="loading">Task Completed</p>
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
        modal.innerHTML = (`
        <h3>Room ${roomIndex[currentRoom].index + 1}</h3>
        <p class="loading">LOADING...</p>
        `);
    })
    .then(() => {setTimeout(() => 
        modal.innerHTML = (`
        <button class="close" onclick="closeModal()">X</button>
        <h3>Room ${roomIndex[currentRoom].index + 1}</h3>
        <div class="customer-info-row">
            <div>Name: ${customerInfo.name}</div>
            <div>Address: ${customerInfo.address}</div>
        </div>
        <div class="customer-info-row">
            <div>Email: ${customerInfo.email}</div>
            <div>Cost: $${customerInfo['total-cost'].toFixed(2)}</div>
        </div>
        <div class="customer-info-row">
            <div>Check-In Date: ${customerInfo['check-in']}</div>
            <div>Check-Out Date: ${customerInfo['check-out']}</div>
        </div>
        <button onclick="checkOut()" class="customer-info-button">Confirm</button>
        `), 1000);});
}

//Modal > Room > Check-out > Confirm
function checkOut() {
    updateOccupied(roomIndex[currentRoom].index + 1, 0);
    modal.innerHTML = (`
    <button class="close" onclick="closeModal()">X</button>
    <h3>Room ${roomIndex[currentRoom].index + 1}</h3>
    <p class="loading">Task Completed</p>
    `);
}

//Modal > Room > Book------------------------------------------------------------------------------
function modalBook() {
    const customerInfo = {};
    modal.innerHTML = (`
    <button class="close" onclick="closeModal()">X</button>
    <h3>Room ${roomIndex[currentRoom].index + 1}</h3>
    <form id="modal_book-form">
        <label for="first-name-modal">
            First Name
            <input type="text" id="first-name-modal" name="first-name-modal" required>
        </label>
        <label for="last-name">
            Last Name
            <input type="text" id="last-name-modal" name="last-name-modal" required>
        </label>
        <label for="phone-modal">
            Phone Number
            <input type="tel" id="phone-modal" name="phone-modal" required>
        </label>
        <label for="email-modal">
            Email
            <input type="email" id="email-modal" name="email-modal" required>
        </label>
        <label for="address-modal">
            Billing Address
            <input type="text" id="address-modal" name="address-modal" required>
        </label>
        <label for="city-modal">
            City
            <input type="text" id="city-modal" name="city-modal" required>
        </label>
        <label for="zip-modal">
            Zip Code
            <input type="number" id="zip-modal" name="zip-modal" required pattern="[0-9]{5}">
        </label>
        <label for="state-modal">
            State
            <select id="state-modal" name="state-modal"></select>
        </label>
        <label for="card-name-modal">
            Name on Card
            <input type="text" id="card-name-modal" name="card-name-modal" required>
        </label>
        <label for="card-number-modal">
            Card Number
            <input type="number" id="card-number-modal" name="card-number-modal" required>
        </label>
        <label for="cvc-modal">
            CVC
            <input type="text" id="cvc-modal" name="cvc-modal" required minlength="3" maxlength="4" pattern="[0-9]+">
        </label>
        <label for="exp-date-modal">
            Expiration Date
            <input type="month" id="exp-date-modal" name="exp-date-modal" required>
        </label>
        <input type="submit">
    </form>
    `);
    document.getElementById("modal_book-form").addEventListener("submit", (e) => {
        getForm(customerInfo, "modal_book-form");
        modal.innerHTML = (`
        <h3>Room ${roomIndex[currentRoom].index + 1}</h3>
        <p class="loading">LOADING...</p>
        `);
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
        setTimeout(() => {
            modal.innerHTML = (`
            <button class="close" onclick="closeModal()">X</button>
            <h3>Room ${roomIndex[currentRoom].index + 1}</h3>
            <p class="loading">Task Completed</p>
        `)})
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