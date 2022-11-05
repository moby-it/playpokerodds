import { NextFunction, Request, Response } from 'express';
import { UserRoles } from 'model';
import { extractUserDataFromRequest } from './extractUserFromReq';

export const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedJwt = extractUserDataFromRequest(req);
  if (!decodedJwt) {
    res.sendStatus(401);
  } else {
    const { role } = decodedJwt;
    if (role >= UserRoles.Superuser) {
      next();
    } else {
      res.sendStatus(401);
    }
  }
};
