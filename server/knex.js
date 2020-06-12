const knex = require('knex')(require('./config').knexConfig);

module.exports = knex;
