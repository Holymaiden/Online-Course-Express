const connection = require("../../config/database");

async function findOneUser(username) {
  return connection
    .select("id", "username", "email", "avatar", "password")
    .from("users")
    .where({
      username: username,
      deleted_at: null,
    })
    .first();
}

async function getAllUser(limit, startIndex) {
  return connection
    .select("id", "username", "email", "avatar")
    .from("users")
    .where({ deleted_at: null })
    .limit(limit)
    .offset(startIndex);
}

async function getNumberOfUsers() {
  return connection("users").count("id as count").first();
}

async function createUser(data) {
  return connection
    .insert({
      username: data.username,
      password: data.password,
      email: data.email,
      avatar: data.avatar,
      created_at: new Date(),
    })
    .from("users")
    .then(function (id) {
      connection.insert({ user_id: id, role_id: 2 }).from("role_users");
      return connection
        .select("id", "username", "email", "avatar", "created_at")
        .from("users")
        .where("id", id[0]);
    });
}

async function updateUser(data, dataId) {
  return connection
    .update({
      username: data.username,
      password: data.password,
      email: data.email,
      avatar: data.avatar,
      updated_at: new Date(),
    })
    .from("users")
    .where({ id: dataId, deleted_at: null })
    .then(function () {
      return connection
        .select("id", "username", "email", "avatar", "created_at")
        .from("users")
        .where("id", dataId);
    });
}

async function destroyUser(dataId) {
  return connection
    .update({
      deleted_at: new Date(),
    })
    .from("users")
    .where("id", dataId);
}

module.exports = {
  findOneUser,
  createUser,
  getAllUser,
  getNumberOfUsers,
  destroyUser,
  updateUser,
};
