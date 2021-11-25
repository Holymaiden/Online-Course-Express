const express = require("express");
const router = express.Router();
const {
  cartCreate,
  cartDestroy,
  cartDetail,
  cartListByUser,
  cartUpdate,
} = require("../../src/controller/user/cart.controller");
// const courseValidation = require("../../src/validation/user/course.validation");

router.get("/:dataId", cartDetail);
router.get("/ID", cartListByUser);
router.post("/", cartCreate);
router.put("/:dataId", cartUpdate);
router.put("/destroy/:dataId", cartDestroy);

module.exports = router;
