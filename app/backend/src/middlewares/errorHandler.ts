import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/ApiError';

export default (error: Error, req: Request, res: Response, _Next: NextFunction) => {
  if (error instanceof ApiError) {
    return res.status(error.status).json({ message: error.message });
  }

  return res.status(500).json({ message: 'Internal server error' });
};
