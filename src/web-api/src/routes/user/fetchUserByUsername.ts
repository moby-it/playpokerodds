import { Decimal } from '@prisma/client/runtime';
import { Request, Response } from 'express';
import prisma from 'prisma';
import { getLeaderboards } from 'shared';
import { extractUserDataFromRequest } from '../auth/common';

async function fetchUserProfileByName(req: Request, res: Response) {
  const userData = extractUserDataFromRequest(req);
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
  let rounds = await prisma.roundAnswer.findMany({
    include: { round: true },
    where: { userId },
  });
  if (userData?.userId !== userId) {
    rounds = rounds.map((r) => ({ ...r, odds: new Decimal(-1) }));
  }
  res.send({ rank, score, rounds, username });
}

export const fetchUserProfileByNameEndpoint = [fetchUserProfileByName];
