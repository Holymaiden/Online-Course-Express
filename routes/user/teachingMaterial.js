const express = require("express");
const {
  teachingMaterialList,
  teachingMaterialDetail,
  teachingMaterialPagingList,
  teachingMaterialDetailSlug,
  teachingMaterialExist,
  teachingMaterialCom,
  teachingMaterialPen,
} = require("../../src/controller/user/teachingMaterial.controller");

const router = express.Router();

/* GET users listing. */
router.get("/", teachingMaterialList);
router.get("/paging/list", teachingMaterialPagingList);
router.get("/:slug", teachingMaterialDetail);
router.get("/slug/:slug", teachingMaterialDetailSlug);
router.get("/have/:slug", teachingMaterialExist);
router.get("/number/com", teachingMaterialCom);
router.get("/number/pen", teachingMaterialPen);

module.exports = router;
