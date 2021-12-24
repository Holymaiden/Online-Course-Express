const express = require("express");
const router = express.Router();
const {
  teachingMaterialCreate,
  teachingMaterialUpdate,
  teachingMaterialDestroy,
} = require("../../src/controller/admin/teachingMaterial.controller");

router.post("/", teachingMaterialCreate);
router.put("/:dataId", teachingMaterialUpdate);
router.put("/destroy/:dataId", teachingMaterialDestroy);

module.exports = router;
