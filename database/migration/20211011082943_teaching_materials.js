exports.up = function (knex) {
  return knex.schema.createTable("teaching_materials", (table) => {
    table.increments("id").primary();
    table.integer("course_id").unsigned();
    table.string("title");
    table.string("slug");
    table.text("content");
    table.text("description");
    table.integer("status").defaultTo("2");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").nullable();
    table.datetime("deleted_at").nullable();

    // add foreign keys:
    table.foreign("course_id").references("course.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("teaching_materials");
};
