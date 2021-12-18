const express = require("express");
const {
  discountByUser,
} = require("../../src/controller/user/discount.controller");

const router = express.Router();

/* GET discount listing. */
router.get("/by/users", discountByUser);

module.exports = router;
