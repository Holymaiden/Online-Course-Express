const {
  createInstructor,
  updateInstructor,
  destroyInstructor,
  getAllInstructor,
  getNumberOfInstructors,
} = require("../../models/instructorModel");
const { paginate } = require("../../helper/pagination");
const Response = require("../../response/response");

instructorList = async (req, res) => {
  try {
    let data = await getNumberOfInstructors();
    const paging = await paginate(req.query.page, req.query.limit, data.count);
    data = await getAllInstructor(
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

instructorCreate = async (req, res) => {
  try {
    let data = req.body;
    data = await createInstructor(data);

    return Response.success(res, data);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

instructorUpdate = async (req, res) => {
  try {
    // upload.single("file")(req, res, async () => {
    let data = req.body;
    await updateInstructor(req.params.dataId, data);

    return Response.success(res, data);
    // });
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

instructorDestroy = async (req, res) => {
  try {
    data = await destroyInstructor(req.params.dataId);

    return Response.success(res, "Instructor deleted successfully");
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = {
  instructorCreate,
  instructorUpdate,
  instructorList,
  instructorDestroy,
};
