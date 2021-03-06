const {
  findOneInstructor,
  getAllInstructor,
} = require("../../models/instructorModel");
const Response = require("../../response/response");

instructorList = async (req, res) => {
  try {
    let data = await getAllInstructor();

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

instructorDetail = async (req, res) => {
  try {
    let data = await findOneInstructor(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "data not found" });
    }

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = { instructorDetail, instructorList };
