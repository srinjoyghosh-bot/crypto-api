import { Request, Response, NextFunction } from 'express';
import { validationResult, query } from 'express-validator';

export const validateRequest = (req: Request, res: Response, next: NextFunction) : void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return ;
  }
  next();
};

// Validation for /stats endpoint
export const statsValidation = [
  query('coin').trim().isIn(['bitcoin', 'matic-network', 'ethereum']).withMessage("Give a valid coin id"),

];

// Validation for /deviation endpoint
export const deviationValidation = [
  query('coin').trim().isIn(['bitcoin', 'matic-network', 'ethereum']).withMessage("Give a valid coin id"),
];
