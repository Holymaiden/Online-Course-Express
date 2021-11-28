const connection = require("../../config/database");

async function findOneCart(dataId) {
  return connection
    .select(
      "cart.id",
      "cart.price",
      "users.id as user_id",
      "users.username",
      "users.email",
      "users.avatar",
      "course.id as course_id",
      "course.title as course",
      "course.slug",
      "course.status",
      "cart.created_at",
      "cart.updated_at"
    )
    .from("cart")
    .leftJoin("course", "cart.course_id", "course.id")
    .leftJoin("users", "cart.user_id", "users.id")
    .where({
      "cart.id": dataId,
      "course.deleted_at": null,
      "users.deleted_at": null,
    })
    .first();
}

async function getAllCart() {
  return connection
    .select(
      "cart.id",
      "cart.price",
      "users.id as user_id",
      "users.username",
      "users.email",
      "users.avatar",
      "course.id as course_id",
      "course.title as course",
      "course.slug",
      "course.status",
      "cart.created_at",
      "cart.updated_at"
    )
    .from("cart")
    .leftJoin("course", "cart.course_id", "course.id")
    .leftJoin("users", "cart.user_id", "users.id")
    .where({
      "course.deleted_at": null,
      "users.deleted_at": null,
    });
}

async function getAllCartByUser(dataId) {
  return connection
    .select(
      "cart.id",
      "cart.price",
      "users.id as user_id",
      "users.username",
      "users.email",
      "users.avatar",
      "course.id as course_id",
      "course.title as course",
      "course.slug",
      "course.status",
      "cart.created_at",
      "cart.updated_at"
    )
    .from("cart")
    .leftJoin("course", "cart.course_id", "course.id")
    .leftJoin("users", "cart.user_id", "users.id")
    .where({
      "course.deleted_at": null,
      "users.deleted_at": null,
      "users.id": dataId,
    });
}

async function getNumberOfCarts() {
  return connection("cart")
    .count("id as count")
    .where({ deleted_at: null })
    .first();
}

async function createCart(data) {
  return connection("cart")
    .insert({
      data,
    })
    .then(function (id) {
      return connection
        .select(
          "cart.id",
          "cart.price",
          "users.id as user_id",
          "users.username",
          "users.email",
          "users.avatar",
          "course.id as course_id",
          "course.title as course",
          "course.slug",
          "course.status",
          "cart.created_at",
          "cart.updated_at"
        )
        .from("cart")
        .leftJoin("course", "cart.course_id", "course.id")
        .leftJoin("users", "cart.user_id", "users.id")
        .where({
          "cart.id": id,
          "course.deleted_at": null,
          "users.deleted_at": null,
        });
    });
}

async function updateCart(id, data) {
  return connection("cart").where("id", id).update(data);
}

async function destroyCart(id) {
  return connection
    .from("cart")
    .where({
      id: id,
    })
    .update({
      deleted_at: new Date(),
    });
}

module.exports = {
  findOneCart,
  createCart,
  getAllCart,
  getAllCartByUser,
  getNumberOfCarts,
  updateCart,
  destroyCart,
};
