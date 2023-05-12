import * as Joi from 'joi';

export default Joi.object({
  homeTeamGoals: Joi.number().min(0).required(),
  awayTeamGoals: Joi.number().min(0).required(),
}).messages({
  'any.required': 'Bad request',
  'number.min': 'Goals must be at least 0',
});
