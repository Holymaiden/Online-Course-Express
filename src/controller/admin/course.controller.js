const {
  createCourse,
  checkSlug,
  updateCourse,
  getNumberOfCourses,
  getAllCourse,
  destroyCourse,
} = require("../../models/courseModel");
const slug = require("slug");
const { paginate } = require("../../helper/pagination");
const Response = require("../../response/response");
const courseValidation = require("../../../src/validation/admin/course.validation");
const upload = require("../../../config/multer-image");

courseList = async (req, res) => {
  try {
    let course = await getNumberOfCourses();
    const paging = await paginate(
      req.query.page,
      req.query.limit,
      course.count
    );
    course = await getAllCourse(
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

courseCreate = async (req, res) => {
  try {
    upload.single("image")(req, res, async () => {
      // courseValidation(req, res);
      let data = req.body;

      data.slug = slug(req.body.title);
      let slugData = await checkSlug(data.slug);
      data.slug = `${data.slug}-${slugData.length}`;
      if (req.file == undefined) {
        try {
          data = await createCourse(data);

          return Response.success(res, data);
        } catch (error) {
          return Response.error(res, "intinya error");
        }
      } else {
        try {
          data.image = "/" + req.file.path.slice(45, 76).replace("\\", "/");
          data = await createCourse(data);

          return Response.success(res, data);
        } catch (error) {
          return Response.error(res, "intinya error");
        }
      }
    });
  } catch (error) {
    if (error.code == "ER_DUP_ENTRY") {
      return res.status(403).json({
        message: "Course already registered",
      });
    }
  }
};

courseUpdate = async (req, res) => {
  try {
    upload.single("image")(req, res, async () => {
      // courseValidation(req, res);
      let data = req.body;
      data.slug = slug(req.body.title);
      let slugData = await checkSlug(data.slug);
      data.slug = `${data.slug}-${slugData.length}`;
      if (req.file == undefined) {
        await updateCourse(req.params.courseId, data);

        return Response.success(res, data);
      } else {
        try {
          data.image = "/" + req.file.path.slice(45, 76).replace("\\", "/");
          await updateCourse(req.params.courseId, data);

          return Response.success(res, data);
        } catch (error) {
          return res.status(400).json({ err: error.message });
        }
      }
    });
  } catch (error) {
    return Response.error(res, "intinya error");
  }
};

courseDestroy = async (req, res) => {
  try {
    course = await destroyCourse(req.params.courseId);

    return Response.success(res, "Course deleted successfully");
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = { courseCreate, courseUpdate, courseList, courseDestroy };
