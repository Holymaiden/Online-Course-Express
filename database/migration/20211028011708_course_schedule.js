exports.up = function (knex) {
  return knex.schema.createTable("course_schedule", (table) => {
    table.increments("id").primary();
    table.integer("course_id").unsigned().notNullable();
    table.datetime("from").notNullable();
    table.datetime("until").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").nullable();
    table.datetime("deleted_at").nullable();

    // add foreign keys:
    table.foreign("course_id").references("course.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("course_schedule");
};
