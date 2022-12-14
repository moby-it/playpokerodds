import { NextFunction, Request, Response } from 'express';
import { DecodedJwt } from 'shared';
import { extractUserDataFromRequest } from '../../auth/common';

export function validatePayload(
  req: Request,
  res: Response<unknown, { user: DecodedJwt; roundId: string }>,
  next: NextFunction
) {
  const user = extractUserDataFromRequest(req);
  if (!user) {
    res.sendStatus(401);
    return;
  }
  const roundId = req.params['roundId'];
  if (!roundId) {
    res.sendStatus(400);
    return;
  }
  res.locals.roundId = roundId;
  res.locals.user = user;
  next();
}
