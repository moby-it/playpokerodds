import { Round } from '@moby-it/ppo-core';
import { NextFunction, Request, Response } from 'express';
import prisma from 'prisma';
import { EventType } from 'shared';
import { extractUserDataFromRequest } from '../../../auth/common';
import { NewAnswerDto } from './newAnswer.dto';
export const pesistNewRound = async (
  req: Request,
  res: Response<
    unknown,
    {
      dto: NewAnswerDto;
      score: number;
      odds: number;
      round: Round;
      roundId: string;
      estimate: number;
    }
  >,
  next: NextFunction
) => {
  const dto = res.locals.dto;
  const round = dto.round;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eventPayload: Record<string, any> = {
    round: { ...res.locals.dto },
    odds: res.locals.odds,
  };
  const user = extractUserDataFromRequest(req);
  if (user) {
    const userId = user.userId;
    eventPayload.userId = userId;
  }
  const roundSaveResult = await createRoundModel(round, res.locals.odds);
  const roundId = roundSaveResult.id;
  await createRoundAnswerModel(dto, roundSaveResult.id, user?.userId);
  await prisma.event.create({
    data: {
      type: EventType.USER_POSTED_ANSWER,
      payload: { ...eventPayload },
    },
  });
  res.locals = { ...res.locals, roundId, round, estimate: dto.estimate };
  next();
};

async function createRoundModel(round: Round, odds: number) {
  return await prisma.round.create({
    data: {
      myHand: round.myHand,
      opponentsHands: round.opponentsHands,
      board: round.board,
      odds: odds,
    },
  });
}
async function createRoundAnswerModel(
  dto: NewAnswerDto,
  roundId: string,
  userId?: string
) {
  return await prisma.roundAnswer.create({
    data: {
      roundId,
      estimate: dto.estimate,
      userId,
    },
  });
}
