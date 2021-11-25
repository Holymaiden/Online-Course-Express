const connection = require("../../config/database");

async function findOneCourse(slug) {
  return connection
    .select(
      "course.id",
      "category.id as category_id",
      "category.title as category",
      "course.title",
      "course.slug",
      "course.description",
      "course.price",
      "course.status",
      "course.created_at",
      "course.updated_at"
    )
    .from("course")
    .where({
      "course.slug": slug,
      "course.deleted_at": null,
      "category.deleted_at": null,
    })
    .leftJoin("category", "category.id", "course.category_id")
    .first();
}

async function getAllCourse(
  limit,
  startIndex,
  sort = "created_at",
  ordinal = "DESC",
  search = null
) {
  let query = connection
    .select(
      "course.id",
      "category.id as category_id",
      "category.title as category",
      "course.title",
      "course.slug",
      "course.description",
      "course.price",
      "course.status",
      "course.created_at",
      "course.updated_at"
    )
    .from("course")
    .where({ "course.deleted_at": null, "category.deleted_at": null })
    .leftJoin("category", "category.id", "course.category_id");

  if (search != null) {
    query = query.where("title", "like", `%${search}%`);
  }

  query.orderBy(sort, ordinal).limit(limit).offset(startIndex);

  return query;
}

async function getNumberOfCourses() {
  return connection("course")
    .count("id as count")
    .where({ deleted_at: null })
    .first();
}

async function getNumberOfFreeCourses() {
  return connection("course")
    .count("id as count")
    .where({ deleted_at: null, price: 0 })
    .first();
}

async function createCourse(data) {
  return connection
    .insert({
      category_id: data.category_id,
      title: data.title,
      description: data.description,
      price: data.price,
      slug: data.slug,
      created_at: new Date(),
    })
    .from("course")
    .then(function (id) {
      return connection
        .select(
          "id",
          "title",
          "slug",
          "image",
          "description",
          "price",
          "status",
          "created_at"
        )
        .from("course")
        .where("id", id);
    });
}

async function updateCourse(id, data) {
  return connection
    .update({
      category_id: data.category_id,
      title: data.title,
      description: data.description,
      price: data.price,
      slug: data.slug,
      status: data.status,
      updated_at: new Date(),
    })
    .from("course")
    .where("id", id);
}

async function destroyCourse(id) {
  return connection
    .from("course")
    .where({
      id: id,
    })
    .update({
      deleted_at: new Date(),
    });
}

async function checkSlug(slug) {
  return connection
    .select(
      "id",
      "title",
      "slug",
      "description",
      "price",
      "status",
      "created_at",
      "updated_at"
    )
    .from("course")
    .where("slug", "like", `%${slug}%`);
}

module.exports = {
  findOneCourse,
  createCourse,
  getAllCourse,
  getNumberOfCourses,
  getNumberOfFreeCourses,
  updateCourse,
  destroyCourse,
  checkSlug,
};
