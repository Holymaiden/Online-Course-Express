const { createRegistrations } = require("../../models/registrationModel");
const Response = require("../../response/response");
const upload = require("../../../config/multer-pdf");
const { getUser } = require("../../../middleware/auth");

async function registrationsCreate(req, res) {
  try {
    upload.single("cv")(req, res, async () => {
      let data = req.body;
      let user = await getUser(req, res);
      data.user_id = user.id;
      if (req.file == undefined) {
        try {
          data = await createRegistrations(data);
          return Response.success(res, data);
        } catch (error) {
          return Response.error(res, error.message);
        }
      } else {
        try {
          data.cv = "/" + req.file.path.slice(45, 79).replace("\\", "/");
          data = await createRegistrations(data);
          return Response.success(res, data);
        } catch (error) {
          return Response.error(res, error.message);
        }
      }
    });
  } catch (error) {
    return Response.error(res, error.message);
  }
}

module.exports = { registrationsCreate };
