const knex = require('./knex');

function createDay(day) {
    return knex('rooms').insert(day);
}

function  makeCustomer(customer) {
    return knex('billing').insert(customer);
}

function makeBooking(booking) {
    return knex('bookings').insert(booking);
}

function deleteBooking(id) {
    return knex('bookings').where('id', id).del();
}

function updateBilling(id, customer) {
    return knex('billing').where('customer-id', id).update(customer);
}

function updateRoom(day, room) {
    return knex('rooms').where('day', day).update(room);
}

function getCustomer(id) {
    return knex('billing').where('customer-id', id).select('*');
}

module.exports = {createDay, makeCustomer, makeBooking, deleteBooking,
    updateBilling, getCustomer, updateRoom};