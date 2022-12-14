import { NextFunction, Request, Response } from 'express';
import { extractUserDataFromRequest } from '../../auth/common/extractUserFromReq';

export function validatePayload(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = extractUserDataFromRequest(req);
  if (!user) {
    res.sendStatus(401);
    return;
  }
  res.locals = user;
  next();
}
