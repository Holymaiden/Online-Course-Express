exports.up = function (knex) {
  return knex.schema.createTable("course_log", (table) => {
    table.increments("id").primary();
    table.integer("course_id").unsigned();
    table.integer("user_id").unsigned();
    table.timestamp("created_at").defaultTo(knex.fn.now());

    // add foreign keys:
    table.foreign("course_id").references("course.id");
    table.foreign("user_id").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("course_log");
};
