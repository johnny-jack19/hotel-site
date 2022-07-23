const knex = require('knex');

const connectedKnex = knex({
    client: 'sqlite3',
    connection: {
        filename: './db/hotel.sqlite3'
    }
});

module.exports = connectedKnex;