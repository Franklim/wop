const constants = require("../../utils/Constants")

exports.up = function(knex) {
    return knex.schema.createTable(constants.TABLE_PERSONS, function(table){
        table.increments();
        table.string('name').notNullable();
        table.string('address').notNullable();
        table.string('number').notNullable();
        table.string('distric').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('complement');
        table.string('mail').notNullable();
        table.string('phone');
        table.string('whatsapp');
        
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable(constants.TABLE_PERSONS);
};
