const { paginate } = require("../../helper/pagination");
const {
  getNumberOfUsers,
  getAllUser,
  destroyUser,
  updateUser,
  getAllUserPaging,
} = require("../../models/userModel");
const { hashingPassword } = require("../../helper/hashPassword");
const Response = require("../../response/response");
const upload = require("../../../config/multer");

const userList = async (req, res) => {
  try {
    let users = await getAllUser();

    return Response.success(res, users);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

const userPagingList = async (req, res) => {
  try {
    let data = await getNumberOfUsers();

    const paging = await paginate(req.query.page, req.query.limit, data.count);

    let users = await getAllUserPaging(
      paging.currentPage.limit,
      paging.currentPage.startIndex,
      req.query.sort,
      req.query.ordinal,
      req.query.search
    );

    return Response.success(res, users, paging);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

const userDestroy = async (req, res) => {
  try {
    users = await destroyUser(req.params.userId);

    return Response.success(res, "User deleted successfully");
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

const userUpdate = async (req, res) => {
  try {
    upload.single("avatar")(req, res, async () => {
      if (req.file == undefined) {
        return res.status(400).json({ message: "no file selected" });
      } else {
        try {
          const data = req.body;
          data.password = await hashingPassword(req.body.password, 10);
          data.avatar = "/" + req.file.path.slice(45, 76).replace("\\", "/");
          users = await updateUser(data, req.params.dataId);

          return Response.success(res, users);
        } catch (error) {
          return res.status(400).json({ err: error.message });
        }
      }
    });
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = { userList, userDestroy, userUpdate, userPagingList };
