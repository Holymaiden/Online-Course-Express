const {
  findTransactionUser,
  paymentTransactionUser,
  transactionPerMonth,
  transactionPerMonthFail,
} = require("../../models/transactionModel");
const { UseDiscount } = require("../../models/discountModel");
const { getUser } = require("../../../middleware/auth");

const Response = require("../../response/response");

transactionUser = async (req, res) => {
  try {
    let user = await getUser(req, res);
    let data = await findTransactionUser(user.id, req.params.slug);

    if (!data) {
      return res.status(404).json({ message: "transaction not found" });
    }

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

transactionPerMonthList = async (req, res) => {
  try {
    let [data] = await transactionPerMonth();
    let [datas] = await transactionPerMonthFail();

    if (!data) {
      return res.status(404).json({ message: "transaction not found" });
    }

    return Response.success(res, data, datas);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

transactionPaymentUser = async (req, res) => {
  const datas = req.body;
  try {
    if (!datas.account_number && !datas.phone) {
      return Response.error(res, data);
    }
    let user = await getUser(req, res);
    let data = await paymentTransactionUser(datas, user.id);

    if (data == undefined) {
      return Response.error(res, data);
    }

    if (datas.discount) {
      await UseDiscount(datas.discount);
    }
    // await createUserCourse(user.id, datas.course_id);
    return Response.success(res, data);
  } catch (error) {
    return Response.error(res, data);
  }
};

module.exports = {
  transactionUser,
  transactionPaymentUser,
  transactionPerMonthList,
};
