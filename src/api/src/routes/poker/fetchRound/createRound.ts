import { createRound, RoundInput } from '@moby-it/poker-core';
import { NextFunction, Request, Response } from 'express';
import { pipe } from 'fp-ts/lib/function';
export const createNewRound = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  pipe(res.locals as RoundInput, roundInputs =>
    res.send(createRound(roundInputs))
  );
