const connection = require("../../config/database");

async function findOneUser(username) {
  return connection
    .select(
      "id",
      "username",
      "email",
      "avatar",
      "password",
      "birth",
      "address",
      "status"
    )
    .from("users")
    .where({
      username: username,
      deleted_at: null,
    })
    .first();
}

async function getAllUser() {
  return connection
    .select("id", "username", "email", "avatar", "birth", "address", "status")
    .from("users")
    .where({ deleted_at: null });
}

async function getAllUserPaging(
  limit,
  startIndex,
  sort = "created_at",
  ordinal = "DESC",
  search = null
) {
  let query = connection
    .select("id", "username", "email", "avatar", "birth", "address", "status")
    .from("users")
    .where({ deleted_at: null });

  if (search != null) {
    query = query.where("title", "like", `%${search}%`);
  }

  query.orderBy(sort, ordinal).limit(limit).offset(startIndex);

  return query;
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
      birth: data.birth,
      address: data.address,
      status: data.status,
      created_at: new Date(),
    })
    .from("users")
    .then(function (id) {
      connection.insert({ user_id: id, role_id: 2 }).from("role_users");
      return connection
        .select(
          "id",
          "username",
          "email",
          "avatar",
          "birth",
          "address",
          "status",
          "created_at"
        )
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
      birth: data.birth,
      address: data.address,
      status: data.status,
      updated_at: new Date(),
    })
    .from("users")
    .where({ id: dataId, deleted_at: null })
    .then(function () {
      return connection
        .select(
          "id",
          "username",
          "email",
          "avatar",
          "birth",
          "address",
          "status",
          "created_at"
        )
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

async function updateUserProfle(data, dataId) {
  return connection
    .update({
      username: data.username,
      birth: data.birth,
      address: data.address,
      updated_at: new Date(),
    })
    .from("users")
    .where({ id: dataId, deleted_at: null })
    .then(function () {
      return connection
        .select(
          "id",
          "username",
          "email",
          "avatar",
          "birth",
          "address",
          "status"
        )
        .from("users")
        .where("id", dataId)
        .first();
    });
}

async function updateUserEmail(data, dataId) {
  return connection
    .update({
      email: data.email,
      updated_at: new Date(),
    })
    .from("users")
    .where({ id: dataId, deleted_at: null })
    .then(function () {
      return connection
        .select(
          "id",
          "username",
          "email",
          "avatar",
          "birth",
          "address",
          "status"
        )
        .from("users")
        .where("id", dataId)
        .first();
    });
}

module.exports = {
  findOneUser,
  createUser,
  getAllUser,
  getNumberOfUsers,
  destroyUser,
  updateUser,
  getAllUserPaging,
  updateUserProfle,
  updateUserEmail,
};
