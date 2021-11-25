exports.up = function (knex) {
  return knex.schema.createTable("role_users", (table) => {
    table.integer("user_id", 11).unsigned().notNullable();
    table.integer("role_id", 11).unsigned().notNullable();

    // add foreign keys:
    table.foreign("user_id").references("users.id");
    table.foreign("role_id").references("roles.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("role_users");
};
