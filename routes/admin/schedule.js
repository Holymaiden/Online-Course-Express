const express = require("express");
const router = express.Router();
const {
  scheduleCreate,
  scheduleDestroy,
  scheduleUpdate,
} = require("../../src/controller/admin/schedule.controller");

router.post("/", scheduleCreate);
router.put("/:dataId", scheduleUpdate);
router.put("/destroy/:dataId", scheduleDestroy);

module.exports = router;
