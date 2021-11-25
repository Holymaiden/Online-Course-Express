const express = require("express");
const router = express.Router();
const { cartList } = require("../../src/controller/admin/cart.controller");
// const courseValidation = require("../../src/validation/admin/course.validation");

router.get("/", cartList);

module.exports = router;
