exports.up = function (knex) {
  return knex.schema.createTable("cart", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.integer("course_id").unsigned().notNullable();
    table.double("price").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").nullable();
    table.datetime("deleted_at").nullable();

    // add foreign keys:
    table.foreign("user_id").references("users.id");
    table.foreign("course_id").references("course.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cart");
};
