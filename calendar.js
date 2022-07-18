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