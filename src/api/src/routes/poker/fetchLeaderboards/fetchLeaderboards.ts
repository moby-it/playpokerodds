import { NextFunction, Request, Response } from 'express';
import prisma from 'prisma';

export async function fetchLeaderboards(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const usersSortedByScoreAsc = (
      await prisma.user.findMany({ select: { username: true, score: true } })
    ).sort((a, b) => (a.score > b.score ? 1 : -1));
    res.status(200).send(usersSortedByScoreAsc);
  } catch (e) {
    res.status(500).send(e);
  }
}
