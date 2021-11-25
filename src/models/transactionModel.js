const connection = require("../../config/database");

async function findOneTransaction(dataId) {
  return connection
    .select(
      "transaction.id",
      "users.id as user_id",
      "users.username",
      "users.email",
      "course.id as course_id",
      "course.title as course",
      "course.slug",
      "course.status",
      "payment.id as payment_id",
      "payment.name as payment",
      "payment.account_number",
      "transaction.created_at",
      "transaction.updated_at"
    )
    .from("transaction")
    .leftJoin("course", "transaction.course_id", "course.id")
    .leftJoin("users", "transaction.user_id", "users.id")
    .leftJoin("payment", "transaction.payment_id", "payment.id")
    .where({
      "transaction.id": dataId,
      "transaction.deleted_at": null,
      "users.deleted_at": null,
      "course.deleted_at": null,
      "payment.deleted_at": null,
    })
    .first();
}

async function findTransactionUser(dataId, slug) {
  return connection
    .select(
      "transaction.id",
      "transaction.user_id",
      "course.id as course_id",
      "course.title as course",
      "course.slug",
      "course.status",
      "transaction.created_at",
      "transaction.updated_at"
    )
    .from("transaction")
    .leftJoin("course", "transaction.course_id", "course.id")
    .where({
      "transaction.user_id": dataId,
      "transaction.deleted_at": null,
      "users.deleted_at": null,
      "course.deleted_at": null,
      "course.slug": slug,
    });
}

async function getAllTransaction(
  limit,
  startIndex,
  sort = "transaction.created_at",
  ordinal = "DESC",
  search = null
) {
  let query = connection
    .select(
      "transaction.id",
      "users.id as user_id",
      "users.username",
      "users.email",
      "course.id as course_id",
      "course.title as course",
      "course.slug",
      "course.status",
      "payment.id as payment_id",
      "payment.name as payment",
      "payment.account_number",
      "transaction.created_at",
      "transaction.updated_at"
    )
    .from("transaction")
    .leftJoin("course", "transaction.course_id", "course.id")
    .leftJoin("users", "transaction.user_id", "users.id")
    .leftJoin("payment", "transaction.payment_id", "payment.id")
    .where({
      "transaction.deleted_at": null,
      "users.deleted_at": null,
      "course.deleted_at": null,
      "payment.deleted_at": null,
    });

  if (search != null) {
    query = query.where("users.username", "like", `%${search}%`);
  }

  query.orderBy(sort, ordinal).limit(limit).offset(startIndex);

  return query;
}

async function getNumberOfTransactions() {
  return connection("transaction")
    .count("id as count")
    .where({ deleted_at: null })
    .first();
}

async function createTransaction(data) {
  return connection("transaction")
    .insert({
      data,
    })
    .then(function (id) {
      return connection
        .select(
          "transaction.id",
          "users.id as user_id",
          "users.username",
          "users.email",
          "course.id as course_id",
          "course.title as course",
          "course.slug",
          "course.status",
          "payment.id as payment_id",
          "payment.name as payment",
          "payment.account_number",
          "transaction.created_at",
          "transaction.updated_at"
        )
        .from("transaction")
        .leftJoin("course", "transaction.course_id", "course.id")
        .leftJoin("users", "transaction.user_id", "users.id")
        .leftJoin("payment", "transaction.payment_id", "payment.id")
        .where({
          "transaction.id": id,
          "transaction.deleted_at": null,
          "users.deleted_at": null,
          "course.deleted_at": null,
          "payment.deleted_at": null,
        });
    });
}

async function updateTransaction(id, data) {
  return connection("transaction").where("id", id).update(data);
}

async function destroyTransaction(id) {
  return connection
    .from("transaction")
    .where({
      id: id,
    })
    .update({
      deleted_at: new Date(),
    });
}

module.exports = {
  findOneTransaction,
  findTransactionUser,
  createTransaction,
  getAllTransaction,
  getNumberOfTransactions,
  updateTransaction,
  destroyTransaction,
};
