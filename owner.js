let data = {};
let avilData = {};
let billing = {};
let booking = {};
let checkOut = '';
function getForm() {
    let formData = new FormData(document.getElementById("book-form"));
    for ([key, value] of formData) {
        data[key] = value;
    }
    document.getElementById("book-form").reset();
}

function getAvil() {
    let formData = new FormData(document.getElementById("avil-form"));
    for ([key, value] of formData) {
        avilData[key] = value;
    }
    document.getElementById("avil-form").reset();
    console.log(avilData);
    checkOut = formatDay(new Date(avilData['check-out-test']));
}

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
        'number-of-days': ((new Date(data['check-out']) - new Date(data['check-in'])) / 1000 / 60 / 60 / 24)
    }

    console.log(billing);
    console.log(booking);
}

function testBilling() {
    makeNewCustomer(billing);
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