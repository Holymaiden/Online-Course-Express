const express = require("express");
const {
  teachingMaterialList,
  teachingMaterialDetail,
  teachingMaterialPagingList,
  teachingMaterialDetailSlug,
  teachingMaterialExist,
} = require("../../src/controller/user/teachingMaterial.controller");

const router = express.Router();

/* GET users listing. */
router.get("/", teachingMaterialList);
router.get("/paging/list", teachingMaterialPagingList);
router.get("/:slug", teachingMaterialDetail);
router.get("/slug/:slug", teachingMaterialDetailSlug);
router.get("/have/:slug", teachingMaterialExist);
module.exports = router;
