const express = require("express");
const router = express.Router();
const {
  teachingMaterialCreate,
  teachingMaterialUpdate,
  teachingMaterialDestroy,
} = require("../../src/controller/admin/teachingMaterial.controller");
const teachingMaterialValidation = require("../../src/validation/admin/teachingMaterial.validation");

router.post("/", teachingMaterialValidation, teachingMaterialCreate);
router.put("/:dataId", teachingMaterialValidation, teachingMaterialUpdate);
router.put("/destroy/:dataId", teachingMaterialDestroy);

module.exports = router;
