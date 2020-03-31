exports.up = function(knex) {
    return knex.schema.createTable('orders_states',function(table){
        table.increments();
        table.string('name').notNullable();
        table.string('description').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders_states')
};
