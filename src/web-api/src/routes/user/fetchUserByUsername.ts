import { Round, RoundAnswer } from '@prisma/client';
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
  let rounds: Array<
    Pick<RoundAnswer, 'estimate' | 'timestamp' | 'roundId'> & Omit<Round, 'id'>
  > = await prisma.$queryRaw`
  select distinct on ("roundId") "RoundAnswers"."roundId" ,
    "RoundAnswers".timestamp,"myHand","opponentsHands", "board", "estimate","odds" 
  from "RoundAnswers"
  LEFT JOIN "Rounds" R on "RoundAnswers"."roundId" = R.id ORDER BY "roundId", timestamp desc;
  `;

  if (userData?.userId !== userId) {
    rounds = rounds.map((r) => ({ ...r, odds: new Decimal(-1) }));
  }
  const roundFavoritesIds: string[] = await prisma.$queryRaw`
  select distinct on ("Rounds"."id") "Rounds"."id"
    from "Rounds"
    LEFT JOIN "UserFavoriteRounds" UFR on "Rounds".id = UFR."roundId"
    LEFT JOIN "RoundAnswers" RA on "Rounds".id = RA."roundId"
    WHERE UFR."userId" = '96e8d28e-a067-4658-88e8-67e4f67e1537'
  `;

  res.send({
    rank,
    score,
    rounds,
    username,
    roundFavoritesIds,
  });
}

export const fetchUserProfileByNameEndpoint = [fetchUserProfileByName];
