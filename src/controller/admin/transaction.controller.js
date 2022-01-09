const {
  createTransaction,
  destroyTransaction,
  findOneTransaction,
  getAllTransaction,
  getNumberOfTransactions,
  updateTransaction,
  getAllTransactionPaging,
} = require("../../models/transactionModel");
const { createUserCourse } = require("../../models/userCourseModel");

const { paginate } = require("../../helper/pagination");
const Response = require("../../response/response");

transactionList = async (req, res) => {
  try {
    let data = await getAllTransaction();

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

transactionPagingList = async (req, res) => {
  try {
    let data = await getNumberOfTransactions();
    const paging = await paginate(req.query.page, req.query.limit, data.count);
    data = await getAllTransactionPaging(
      paging.currentPage.limit,
      paging.currentPage.startIndex,
      req.query.sort,
      req.query.ordinal,
      req.query.search
    );

    return Response.success(res, data, paging);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

transactionDetail = async (req, res) => {
  try {
    let data = await findOneTransaction(req.params.dataId);

    if (!data) {
      return res.status(404).json({ message: "transaction not found" });
    }

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

transactionCreate = async (req, res) => {
  try {
    let data = req.body;
    data = await createTransaction(data);

    return Response.success(res, data);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

transactionUpdate = async (req, res) => {
  try {
    let data = req.body;

    let datas = await updateTransaction(req.params.dataId, data);

    if (datas.status == "Payed") {
      await createUserCourse(data.user_id, data.course_id);
    }

    return Response.success(res, datas);
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

transactionDestroy = async (req, res) => {
  try {
    data = await destroyTransaction(req.params.dataId);

    return Response.success(res, "Transaction deleted successfully");
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = {
  transactionDetail,
  transactionCreate,
  transactionUpdate,
  transactionList,
  transactionDestroy,
  transactionPagingList,
};
