let states = 'Alabama,Alaska,Arizona,Arkansas,California,Colorado,Connecticut,Delaware,Florida,Georgia,Hawaii,Idaho,Illinois,Indiana,Iowa,Kansas,Kentucky,Louisiana,Maine,Maryland,Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York,North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming'
let myStates = states.split(',');
const url = 'http://localhost:3000'

const today = new Date();



const slides = document.querySelectorAll(".slide");

slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});
let currentSlide = 0;
let maxSlide = slides.length - 1;


const nextSlide = document.querySelector(".btn-next");
nextSlide.addEventListener("click", function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - currentSlide)}%)`;
  });
});

const prevSlide = document.querySelector(".btn-prev");
prevSlide.addEventListener("click", function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else {
    currentSlide--;
  }

  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - currentSlide)}%)`;
  });
});

//Hero
const heroSlides = document.querySelectorAll(".hero-slide");

heroSlides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});
let currentHeroSlide = 0;
let maxHeroSlide = heroSlides.length - 1;

function heroCarousel() {
  if (currentHeroSlide === maxHeroSlide) {
    currentHeroSlide = 0;
  } else {
    currentHeroSlide++;
  }
  heroSlides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - currentHeroSlide)}%)`;
  });
}

setInterval(heroCarousel, 5000);

//********************************************Booking**********************************************
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modal-overlay');
const bookingDates = {};
const customerInfo = {};
const parseIndex = {'single-queen': 'Single Queen', 'double-queen': 'Double Queen', 'single-king': 'Single King'};
let myRooms;
let openRooms;
let bedRooms = {};
let price = {
    'single-queen': 0,
    'double-queen': 0,
    'single-king': 0
};
function formatDay(date) {
  return `${date.getFullYear()}-${
      (date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}-${
      date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`;
}
const bookingCheckIn = document.getElementById('check-in');
const bookingCheckOut = document.getElementById('check-out');
bookingCheckIn.min = new Date().toLocaleDateString('en-ca');

bookingCheckIn.addEventListener('change', (e) => {
    let checkInValue = new Date(bookingCheckIn.value)
    bookingCheckOut.disabled = false;
    bookingCheckOut.min = new Date(checkInValue.getTime() + 126400000).toLocaleDateString('en-ca');
});
document.getElementById("avail-form").addEventListener("submit", (e) => {
  modal.innerHTML = (`
    <button class="close" onclick="closeModal()">X</button>
    <h3>Rooms Available</h3>
    <p class="loading">LOADING...</p>
  `);
  modal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
  getAvailability();
  e.preventDefault();
});

function getAvailability() {
  let formData = new FormData(document.getElementById("avail-form"));
  for ([key, value] of formData) {
      bookingDates[key] = value;
  }
  document.getElementById("avail-form").reset();
  return new Promise((resolve, reject) => {
      return resolve(checkRoomRange());
  })
  .then(() => {
      return new Promise((resolve, reject) => {
          setTimeout(() => resolve(sortRooms()), 1000);
      });
  })
  .then(() => {
      setTimeout(() => {
          disableRooms(), 1000
      });
  });
}

function disableRooms() {
  let single = `
    <div id="single-queen" class="avail-room">
      <p>Single Queen</p>
      <p>Price for room: $${price['single-queen'].toFixed(2)}</p>
    </div>
  `;
  let double = `
    <div id="double-queen" class="avail-room">
      <p>Double Queen</p>
      <p>Price for room: $${price['double-queen'].toFixed(2)}</p>
    </div>
  `;
  let king = `
    <div id="single-king" class="avail-room">
      <p>Single King</p>
      <p>Price for room: $${price['single-king'].toFixed(2)}</p>
    </div>
  `;
  if (bedRooms[!'single-queen']) {
    let single = '';
  }
  if (!bedRooms['double-queen']) {
    let double = '';
  }
  if (!bedRooms['single-king']) {
    let king = '';
  }
  modal.innerHTML = (`
    <button class="close" onclick="closeModal()">X</button>
    <h3>Rooms Available</h3>
    <div class="room-options">
    ${single}
    ${double}
    ${king}
    </div>
  `);
  document.getElementById('single-queen').addEventListener('click', (e) => {
    customerInfo.bed = 'single-queen';
    addToBooking();
    modalBook();
  });
  document.getElementById('double-queen').addEventListener('click', (e) => {
    customerInfo.bed = 'double-queen';
    addToBooking();
    modalBook();
  });
  document.getElementById('single-king').addEventListener('click', (e) => {
    customerInfo.bed = 'single-king';
    addToBooking();
    modalBook();
  });
}

function checkRoomRange() {
  myRooms = [];
  openRooms = {
      'room-1': true,
      'room-2': true,
      'room-3': true,
      'room-4': true,
      'room-5': true,
      'room-6': true
  };
  checkRooms(myRooms, bookingDates['check-in'], formatDay(new Date(bookingDates['check-out'])));
}

function sortRooms() {
  price = {'single-queen': 0, 'double-queen': 0, 'single-king': 0};
  for (days of myRooms) {
      for (let i = 1; i < 7; i++) {
          if (days[`room-${i}`] != 0) {
              openRooms[`room-${i}`] = false;
          }
      }
      price['single-queen'] += days['single-queen'];
      price['double-queen'] += days['double-queen'];
      price['single-king'] += days['single-king'];
  }
  bedRooms['single-queen'] = (openRooms['room-1'] || openRooms['room-2']);
  bedRooms['double-queen'] = (openRooms['room-3'] || openRooms['room-4']);
  bedRooms['single-king'] = (openRooms['room-5'] || openRooms['room-6']);
}

function getForm(store, id) {
  let formData = new FormData(document.getElementById(id));
  for ([key, value] of formData) {
      store[key] = value;
  }
  document.getElementById(id).reset();
}

function addToBooking() {
  if (customerInfo['bed'] === 'single-queen') {
    customerInfo['room-cost'] = price['single-queen'];
      if (openRooms['room-1']) {
        customerInfo.room = 1;
      } else {
        customerInfo.room = 2;
      }
  } else if (customerInfo['bed'] === 'double-queen') {
    customerInfo['room-cost'] = price['double-queen'];
      if (openRooms['room-3']) {
        customerInfo.room = 3;
      } else {
        customerInfo.room = 4;
      }
  } else {
    customerInfo['room-cost'] = price['single-king'];
      if (openRooms['room-5']) {
        customerInfo.room = 5;
      } else {
        customerInfo.room = 6;
      }
  }
}

function closeModal() {
    modal.classList.add('hidden');
    modalOverlay.classList.add('hidden');
}

function modalBook() {
  modal.innerHTML = (`
  <button class="close" onclick="closeModal()">X</button>
  <h3>Personal Information</h3>
  <form id="modal_book-form">
      <label for="first-name">
          First Name
          <input type="text" id="first-name" name="first-name" pattern="[^0-9]{2,}" required>
      </label>
      <label for="last-name">
          Last Name
          <input type="text" id="last-name" name="last-name" pattern="[^0-9]{2,}" required>
      </label>
      <label for="phone">
          Phone Number
          <input type="tel" id="phone" name="phone" minlength="10" maxlength="11" required>
      </label>
      <label for="email">
          Email
          <input type="email" id="email" name="email" required>
      </label>
      <label for="address">
          Billing Address
          <input type="text" id="address" name="address" required>
      </label>
      <label for="city">
          City
          <input type="text" id="city" name="city" required>
      </label>
      <label for="zip">
          Zip Code
          <input type="text" id="zip" name="zip" required pattern="[0-9]{5}">
      </label>
      <label for="state">
          State
          <select id="state" name="state" required></select>
      </label>
      <input type="submit">
  </form>
  `);
  for (state of myStates) {
      let stateOption = `<option value="${state}">${state}</option>`
      document.getElementById('state').innerHTML += stateOption;
  }
  document.getElementById("modal_book-form").addEventListener("submit", (e) => {
      getForm(customerInfo, "modal_book-form");
      modal.innerHTML = (`
      <button class="close" onclick="closeModal()">X</button>
      <h3>Credit Card Information</h3>
      <form onsubmit="confirmBooking();return false" id="modal_book-form">
        <label class="full" for="card-name">
          Name on Card
          <input type="text" id="card-name" name="card-name" pattern="[^0-9]{2,}" required>
        </label>
        <label class="full" for="card-number">
            Card Number
            <input type="text" id="card-number" name="card-number" pattern="[0-9]{15,}" required>
        </label>
        <label for="cvc">
            CVC
            <input type="text" id="cvc" name="cvc" required minlength="3" maxlength="4" pattern="[0-9]+">
        </label>
        <label for="exp-date">
            Expiration Date
            <input type="month" id="exp-date" name="exp-date" required>
        </label>
        <input type="submit">
      </form>
      `);
      e.preventDefault();
  });
}

function confirmBooking() {
  getForm(customerInfo, "modal_book-form");
  modal.innerHTML = (`
  <button class="close" onclick="closeModal()">X</button>
  <h3>Booking</h3>
  <div class="booking-info-modal">
      <div>First Name: ${customerInfo['first-name']}</div>
      <div>Last Name: ${customerInfo['last-name']}</div>
      <div>Phone Number: ${customerInfo['phone']}</div>
      <div>Email: ${customerInfo['email']}</div>
  </div>
  <div class="check-row">
      <div>Check-In: ${bookingDates['check-in']}</div>
      <div>Check-Out: ${bookingDates['check-out']}</div>
  </div>
  <div class="check-row">
      <div>Room Type: ${parseIndex[customerInfo['bed']]}</div>
      <div>Room: ${customerInfo.room}</div>
  </div>
  <div class="check-row">
      <div>Room Cost: $${customerInfo['room-cost'].toFixed(2)}</div>
      <div>Taxes: $${(customerInfo['room-cost'] * .06).toFixed(2)}</div>
      <div>Cleaning Fee: $50.00</div>
      <div>Total Cost: $${(customerInfo['room-cost'] * 1.06 + 50).toFixed(2)}</div>
  </div>
  <div class="button-row">
      <button onclick="createNewBooking()">Confirm</button>
      <button onclick="closeModal()">Cancel</button>
  <div>
  `)
}

function createNewBooking() {
  const billing = {
      'first-name': customerInfo['first-name'],
      'last-name': customerInfo['last-name'],
      'email': customerInfo['email'],
      'phone': customerInfo['phone'],
      'address': customerInfo['address'],
      'city': customerInfo['city'],
      'state': customerInfo['state'],
      'zip': customerInfo['zip'],
      'name-on-card': customerInfo['card-name'],
      'card-number': customerInfo['card-number'],
      'cvc': customerInfo['cvc'],
      'exp-date': customerInfo['exp-date']
  }

  const booking = {
      'name': `${customerInfo['first-name']} ${customerInfo['last-name']}`,
      'check-in': bookingDates['check-in'],
      'check-out': bookingDates['check-out'],
      'number-of-days': ((new Date(bookingDates['check-out']) - new Date(bookingDates['check-in'])) / 1000 / 60 / 60 / 24),
      'room': customerInfo.room,
      'room-cost': customerInfo['room-cost'],
      'total-cost': (customerInfo['room-cost'] * 1.06 + 50).toFixed(2)
  }

  return new Promise((resolve, reject) => {
      return resolve(makeNewCustomer(booking, billing));
  })
  .then(() => {
      return new Promise((resolve, reject) => {
          setTimeout(() => resolve(makeNewBooking(booking)), 1000);
      });
  })
  .then(() => {
      return new Promise((resolve, reject) => {
          setTimeout(() => resolve(addBookingToRooms(`room-${booking.room}`, booking.id, booking['check-in'], formatDay(new Date(booking['check-out'])))), 1000);
      })
  })
  .then(() => {
      setTimeout(() => {
          modal.innerHTML = (`
          <button class="close" onclick="closeModal()">X</button>
          <h3>Room Reserved</h3>
          <p class="loading">Your booking ID is: ${booking.id}</p>
      `)})
  });
}