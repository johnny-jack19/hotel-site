const calendarDates = document.getElementById('calendar_dates');
const calendarHeader = document.getElementById('calendar_header__month-year');

let startDate = 5;
let daysInMonth = 31;
for (let i = 1; i <= 42; i++) {
    const dateSquare = document.createElement('div');
    dateSquare.classList.add('day');
    if (i < startDate) {
        dateSquare.classList.add('pad-date');
    } else if (i > startDate && i <= daysInMonth + startDate) {
        dateSquare.innerText = i - startDate;
    } else if(startDate + daysInMonth > 35 || i <= 35) {
        dateSquare.classList.add('pad-date');
    }else {
        dateSquare.classList.add('post-pad-date');
    }
    calendarDates.appendChild(dateSquare);
}

calendarHeader.innerText = 'July 2022';

const months = [ ['July 2022', 31], ['August 2022', 31], ['September 2022', 30], ['October 2022', 31],
    ['November 2022', 30], ['December 2022', 31], ['January 2023', 31], ['February 2023', 28],
    ['March 2023', 31], ['April 2023', 30], ['May 2023', 31], ['June 2023', 30], ['July 2023', 31],
    ['August 2023', 31], ['September 2023', 30], ['October 2023', 31], ['November 2023', 30],
    ['December 2023', 31], ['January 2024', 31], ['February 2024', 29], ['March 2024', 31],
    ['April 2024', 30], ['May 2024', 31], ['June 2024', 30], ['July 2024', 31], ['August 2024', 31],
    ['September 2024', 30], ['October 2024', 31], ['November 2024', 30], ['December 2024', 31]
]

let testRange = [];
for (let i = 1; i <= 915; i++) {
    testRange.push(i);
}

let testMonths = {};

for (let i = 0; i < months.length; i++) {
    testMonths[months[i][0]] = testRange.splice(0, months[i][1]);
}

console.log(testMonths);
