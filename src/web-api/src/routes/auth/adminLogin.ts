import { User, UserRole } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { isSuperuser } from 'model';
import {
  loginUser,
  transformUserToResponse,
  validateAuthPayload,
} from './common';
const verifyRoles = (
  req: Request,
  res: Response<unknown, User & { role: UserRole }>,
  next: NextFunction
) => {
  const user = res.locals;
  if (isSuperuser(user)) {
    next();
  } else {
    res.status(401).send('You are not an admin');
    return;
  }
};
export const adminLoginEndpoint = [
  validateAuthPayload,
  loginUser,
  verifyRoles,
  transformUserToResponse,
];
