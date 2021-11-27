const connection = require("../../config/database");

async function findOnePayment(dataId) {
  return connection
    .select("id", "name", "account_number", "created_at", "updated_at")
    .from("payment")
    .where({
      "payment.id": dataId,
    })
    .first();
}

async function getAllPayment(
  limit,
  startIndex,
  sort = "created_at",
  ordinal = "DESC",
  search = null
) {
  let query = connection
    .select("id", "name", "account_number", "created_at", "updated_at")
    .from("payment")
    .where({ deleted_at: null });

  if (search != null) {
    query = query.where("name", "like", `%${search}%`);
  }

  query.orderBy(sort, ordinal).limit(limit).offset(startIndex);

  return query;
}

async function getNumberOfPayments() {
  return connection("payment")
    .count("id as count")
    .where({ deleted_at: null })
    .first();
}

async function createPayment(data) {
  return connection("payment")
    .insert({
      data,
    })
    .then(function (id) {
      return connection
        .select("id", "name", "account_number", "created_at")
        .from("payment")
        .where({ id: id });
    });
}

async function updatePayment(id, data) {
  return connection("payment").where("id", id).update(data);
}

async function destroyPayment(id) {
  return connection
    .from("payment")
    .where({
      id: id,
    })
    .update({
      deleted_at: new Date(),
    });
}

module.exports = {
  findOnePayment,
  createPayment,
  getAllPayment,
  getNumberOfPayments,
  updatePayment,
  destroyPayment,
};