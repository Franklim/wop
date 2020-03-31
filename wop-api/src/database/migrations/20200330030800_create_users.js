const constants = require("../../utils/Constants")

exports.up = function(knex) {
    return knex.schema.createTable(constants.TABLE_USERS,function(table){
        table.increments();
        table.string('login').notNullable();
        table.string('password').notNullable();
        table.boolean('active').notNullable();

        table.integer('groupId').unsigned();
        table.foreign('groupId').references('id').inTable(constants.TABLE_GROUPS);      

        table.integer('personId').unsigned();
        table.foreign('personId').references('id').inTable(constants.TABLE_PERSONS);      
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable(constants.TABLE_USERS)
};
