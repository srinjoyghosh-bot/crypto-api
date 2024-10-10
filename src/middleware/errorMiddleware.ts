import { Request, Response, NextFunction } from 'express';
import { AppError, HttpCode } from '../core/appError';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof AppError) {
    res.status(err.httpCode).json({ message: err.message });
  } else {
    console.error('ERROR:', err);
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};

export default errorHandler;
