const joi = require("joi");
const { NextFunction } = require("express");

const validation = joi.object({
  username: joi.string().required(),
  password: joi.string().min(5).required(),
});

const authValidation = (req, res, next) => {
  try {
    const validationResult = validation.validate({
      username: req.body.username,
      password: req.body.password,
    });

    if (validationResult.error) {
      console.log(validationResult.error);
      return res
        .status(400)
        .json({
          message: validationResult.error.message,
        })
        .end();
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = authValidation;
