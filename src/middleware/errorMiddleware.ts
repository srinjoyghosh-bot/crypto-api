import { Request, Response, NextFunction } from 'express';
import { AppError, HttpCode } from '../core/appError';
import { formatResponse } from '../utils/responseFormatter';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof AppError) {
    res.status(err.httpCode).json(formatResponse(false, undefined, undefined, err.message));
  } else {
    console.error('ERROR:', err);
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json(formatResponse(false, undefined, undefined, `Internal server error : ${err.message}`));
  }
};

export default errorHandler;
