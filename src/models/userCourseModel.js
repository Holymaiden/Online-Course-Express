const connection = require("../../config/database");

async function findOneUserCourse(dataId) {
  return connection
    .select(
      "user_course.id",
      "users.id as user_id",
      "users.username",
      "users.email",
      "users.avatar",
      "course.id as course_id",
      "course.title as course",
      "course.slug",
      "course.status",
      "user_course.created_at",
      "user_course.updated_at"
    )
    .from("user_course")
    .leftJoin("course", "user_course.course_id", "course.id")
    .leftJoin("users", "user_course.user_id", "users.id")
    .where({
      "user_course.id": dataId,
      "course.deleted_at": null,
      "users.deleted_at": null,
      "user_course.deleted_at": null,
    })
    .first();
}

async function getAllUserCourse() {
  return connection
    .select(
      "user_course.id",
      "users.id as user_id",
      "users.username",
      "users.email",
      "users.avatar",
      "course.id as course_id",
      "course.title as course",
      "course.slug",
      "course.status",
      "user_course.created_at",
      "user_course.updated_at"
    )
    .from("user_course")
    .leftJoin("course", "user_course.course_id", "course.id")
    .leftJoin("users", "user_course.user_id", "users.id")
    .where({
      "course.deleted_at": null,
      "users.deleted_at": null,
      "user_course.deleted_at": null,
    });
}

async function getAllUserCourseByUser(
  limit,
  startIndex,
  sort = "user_course.created_at",
  ordinal = "DESC",
  search = null,
  dataId
) {
  let query = connection
    .select(
      "user_course.id",
      "users.id as user_id",
      "users.username",
      "users.email",
      "users.avatar",
      "course.id as course_id",
      "course.title as course",
      "course.slug",
      "course.status",
      "user_course.created_at",
      "user_course.updated_at"
    )
    .from("user_course")
    .leftJoin("course", "user_course.course_id", "course.id")
    .leftJoin("users", "user_course.user_id", "users.id")
    .where({
      "course.deleted_at": null,
      "users.deleted_at": null,
      "user_course.deleted_at": null,
      "users.id": dataId,
    });

  if (search != null) {
    query = query.where("users.username", "like", `%${search}%`);
  }

  query.orderBy(sort, ordinal).limit(limit).offset(startIndex);

  return query;
}

async function getNumberOfUserCourses() {
  return connection("user_course")
    .count("id as count")
    .where({ deleted_at: null })
    .first();
}

async function createUserCourse(id, course) {
  return connection("user_course").insert({
    user_id: id,
    course_id: course,
  });
}

async function updateUserCourse(id, data) {
  return connection("user_course").where("id", id).update(data);
}

async function destroyUserCourse(id) {
  return connection
    .from("user_course")
    .where({
      id: id,
    })
    .update({
      deleted_at: new Date(),
    });
}

module.exports = {
  findOneUserCourse,
  createUserCourse,
  getAllUserCourse,
  getAllUserCourseByUser,
  getNumberOfUserCourses,
  updateUserCourse,
  destroyUserCourse,
};
