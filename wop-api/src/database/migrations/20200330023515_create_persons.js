const constants = require("../../utils/Constants")

exports.up = function(knex) {
    return knex.schema.createTable(constants.TABLE_PERSONS, function(table){
        table.increments();
        table.string('name').notNullable();
        table.string('document').notNullable();
        table.string('address').notNullable();
        table.string('number').notNullable();
        table.string('district').notNullable();
        table.string('city').notNullable();
        table.string('state').notNullable();
        table.string('zipcode').notNullable();
        table.string('complement');
        table.string('mail').notNullable();
        table.string('phone');
        table.string('whatsapp');
        
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable(constants.TABLE_PERSONS);
};
