import { createRound, CreateRoundInputs, Round } from '@moby-it/poker-core';
import { NextFunction, Request, Response } from 'express';
export async function createNewRound(
  req: Request,
  res: Response<Round, CreateRoundInputs>,
  next: NextFunction
) {
  const round = createRound(
    res.locals.totalHands,
    res.locals.totalKnownHands,
    res.locals.boardState
  );
  res.status(200).send(round);
}
