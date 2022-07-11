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

let myRooms = [];

function testCheck() {
    checkRooms(myRooms, avilData['check-in-test'], checkOut);
}