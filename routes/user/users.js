const express = require("express");
const {
  userProfileUpdate,
  userEmailUpdate,
} = require("../../src/controller/user/users.controller");

const router = express.Router();

/* GET user course listing. */
router.post("/", userProfileUpdate);
router.post("/email", userEmailUpdate);

module.exports = router;
