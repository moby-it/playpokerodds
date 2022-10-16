import { createRound, RoundInput } from '@moby-it/ppo-core';
import { NextFunction, Request, Response } from 'express';
import { fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
export const createNewRound = async (
  req: Request,
  res: Response<unknown, RoundInput>,
  next: NextFunction
) => {
  pipe(
    res.locals,
    RoundInput.decode,
    fold(
      e => {
        res.status(500).send(e);
      },
      round => {
        res.send(createRound(round));
      }
    )
  );
};
