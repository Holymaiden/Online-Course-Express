const express = require("express");
const CourseController = require("../../src/controller/user/course.controller");

const router = express.Router();

/* GET users listing. */
router.get("/", CourseController.courseList);
router.get("/paging/list", CourseController.coursePagingList);
router.get("/:slug", CourseController.courseDetail);
router.get("/popular/list", CourseController.coursePopularList);

module.exports = router;
