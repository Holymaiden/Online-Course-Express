const {
  createTeachingMaterial,
  checkSlug,
  updateTeachingMaterial,
  destroyTeachingMaterial,
} = require("../../models/teachingMaterialModel");
const slug = require("slug");
const Response = require("../../response/response");
const upload = require("../../../config/multer-video");
const teachingMaterialValidation = require("../../../src/validation/admin/teachingMaterial.validation");
const Bytes = require("../../helper/formatBytes");

teachingMaterialCreate = async (req, res) => {
  try {
    upload.single("video")(req, res, async () => {
      teachingMaterialValidation(req, res);
      if (req.file == undefined) {
        return res.status(400).json({ message: "no file selected" });
      } else {
        try {
          let data = req.body;
          data.slug = slug(data.title);
          let slugData = await checkSlug(data.slug);
          data.slug = `${data.slug}-${slugData.length}`;
          data.description = Bytes(req.file.size);
          data.content = "/" + req.file.path.slice(45, 76).replace("\\", "/");
          data = await createTeachingMaterial(data);

          return Response.success(res, data);
        } catch (error) {
          return res.status(400).json({ err: error });
        }
      }
    });
  } catch (error) {
    return Response.error(res, "intinya error");
  }
};

teachingMaterialUpdate = async (req, res) => {
  try {
    upload.single("video")(req, res, async () => {
      if (req.file == undefined) {
        return res.status(400).json({ message: "no file selected" });
      } else {
        try {
          let data = req.body;
          data.slug = slug(req.body.title);
          let slugData = await checkSlug(data.slug);
          data.slug = `${data.slug}-${slugData.length}`;
          data.description = Bytes(req.file.size);
          data.content = "/" + req.file.path.slice(45, 76).replace("\\", "/");
          await updateTeachingMaterial(req.params.dataId, data);

          return Response.success(res, data);
        } catch (error) {
          return res.status(400).json({ err: error });
        }
      }
    });
  } catch (error) {
    return Response.error(res, "intinya error");
  }
};

teachingMaterialDestroy = async (req, res) => {
  try {
    data = await destroyTeachingMaterial(req.params.dataId);

    return Response.success(res, "Teaching Material deleted successfully");
  } catch (error) {
    return res.status(400).json({ err: error.message });
  }
};

module.exports = {
  teachingMaterialCreate,
  teachingMaterialUpdate,
  teachingMaterialDestroy,
};
