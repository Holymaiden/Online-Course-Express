const { updateUserProfle } = require("../../models/userModel");
const Response = require("../../response/response");
const { getUser } = require("../../../middleware/auth");

const isEmpty = require("../../helper/isEmpty");

const userProfileUpdate = async (req, res) => {
  try {
    const data = req.body;
    let user = await getUser(req, res);

    let users = await updateUserProfle(data, user.id);
    if (isEmpty(users)) {
      return Response.notFound(res, "User Tidak Ditemukan");
    }

    return Response.success(res, users);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = { userProfileUpdate };
