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