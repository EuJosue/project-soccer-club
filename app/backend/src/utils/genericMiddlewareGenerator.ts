import { NextFunction, Request, Response } from 'express';
import { Schema, ValidationError } from 'joi';
import statusCode from './statusCode';

const errorHandlerFunction = (
  error: ValidationError,
  _req: Request,
  res: Response,
) => {
  const { type } = error.details[0];
  console.log(type);

  return res.status(statusCode(type)).json({ message: error.message });
};

export default (joi: Schema, errorHandler = errorHandlerFunction) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = joi.validate(req.body);

  if (error) return errorHandler(error, req, res);

  return next();
};
