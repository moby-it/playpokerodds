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
  const score = Number(user.score.toFixed(2));
  let rank = leaderboards.findIndex((u) => u.username === username);
  if (rank >= 0) {
    rank++;
  }
  let rounds: Array<
    Pick<RoundAnswer, 'estimate' | 'timestamp' | 'roundId'> &
      Omit<Round, 'id'> & { score?: number }
  > = await prisma.$queryRaw`
  select distinct on ("roundId") "RoundAnswers"."roundId" ,
    "RoundAnswers".timestamp,"myHand","opponentsHands", "board", "estimate","odds", abs("estimate"-"odds") as "score"
  from "RoundAnswers"
  LEFT JOIN "Rounds" R on "RoundAnswers"."roundId" = R.id 
  WHERE "RoundAnswers"."userId" = ${user.id}
  ORDER BY "roundId", timestamp desc
 
  `;
  if (userData?.userId !== userId) {
    rounds = rounds.map((r) => ({
      ...r,
      odds: new Decimal(-1),
    }));
  }
  const roundFavoritesIds: { id: string }[] = await prisma.$queryRaw`
  select distinct on ("Rounds"."id") "Rounds"."id"
    from "Rounds"
    LEFT JOIN "UserFavoriteRounds" UFR on "Rounds".id = UFR."roundId"
    LEFT JOIN "RoundAnswers" RA on "Rounds".id = RA."roundId"
    WHERE UFR."userId" = ${user.id}
  `;

  res.send({
    rank,
    score,
    rounds: rounds.map((r) => ({
      ...r,
      estimate: +Number(r.estimate).toFixed(2),
      score: +Number(r.score).toFixed(2),
      odds: +Number(r.odds).toFixed(2),
    })),
    username,
    roundFavoritesIds: roundFavoritesIds.map((rfi) => rfi.id),
  });
}

export const fetchUserProfileByNameEndpoint = [fetchUserProfileByName];
