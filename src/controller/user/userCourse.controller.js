const { getUser } = require("../../../middleware/auth");
const { paginate } = require("../../helper/pagination");
const {
  getAllUserCourseByUser,
  createUserCourse,
  getNumberOfUserCourses,
} = require("../../models/userCourseModel");
const Response = require("../../response/response");
const isEmpty = require("../../helper/isEmpty");

userCourseListByUser = async (req, res) => {
  try {
    let data = await getNumberOfUserCourses();
    let user = await getUser(req, res);
    const paging = await paginate(req.query.page, req.query.limit, data.count);
    data = await getAllUserCourseByUser(
      paging.currentPage.limit,
      paging.currentPage.startIndex,
      req.query.sort,
      req.query.ordinal,
      req.query.search,
      user.id
    );

    if (isEmpty(data)) {
      return Response.notFound(res, data);
    }

    return Response.success(res, data, paging);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

userCourseCreate = async (req, res) => {
  try {
    let data = req.body;
    data = await createUserCourse(data);

    return Response.success(res, data);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

module.exports = { userCourseListByUser, userCourseCreate };
