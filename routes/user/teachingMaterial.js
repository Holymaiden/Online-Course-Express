const express = require("express");
const {
  teachingMaterialList,
  teachingMaterialDetail,
  teachingMaterialPagingList,
} = require("../../src/controller/user/teachingMaterial.controller");

const router = express.Router();

/* GET users listing. */
router.get("/", teachingMaterialList);
router.get("/paging/list", teachingMaterialPagingList);
router.get("/:slug", teachingMaterialDetail);

module.exports = router;
