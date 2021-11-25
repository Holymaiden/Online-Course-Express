const { paginate } = require("../../helper/pagination");
const { getAllCart, getNumberOfCarts } = require("../../models/cartModel");
const Response = require("../../response/response");

cartList = async (req, res) => {
  try {
    let data = await getNumberOfCarts();
    const paging = await paginate(req.query.page, req.query.limit, data.count);
    data = await getAllCart(
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

module.exports = { cartList };
