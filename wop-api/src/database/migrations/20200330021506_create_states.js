const constants = require("../../utils/Constants")

exports.up = function(knex) {
    return knex.schema.createTable(constants.TABLE_STATES,function(table){
        table.increments();
        table.string('name').notNullable();
        table.string('shortName').notNullable();        
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable(constants.TABLE_STATES)
};
