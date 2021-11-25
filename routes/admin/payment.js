const express = require("express");
const router = express.Router();
const {
  paymentCreate,
  paymentDestroy,
  paymentDetail,
  paymentList,
  paymentUpdate,
} = require("../../src/controller/admin/payment.controller");
const paymentValidation = require("../../src/validation/admin/payment.validation");

router.get("/", paymentList);
router.get("/:dataId", paymentDetail);
router.post("/", paymentValidation, paymentCreate);
router.put("/:courseId", paymentValidation, paymentUpdate);
router.put("/destroy/:courseId", paymentDestroy);

module.exports = router;
