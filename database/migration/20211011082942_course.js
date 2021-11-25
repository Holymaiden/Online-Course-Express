exports.up = function (knex) {
  return knex.schema.createTable("course", (table) => {
    table.increments("id").primary();
    table.integer("category_id").unsigned();
    table.string("title");
    table.string("slug");
    table.string("image");
    table.text("description");
    table.integer("price");
    table.integer("status");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").nullable();
    table.datetime("deleted_at").nullable();

    // add foreign keys:
    table.foreign("category_id").references("category.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("course");
};
