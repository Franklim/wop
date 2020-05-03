const constants = require("../../utils/Constants")

exports.up = function(knex) {
    return knex.schema.createTable(constants.TABLE_PRODUCTS,function(table){
        table.increments();
        table.string('code').unique().notNullable();
        table.string('description').notNullable();
        table.string('barCode').notNullable();        
        table.string('supplier').notNullable();        
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable(constants.TABLE_PRODUCTS)
};
