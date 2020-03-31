exports.up = function(knex) {
    return knex.schema.createTable('users',function(table){
        table.increments();
        table.string('login').notNullable();
        table.string('password').notNullable();
        table.boolean('active').notNullable();

        table.integer('groupId').unsigned();
        table.foreign('groupId').references('id').inTable('groups');      

        table.integer('personId').unsigned();
        table.foreign('personId').references('id').inTable('persons');      
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
