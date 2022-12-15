import { NextFunction, Request, Response } from 'express';
import { validateObject } from 'shared';

export const validatePayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    validateObject(req.query) &&
    'boardState' in req.query &&
    'totalHands' in req.query &&
    'totalKnownHands' in req.query
  ) {
    const boardState = Number(req.query.boardState);
    if (boardState < 0 || boardState > 3) {
      res.sendStatus(400);
      return;
    }
    const totalHands = Number(req.query.totalHands);
    if (totalHands <= 0 || totalHands > 9) {
      res.sendStatus(400);
      return;
    }
    const totalKnownHands = Number(req.query.totalKnownHands);
    if (totalKnownHands > totalHands) {
      res.sendStatus(400);
      return;
    }
    res.locals = {
      boardState,
      totalHands,
      totalKnownHands,
    };
    next();
  } else {
    res.sendStatus(400);
  }
};
