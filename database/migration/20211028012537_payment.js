exports.up = function (knex) {
  return knex.schema.createTable("payment", (table) => {
    table.increments("id").primary();
    table.integer("cart_id").unsigned().notNullable();
    table.string("name").nullable();
    table.string("account_number").nullable();
    table.string("bank").nullable();
    table.string("phone").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").nullable();
    table.datetime("deleted_at").nullable();

    table.foreign("cart_id").references("cart.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("payment");
};
