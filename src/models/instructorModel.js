const connection = require("../../config/database");

async function findOneInstructor(dataId) {
  return connection
    .select(
      "instructor.id",
      "users.id as user_id",
      "users.username",
      "users.email",
      "users.avatar",
      "course.id as course_id",
      "course.title as course",
      "category.id as category_id",
      "category.title as category",
      "course.slug",
      "course.status",
      "course.created_at",
      "course.updated_at"
    )
    .from("instructor")
    .leftJoin("course", "instructor.course_id", "course.id")
    .leftJoin("users", "instructor.user_id", "users.id")
    .leftJoin("category", "course.category_id", "category.id")
    .where({
      "instructor.id": dataId,
      "course.deleted_at": null,
      "users.deleted_at": null,
      "category.deleted_at": null,
      "instructor.deleted_at": null,
    })
    .first();
}

async function getAllInstructor(
  limit,
  startIndex,
  sort = "instructor.created_at",
  ordinal = "DESC",
  search = null
) {
  let query = connection
    .select(
      "instructor.id",
      "users.id as user_id",
      "users.username",
      "users.email",
      "users.avatar",
      "course.id as course_id",
      "course.title as course",
      "category.id as category_id",
      "category.title as category",
      "course.slug",
      "course.status",
      "course.created_at",
      "course.updated_at"
    )
    .from("instructor")
    .leftJoin("course", "instructor.course_id", "course.id")
    .leftJoin("users", "instructor.user_id", "users.id")
    .leftJoin("category", "course.category_id", "category.id")
    .where({
      "course.deleted_at": null,
      "users.deleted_at": null,
      "category.deleted_at": null,
      "instructor.deleted_at": null,
    });

  if (search != null) {
    query = query.where("users.username", "like", `%${search}%`);
  }

  query.orderBy(sort, ordinal).limit(limit).offset(startIndex);

  return query;
}

async function getNumberOfInstructors() {
  return connection("instructor")
    .count("id as count")
    .where({ deleted_at: null })
    .first();
}

async function createInstructor(data) {
  return connection("instructor")
    .insert({
      user_id: data.user_id,
      course_id: data.course_id,
      created_at: new Date(),
    })
    .then(function (id) {
      return connection
        .select(
          "instructor.id",
          "users.id as user_id",
          "users.username",
          "users.email",
          "users.avatar",
          "course.id as course_id",
          "course.title as course",
          "category.id as category_id",
          "category.title as category",
          "course.slug",
          "course.status",
          "course.created_at",
          "course.updated_at"
        )
        .from("instructor")
        .leftJoin("course", "instructor.course_id", "course.id")
        .leftJoin("users", "instructor.user_id", "users.id")
        .leftJoin("category", "course.category_id", "category.id")
        .where({
          "instructor.id": id,
        });
    });
}

async function updateInstructor(id, data) {
  return connection("instructor")
    .where("id", id)
    .update({ user_id: data.user_id, course_id: data.course_id });
}

async function destroyInstructor(id) {
  return connection
    .from("instructor")
    .where({
      id: id,
    })
    .update({
      deleted_at: new Date(),
    });
}

module.exports = {
  findOneInstructor,
  createInstructor,
  getAllInstructor,
  getNumberOfInstructors,
  updateInstructor,
  destroyInstructor,
};
