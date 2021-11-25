const joi = require("joi");

const validation = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
});

const courseValidation = (req, res, next) => {
  try {
    const validationResult = validation.validate({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    });

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

module.exports = courseValidation;
