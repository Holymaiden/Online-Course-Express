const express = require("express");
const {
  scheduleDetail,
  scheduleList,
  schedulePagingList,
} = require("../../src/controller/user/schedule.controller");

const router = express.Router();

/* GET schedule listing. */
router.get("/", scheduleList);
router.get("/paging/list", schedulePagingList);
router.get("/:dataId", scheduleDetail);

module.exports = router;
