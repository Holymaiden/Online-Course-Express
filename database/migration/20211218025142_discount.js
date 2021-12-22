exports.up = function (knex) {
  return knex.schema.createTable("discount", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned();
    table.string("code", 50);
    table.string("discount", 50);
    table.double("persentase").notNullable();
    table.date("expired").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.datetime("deleted_at").nullable();

    // add foreign keys:
    table.foreign("user_id").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("discount");
};
