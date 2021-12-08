const express = require("express");
const {
  instructorDetail,
  instructorList,
} = require("../../src/controller/user/instructor.controller");

const router = express.Router();

/* GET instructor listing. */
router.get("/:id", instructorDetail);
router.get("/", instructorList);

module.exports = router;
