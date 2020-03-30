const knex = require('knex');
const configuration = require('../utils/knexfile')

const connection = knex(configuration.development);

module.exports = connection;