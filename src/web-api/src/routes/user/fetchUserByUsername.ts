import { Request, Response } from 'express';
import prisma from 'prisma';
import { getLeaderboards } from 'shared';

async function fetchUserProfileByName(req: Request, res: Response) {
  const username = req.params.username;
  const user = await prisma.user.findFirst({ where: { username } });
  if (!user) {
    res.status(404).send('user not found');
    return;
  }
  const userId = user.id;
  const leaderboards = await getLeaderboards();
  let score: number | null = null;
  let rank = leaderboards.findIndex((u) => u.username === username);
  if (rank >= 0) {
    score = leaderboards[rank].score;
    rank++;
  }
  const roundsPlayed = await prisma.roundAnswer.count({ where: { userId } });
  res.send({ rank, score, roundsPlayed });
}

export const fetchUserProfileByNameEndpoint = [fetchUserProfileByName];
