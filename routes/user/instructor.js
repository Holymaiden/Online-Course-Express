const express = require("express");
const {
  instructorDetail,
} = require("../../src/controller/user/instructor.controller");

const router = express.Router();

/* GET instructor listing. */
router.get("/:id", instructorDetail);

module.exports = router;
