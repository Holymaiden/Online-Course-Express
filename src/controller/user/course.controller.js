const { getUser } = require("../../../middleware/auth");
const { paginate } = require("../../helper/pagination");
const { createCategoryLog } = require("../../models/categoryModel");
const {
  getNumberOfCourses,
  getAllCourse,
  findOneCourse,
} = require("../../models/courseModel");
const Response = require("../../response/response");

courseList = async (req, res) => {
  try {
    let data = await getNumberOfCourses();
    const paging = await paginate(req.query.page, req.query.limit, data.count);
    data = await getAllCourse(
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

courseDetail = async (req, res) => {
  try {
    let data = await findOneCourse(req.params.slug);
    let user = await getUser(req, res);

    if (!data) {
      return res.status(404).json({ message: "data not found" });
    }

    await createCategoryLog(data.category_id, user.id);

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = { courseList, courseDetail };
