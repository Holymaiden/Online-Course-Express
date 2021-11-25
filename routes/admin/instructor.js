const express = require("express");
const router = express.Router();
const {
  instructorCreate,
  instructorDestroy,
  instructorUpdate,
  instructorList,
} = require("../../src/controller/admin/instructor.controller");

router.get("/", instructorList);
router.post("/", instructorCreate);
router.put("/:dataId", instructorUpdate);
router.put("/destroy/:dataId", instructorDestroy);

module.exports = router;
