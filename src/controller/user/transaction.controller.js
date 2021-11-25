const { findTransactionUser } = require("../../models/transactionModel");
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

module.exports = {
  transactionUser,
};
