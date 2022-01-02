const express = require("express");
const {
  userProfileUpdate,
  userEmailUpdate,
  userPasswordUpdate,
} = require("../../src/controller/user/users.controller");

const router = express.Router();

/* GET user course listing. */
router.put("/", userProfileUpdate);
router.put("/email", userEmailUpdate);
router.put("/password", userPasswordUpdate);

module.exports = router;
