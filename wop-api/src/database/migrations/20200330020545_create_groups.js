const constants = require("../../utils/Constants")

exports.up = function(knex) {
    return knex.schema.createTable(constants.TABLE_GROUPS,function(table){
        table.increments();
        table.string('name').unique().notNullable();
        table.string('permissions');        
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable(constants.TABLE_GROUPS)
};
