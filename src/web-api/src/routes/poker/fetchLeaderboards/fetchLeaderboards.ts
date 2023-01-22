import { NextFunction, Request, Response } from 'express';
import prisma from 'prisma';

export async function fetchLeaderboards(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const leaderboardMinGames = Number(process.env['LEADERBOARD_MIN_GAMES']) ?? 0;
  const usersSortedByScoreAsc = (
    await prisma.user.findMany({
      include: { _count: { select: { RoundAnswer: true } } },
    })
  )
    .filter(user => user._count.RoundAnswer >= leaderboardMinGames)
    .sort((a, b) => (a.score < b.score ? 1 : -1))
    .map(user => ({
      username: user.username,
      score: user.score,
    }));
  res.status(200).send(usersSortedByScoreAsc);
}
