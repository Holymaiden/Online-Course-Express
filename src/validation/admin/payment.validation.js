const joi = require("joi");

const validation = joi.object({
  name: joi.string().required(),
  account_number: joi.string().required(),
});

const paymentValidation = (req, res, next) => {
  try {
    const validationResult = validation.validate({
      name: req.body.name,
      account_number: req.body.account_number,
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

module.exports = paymentValidation;
