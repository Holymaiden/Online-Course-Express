const { createUser } = require("../../models/userModel");
const Response = require("../../response/response");
const { hashingPassword } = require("../../helper/hashPassword");
const genarateAccessToken = require("../../helper/genarateAccessToken");

/**
 * @param {Request} req
 * @param {Response} res
 * register user
 */
const register = async (req, res) => {
  let data = req.body;

  try {
    data.password = await hashingPassword(req.body.password, 10);

    let [user] = await createUser(data);

    const token = await genarateAccessToken(user);

    return Response.success(res, token);
  } catch (error) {
    if (error.code == "ER_DUP_ENTRY") {
      return res.status(403).json({
        message: "Email already registered",
      });
    }
  }
};
module.exports = register;
