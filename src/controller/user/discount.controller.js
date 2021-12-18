const { getUser } = require("../../../middleware/auth");

const { findOneDiscountByUser } = require("../../models/discountModel");
const Response = require("../../response/response");

discountByUser = async (req, res) => {
  const code = req.params.kode;
  try {
    let user = await getUser(req, res);

    data = await findOneDiscountByUser(code, user.id);

    if (data == undefined) {
      return Response.notFound(res, data);
    }

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = { discountByUser };
