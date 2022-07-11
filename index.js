const url = 'http://localhost:3000'

const calendarElement = document.getElementById('calendar');

const today = new Date();

function formatDay(date) {
    return `${date.getFullYear()}-${
        (date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}-${
        date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`;
}

const formattedToday = formatDay(today);
console.log(formattedToday);
let  calendar = '';
function getCalendarData() {
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
        let testArr = '';
        for (info of data) {
            if (info.day === formattedToday) {
                testArr = info;
            }
        };
        calendar = data;
        console.log(testArr);
        console.log(testArr.day === formattedToday);
        calendarElement.innerHTML = testArr.day;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
