const connection = require("../../config/database");
const isEmpty = require("../helper/isEmpty");

async function createRegistrations(data) {
  let query = connection
    .insert({ user_id: data.user_id })
    .from("registrations");

  if (!isEmpty(data.cv)) {
    query = query.insert({ cv: data.cv, user_id: data.user_id });
  }

  return query;
}

module.exports = { createRegistrations };
