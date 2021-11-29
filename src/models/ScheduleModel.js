const connection = require("../../config/database");

async function findOneSchedule(id) {
  return connection
    .select(
      "course_schedule.id",
      "course.id as course_id",
      "course.title",
      "course_schedule.from",
      "course_schedule.until",
      "course_schedule.created_at",
      "course_schedule.updated_at"
    )
    .from("course_schedule")
    .where({
      "course_schedule.id": id,
      "course.deleted_at": null,
      "course_schedule.deleted_at": null,
    })
    .leftJoin("course", "course_schedule.course_id", "course.id")
    .first();
}

async function getAllSchedule() {
  return connection
    .select(
      "course_schedule.id",
      "course.id as course_id",
      "course.title",
      "course_schedule.from",
      "course_schedule.until",
      "course_schedule.created_at",
      "course_schedule.updated_at"
    )
    .from("course_schedule")
    .where({
      "course.deleted_at": null,
      "course_schedule.deleted_at": null,
    })
    .leftJoin("course", "course_schedule.course_id", "course.id");
}

async function getAllSchedulePaging(
  limit,
  startIndex,
  sort = "created_at",
  ordinal = "DESC",
  search = null
) {
  let query = connection
    .select(
      "course_schedule.id",
      "course.id as course_id",
      "course.title",
      "course_schedule.from",
      "course_schedule.until",
      "course_schedule.created_at",
      "course_schedule.updated_at"
    )
    .from("course_schedule")
    .where({
      "course_schedule.id": id,
      "course.deleted_at": null,
      "course_schedule.deleted_at": null,
    })
    .leftJoin("course", "course_schedule.course_id", "course.id");

  if (search != null) {
    query = query.where("course.title", "like", `%${search}%`);
  }

  query.orderBy(sort, ordinal).limit(limit).offset(startIndex);

  return query;
}

async function getNumberOfSchedules() {
  return connection("course_schedule")
    .count("id as count")
    .where({ deleted_at: null })
    .first();
}

async function createSchedule(data) {
  return connection
    .insert({
      course_id: data.course_id,
      from: data.from,
      until: data.until,
      created_at: new Date(),
    })
    .from("course_schedule")
    .then(function (id) {
      return connection
        .select(
          "course_schedule.id",
          "course.id as course_id",
          "course.title",
          "course_schedule.from",
          "course_schedule.until",
          "course_schedule.created_at",
          "course_schedule.updated_at"
        )
        .from("course_schedule")
        .where({
          "course_schedule.id": id,
          "course.deleted_at": null,
          "course_schedule.deleted_at": null,
        })
        .leftJoin("course", "course_schedule.course_id", "course.id");
    });
}

async function updateSchedule(id, data) {
  return connection
    .update({
      course_id: data.course_id,
      from: data.from,
      until: data.until,
      updated_at: new Date(),
    })
    .from("course_schedule")
    .where({
      id: id,
      deleted_at: null,
    });
}

async function destroySchedule(id) {
  return connection
    .from("course_schedule")
    .where({
      id: id,
    })
    .update({
      deleted_at: new Date(),
    });
}

module.exports = {
  findOneSchedule,
  createSchedule,
  getAllSchedule,
  getNumberOfSchedules,
  updateSchedule,
  destroySchedule,
  getAllSchedulePaging,
};
