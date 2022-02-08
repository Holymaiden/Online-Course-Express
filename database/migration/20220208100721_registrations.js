exports.up = function (knex) {
  return knex.schema.createTable("registrations", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned();
    table.string("cv", 50);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").nullable();
    table.datetime("deleted_at").nullable();

    // add foreign keys:
    table.foreign("user_id").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("registrations");
};
