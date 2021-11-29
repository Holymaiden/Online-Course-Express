const { paginate } = require("../../helper/pagination");
const {
  getNumberOfSchedules,
  getAllSchedule,
  findOneSchedule,
  getAllSchedulePaging,
} = require("../../models/ScheduleModel");
const Response = require("../../response/response");

scheduleList = async (req, res) => {
  try {
    data = await getAllSchedule();

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

schedulePagingList = async (req, res) => {
  try {
    let data = await getNumberOfSchedules();
    const paging = await paginate(req.query.page, req.query.limit, data.count);
    data = await getAllSchedulePaging(
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

scheduleDetail = async (req, res) => {
  try {
    let data = await findOneSchedule(req.params.dataId);

    if (!data) {
      return res.status(404).json({ message: "data not found" });
    }

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = { scheduleList, scheduleDetail, schedulePagingList };
