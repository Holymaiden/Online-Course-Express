const connection = require("../../config/database");

async function findOneCourse(slug) {
  return connection
    .select(
      "course.id",
      "category.id as category_id",
      "category.title as category",
      "course.title",
      "course.slug",
      "course.content",
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

async function getAllCourse() {
  return connection
    .select(
      "course.id",
      "category.id as category_id",
      "category.title as category",
      "course.title",
      "course.slug",
      "course.content",
      "course.description",
      "course.price",
      "course.status",
      "course.created_at",
      "course.updated_at"
    )
    .from("course")
    .where({ "course.deleted_at": null, "category.deleted_at": null })
    .leftJoin("category", "category.id", "course.category_id");
}

async function getAllCoursePaging(
  // limit,
  // startIndex,
  // sort = "created_at",
  // ordinal = "DESC",
  search = null
) {
  let query = connection
    .select(
      "course.id",
      "category.id as category_id",
      "category.title as category",
      "course.title",
      "course.slug",
      "course.content",
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
    query = query.where("course.title", "like", `%${search}%`);
  }

  // query.orderBy(sort, ordinal).limit(limit).offset(startIndex);

  return query;
}

async function getAllCourseKursus(
  category = null,
  instructor = null,
  star = null
) {
  let query = connection
    .select(
      "course.id",
      "category.id as category_id",
      "category.title as category",
      "course.title",
      "course.slug",
      "course.content",
      "course.description",
      "course.price",
      "course.status",
      "users.username",
      "course.created_at",
      "course.updated_at"
    )
    .from("course")
    .where({ "course.deleted_at": null, "category.deleted_at": null })
    .leftJoin("category", "category.id", "course.category_id")
    .leftJoin("instructor", "course.id", "instructor.course_id")
    .leftJoin("users", "instructor.user_id", "users.id");

  if (category != "") {
    query = query.where("category.id", "like", `%${category}%`);
  }
  if (instructor != "") {
    query = query.where("users.id", "like", `%${instructor}%`);
  }

  // query.orderBy(sort, ordinal).limit(limit).offset(startIndex);

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
          "content",
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
      "content",
      "description",
      "price",
      "status",
      "created_at",
      "updated_at"
    )
    .from("course")
    .where("slug", "like", `%${slug}%`);
}

async function createCourseLog(courseId, userId) {
  return connection("course_log").insert({
    user_id: userId,
    course_id: courseId,
  });
}

async function getPopularCourse(limit) {
  return connection("course_log")
    .select(
      "course_log.id",
      "course.id as course_id",
      "course.title",
      "course.slug",
      "course.content",
      "course.description",
      "course.image",
      "course.price",
      "category.title as category_title",
      "users.username"
    )
    .count("course_log.id as total_view")
    .leftJoin("course", "course_log.course_id", "course.id")
    .leftJoin("category", "course.category_id", "category.id")
    .leftJoin("instructor", "course.id", "instructor.course_id")
    .leftJoin("users", "instructor.user_id", "users.id")
    .groupBy("course_log.course_id")
    .orderBy("total_view", "DESC")
    .limit(limit);
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
  getAllCoursePaging,
  createCourseLog,
  getPopularCourse,
  getAllCourseKursus,
};
