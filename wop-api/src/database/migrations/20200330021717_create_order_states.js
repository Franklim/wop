const constants = require("../../utils/Constants")

exports.up = function(knex) {
    return knex.schema.createTable(constants.TABLE_ORDERS_STATES,function(table){
        table.increments();
        table.string('name').notNullable();
        table.string('description').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable(constants.TABLE_ORDERS_STATES)
};
