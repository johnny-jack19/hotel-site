const knex = require('./knex');

//Only for making calendar days
function createDay(day) {
    return knex('rooms').insert(day);
}

//Billing
function  makeCustomer(customer) {
    return knex('billing').insert(customer);
}

function updateBilling(id, customer) {
    return knex('billing').where('customer-id', id).update(customer);
}

//Booking
function makeBooking(booking) {
    return knex('booking').insert(booking);
}

function deleteBooking(id) {
    return knex('booking').where('id', id).del();
}

function processBooking(id) {
    return knex('booking').where('id', id).update({
        processed: 'Processed'
    });
}

//Rooms
function deleteBookingFromRooms(room, booking) {
    return knex('rooms').where(room, booking).update({
        [room]: null
    });
}

function addBookingToRooms(room, booking, startDay, endDay) {
    return knex('rooms').whereBetween('day', [startDay, endDay]).update({
        [room]: booking
    });
}

//Gets
function getCustomer(field, id) {
    return knex('billing').where(field, id).select('*');
}

function getBooking(field, id) {
    return knex('booking').where(field, id).select('*');
}

function getCalendar() {
    return knex('rooms').select('*');
}

function getDay(day) {
    return knex('rooms').where('day', day).select('*');
}

function getDayRange(startDay, endDay) {
    return knex('rooms').whereBetween('day', [startDay, endDay]).select('*');
}

module.exports = {
    createDay, makeCustomer, makeBooking,
    deleteBooking, updateBilling, getCustomer,
    addBookingToRooms, deleteBookingFromRooms,
    getBooking, getCalendar, processBooking,
    getDay, getDayRange
};