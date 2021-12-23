const express = require("express");
const router = express.Router();
const courseController = require("../../src/controller/admin/course.controller");
const courseValidation = require("../../src/validation/admin/course.validation");

router.get("/", courseController.courseList);
router.post("/", courseController.courseCreate);
router.put("/:courseId", courseController.courseUpdate);
router.put("/destroy/:courseId", courseController.courseDestroy);

module.exports = router;
