const url = 'http://localhost:3000'
function makeCalDay(day) {
    fetch(url + '/make',
    {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(day)
    })
    .then(res => res.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

let mainCal = [];

for (let i = 0; i < 946; i++) {
    let newDay = new Date();
    newDay.setDate(newDay.getDate() - 5);
    newDay.setDate(newDay.getDate() + i);
    let singleQueen = 150;
    let doubleQueen = 175;
    let singleKing = 200;
    if (newDay.getMonth() > 4 && newDay.getMonth() < 9) {
        singleQueen *= 1.5;
        doubleQueen *= 1.5;
        singleKing *= 1.5;
    }
    if (newDay.getDay() === 0 || newDay.getDay() === 5 || newDay.getDay() === 6) {
        singleQueen *= 1.25;
        doubleQueen *= 1.25;
        singleKing *= 1.25;
    }
    const calDay = {
        day: `${newDay.getFullYear()}-${
            (newDay.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}-${
            newDay.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`,
        'day-of-week': daysOfTheWeek[newDay.getDay()],
        room1: null,
        room2: null,
        room3: null,
        room4: null,
        room5: null,
        room6: null,
        'single-queen': singleQueen.toFixed(2),
        'double-queen': doubleQueen.toFixed(2),
        'single-king': singleKing.toFixed(2),
    }
    mainCal.push(calDay);
}

function makeCal() {
    for (day of mainCal) {
        makeCalDay(day);
    }
}

function makeNewCustomer(customer) {
    fetch(url + '/billing',
    {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(res => res.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function updateCustomer(id, customer) {
    fetch(url + '/billing/' + id,
    {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(res => res.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function makeNewBooking(booking) {
    fetch(url + '/booking',
    {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
    .then(res => res.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function delBooking(id) {
    fetch(url + '/booking/' + id,
    {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

let testCustomer = {
    'customer-id': 100,
    'first-name': 'Hammer',
    'last-name': 'Name',
    'card-number': '123-123-45556',
    'cvc': '123',
    'exp-date': '12/34'
}

let testBooking = {
    'id': 41,
    'room': '6',
    'customer-id': 99,
    'customer-name': 'Hammer Barn',
    'number-of-days': 7,
    'check-in': '2022-07-07',
    'room-cost': 1550,
    'total-cost': 1550
}

let testUpdate = {
    'first-name': 'New',
    'last-name': 'Name'
}

function testBill() {
    makeNewCustomer(testCustomer);
    console.log('Made new customer');
}

function testBook() {
    makeNewBooking(testBooking);
    console.log('Made new booking');
}

function testDel() {
    delBooking(43);
    console.log('Deleted');
}

function testUp() {
    updateCustomer(99, testUpdate);
    console.log('Updated');
}