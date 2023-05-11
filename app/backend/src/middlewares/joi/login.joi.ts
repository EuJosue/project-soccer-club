import * as Joi from 'joi';

export default Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages({
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled',
});
