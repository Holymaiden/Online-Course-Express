exports.up = function (knex) {
  return knex.schema.createTable("star", (table) => {
    table.increments("id").primary();
    table.integer("course_id").unsigned().nullable();
    table.integer("teaching_materials_id").unsigned().nullable();
    table.integer("instructor_id").unsigned().nullable();
    table.integer("user_id").unsigned();
    table.double("star").unsigned();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.datetime("deleted_at").nullable();

    // add foreign keys:
    table.foreign("course_id").references("course.id");
    table.foreign("user_id").references("users.id");
    table.foreign("teaching_materials_id").references("teaching_materials.id");
    table.foreign("instructor_id").references("instructor.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("star");
};
