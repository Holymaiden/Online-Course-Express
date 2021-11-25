exports.up = function (knex) {
  return knex.schema.createTable("category_log", (table) => {
    table.increments("id").primary();
    table.integer("category_id").unsigned();
    table.integer("user_id").unsigned();
    table.timestamp("created_at").defaultTo(knex.fn.now());

    // add foreign keys:
    table.foreign("category_id").references("category.id");
    table.foreign("user_id").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("category_log");
};
