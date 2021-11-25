const {
  updateUserCourse,
  getNumberOfUserCourses,
  getAllUserCourse,
  destroyUserCourse,
  findOneUserCourse,
} = require("../../models/userCourseModel");
const slug = require("slug");
const { paginate } = require("../../helper/pagination");
const Response = require("../../response/response");

userCourseList = async (req, res) => {
  try {
    let course = await getNumberOfUserCourses();
    const paging = await paginate(
      req.query.page,
      req.query.limit,
      course.count
    );
    course = await getAllUserCourse(
      paging.currentPage.limit,
      paging.currentPage.startIndex,
      req.query.sort,
      req.query.ordinal,
      req.query.search
    );

    return Response.success(res, course, paging);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

userCourseDetail = async (req, res) => {
  try {
    let data = await findOneUserCourse(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "data not found" });
    }

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

userCourseUpdate = async (req, res) => {
  try {
    let data = req.body;
    data.updated_at = new Date();
    await updateUserCourse(req.params.dataId, data);

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

userCourseDestroy = async (req, res) => {
  try {
    course = await destroyUserCourse(req.params.dataId);

    return Response.success(res, "User Course deleted successfully");
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = {
  userCourseDetail,
  userCourseUpdate,
  userCourseList,
  userCourseDestroy,
};
