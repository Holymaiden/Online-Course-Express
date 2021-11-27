const { createUser } = require("../../models/userModel");
const Response = require("../../response/response");
const { hashingPassword } = require("../../helper/hashPassword");
const genarateAccessToken = require("../../helper/genarateAccessToken");
const authValidation = require("../../validation/auth/auth.validation");

const upload = require("../../../config/multer");

/**
 * @param {Request} req
 * @param {Response} res
 * register user
 */
const register = async (req, res) => {
  try {
    upload.single("avatar")(req, res, async () => {
      authValidation(req, res);
      if (req.file == undefined) {
        return res.status(400).json({ message: "no file selected" });
      } else {
        try {
          let data = req.body;
          data.password = await hashingPassword(req.body.password, 10);
          data.avatar = req.file.path;
          let [user] = await createUser(data);

          const token = await genarateAccessToken(user);

          return Response.success(res, token);
        } catch (error) {
          return res.status(400).json({ err: error.message });
        }
      }
    });
  } catch (error) {
    if (error.code == "ER_DUP_ENTRY") {
      return res.status(403).json({
        message: "Email already registered",
      });
    }
  }
};
module.exports = register;
