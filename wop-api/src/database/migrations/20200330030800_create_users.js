const constants = require("../../utils/Constants")

exports.up = function(knex) {
    return knex.schema.createTable(constants.TABLE_USERS,function(table){
        table.increments();
        table.string('login').notNullable();
        table.string('password').notNullable();
        table.boolean('active').notNullable();
        table.integer('groupId').notNullable();
        table.integer('personId').notNullable();        
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable(constants.TABLE_USERS)
};
