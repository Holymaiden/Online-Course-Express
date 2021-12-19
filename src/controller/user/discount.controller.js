const { getUser } = require("../../../middleware/auth");

const { findOneDiscountByUser } = require("../../models/discountModel");
const Response = require("../../response/response");

discountByUser = async (req, res) => {
  try {
    const code = req.params.kode;
    let user = await getUser(req, res);
    let data = await findOneDiscountByUser(code, user.id);

    if (data == undefined) {
      return Response.error(res, data);
    }

    if (data.deleted_at) {
      return Response.notFound(res, data);
    }

    return Response.success(res, data);
  } catch (error) {
    return Response.error(res, data);
  }
};

module.exports = { discountByUser };
