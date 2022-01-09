const {
  createPayment,
  destroyPayment,
  findOnePayment,
  getAllPayment,
  getNumberOfPayments,
  updatePayment,
  getAllPaymentPaging,
} = require("../../models/paymentModel");
const { paginate } = require("../../helper/pagination");
const Response = require("../../response/response");

paymentList = async (req, res) => {
  try {
    let data = await getAllPayment();
    console.log(data);

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

paymentPagingList = async (req, res) => {
  try {
    let data = await getNumberOfPayments();
    const paging = await paginate(req.query.page, req.query.limit, data.count);
    data = await getAllPaymentPaging(
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

paymentDetail = async (req, res) => {
  try {
    let data = await findOnePayment(req.params.dataId);

    if (!data) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

paymentCreate = async (req, res) => {
  try {
    let data = req.body;
    data = await createPayment(data);

    return Response.success(res, data);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

paymentUpdate = async (req, res) => {
  try {
    let data = req.body;
    await updatePayment(req.params.dataId, data);

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

paymentDestroy = async (req, res) => {
  try {
    data = await destroyPayment(req.params.dataId);

    return Response.success(res, "Payment deleted successfully");
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = {
  paymentDetail,
  paymentCreate,
  paymentUpdate,
  paymentList,
  paymentDestroy,
  paymentPagingList,
};
