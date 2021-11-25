const { getUser } = require("../../../middleware/auth");
const {
  createCart,
  destroyCart,
  findOneCart,
  getAllCartByUser,
  updateCart,
} = require("../../models/cartModel");
const Response = require("../../response/response");

cartListByUser = async (req, res) => {
  try {
    let user = await getUser(req, res);

    data = await getAllCartByUser(user.id);

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

cartDetail = async (req, res) => {
  try {
    let data = await findOneCart(req.params.dataId);

    if (!data) {
      return res.status(404).json({ message: "data not found" });
    }

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

cartCreate = async (req, res) => {
  try {
    let data = req.body;
    data = await createCart(data);

    return Response.success(res, data);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

cartUpdate = async (req, res) => {
  try {
    let data = req.body;
    data.updated_at = new Date();
    await updateCart(req.params.dataId, data);

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

cartDestroy = async (req, res) => {
  try {
    course = await destroyCart(req.params.dataId);

    return Response.success(res, "Cart deleted successfully");
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = {
  cartListByUser,
  cartDetail,
  cartCreate,
  cartUpdate,
  cartDestroy,
};
