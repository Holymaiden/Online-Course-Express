const express = require("express");
const { authAdminMiddleware } = require("../../middleware/auth");
const router = express.Router();
const summaryContoller = require("../../src/controller/admin/summary.controller");

router.get("/", authAdminMiddleware, summaryContoller.summaryList);

module.exports = router;
