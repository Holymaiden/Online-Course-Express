const express = require("express");
const router = express.Router();

const User = require("./admin/users");
const AdminCourse = require("./admin/course");
const Summary = require("./admin/summary");
const Course = require("./user/course");
const Category = require("./user/category");
const TeachingMaterialAdmin = require("./admin/teachingMaterial");
const TeachingMaterialUser = require("./user/teachingMaterial");
const InstructorAdmin = require("./admin/instructor");
const InstructorUser = require("./user/instructor");
const UserCourseAdmin = require("./admin/userCourse");
const UserCourseUser = require("./user/userCourse");
const CartAdmin = require("./admin/cart");
const CartUser = require("./user/cart");
const PaymentAdmin = require("./admin/payment");
const TransactionAdmin = require("./admin/transaction");
const TransactionUser = require("./user/transaction");
const loginController = require("../src/controller/auth/login.controller");
const {
  register,
  registerPeserta,
} = require("../src/controller/auth/register.controller");
const ScheduleAdmin = require("./admin/schedule");
const ScheduleUser = require("./user/schedule");
const {
  coursePopularList,
} = require("../src/controller/user/course.controller");
const {
  categoryPopularList,
} = require("../src/controller/user/category.controller");

// const authValidation = require("../src/validation/auth/auth.validation");
const {
  authAdminMiddleware,
  authUserMiddleware,
} = require("../middleware/auth");

router.post("/login", loginController);
router.post("/register", register);
router.post("/registerPeserta", registerPeserta);

// Admin Route
router.use("/admin/user", authAdminMiddleware, User);
router.use("/admin/course", authAdminMiddleware, AdminCourse);
router.use("/admin/summary", authAdminMiddleware, Summary);
router.use(
  "/admin/teachingMaterial",
  authAdminMiddleware,
  TeachingMaterialAdmin
);
router.use("/admin/instructor", authAdminMiddleware, InstructorAdmin);
router.use("/admin/userCourse", authAdminMiddleware, UserCourseAdmin);
router.use("/admin/cart", authAdminMiddleware, CartAdmin);
router.use("/admin/payment", authAdminMiddleware, PaymentAdmin);
router.use("/admin/transaction", authAdminMiddleware, TransactionAdmin);
router.use("/admin/schedule", authAdminMiddleware, ScheduleAdmin);

// User Route
router.use("/course", Course);
router.use("/category", authUserMiddleware, Category);
router.use("/teachingMaterial", authUserMiddleware, TeachingMaterialUser);
router.use("/instructor", authUserMiddleware, InstructorUser);
router.use("/userCourse", authUserMiddleware, UserCourseUser);
router.use("/cart", authUserMiddleware, CartUser);
router.use("/transaction", authUserMiddleware, TransactionUser);
router.use("/schedule", authUserMiddleware, ScheduleUser);

// No Auth
router.use("/popularcourse", coursePopularList);
router.use("/popularcategory", categoryPopularList);

router.get("/", function (req, res, next) {
  console.log("Ready");
  return res.status(200).json({ message: "Ready" });
});

module.exports = router;
