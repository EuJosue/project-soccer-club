import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import ApiError from '../utils/ApiError';

export default (error: Error, _req: Request, res: Response, _Next: NextFunction) => {
  if (error instanceof ApiError) {
    return res.status(error.status).json({ message: error.message });
  }

  if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  return res.status(500).json({ message: 'Internal server error' });
};
