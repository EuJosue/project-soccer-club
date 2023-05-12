import * as Joi from 'joi';

export default Joi.object({
  homeTeamId: Joi.number().min(0).disallow(Joi.ref('awayTeamId')).required(),
  awayTeamId: Joi.number().min(0).required(),
  homeTeamGoals: Joi.number().min(0).required(),
  awayTeamGoals: Joi.number().min(0).required(),
}).messages({
  'any.required': 'Bad request',
  'number.min': 'Goals must be at least 0',
  'any.invalid': 'It is not possible to create a match with two equal teams',
});
