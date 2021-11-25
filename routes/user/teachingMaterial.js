const express = require("express");
const {
  teachingMaterialList,
  teachingMaterialDetail,
} = require("../../src/controller/user/teachingMaterial.controller");

const router = express.Router();

/* GET users listing. */
router.get("/", teachingMaterialList);
router.get("/:slug", teachingMaterialDetail);

module.exports = router;
