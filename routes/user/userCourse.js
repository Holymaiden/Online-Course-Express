const express = require("express");
const {
  userCourseListByUser,
  userCourseCreate,
} = require("../../src/controller/user/userCourse.controller");

const router = express.Router();

/* GET user course listing. */
router.get("/ID", userCourseListByUser);
router.post("/", userCourseCreate);

module.exports = router;
