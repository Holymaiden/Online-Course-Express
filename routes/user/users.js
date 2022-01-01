const express = require("express");
const {
  userProfileUpdate,
} = require("../../src/controller/user/users.controller");

const router = express.Router();

/* GET user course listing. */
router.post("/", userProfileUpdate);

module.exports = router;
