import { NextFunction, Request, Response } from 'express';
import { getLeaderboards } from 'shared';

export async function fetchLeaderboards(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const usersSortedByScoreAsc = await getLeaderboards();
  res.status(200).send(usersSortedByScoreAsc);
}
