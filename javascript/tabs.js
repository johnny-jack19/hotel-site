const todayTab = document.getElementById('today-tab');
const todayPage = document.getElementById('today');
todayTab.addEventListener('click', (e) => {
    openPage.classList.add('hidden');
    todayPage.classList.remove('hidden');
    openPage = todayPage;
});
const calendarTab = document.getElementById('calendar-tab');
const calendarPage = document.getElementById('calendar');
calendarTab.addEventListener('click', (e) => {
    openPage.classList.add('hidden');
    calendarPage.classList.remove('hidden');
    openPage = calendarPage
});
const bookingTab = document.getElementById('booking-tab');
const bookingPage = document.getElementById('booking');
bookingTab.addEventListener('click', (e) => {
    openPage.classList.add('hidden');
    bookingPage.classList.remove('hidden');
    openPage = bookingPage
});
const lookUpTab = document.getElementById('lookup-tab');
const lookUpPage = document.getElementById('look-up');
lookUpTab.addEventListener('click', (e) => {
    openPage.classList.add('hidden');
    lookUpPage.classList.remove('hidden');
    openPage = lookUpPage
});
const contactsTab = document.getElementById('contacts-tab');
const contactsPage = document.getElementById('contacts');
contactsTab.addEventListener('click', (e) => {
    openPage.classList.add('hidden');
    contactsPage.classList.remove('hidden');
    openPage = contactsPage
});
let openPage = todayPage;