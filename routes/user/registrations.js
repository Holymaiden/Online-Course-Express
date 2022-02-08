const express = require("express");
const {
  registrationsCreate,
} = require("../../src/controller/user/registration.controller");

const router = express.Router();

/* GET registrations listing. */
router.post("/", registrationsCreate);

module.exports = router;
