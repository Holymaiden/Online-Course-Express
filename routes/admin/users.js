const express = require("express");
const router = express.Router();
const {
  userList,
  userUpdate,
  userDestroy,
} = require("../../src/controller/admin/user.controller");

/* GET users listing. */
router.get("/", userList);
router.put("/destroy/:userId", userDestroy);
router.put("/:dataId", userUpdate);

module.exports = router;
