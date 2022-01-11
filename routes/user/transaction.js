const express = require("express");
const {
  transactionUser,
  transactionPaymentUser,
  transactionPerMonthList,
} = require("../../src/controller/user/transaction.controller");

const router = express.Router();

/* GET users listing. */
router.get("/ID/:slug", transactionUser);
router.post("/payment/", transactionPaymentUser);
router.get("/permonth/", transactionPerMonthList);

module.exports = router;
