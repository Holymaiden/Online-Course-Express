exports.up = function (knex) {
  return knex.schema.createTable("category", (table) => {
    table.increments("id").primary();
    table.string("title");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").nullable();
    table.datetime("deleted_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("category");
};
