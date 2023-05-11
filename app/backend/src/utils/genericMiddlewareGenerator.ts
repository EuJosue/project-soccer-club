import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import statusCode from './statusCode';

export default (joi: Schema) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = joi.validate(req.body);

  if (error) {
    const { type } = error.details[0];

    return res.status(statusCode(type)).json({ message: error.message });
  }

  return next();
};
