const connection = require("../../config/database");

async function findOneCategory(id) {
  return connection
    .select("id", "title", "created_at", "updated_at")
    .from("category")
    .where({
      id: id,
    })
    .first();
}

async function getAllCategory() {
  return connection
    .select("id", "title", "created_at", "updated_at")
    .from("category");
}

async function getAllCategoryPaging(
  limit,
  startIndex,
  sort = "created_at",
  ordinal = "DESC",
  search = null
) {
  let query = connection
    .select("id", "title", "created_at", "updated_at")
    .from("category");

  if (search != null) {
    query = query.where("title", "like", `%${search}%`);
  }

  query.orderBy(sort, ordinal).limit(limit).offset(startIndex);

  return query;
}

async function getNumberOfCategory() {
  return connection("category").count("id as count").first();
}

async function createCategoryLog(categoryId, userId) {
  return connection("category_log").insert({
    user_id: userId,
    category_id: categoryId,
  });
}

async function getPopularCategory() {
  return connection("category_log")
    .select(
      "category.id",
      "category.id as category_id",
      "category.title as category"
    )
    .count("category_log.id as total_view")
    .leftJoin("category", "category.id", "category_log.category_id")
    .groupBy("category_log.category_id")
    .orderBy("total_view", "DESC");
}

module.exports = {
  findOneCategory,
  getAllCategory,
  getNumberOfCategory,
  createCategoryLog,
  getPopularCategory,
  getAllCategoryPaging,
};
