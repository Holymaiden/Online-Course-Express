const express = require("express");
const router = express.Router();
const categoryController = require("../../src/controller/user/category.controller");

router.get("/", categoryController.categoryList);
router.get("/paging", categoryController.categoryPagingList);

module.exports = router;
