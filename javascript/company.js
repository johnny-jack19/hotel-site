//********************************************Today************************************************
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
let states = 'Alabama,Alaska,Arizona,Arkansas,California,Colorado,Connecticut,Delaware,Florida,Georgia,Hawaii,Idaho,Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York,North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming'
let myStates = states.split(',');
for (state of myStates) {
    let stateOption = `<option value="${state}">${state}</option>`
    document.getElementById('state').innerHTML += stateOption;
}

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
//Modal > Room-------------------------------------------------------------------------------------
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
            <div>Phone: ${customerInfo.phone}</div>
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
            <div>Phone: ${customerInfo.phone}</div>
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
            <input type="text" id="first-name-modal" name="first-name-modal" pattern="[^0-9]{2,}" required>
        </label>
        <label for="last-name-modal">
            Last Name
            <input type="text" id="last-name-modal" name="last-name-modal" pattern="[^0-9]{2,}" required>
        </label>
        <label for="phone-modal">
            Phone Number
            <input type="tel" id="phone-modal" name="phone-modal" minlength="10" maxlength="11" required>
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
            <input type="text" id="zip-modal" name="zip-modal" required pattern="[0-9]{5}">
        </label>
        <label for="state-modal">
            State
            <select id="state-modal" name="state-modal" required></select>
        </label>
        <label for="card-name-modal">
            Name on Card
            <input type="text" id="card-name-modal" name="card-name-modal" pattern="[^0-9]{2,}" required>
        </label>
        <label for="card-number-modal">
            Card Number
            <input type="text" id="card-number-modal" name="card-number-modal" pattern="[0-9]{15,}" required>
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
    for (state of myStates) {
        let stateOption = `<option value="${state}">${state}</option>`
        document.getElementById('state-modal').innerHTML += stateOption;
    }
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
        'first-name': customerInfo['first-name-modal'],
        'last-name': customerInfo['last-name-modal'],
        'email': customerInfo['email-modal'],
        'phone': customerInfo['phone-modal'],
        'address': customerInfo['address-modal'],
        'city': customerInfo['city-modal'],
        'state': customerInfo['state-modal'],
        'zip': customerInfo['zip-modal'],
        'name-on-card': customerInfo['card-name-modal'],
        'card-number': customerInfo['card-number-modal'],
        'cvc': customerInfo['cvc-modal'],
        'exp-date': customerInfo['exp-date-modal']
    }

    const booking = {
        'name': `${customerInfo['first-name-modal']} ${customerInfo['last-name-modal']}`,
        'check-in': formatDay(today),
        'check-out': formatDay(tomorrow),
        'number-of-days': 1,
        'room': roomIndex[currentRoom].index + 1,
        'room-cost': todayData[roomIndex[currentRoom].type].toFixed(2),
        'total-cost': (todayData[roomIndex[currentRoom].type] * 1.06 + 50).toFixed(2)
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
//*********************************************************Calendar*******************************************************************
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

//*******************************************Booking***********************************************
let bookingDays = {};
let bookingInfo = {};
let myRooms;
let openRooms;
let bedRooms = {};
let price = {
    'single-queen': 0,
    'double-queen': 0,
    'single-king': 0
};
const bookingCheckIn = document.getElementById('check-in');
const bookingCheckOut = document.getElementById('check-out');
bookingCheckIn.min = new Date().toLocaleDateString('en-ca');

bookingCheckIn.addEventListener('change', (e) => {
    let checkInValue = new Date(bookingCheckIn.value)
    bookingCheckOut.disabled = false;
    bookingCheckOut.min = new Date(checkInValue.getTime() + 126400000).toLocaleDateString('en-ca');
});
document.getElementById("avail-form").addEventListener("submit", (e) => {
    getAvailability();
    e.preventDefault();
});

function getAvailability() {
    document.getElementById('single-queen-label').classList.remove('hidden');
    document.getElementById('double-queen-label').classList.remove('hidden');
    document.getElementById('single-king-label').classList.remove('hidden');
    document.getElementById('single-queen').disabled = false;
    document.getElementById('double-queen').disabled = false;
    document.getElementById('single-king').disabled = false;
    let formData = new FormData(document.getElementById("avail-form"));
    for ([key, value] of formData) {
        bookingDays[key] = value;
    }
    document.getElementById('days-selected').innerHTML = (`
        <div>Check-In: ${bookingDays['check-in']}</div>
        <div>Check-Out: ${bookingDays['check-out']}</div>
    `)
    document.getElementById('booking-submit').disabled = false;
    document.getElementById('booking-submit').classList.remove('hidden');
    document.getElementById("avail-form").reset();
    return new Promise((resolve, reject) => {
        return resolve(checkRoomRange());
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(sortRooms()), 1000);
        });
    })
    .then(() => {
        setTimeout(() => {
            disableRooms(), 1000
        });
    });
}

function disableRooms() {
    if (!bedRooms['single-queen']) {
        document.getElementById('single-queen-label').classList.add('hidden');
        document.getElementById('single-queen').disabled = true;
    }
    if (!bedRooms['double-queen']) {
        document.getElementById('double-queen-label').classList.add('hidden');
        document.getElementById('double-queen').disabled = true;
    }
    if (!bedRooms['single-king']) {
        document.getElementById('single-king-label').classList.add('hidden');
        document.getElementById('single-king').disabled = true;
    }
}

function checkRoomRange() {
    myRooms = [];
    openRooms = {
        'room-1': true,
        'room-2': true,
        'room-3': true,
        'room-4': true,
        'room-5': true,
        'room-6': true
    };
    checkRooms(myRooms, bookingDays['check-in'], formatDay(new Date(bookingDays['check-out'])));
}

function sortRooms() {
    price = {'single-queen': 0, 'double-queen': 0, 'single-king': 0};
    for (days of myRooms) {
        for (let i = 1; i < 7; i++) {
            if (days[`room-${i}`] != 0) {
                openRooms[`room-${i}`] = false;
            }
        }
        price['single-queen'] += days['single-queen'];
        price['double-queen'] += days['double-queen'];
        price['single-king'] += days['single-king'];
    }
    bedRooms['single-queen'] = (openRooms['room-1'] || openRooms['room-2']);
    bedRooms['double-queen'] = (openRooms['room-3'] || openRooms['room-4']);
    bedRooms['single-king'] = (openRooms['room-5'] || openRooms['room-6']);
}

function addToBooking() {
    if (bookingInfo['bed'] === 'single-queen') {
        bookingInfo['room-cost'] = price['single-queen'];
        if (openRooms['room-1']) {
            bookingInfo.room = 1;
        } else {
            bookingInfo.room = 2;
        }
    } else if (bookingInfo['bed'] === 'double-queen') {
        bookingInfo['room-cost'] = price['double-queen'];
        if (openRooms['room-3']) {
            bookingInfo.room = 3;
        } else {
            bookingInfo.room = 4;
        }
    } else {
        bookingInfo['room-cost'] = price['single-king'];
        if (openRooms['room-5']) {
            bookingInfo.room = 5;
        } else {
            bookingInfo.room = 6;
        }
    }
}

function confirmBooking() {
    getForm(bookingInfo, "booking-form");
    addToBooking();
    modal.innerHTML = (`
    <button class="close" onclick="closeModal()">X</button>
    <h3>Booking</h3>
    <div class="booking-info-modal">
        <div>First Name: ${bookingInfo['first-name']}</div>
        <div>Last Name: ${bookingInfo['last-name']}</div>
        <div>Phone Number: ${bookingInfo['phone']}</div>
        <div>Email: ${bookingInfo['email']}</div>
        <div>Address: ${bookingInfo['address']}</div>
        <div>City: ${bookingInfo['city']}</div>
        <div>Zip Code: ${bookingInfo['zip']}</div>
        <div>State: ${bookingInfo['state']}</div>
        <div>Name on Card: ${bookingInfo['card-name']}</div>
        <div>Card Number: ${bookingInfo['card-number']}</div>
        <div>CVC: ${bookingInfo['cvc']}</div>
        <div>Expiration Date: ${bookingInfo['exp-date']}</div>
    </div>
    <div class="check-row">
        <div>Check-In: ${bookingDays['check-in']}</div>
        <div>Check-Out: ${bookingDays['check-out']}</div>
    </div>
    <div class="check-row">
        <div>Room Type: ${bookingInfo['bed']}</div>
        <div>Room: ${bookingInfo.room}</div>
    </div>
    <div class="check-row">
        <div>Room Cost: $${bookingInfo['room-cost'].toFixed(2)}</div>
        <div>Taxes: $${(bookingInfo['room-cost'] * .06).toFixed(2)}</div>
        <div>Cleaning Fee: $50.00</div>
        <div>Total Cost: $${(bookingInfo['room-cost'] * 1.06 + 50).toFixed(2)}</div>
    </div>
    <div class="button-row">
        <button onclick="createNewBooking()">Confirm</button>
        <button onclick="closeModal()">Cancel</button>
    <div>
    `)
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
}

function createNewBooking() {
    const billing = {
        'first-name': bookingInfo['first-name'],
        'last-name': bookingInfo['last-name'],
        'email': bookingInfo['email'],
        'phone': bookingInfo['phone'],
        'address': bookingInfo['address'],
        'city': bookingInfo['city'],
        'state': bookingInfo['state'],
        'zip': bookingInfo['zip'],
        'name-on-card': bookingInfo['card-name'],
        'card-number': bookingInfo['card-number'],
        'cvc': bookingInfo['cvc'],
        'exp-date': bookingInfo['exp-date']
    }

    const booking = {
        'name': `${bookingInfo['first-name']} ${bookingInfo['last-name']}`,
        'check-in': bookingDays['check-in'],
        'check-out': bookingDays['check-out'],
        'number-of-days': ((new Date(bookingDays['check-out']) - new Date(bookingDays['check-in'])) / 1000 / 60 / 60 / 24),
        'room': bookingInfo.room,
        'room-cost': bookingInfo['room-cost'],
        'total-cost': (bookingInfo['room-cost'] * 1.06 + 50).toFixed(2)
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
            setTimeout(() => resolve(addBookingToRooms(`room-${booking.room}`, booking.id, booking['check-in'], formatDay(new Date(booking['check-out'])))), 1000);
        })
    })
    .then(() => {
        setTimeout(() => {
            modal.innerHTML = (`
            <button class="close" onclick="closeModal()">X</button>
            <h3>Booking</h3>
            <p class="loading">Task Completed</p>
        `)})
    });
}

//********************************************Look Up**********************************************
document.getElementById("look-up-form").addEventListener("submit", (e) => {
    customerLookUp();
    e.preventDefault();
});
let lookUpStore = {};
function customerLookUp(){
    const bookingField = document.getElementById('booking-field');
    const bookingValue = document.getElementById('booking-value');
    return new Promise((resolve, reject) => {
        return resolve(getLookUp(lookUpStore, bookingField.value, bookingValue.value));
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(testLookUp(lookUpStore)), 1000);
        });
    });
}

function testLookUp(lookUpStore) {
    if (lookUpStore.entries != 1) {
        modal.innerHTML = (`
            <button class="close" onclick="closeModal()">X</button>
            <h3>Look Up Failed</h3>
            <p class="loading">Try another field</p>
            </div>
        `);
        overlay.classList.remove('hidden');
        modal.classList.remove('hidden');
    } else {
        document.getElementById('look-up-data').innerHTML = (`
            <p>First Name: ${lookUpStore['first-name']}</p>
            <p>Last Name: ${lookUpStore['last-name']}</p>
            <p>Check-In: ${lookUpStore['check-in']}</p>
            <p>Check-Out: ${lookUpStore['check-out']}</p>
            <p>Room: ${lookUpStore['room']}</p>
            <p>Total Cost: $${lookUpStore['total-cost'].toFixed(2)}</p>
            <p>Phone: ${lookUpStore['phone']}</p>
            <p>Email: ${lookUpStore['email']}</p>
            <p>Address: ${lookUpStore['address']}</p>
            <p>City: ${lookUpStore['city']}</p>
            <p>Zip Code: ${lookUpStore['zip']}</p>
            <p>State: ${lookUpStore['state']}</p>
            <p>Name on Card: ${lookUpStore['name-on-card']}</p>
            <p>Card Number: ${lookUpStore['card-number']}</p>
            <p>CVC: ${lookUpStore['cvc']}</p>
            <p>Expiration Date: ${lookUpStore['exp-date']}</p>
            <button id="delete" onclick="deleteEntry()" class="delete">Delete Entry</button>
        `)
    }
}

function deleteEntry() {
    modal.innerHTML = (`
        <button class="close" onclick="closeModal()">X</button>
        <h3 class="warning">WARNING!</h3>
        <p class="loading">This action cannot be undone!</p>
        <button class="delete" onclick="confirmDeletion()">Delete Entry</button>
        </div>
    `);
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
}

function confirmDeletion() {
    return new Promise((resolve, reject) => {
        return resolve(deleteBookingFromRooms(`room-${lookUpStore['room']}`, lookUpStore['id']));
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(delBooking(lookUpStore['id'])), 1000);
        });
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(delBilling(lookUpStore['customer-id'])), 1000);
        });
    })
    .then(() => {
        setTimeout(() => {
            modal.innerHTML = (`
            <button class="close" onclick="closeModal()">X</button>
            <h3>Booking Deleted</h3>
            <p class="loading">Task Completed</p>
        `)});
        document.getElementById('look-up-data').innerHTML = (`
            <p>First Name:</p>
            <p>Last Name:</p>
            <p>Check-In:</p>
            <p>Check-Out:</p>
            <p>Room:</p>
            <p>Total Cost:</p>
            <p>Phone:</p>
            <p>Email:</p>
            <p>Address:</p>
            <p>City:</p>
            <p>Zip Code:</p>
            <p>State:</p>
            <p>Name on Card:</p>
            <p>Card Number:</p>
            <p>CVC:</p>
            <p>Expiration Date:</p>
        `)
    });
}