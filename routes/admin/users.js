const express = require("express");
const router = express.Router();
const { authAdminMiddleware } = require("../../middleware/auth");
const {
  userList,
  userUpdate,
  userDestroy,
} = require("../../src/controller/admin/user.controller");

/* GET users listing. */
router.get("/", authAdminMiddleware, userList);
router.put("/destroy/:userId", authAdminMiddleware, userDestroy);
router.put("/:dataId", authAdminMiddleware, userUpdate);

module.exports = router;
