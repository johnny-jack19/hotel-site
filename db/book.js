const knex = require('./knex');

//Only for making calendar days
function createDay(day) {
    return knex('rooms').insert(day);
}

//Billing
function  makeCustomer(customer) {
    return knex('billing').insert(customer);
}

function deleteBilling(id) {
    return knex('billing').where('customer-id', id).del();
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
        [room]: 0
    });
}

function addBookingToRooms(room, booking, startDay, endDay) {
    return knex('rooms').whereBetween('day', [startDay, endDay]).update({
        [room]: booking
    });
}

//Occupied
function updateOccupied(room, id) {
    return knex('occupied').select('*').update({[room]: id});
}
//Gets
function getCustomer(field, value) {
    return knex('billing').where(field, value).select('*');
}

function getBooking(field, value) {
    return knex('booking').where(field, value).select('*');
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

function getOccupied() {
    return knex('occupied').select('*');
}

function getBookingAndCustomer(id) {
    return knex('booking').where('id', id).join('billing', 'booking.customer-id', '=', 'billing.customer-id')
    .select('*');
}

function getLookUp(field, value) {
    return knex('booking').where(field, value).join('billing', 'booking.customer-id', '=', 'billing.customer-id')
    .select('*');
}

module.exports = {
    createDay, makeCustomer, makeBooking,
    deleteBooking, deleteBilling, getCustomer,
    addBookingToRooms, deleteBookingFromRooms,
    getBooking, getCalendar, processBooking,
    getDay, getDayRange, getOccupied,
    getBookingAndCustomer, updateOccupied,
    getLookUp
};