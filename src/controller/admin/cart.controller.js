const { paginate } = require("../../helper/pagination");
const { getAllCart, getNumberOfCarts } = require("../../models/cartModel");
const Response = require("../../response/response");

cartList = async (req, res) => {
  try {
    let data = await getAllCart();

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = { cartList };
