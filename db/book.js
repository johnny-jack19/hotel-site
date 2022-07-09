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
    return knex('bookings').insert(booking);
}

function deleteBooking(id) {
    return knex('bookings').where('id', id).del();
}

//Rooms
function deleteBookingFromRooms(room, booking) {
    return knex('rooms').where(room, booking).update({
        [room]: null
    });
}

function addBookingToRooms(room, booking, day) {
    return knex('rooms').where('day', day).update({
        [room]: booking
    });
}

//Gets
function getCustomer(field, id) {
    return knex('billing').where(field, id).select('*');
}

module.exports = {
    createDay, makeCustomer, makeBooking,
    deleteBooking, updateBilling, getCustomer,
    addBookingToRooms, deleteBookingFromRooms};