//This file was used to add day to the SQL table

const url = 'http://localhost:3000';
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

