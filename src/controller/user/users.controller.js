const {
  updateUserProfle,
  updateUserEmail,
  updateUserPassword,
} = require("../../models/userModel");
const Response = require("../../response/response");
const { getUser } = require("../../../middleware/auth");
const { getRoleUser } = require("../../models/roleModel");
const genarateAccessToken = require("../../helper/genarateAccessToken");
const { hashingPassword } = require("../../helper/hashPassword");

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

const userEmailUpdate = async (req, res) => {
  try {
    const data = req.body;
    let user = await getUser(req, res);
    let users = await updateUserEmail(data, user.id);
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

const userPasswordUpdate = async (req, res) => {
  try {
    const data = req.body;
    let user = await getUser(req, res);
    data.password = await hashingPassword(req.body.password, 10);
    let users = await updateUserPassword(data, user.id);
    if (isEmpty(users)) {
      return Response.notFound(res, "User Tidak Ditemukan");
    }

    return Response.success(res, users);
  } catch (error) {
    return Response.error(res, { err: error.message });
  }
};

module.exports = { userProfileUpdate, userEmailUpdate, userPasswordUpdate };
