const knex = require('./knex');

function createDay(day) {
    return knex('room5').insert(day);
}

module.exports = {createDay};