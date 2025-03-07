const Joi = require("joi");

const registrationValidation = Joi.object({
    username:Joi.string().required(),
    password: Joi.string().required(),
   
});

module.exports = { registrationValidation };