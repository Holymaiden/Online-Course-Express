const connection = require("../../config/database");

async function findOneDiscountByUser(code, id) {
  let check = new Date().toISOString().substring(0, 10);
  return connection
    .select(
      "discount.id",
      "discount.code",
      "discount.discount",
      "discount.persentase",
      "discount.expired",
      "discount.created_at",
      "discount.deleted_at"
    )
    .from("discount")
    .where({
      "discount.code": code,
      "users.id": id,
      "users.deleted_at": null,
    })
    .andWhere(function () {
      this.where("discount.expired", ">=", check);
    })
    .leftJoin("users", "discount.user_id", "users.id")
    .first();
}

async function UseDiscount(id) {
  return connection
    .from("discount")
    .where({ id: id })
    .update({ deleted_at: new Date() });
}

module.exports = { findOneDiscountByUser, UseDiscount };
