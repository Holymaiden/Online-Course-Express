const {
  createTeachingMaterial,
  checkSlug,
  updateTeachingMaterial,
  destroyTeachingMaterial,
} = require("../../models/teachingMaterialModel");
const slug = require("slug");
const Response = require("../../response/response");

teachingMaterialCreate = async (req, res) => {
  try {
    let data = req.body;
    data.slug = slug(req.body.title);
    let slugData = await checkSlug(data.slug);
    data.slug = `${data.slug}-${slugData.length}`;
    data = await createTeachingMaterial(data);

    return Response.success(res, data);
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

teachingMaterialUpdate = async (req, res) => {
  try {
    // upload.single("file")(req, res, async () => {
    let data = req.body;
    // let uploadResponse;

    //   if (req.file != undefined) {
    //     uploadResponse = await cloudinary.uploader.upload(req.file.path, {
    //       folder: "teachingMaterial",
    //     });
    //     data.image = uploadResponse.secure_url;
    //   }

    data.slug = slug(req.body.title);
    let slugData = await checkSlug(data.slug);
    data.slug = `${data.slug}-${slugData.length}`;
    data.updated_at = new Date();
    await updateTeachingMaterial(req.params.dataId, data);

    return Response.success(res, data);
    // });
  } catch (error) {
    return res.status(400).json({ err: error });
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
