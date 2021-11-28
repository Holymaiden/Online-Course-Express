const express = require("express");
const router = express.Router();
const {
  instructorCreate,
  instructorDestroy,
  instructorUpdate,
  instructorList,
  instructorPagingList,
} = require("../../src/controller/admin/instructor.controller");

router.get("/", instructorList);
router.get("/paging/list", instructorPagingList);
router.post("/", instructorCreate);
router.put("/:dataId", instructorUpdate);
router.put("/destroy/:dataId", instructorDestroy);

module.exports = router;
