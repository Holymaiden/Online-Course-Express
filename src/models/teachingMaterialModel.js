const connection = require("../../config/database");

async function findOneTeachingMaterial(slug) {
  return connection
    .select(
      "teaching_materials.id",
      "course.id as course_id",
      "category.id as category_id",
      "category.title as category",
      "course.title as course_title",
      "teaching_materials.title",
      "teaching_materials.slug",
      "teaching_materials.content",
      "teaching_materials.description",
      "teaching_materials.status",
      "teaching_materials.created_at",
      "teaching_materials.updated_at"
    )
    .from("teaching_materials")
    .where({
      "teaching_materials.slug": slug,
      "course.deleted_at": null,
      "category.deleted_at": null,
      "teaching_materials.deleted_at": null,
    })
    .leftJoin("course", "teaching_materials.course_id", "course.id")
    .leftJoin("category", "category.id", "course.category_id")
    .first();
}

async function findTeachingMaterialBySlug(slug) {
  return connection
    .select(
      "teaching_materials.id",
      "category.id as category_id",
      "category.title as category",
      "course.id as course_id",
      "course.title as course_title",
      "teaching_materials.title",
      "teaching_materials.slug",
      "teaching_materials.content",
      "teaching_materials.description",
      "teaching_materials.status",
      "teaching_materials.created_at",
      "teaching_materials.updated_at"
    )
    .from("teaching_materials")
    .where({
      "course.slug": slug,
      "course.deleted_at": null,
      "category.deleted_at": null,
      "teaching_materials.deleted_at": null,
    })
    .leftJoin("course", "teaching_materials.course_id", "course.id")
    .leftJoin("category", "course.category_id", "category.id");
}

async function getAllTeachingMaterial() {
  return connection
    .select(
      "teaching_materials.id",
      "course.id as course_id",
      "category.id as category_id",
      "category.title as category",
      "course.title as course_title",
      "teaching_materials.title",
      "teaching_materials.slug",
      "teaching_materials.content",
      "teaching_materials.description",
      "teaching_materials.status",
      "teaching_materials.created_at",
      "teaching_materials.updated_at"
    )
    .from("teaching_materials")
    .where({
      "course.deleted_at": null,
      "category.deleted_at": null,
      "teaching_materials.deleted_at": null,
    })
    .leftJoin("course", "teaching_materials.course_id", "course.id")
    .leftJoin("category", "category.id", "course.category_id");
}

async function getAllTeachingMaterialPaging(
  limit,
  startIndex,
  sort = "teaching_materials.created_at",
  ordinal = "DESC",
  search = null
) {
  let query = connection
    .select(
      "teaching_materials.id",
      "course.id as course_id",
      "category.id as category_id",
      "category.title as category",
      "course.title as course_title",
      "teaching_materials.title",
      "teaching_materials.slug",
      "teaching_materials.content",
      "teaching_materials.description",
      "teaching_materials.status",
      "teaching_materials.created_at",
      "teaching_materials.updated_at"
    )
    .from("teaching_materials")
    .where({
      "course.deleted_at": null,
      "category.deleted_at": null,
      "teaching_materials.deleted_at": null,
    })
    .leftJoin("course", "teaching_materials.course_id", "course.id")
    .leftJoin("category", "category.id", "course.category_id");

  if (search != null) {
    query = query.where("teaching_materials.title", "like", `%${search}%`);
  }

  query.orderBy(sort, ordinal).limit(limit).offset(startIndex);

  return query;
}

async function getNumberOfTeachingMaterials() {
  return connection("teaching_materials")
    .count("id as count")
    .where({ deleted_at: null })
    .first();
}

async function createTeachingMaterial(data) {
  return connection("teaching_materials")
    .insert({
      course_id: data.course_id,
      title: data.title,
      content: data.content,
      slug: data.slug,
      description: data.description,
    })
    .then(function (id) {
      return connection
        .select(
          "teaching_materials.id",
          "course.id as course_id",
          "category.id as category_id",
          "category.title as category",
          "course.title as course_title",
          "teaching_materials.title",
          "teaching_materials.slug",
          "teaching_materials.content",
          "teaching_materials.description",
          "teaching_materials.status",
          "teaching_materials.created_at",
          "teaching_materials.updated_at"
        )
        .from("teaching_materials")
        .where({
          "teaching_materials.id": id,
          "course.deleted_at": null,
          "category.deleted_at": null,
          "teaching_materials.deleted_at": null,
        })
        .leftJoin("course", "teaching_materials.course_id", "course.id")
        .leftJoin("category", "category.id", "course.category_id");
    });
}

async function updateTeachingMaterial(id, data) {
  return connection("teaching_materials").where("id", id).update({
    course_id: data.course_id,
    title: data.title,
    slug: data.slug,
    content: data.content,
    description: data.description,
    status: data.status,
    updated_at: new Date(),
  });
}

async function destroyTeachingMaterial(id) {
  return connection
    .from("teaching_materials")
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
      "course_id",
      "title",
      "slug",
      "content",
      "description",
      "status",
      "created_at",
      "updated_at"
    )
    .from("teaching_materials")
    .where("slug", "like", `%${slug}%`);
}

async function checkIfHave(id, slug) {
  return connection
    .select("user_course.course_id", "user_course.user_id")
    .from("user_course")
    .leftJoin("course", "user_course.course_id", "course.id")
    .where({
      "course.slug": slug,
      "user_course.user_id": id,
      "user_course.deleted_at": null,
    });
}

async function getNumberOfTeachingMaterialsCom(dataId) {
  return connection("teaching_materials")
    .leftJoin("course", "teaching_materials.course_id", "course.id")
    .leftJoin("instructor", "course.id", "instructor.course_id")
    .count("teaching_materials.id as count")
    .where({
      "instructor.deleted_at": null,
      "instructor.user_id": dataId,
      "teaching_materials.deleted_at": null,
      "course.deleted_at": null,
      "teaching_materials.status": "1",
    })
    .first();
}

async function getNumberOfTeachingMaterialsPen(dataId) {
  return connection("teaching_materials")
    .leftJoin("course", "teaching_materials.course_id", "course.id")
    .leftJoin("instructor", "course.id", "instructor.course_id")
    .count("teaching_materials.id as count")
    .where({
      "instructor.deleted_at": null,
      "instructor.user_id": dataId,
      "teaching_materials.deleted_at": null,
      "course.deleted_at": null,
      "teaching_materials.status": "2",
    })
    .first();
}

module.exports = {
  findOneTeachingMaterial,
  createTeachingMaterial,
  getAllTeachingMaterial,
  getNumberOfTeachingMaterials,
  updateTeachingMaterial,
  destroyTeachingMaterial,
  checkSlug,
  getAllTeachingMaterialPaging,
  findTeachingMaterialBySlug,
  checkIfHave,
  getNumberOfTeachingMaterialsCom,
  getNumberOfTeachingMaterialsPen,
};
