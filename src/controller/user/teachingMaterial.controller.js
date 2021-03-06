const { getUser } = require("../../../middleware/auth");
const { paginate } = require("../../helper/pagination");
const { createCategoryLog } = require("../../models/categoryModel");
const {
  getAllTeachingMaterial,
  getNumberOfTeachingMaterials,
  findOneTeachingMaterial,
  getAllTeachingMaterialPaging,
  findTeachingMaterialBySlug,
  checkIfHave,
  getNumberOfTeachingMaterialsCom,
  getNumberOfTeachingMaterialsPen,
} = require("../../models/teachingMaterialModel");
const Response = require("../../response/response");
const isEmpty = require("../../helper/isEmpty");

teachingMaterialList = async (req, res) => {
  try {
    let data = await getAllTeachingMaterial();
    let user = await getUser(req, res);

    await data.forEach(async (element) => {
      await createCategoryLog(element.category_id, user.id);
    });

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

teachingMaterialPagingList = async (req, res) => {
  try {
    let data = await getNumberOfTeachingMaterials();
    const paging = await paginate(req.query.page, req.query.limit, data.count);
    data = await getAllTeachingMaterialPaging(
      paging.currentPage.limit,
      paging.currentPage.startIndex,
      req.query.sort,
      req.query.ordinal,
      req.query.search
    );
    let user = await getUser(req, res);

    await data.forEach(async (element) => {
      await createCategoryLog(element.category_id, user.id);
    });

    return Response.success(res, data, paging);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

teachingMaterialDetail = async (req, res) => {
  try {
    let data = await findOneTeachingMaterial(req.params.slug);

    if (!data) {
      return res.status(404).json({ message: "data not found" });
    }

    if (req.headers.authorization) {
      let user = await getUser(req, res);
      await createCategoryLog(data.category_id, user.id);
    }

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

teachingMaterialDetailSlug = async (req, res) => {
  try {
    let data = await findTeachingMaterialBySlug(req.params.slug);

    if (isEmpty(data)) {
      return res.status(404).json({ message: "data not found" });
    }

    if (req.headers.authorization) {
      let user = await getUser(req, res);
      await createCategoryLog(data.category_id, user.id);
    }

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

teachingMaterialExist = async (req, res) => {
  try {
    let user = await getUser(req, res);
    let data = await checkIfHave(user.id, req.params.slug);

    if (isEmpty(data)) {
      return Response.notFound(res, "Course Tidak Ditemukan");
    }

    return Response.success(res, data);
  } catch (error) {
    return Response.error(res, { err: error.message });
  }
};

teachingMaterialCom = async (req, res) => {
  try {
    let user = await getUser(req, res);
    let data = await getNumberOfTeachingMaterialsCom(user.id);

    if (isEmpty(data)) {
      return Response.notFound(res, "Data Tidak Ditemukan");
    }

    return Response.success(res, data);
  } catch (error) {
    return Response.error(res, { err: error.message });
  }
};

teachingMaterialPen = async (req, res) => {
  try {
    let user = await getUser(req, res);
    let data = await getNumberOfTeachingMaterialsPen(user.id);

    if (isEmpty(data)) {
      return Response.notFound(res, "Data Tidak Ditemukan");
    }

    return Response.success(res, data);
  } catch (error) {
    return Response.error(res, { err: error.message });
  }
};

module.exports = {
  teachingMaterialList,
  teachingMaterialDetail,
  teachingMaterialPagingList,
  teachingMaterialDetailSlug,
  teachingMaterialExist,
  teachingMaterialCom,
  teachingMaterialPen,
};
