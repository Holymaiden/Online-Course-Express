const express = require("express");
const router = express.Router();
const {
  userCourseDestroy,
  userCourseDetail,
  userCourseList,
  userCourseUpdate,
} = require("../../src/controller/admin/userCourse.controller");

router.get("/", userCourseList);
router.get("/:dataId", userCourseDetail);
router.put("/:dataId", userCourseUpdate);
router.put("/destroy/:courseId", userCourseDestroy);

module.exports = router;
