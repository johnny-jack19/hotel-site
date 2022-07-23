const calendarDates = document.getElementById('calendar_dates');
const calendarHeader = document.getElementById('calendar_header__month-year');
const months = [ ['July 2022', 31, 5], ['August 2022', 31, 1], ['September 2022', 30, 4], ['October 2022', 31, 6],
    ['November 2022', 30, 2], ['December 2022', 31, 4], ['January 2023', 31, 0], ['February 2023', 28, 3],
    ['March 2023', 31, 3], ['April 2023', 30, 6], ['May 2023', 31, 1], ['June 2023', 30, 4], ['July 2023', 31, 6],
    ['August 2023', 31, 2], ['September 2023', 30, 5], ['October 2023', 31, 0], ['November 2023', 30, 3],
    ['December 2023', 31, 5], ['January 2024', 31, 1], ['February 2024', 29, 4], ['March 2024', 31, 5],
    ['April 2024', 30, 1], ['May 2024', 31, 3], ['June 2024', 30, 6], ['July 2024', 31, 1], ['August 2024', 31, 4],
    ['September 2024', 30, 0], ['October 2024', 31, 2], ['November 2024', 30, 5], ['December 2024', 31, 0]
]
let monthViewed = 0;
let testRange = [];
for (let i = 1; i <= 915; i++) {
    testRange.push(i);
}

let k = 0;
for (let m = 0; m < 30; m++) {
    makeCal(`month-${m}`, months[m][1], months[m][2])
}


function makeCal(month, daysInMonth, startDate) {
    const monthSheet = document.createElement('div');
    monthSheet.classList.add('month');
    monthSheet.setAttribute('id', month)
    monthSheet.classList.add('hidden');
    calendarDates.appendChild(monthSheet);
    for (let i = 1; i <= 42; i++) {
        const dateSquare = document.createElement('div');
        dateSquare.classList.add('day');
        if (i < startDate) {
            dateSquare.classList.add('pad-date');
        } else if (i > startDate && i <= daysInMonth + startDate) {
            dateSquare.innerText = `${i - startDate} and k = ${testRange[k]}`;
            k++;
        } else if(startDate + daysInMonth > 35 || i <= 35) {
            dateSquare.classList.add('pad-date');
        }else {
            dateSquare.classList.add('post-pad-date');
        }
        monthSheet.appendChild(dateSquare);
    }

}

function changeMonth(input) {
    document.getElementById(`month-${monthViewed}`).classList.add('hidden');
    if (input === 'forward' && monthViewed < 29) {
        monthViewed++;
    }
    if (input === 'backward' && monthViewed > 0) {
        monthViewed--;
    }
    document.getElementById(`month-${monthViewed}`).classList.remove('hidden');
    calendarHeader.innerText = months[monthViewed][0];
}

calendarHeader.innerText = months[monthViewed][0];
document.getElementById(`month-${monthViewed}`).classList.remove('hidden');
// calendarDates.innerHTML = '';
// k = 0;
// for (let m = 0; m < 30; m++) {
//     makeCal(`month-${m}`, months[m][1], months[m][2])
// }
// document.getElementById(`month-${monthViewed}`).classList.remove('hidden');
