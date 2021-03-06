const express = require("express");
const router = express.Router();
const {
  transactionCreate,
  transactionDestroy,
  transactionDetail,
  transactionList,
  transactionUpdate,
  transactionPagingList,
} = require("../../src/controller/admin/transaction.controller");

router.get("/", transactionList);
router.get("/paging/list", transactionPagingList);
router.get("/:dataId", transactionDetail);
router.post("/", transactionCreate);
router.put("/:dataId", transactionUpdate);
router.put("/destroy/:dataId", transactionDestroy);

module.exports = router;
