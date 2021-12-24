const joi = require("joi");

const validation = joi.object({
  course_id: joi.number().required(),
  title: joi.string().required(),
});

const teachingMaterialValidation = (req, res, next) => {
  try {
    const validationResult = validation.validate({
      course_id: req.body.course_id,
      title: req.body.title,
    });

    console.log(validationResult.error);

    if (validationResult.error) {
      return res
        .status(400)
        .json({
          message: validationResult.error.message,
        })
        .end();
    } else {
      return next();
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = teachingMaterialValidation;
