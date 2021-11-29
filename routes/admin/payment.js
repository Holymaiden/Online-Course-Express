const express = require("express");
const router = express.Router();
const {
  paymentCreate,
  paymentDestroy,
  paymentDetail,
  paymentList,
  paymentUpdate,
  paymentPagingList,
} = require("../../src/controller/admin/payment.controller");
const paymentValidation = require("../../src/validation/admin/payment.validation");

router.get("/", paymentList);
router.get("/paging/list", paymentPagingList);
router.get("/:dataId", paymentDetail);
router.post("/", paymentValidation, paymentCreate);
router.put("/:dataId", paymentValidation, paymentUpdate);
router.put("/destroy/:dataId", paymentDestroy);

module.exports = router;
