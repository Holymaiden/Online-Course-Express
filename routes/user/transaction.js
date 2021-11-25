const express = require("express");
const {
  transactionUser,
} = require("../../src/controller/user/transaction.controller");

const router = express.Router();

/* GET users listing. */
router.get("/ID/:slug", transactionUser);

module.exports = router;
