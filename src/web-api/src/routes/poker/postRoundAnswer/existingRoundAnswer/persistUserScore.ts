import { Round } from '@moby-it/poker-core';
import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import prisma from 'prisma';
import { decodedJwtIsValid } from 'shared';
import { countUniqueRoundsPlayed } from '../countRoundsPlayed';
import { ExistingAnswerDto } from '../existingRoundAnswer/existingAnswer.dto';
import { RoundAnswerResponse } from '../RoundAnswerResponse';
export const pesistUserScore = async (
  req: Request,
  res: Response<
    RoundAnswerResponse,
    {
      dto: ExistingAnswerDto;
      round: Round;
      roundId: string;
      estimate: number;
      score: number;
      odds: number;
    }
  >,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const { roundId, round, estimate, score, odds } = res.locals;
  if (!roundId) throw new Error('Round with no id');
  if (!round) throw new Error('No round in answer');
  const responsePayload: RoundAnswerResponse = {
    roundId: roundId,
    estimate,
    odds,
    score,
    round: {
      board: round.board,
      myHand: round.myHand,
      opponentsHands: round.opponentsHands,
    },
  };

  if (authHeader) {
    const token = authHeader.substring(7, authHeader.length);
    const decodedToken = decode(token);
    if (decodedJwtIsValid(decodedToken)) {
      const userId = decodedToken.userId;
      // dont update user score if user has played this round more than once
      const userHasAlreadyPlayedRound = await prisma.roundAnswer.count({
        where: {
          roundId,
          userId,
        },
      });
      if (userHasAlreadyPlayedRound === 1) {
        const roundsPlayed = await countUniqueRoundsPlayed(userId);
        await prisma.user.update({
          where: { id: userId },
          data: {
            score: { increment: res.locals.score / roundsPlayed },
          },
        });
      }
    }
  }
  res.send(responsePayload);
};
