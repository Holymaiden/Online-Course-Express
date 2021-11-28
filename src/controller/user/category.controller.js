const { paginate } = require("../../helper/pagination");
const {
  getNumberOfCategory,
  getAllCategory,
  getPopularCategory,
  getAllCategoryPaging,
} = require("../../models/categoryModel");
const Response = require("../../response/response");

categoryList = async (req, res) => {
  try {
    let data = await getAllCategory();

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

categoryPagingList = async (req, res) => {
  try {
    let data = await getNumberOfCategory();

    const paging = await paginate(req.query.page, req.query.limit, data.count);

    data = await getAllCategoryPaging(
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

categoryPopularList = async (req, res) => {
  try {
    data = await getPopularCategory();

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = { categoryList, categoryPopularList, categoryPagingList };
