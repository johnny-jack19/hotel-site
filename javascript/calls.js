const url = 'http://localhost:3000';

//--------------------------------------------Billing----------------------------------------------
function makeNewCustomer(store, customer) {
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
        store['customer-id'] = data.results[0];
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function delBilling(id) {
    fetch(url + '/billing/' + id,
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

//-------------------------------------------Booking-----------------------------------------------
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
        booking.id = data.results[0];
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

//--------------------------------------------Rooms------------------------------------------------
function addBookingToRooms(room, booking, startDay, endDay) {
    fetch(url + `/rooms/${room}/${booking}/${startDay}/${endDay}`,
    {
        method: 'PATCH',
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

function deleteBookingFromRooms(room, booking) {
    fetch(url + `/rooms/${room}/${booking}`,
    {
        method: 'PATCH',
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

//--------------------------------------------Occupied---------------------------------------------
function updateOccupied(room, id) {
    fetch(url + `/occupied/${room}/${id}`,
    {
        method: 'PATCH',
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

//----------------------------------------------Gets-----------------------------------------------
//Gets day range (rooms)
function checkRooms(store, startDay, endDay) {
    fetch(url + `/rooms/${startDay}/${endDay}`,
    {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        for (day of data.results){
            store.push(day);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

//Get today (rooms)
function getToday(store) {
    fetch(url + `/rooms/${formatDay(new Date())}`,
    {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        for (key in data.results[0]) {
            store[key] = data.results[0][key];
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

//Get calendar (rooms)
function getCalendarData(store) {
    fetch(url + '/rooms',
    {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        for (day of data) {
            let booked = 0;
            for (let i = 1; i <= 6; i++) {
                if (day[`room-${i}`] != 0) {
                    booked++;
                }
            }
            store.push(booked);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

//Get occupied (occupied)
function getOccupied(store) {
    fetch(url + `/occupied`,
    {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        for (let i = 1; i <= 6; i++) {
            store.push(data[0][i]);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

//Get customer info (billing and booking)
function getCustomerInfo(store, id) {
    fetch(url + `/customer-info/${id}`,
    {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        for (key in data.results[0]) {
            store[key] = data.results[0][key];
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

//Get customer info (billing and booking)
function getLookUp(store, field, value) {
    fetch(url + `/customer-info/${field}/${value}`,
    {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        store['entries'] = data.results.length;
        for (key in data.results[0]) {
            store[key] = data.results[0][key];
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
