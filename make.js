function makeCal(day) {
    fetch('http://localhost:3000/book',
    {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(day)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

let mainCal = [];

for (let i = 0; i < 1000; i++) {
    let newDay = new Date();
    newDay.setDate(newDay.getDate() - 4);
    newDay.setDate(newDay.getDate() + i);
    let price = 250;
    if (newDay.getMonth() > 4 && newDay.getMonth() < 9) {
        price *= 1.5;
    }
    if (newDay.getDay() === 0 || newDay.getDay() === 5 || newDay.getDay() === 6) {
        price *= 1.25;
    }
    const calDay = {
        bookDate: `${newDay.getFullYear()}-${
            (newDay.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}-${
            newDay.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`,
        dayOfWeek: daysOfTheWeek[newDay.getDay()],
        price: price,
        vacant: 'Yes',
        trans: null
    }
    mainCal.push(calDay);
}

function startCal() {
    for (day of mainCal) {
        makeCal(day);
    }
}