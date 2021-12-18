const { getUser } = require("../../../middleware/auth");
const { paginate } = require("../../helper/pagination");
const { createCategoryLog } = require("../../models/categoryModel");
const {
  getNumberOfCourses,
  getAllCourse,
  findOneCourse,
  getAllCoursePaging,
  getPopularCourse,
  createCourseLog,
  getAllCourseKursus,
} = require("../../models/courseModel");
const Response = require("../../response/response");

courseList = async (req, res) => {
  try {
    data = await getAllCourse();
    let user = await getUser(req, res);

    await data.forEach(async (element) => {
      await createCategoryLog(element.category_id, user.id);
      await createCourseLog(element.id, user.id);
    });

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

coursePagingList = async (req, res) => {
  try {
    // let data = await getNumberOfCourses();
    // const paging = await paginate(req.query.page, req.query.limit, data.count);
    data = await getAllCoursePaging(
      // paging.currentPage.limit,
      // paging.currentPage.startIndex,
      // req.query.sort,
      // req.query.ordinal,
      req.query.search
    );

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

courseKursusList = async (req, res) => {
  try {
    data = await getAllCourseKursus(
      req.query.category,
      req.query.instructor,
      req.query.star
    );

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

courseDetail = async (req, res) => {
  try {
    let data = await findOneCourse(req.params.slug);

    if (!data) {
      return res.status(404).json({ message: "data not found" });
    }
    if (req.headers.authorization) {
      let user = await getUser(req, res);
      if (user != undefined) {
        await createCategoryLog(data.category_id, user.id);
        await createCourseLog(data.id, user.id);
      }
    }

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

coursePopularList = async (req, res) => {
  try {
    let data = await getPopularCourse(req.query.limit);

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = {
  courseList,
  courseDetail,
  coursePagingList,
  coursePopularList,
  courseKursusList,
};
