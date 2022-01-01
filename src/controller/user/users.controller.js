const { updateUserProfle } = require("../../models/userModel");
const Response = require("../../response/response");
const { getUser } = require("../../../middleware/auth");
const { getRoleUser } = require("../../models/roleModel");
const genarateAccessToken = require("../../helper/genarateAccessToken");

const isEmpty = require("../../helper/isEmpty");

const userProfileUpdate = async (req, res) => {
  try {
    const data = req.body;
    let user = await getUser(req, res);
    let users = await updateUserProfle(data, user.id);
    users.role = await getRoleUser(user.id);
    if (isEmpty(users)) {
      return Response.notFound(res, "User Tidak Ditemukan");
    }

    const token = await genarateAccessToken(users);

    return Response.success(res, token);
  } catch (error) {
    return Response.error(res, { err: error.message });
  }
};

module.exports = { userProfileUpdate };
