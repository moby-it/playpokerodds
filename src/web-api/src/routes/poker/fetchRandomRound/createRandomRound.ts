import { createRandomRound as createRandomPokerRound } from '@moby-it/poker-core';
import { Request, Response } from 'express';
export const createRandomRound = async (req: Request, res: Response) => {
  const round = createRandomPokerRound();
  res.status(200).json(round);
};
