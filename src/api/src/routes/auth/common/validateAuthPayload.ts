import { NextFunction, Request, Response } from 'express';
import { isValidEmail } from './validateEmail';
export const validateAuthPayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body?.email)
    return res.status(400).send({ message: 'Invalid Payload. No email.' });
  if (!isValidEmail(req.body?.email))
    return res.status(400).send({ message: 'Invalid email.' });
  if (!req.body?.password)
    return res.status(400).send({ message: 'Invalid Payload: no password.' });
  next();
};
