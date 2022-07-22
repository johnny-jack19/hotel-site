//Varibles (not all needed)
let data = {};
let avilData = {};
let billing = {};
let booking = {};
let checkOut = '';
let customer;

//Booking
function showData() {
    console.log(data);
    
    billing = {
        'name': data.name,
        'email': data.email,
        'address': data.address,
        'card-number': data['card-number'],
        'cvc': data.cvc,
        'exp-date': data['exp-date']
    }
    
    booking = {
        'name': data.name,
        'check-in': data['check-in'],
        'check-out': data['check-out'],
        'number-of-days': ((new Date(data['check-out']) - new Date(data['check-in'])) / 1000 / 60 / 60 / 24)
    }
    
    console.log(billing);
    console.log(booking);
}

function testBilling() {
    return new Promise((resolve, reject) => {
        return resolve(makeNewCustomer(booking, billing));
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(addToBooking()), 1000);
        });
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(makeNewBooking(booking)), 1000);
        });
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(addBookingToRooms(`room-${booking.room}`, booking.id, booking['check-in'], checkOut)), 1000);
        });
    });
}

//Availability
function getAvailability() {
    let formData = new FormData(document.getElementById("avil-form"));
    for ([key, value] of formData) {
        avilData[key] = value;
    }
    document.getElementById("avil-form").reset();
    console.log(avilData);
    checkOut = formatDay(new Date(avilData['check-out-test']));
}

let myRooms;
let openRooms;
let bedRooms = {};
let price = {
    'single-queen': 0,
    'double-queen': 0,
    'single-king': 0
};

function testCheck() {
    myRooms = [];
    openRooms = {
        'room-1': true,
        'room-2': true,
        'room-3': true,
        'room-4': true,
        'room-5': true,
        'room-6': true
    };
    checkRooms(myRooms, avilData['check-in-test'], checkOut);
}

function displayCheck() {
    price = {'single-queen': 0, 'double-queen': 0, 'single-king': 0};
    for (days of myRooms) {
        for (let i = 1; i < 7; i++) {
            if (days[`room-${i}`]) {
                openRooms[`room-${i}`] = false;
            }
        }
        price['single-queen'] += days['single-queen'];
        price['double-queen'] += days['double-queen'];
        price['single-king'] += days['single-king'];
    }
    bedRooms['single-queen'] = (openRooms['room-1'] && openRooms['room-2']);
    bedRooms['double-queen'] = (openRooms['room-3'] && openRooms['room-4']);
    bedRooms['single-king'] = (openRooms['room-5'] && openRooms['room-6']);
    console.log(myRooms);
    console.log(openRooms);
    console.log(bedRooms);
    console.log(price);
}

//Make booking
function addToBooking() {
    if (data['room-type'] === 'single-queen') {
        booking['room-cost'] = price['single-queen'];
        booking['total-cost'] = price['single-queen'];
        if (openRooms['room-1']) {
            booking.room = 1;
        } else {
            booking.room = 2;
        }
    } else if (data['room-type'] === 'double-queen') {
        booking['room-cost'] = price['double-queen'];
        booking['total-cost'] = price['double-queen'];
        if (openRooms['room-3']) {
            booking.room = 3;
        } else {
            booking.room = 4;
        }
    } else {
        booking['room-cost'] = price['single-king'];
        booking['total-cost'] = price['single-king'];
        if (openRooms['room-5']) {
            booking.room = 5;
        } else {
            booking.room = 6;
        }
    }
}