const express = require("express");
const {
  teachingMaterialList,
  teachingMaterialDetail,
  teachingMaterialPagingList,
  teachingMaterialDetailSlug,
} = require("../../src/controller/user/teachingMaterial.controller");

const router = express.Router();

/* GET users listing. */
router.get("/", teachingMaterialList);
router.get("/paging/list", teachingMaterialPagingList);
router.get("/:slug", teachingMaterialDetail);
router.get("/slug/:slug", teachingMaterialDetailSlug);
module.exports = router;
