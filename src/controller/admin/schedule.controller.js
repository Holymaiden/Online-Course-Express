const {
  createSchedule,
  updateSchedule,
  destroySchedule,
} = require("../../models/ScheduleModel");
const Response = require("../../response/response");

scheduleCreate = async (req, res) => {
  try {
    let data = req.body;

    data = await createSchedule(data);

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

scheduleUpdate = async (req, res) => {
  try {
    let data = req.body;
    data = await updateSchedule(req.params.dataId, data);
    console.log(data);

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

scheduleDestroy = async (req, res) => {
  try {
    let data = await destroySchedule(req.params.dataId);

    return Response.success(res, "Schedule deleted successfully");
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = { scheduleCreate, scheduleUpdate, scheduleDestroy };
