const url = 'http://localhost:3000';
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
    .then(data => store.push(data.days))
    .catch((error) => {
        console.error('Error:', error);
    });
}